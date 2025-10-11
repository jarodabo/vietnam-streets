const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'vietnam-streets-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Create necessary directories
const dirs = ['uploads/stories', 'uploads/photographers', 'uploads/events', 'data'];
dirs.forEach(dir => {
    fs.ensureDirSync(dir);
});

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = `uploads/${req.params.type || 'general'}`;
        fs.ensureDirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Simple user authentication (in production, use a proper database)
const users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@vietnamstreets.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'admin'
    }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Data file paths
const dataFiles = {
    stories: path.join(__dirname, '../data/stories.json'),
    photographers: path.join(__dirname, '../data/photographers.json'),
    events: path.join(__dirname, '../data/events.json'),
    products: path.join(__dirname, '../data/products.json'),
    prints: path.join(__dirname, '../data/prints.json')
};

// Helper function to read/write JSON data
const readData = async (type) => {
    try {
        const filePath = dataFiles[type];
        if (await fs.pathExists(filePath)) {
            return await fs.readJson(filePath);
        }
        return [];
    } catch (error) {
        console.error(`Error reading ${type} data:`, error);
        return [];
    }
};

const writeData = async (type, data) => {
    try {
        const filePath = dataFiles[type];
        await fs.ensureDir(path.dirname(filePath));
        await fs.writeJson(filePath, data, { spaces: 2 });
        return true;
    } catch (error) {
        console.error(`Error writing ${type} data:`, error);
        return false;
    }
};

// Routes

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
});

// Content management routes
app.get('/api/:type', authenticateToken, async (req, res) => {
    const { type } = req.params;
    if (!dataFiles[type]) {
        return res.status(400).json({ error: 'Invalid content type' });
    }

    const data = await readData(type);
    res.json(data);
});

app.post('/api/:type', authenticateToken, async (req, res) => {
    const { type } = req.params;
    if (!dataFiles[type]) {
        return res.status(400).json({ error: 'Invalid content type' });
    }

    const data = await readData(type);
    const newItem = {
        id: uuidv4(),
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: req.user.username
    };

    data.push(newItem);

    if (await writeData(type, data)) {
        res.status(201).json(newItem);
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.put('/api/:type/:id', authenticateToken, async (req, res) => {
    const { type, id } = req.params;
    if (!dataFiles[type]) {
        return res.status(400).json({ error: 'Invalid content type' });
    }

    const data = await readData(type);
    const itemIndex = data.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    data[itemIndex] = {
        ...data[itemIndex],
        ...req.body,
        updatedAt: new Date().toISOString(),
        updatedBy: req.user.username
    };

    if (await writeData(type, data)) {
        res.json(data[itemIndex]);
    } else {
        res.status(500).json({ error: 'Failed to update data' });
    }
});

app.delete('/api/:type/:id', authenticateToken, async (req, res) => {
    const { type, id } = req.params;
    if (!dataFiles[type]) {
        return res.status(400).json({ error: 'Invalid content type' });
    }

    const data = await readData(type);
    const itemIndex = data.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    data.splice(itemIndex, 1);

    if (await writeData(type, data)) {
        res.json({ message: 'Item deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete data' });
    }
});

// File upload route
app.post('/api/upload/:type', authenticateToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.params.type}/${req.file.filename}`;
    res.json({
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size
    });
});

// Serve admin panel
app.get('/admin*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Vietnam Streets Admin API is running' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large' });
        }
    }
    res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
    console.log(`Vietnam Streets Admin API running on port ${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
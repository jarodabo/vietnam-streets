// Vietnam Streets Admin Panel JavaScript

class AdminPanel {
    constructor() {
        this.token = localStorage.getItem('adminToken');
        this.user = null;
        this.currentSection = 'stories';
        this.editingItem = null;

        this.init();
    }

    init() {
        this.setupEventListeners();
        if (this.token) {
            this.validateToken();
        } else {
            this.showLogin();
        }
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchSection(tab.dataset.section);
            });
        });

        // File upload handlers
        this.setupFileUpload('storyImageInput', 'storyImagePreview');

        // Form submissions
        document.getElementById('storyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleStorySubmit();
        });
    }

    setupFileUpload(inputId, previewId) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.previewImage(file, preview);
            }
        });

        // Drag and drop functionality
        const uploadArea = input.closest('.file-upload');
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                input.files = files;
                this.previewImage(files[0], preview);
            }
        });
    }

    previewImage(file, previewElement) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewElement.innerHTML = `
                <div style="margin-top: 1rem;">
                    <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: 4px;">
                    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">${file.name}</p>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }

    async validateToken() {
        try {
            const response = await fetch('/api/stories', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                this.showAdmin();
                this.loadContent();
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            this.logout();
        }
    }

    async handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('adminToken', this.token);
                this.showAdmin();
                this.loadContent();
            } else {
                this.showAlert('loginAlert', data.error, 'error');
            }
        } catch (error) {
            this.showAlert('loginAlert', 'Login failed. Please try again.', 'error');
        }
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('adminToken');
        this.showLogin();
    }

    showLogin() {
        document.getElementById('loginSection').classList.remove('hidden');
        document.getElementById('adminSection').classList.add('hidden');
    }

    showAdmin() {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('adminSection').classList.remove('hidden');
        document.getElementById('userWelcome').textContent = `Welcome, ${this.user?.username || 'Admin'}`;
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${section}Section`).classList.add('active');

        this.currentSection = section;
        this.loadContent();
    }

    async loadContent() {
        const gridId = `${this.currentSection}Grid`;
        const grid = document.getElementById(gridId);
        grid.innerHTML = '<div class="loading">Loading...</div>';

        try {
            const response = await fetch(`/api/${this.currentSection}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const items = await response.json();
                this.renderItems(items, grid);
            } else {
                grid.innerHTML = '<div class="alert alert-error">Failed to load content</div>';
            }
        } catch (error) {
            grid.innerHTML = '<div class="alert alert-error">Failed to load content</div>';
        }
    }

    renderItems(items, container) {
        if (items.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 3rem; color: #666;">No items found. Create your first item using the button above.</div>';
            return;
        }

        const html = items.map(item => this.renderItemCard(item)).join('');
        container.innerHTML = html;
    }

    renderItemCard(item) {
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString();
        };

        return `
            <div class="item-card">
                <div class="item-header">
                    <div>
                        <div class="item-title">${item.title || item.name || 'Untitled'}</div>
                        <div class="item-meta">
                            ${item.location ? `📍 ${item.location}` : ''}
                            ${item.createdAt ? `• Created ${formatDate(item.createdAt)}` : ''}
                            ${item.createdBy ? `• by ${item.createdBy}` : ''}
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-secondary" onclick="adminPanel.editItem('${item.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="adminPanel.deleteItem('${item.id}')">Delete</button>
                    </div>
                </div>
                ${item.excerpt || item.description ? `<p style="color: #555; margin-bottom: 1rem;">${item.excerpt || item.description}</p>` : ''}
                ${item.category ? `<span style="background: #f0f0f0; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; color: #666;">${item.category}</span>` : ''}
            </div>
        `;
    }

    async handleStorySubmit() {
        const formData = new FormData();

        // Get form values
        const title = document.getElementById('storyTitle').value;
        const category = document.getElementById('storyCategory').value;
        const excerpt = document.getElementById('storyExcerpt').value;
        const location = document.getElementById('storyLocation').value;
        const date = document.getElementById('storyDate').value;
        const imageFile = document.getElementById('storyImageInput').files[0];

        let imageUrl = '';

        // Upload image if provided
        if (imageFile) {
            try {
                const uploadFormData = new FormData();
                uploadFormData.append('image', imageFile);

                const uploadResponse = await fetch('/api/upload/stories', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: uploadFormData
                });

                if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    imageUrl = uploadData.url;
                } else {
                    throw new Error('Image upload failed');
                }
            } catch (error) {
                this.showAlert('storyAlert', 'Image upload failed', 'error');
                return;
            }
        }

        // Create story object
        const storyData = {
            title,
            category,
            excerpt,
            location,
            date,
            imageUrl
        };

        try {
            const url = this.editingItem ? `/api/stories/${this.editingItem}` : '/api/stories';
            const method = this.editingItem ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(storyData)
            });

            if (response.ok) {
                this.closeModal('storyModal');
                this.loadContent();
                this.resetStoryForm();
            } else {
                const error = await response.json();
                this.showAlert('storyAlert', error.message || 'Failed to save story', 'error');
            }
        } catch (error) {
            this.showAlert('storyAlert', 'Failed to save story', 'error');
        }
    }

    async editItem(id) {
        try {
            const response = await fetch(`/api/${this.currentSection}`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                const items = await response.json();
                const item = items.find(i => i.id === id);

                if (item && this.currentSection === 'stories') {
                    this.populateStoryForm(item);
                    this.editingItem = id;
                    this.openModal('storyModal');
                    document.getElementById('storyModalTitle').textContent = 'Edit Story';
                }
            }
        } catch (error) {
            console.error('Failed to load item for editing:', error);
        }
    }

    populateStoryForm(story) {
        document.getElementById('storyTitle').value = story.title || '';
        document.getElementById('storyCategory').value = story.category || '';
        document.getElementById('storyExcerpt').value = story.excerpt || '';
        document.getElementById('storyLocation').value = story.location || '';
        document.getElementById('storyDate').value = story.date || '';

        if (story.imageUrl) {
            document.getElementById('storyImagePreview').innerHTML = `
                <div style="margin-top: 1rem;">
                    <img src="${story.imageUrl}" style="max-width: 100%; max-height: 200px; border-radius: 4px;">
                    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #666;">Current image</p>
                </div>
            `;
        }
    }

    async deleteItem(id) {
        if (!confirm('Are you sure you want to delete this item?')) {
            return;
        }

        try {
            const response = await fetch(`/api/${this.currentSection}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                this.loadContent();
            } else {
                alert('Failed to delete item');
            }
        } catch (error) {
            alert('Failed to delete item');
        }
    }

    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        if (modalId === 'storyModal') {
            this.resetStoryForm();
        }
    }

    resetStoryForm() {
        document.getElementById('storyForm').reset();
        document.getElementById('storyImagePreview').innerHTML = '';
        document.getElementById('storyModalTitle').textContent = 'Add New Story';
        this.editingItem = null;
    }

    showAlert(containerId, message, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    }
}

// Global functions for onclick handlers
function openModal(modalId) {
    adminPanel.openModal(modalId);
}

function closeModal(modalId) {
    adminPanel.closeModal(modalId);
}

// Initialize admin panel
const adminPanel = new AdminPanel();
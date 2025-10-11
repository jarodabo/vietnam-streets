# Formspree Setup Guide for Vietnam Streets Events

## Overview

Formspree provides free form handling for your website. We'll use it to collect event registrations and send them to your email.

---

## Step 1: Create Formspree Account

1. Go to https://formspree.io
2. Click **"Get Started"** or **"Sign Up"**
3. Create account with:
   - Email: `vietnamstreetscommunity@gmail.com`
   - Create a password
   - Verify your email

---

## Step 2: Create Your First Form

### Option A: Quick Setup (Recommended)

1. After logging in, click **"+ New Form"**
2. Name it: `Event Registration`
3. Copy your form endpoint URL
   - It will look like: `https://formspree.io/f/xzbqw123`
4. Save this URL - you'll need it for the website

### Option B: Create Multiple Forms

Create separate forms for different event types:

| Form Name | Purpose |
|-----------|---------|
| Event Registration | General event sign-ups |
| Workshop Registration | Paid workshops |
| Newsletter Signup | Email list building |
| Contact Form | General inquiries |

---

## Step 3: Get Your Form IDs

After creating each form, Formspree gives you a unique ID.

**Example:**
```
https://formspree.io/f/xzbqw123
                         ^^^^^^^^
                         This is your form ID
```

Save these IDs - you'll add them to your website code.

---

## Step 4: Update Website with Formspree

### For Event Registration Form

The current site uses `mailto:` links. Let's upgrade to Formspree forms.

**Current (mailto):**
```html
<a href="mailto:vietnamstreetscommunity@gmail.com?subject=Event Registration">
  Register
</a>
```

**New (Formspree):**
```html
<form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
  <input type="hidden" name="event" value="Heritage Photography Workshop">
  <input type="text" name="name" placeholder="Full Name" required>
  <input type="email" name="email" placeholder="Email Address" required>
  <input type="tel" name="phone" placeholder="Phone Number">
  <textarea name="message" placeholder="Any questions or dietary restrictions?"></textarea>
  <button type="submit">Register Now</button>
</form>
```

---

## Step 5: Formspree Free Tier Limits

**Free Plan includes:**
- ✅ 50 submissions per month
- ✅ Unlimited forms
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File uploads (up to 10MB)
- ✅ AJAX submissions

**If you exceed 50 submissions/month:**
- Upgrade to paid plan ($10/month for 1,000 submissions)
- Or use multiple Formspree accounts
- Or supplement with Google Forms

---

## Step 6: Customize Email Notifications

1. Log into Formspree dashboard
2. Click on your form
3. Go to **Settings** → **Notifications**
4. Customize:
   - Subject line: `New Event Registration: {{event}}`
   - Reply-to: Use submitter's email
   - CC: Add additional team emails

---

## Step 7: Add Spam Protection

Formspree includes basic spam filtering, but you can add reCAPTCHA:

1. In Formspree dashboard, go to form Settings
2. Enable reCAPTCHA
3. Choose invisible reCAPTCHA (best UX)
4. Copy the code snippet
5. Add to your forms

---

## Step 8: Test Your Forms

### Testing Checklist:

- [ ] Submit test registration
- [ ] Check email arrives at vietnamstreetscommunity@gmail.com
- [ ] Verify all form fields are captured
- [ ] Test with different email addresses
- [ ] Try submitting invalid data (should show errors)
- [ ] Test on mobile device
- [ ] Ensure thank-you page appears after submission

---

## Form Examples for Vietnam Streets

### Example 1: Simple Event Registration

```html
<form action="https://formspree.io/f/YOUR-FORM-ID" method="POST" class="event-registration-form">
  <!-- Hidden field to identify which event -->
  <input type="hidden" name="_subject" value="Event Registration: Heritage Photography Workshop">
  <input type="hidden" name="event" value="Heritage Photography Workshop">
  <input type="hidden" name="event-date" value="2025-02-15">

  <!-- User fields -->
  <div class="form-group">
    <label for="name">Full Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email Address *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" name="phone">
  </div>

  <div class="form-group">
    <label for="message">Questions or Special Requests</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </div>

  <!-- Submit button -->
  <button type="submit" class="submit-btn">Register for Event</button>
</form>
```

### Example 2: Workshop Registration with Payment Info

```html
<form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
  <input type="hidden" name="_subject" value="Workshop Registration: Phở Mastery">
  <input type="hidden" name="workshop" value="Phở Mastery">
  <input type="hidden" name="price" value="$85">

  <div class="form-group">
    <label>Full Name *</label>
    <input type="text" name="name" required>
  </div>

  <div class="form-group">
    <label>Email *</label>
    <input type="email" name="email" required>
  </div>

  <div class="form-group">
    <label>Dietary Restrictions</label>
    <textarea name="dietary-restrictions"></textarea>
  </div>

  <div class="form-group">
    <label>How did you hear about us?</label>
    <select name="referral-source">
      <option value="">Select...</option>
      <option value="Instagram">Instagram</option>
      <option value="Friend">Friend/Family</option>
      <option value="Newsletter">Newsletter</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <p class="payment-note">After registration, you'll receive payment instructions via email.</p>

  <button type="submit">Register ($85)</button>
</form>
```

### Example 3: AJAX Form (No Page Reload)

```html
<form id="ajaxEventForm" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
  <input type="text" name="name" placeholder="Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <button type="submit">Register</button>
  <div id="formStatus"></div>
</form>

<script>
document.getElementById('ajaxEventForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const statusDiv = document.getElementById('formStatus');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusDiv.innerHTML = '<p class="success">Thank you! Registration confirmed.</p>';
      form.reset();
    } else {
      statusDiv.innerHTML = '<p class="error">Oops! There was a problem.</p>';
    }
  } catch (error) {
    statusDiv.innerHTML = '<p class="error">Connection error. Please try again.</p>';
  }
});
</script>
```

---

## Step 9: Handling Paid Events

For events with fees (workshops, exhibitions, etc.):

### Option 1: Email Payment Instructions (Simple)

1. Registration form collects name/email
2. Auto-reply email includes:
   - Venmo: @vietnamstreets
   - PayPal: vietnamstreetscommunity@gmail.com
   - Note: Payment due within 48 hours

### Option 2: Add Payment Link (Better)

Use a payment processor:

**Stripe Payment Links:**
1. Create Stripe account
2. Generate payment link for each event
3. Include link in registration confirmation email

**Venmo:**
- Create Venmo business account
- Share Venmo link in confirmation

**PayPal:**
- Use PayPal.me link
- Example: paypal.me/vietnamstreets/85 (for $85 workshop)

---

## Step 10: Auto-Response Setup

Configure automatic confirmation emails:

1. In Formspree dashboard, go to form Settings
2. Enable "Autoresponder"
3. Customize message:

```
Subject: Your Vietnam Streets Event Registration

Hi {{name}},

Thank you for registering for {{event}}!

EVENT DETAILS:
Date: {{event-date}}
Time: {{event-time}}
Location: {{event-location}}

We've received your registration and will send you additional details within 24 hours.

If this is a paid event, payment instructions will be included in your confirmation email.

Questions? Reply to this email or contact us at vietnamstreetscommunity@gmail.com

See you soon!
Vietnam Streets Team

---
Preserving Vietnamese Culture Through Lens & Story
www.vietnamstreets.com
```

---

## Alternative: Google Forms

If you prefer Google Forms (also free, unlimited submissions):

1. Create form at https://forms.google.com
2. Customize questions
3. Responses go to Google Sheets
4. Set up email notifications
5. Embed on website or use link

**Pros:**
- Unlimited submissions
- Built-in spreadsheet
- Easy data management

**Cons:**
- Less elegant UI
- Requires Google account
- More steps to embed

---

## Implementation Timeline

### Week 1: Basic Setup
- [ ] Create Formspree account
- [ ] Create "Event Registration" form
- [ ] Test with sample submission
- [ ] Verify email delivery

### Week 2: Integration
- [ ] Add forms to 3 featured events
- [ ] Test on all devices
- [ ] Set up auto-responses
- [ ] Create payment workflow

### Week 3: Enhancement
- [ ] Add AJAX forms (no page reload)
- [ ] Create thank-you pages
- [ ] Set up spam protection
- [ ] Add analytics tracking

---

## Next Steps

Once Formspree is set up:

1. Create event detail pages for each event
2. Add registration forms to those pages
3. Update event cards to link to detail pages
4. Test complete registration flow
5. Promote events via newsletter/social media

---

## Resources

- **Formspree Docs:** https://help.formspree.io/
- **Form Templates:** https://formspree.io/forms
- **Support:** support@formspree.io

---

**Ready to implement?** Start with Step 1 and work through each section. The basic setup takes about 15 minutes!

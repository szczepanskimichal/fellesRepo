<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'

defineOptions({
  name: 'ContactPage',
})

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitContactForm = () => {
  // Here would be API call to submit contact form
  console.log('Contact form submitted:', contactForm.value)
  alert('Thank you for your message! We will get back to you within 24 hours.')

  // Reset form
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
}
</script>

<template>
  <div class="contact-page">
    <!-- Header -->
    <section class="contact-hero">
      <div class="hero-content">
        <h1>📞 Contact Us</h1>
        <p>Get in touch with our Cat Adoption Center</p>
      </div>
    </section>

    <!-- Contact Info & Form -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Information -->
          <div class="contact-info">
            <h2>Visit Our Center</h2>

            <div class="info-card">
              <h3>📍 Address</h3>
              <p>
                123 Cat Adoption Street<br />
                Feline City, FC 12345<br />
                United States
              </p>
            </div>

            <div class="info-card">
              <h3>🕰️ Hours</h3>
              <p>
                <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM<br />
                <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br />
                <strong>Sunday:</strong> 12:00 PM - 4:00 PM<br />
                <em>Closed on major holidays</em>
              </p>
            </div>

            <div class="info-card">
              <h3>📞 Contact Details</h3>
              <p>
                <strong>Phone:</strong> (555) 123-CATS<br />
                <strong>Email:</strong> info@catadoptioncenter.com<br />
                <strong>Emergency:</strong> (555) 123-HELP
              </p>
            </div>

            <div class="info-card">
              <h3>🚗 Parking & Accessibility</h3>
              <p>
                Free parking available<br />
                Wheelchair accessible<br />
                Public transportation nearby
              </p>
            </div>

            <div class="social-links">
              <h3>Follow Us</h3>
              <div class="social-buttons">
                <a href="#" class="social-btn facebook">📱 Facebook</a>
                <a href="#" class="social-btn instagram">📷 Instagram</a>
                <a href="#" class="social-btn twitter">🐦 Twitter</a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2>Send Us a Message</h2>
            <p class="form-description">
              Have questions about adoption, volunteering, or our services? We'd love to hear from
              you!
            </p>

            <form @submit.prevent="submitContactForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Your Name *</label>
                  <input id="name" v-model="contactForm.name" type="text" required />
                </div>
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input id="email" v-model="contactForm.email" type="email" required />
                </div>
              </div>

              <div class="form-group">
                <label for="subject">Subject *</label>
                <select id="subject" v-model="contactForm.subject" required>
                  <option value="">Select a subject</option>
                  <option value="adoption">Cat Adoption Inquiry</option>
                  <option value="surrender">Cat Surrender</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donation">Donations</option>
                  <option value="visit">Visiting Information</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  id="message"
                  v-model="contactForm.message"
                  rows="6"
                  placeholder="Please share your questions or comments..."
                  required
                ></textarea>
              </div>

              <div class="form-submit">
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>What are your adoption fees?</h3>
            <p>
              Our adoption fees vary by age and special needs, typically ranging from $50-150. This
              covers spaying/neutering, vaccinations, and health check.
            </p>
          </div>
          <div class="faq-item">
            <h3>Can I visit without an appointment?</h3>
            <p>
              While walk-ins are welcome during open hours, we recommend calling ahead to ensure
              staff availability for personalized assistance.
            </p>
          </div>
          <div class="faq-item">
            <h3>Do you accept cat surrenders?</h3>
            <p>
              Yes, we help rehome cats when families can no longer care for them. Please fill out
              our surrender application online first.
            </p>
          </div>
          <div class="faq-item">
            <h3>How can I volunteer?</h3>
            <p>
              We welcome volunteers! Contact us for information about volunteer orientations and
              available opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
}

.contact-hero {
  background: linear-gradient(135deg, #d17862 0%, #b8654a 100%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hero-content p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-content {
  padding: 4rem 0;
  background: white;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h2 {
  color: #d17862;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #d17862;
}

.info-card h3 {
  color: #d17862;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.info-card p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.social-links {
  margin-top: 2rem;
}

.social-links h3 {
  color: #d17862;
  margin-bottom: 1rem;
}

.social-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.social-btn {
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: transform 0.3s;
}

.social-btn:hover {
  transform: translateY(-2px);
}

.facebook {
  background: #4267b2;
  color: white;
}
.instagram {
  background: #e4405f;
  color: white;
}
.twitter {
  background: #1da1f2;
  color: white;
}

.contact-form-section h2 {
  color: #d17862;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form-description {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #d17862;
}

.form-submit {
  text-align: center;
}

.faq-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.faq-section h2 {
  text-align: center;
  color: #d17862;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.faq-item {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
  color: #d17862;
  margin-bottom: 1rem;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .social-buttons {
    flex-direction: column;
  }
}
</style>

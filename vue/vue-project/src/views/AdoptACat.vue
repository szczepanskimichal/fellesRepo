<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import FileUpload from '@/components/FileUpload.vue'

defineOptions({
  name: 'AdoptACatPage',
})

const form = ref({
  ownerName: '',
  ownerEmail: '',
  ownerPhone: '',
  catName: '',
  catAge: 1,
  catBreed: '',
  catGender: '',
  catPersonality: [] as string[],
  catDescription: '',
  medicalHistory: '',
  reason: '',
  agreement: false,
  contactPreference: 'email',
})

const catPhotos = ref<File[]>([])

const handlePhotosChange = (files: File[]) => {
  catPhotos.value = files
}

const personalityOptions = [
  'playful',
  'calm',
  'affectionate',
  'independent',
  'social',
  'quiet',
  'energetic',
  'lazy',
  'curious',
  'gentle',
  'vocal',
  'friendly',
]

const breeds = [
  'British Shorthair',
  'Maine Coon',
  'Siamese',
  'Ragdoll',
  'Bengal',
  'Persian',
  'Russian Blue',
  'Scottish Fold',
  'Sphynx',
  'Mixed Breed',
  'Other',
]

const submitForm = () => {
  if (!form.value.agreement) {
    alert('Please agree to the terms and conditions')
    return
  }

  // Here would be API call to submit form
  console.log('Form submitted:', form.value)
  alert('Thank you! We will contact you within 24 hours to discuss the next steps.')

  // Reset form
  form.value = {
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    catName: '',
    catAge: 1,
    catBreed: '',
    catGender: '',
    catPersonality: [],
    catDescription: '',
    medicalHistory: '',
    reason: '',
    agreement: false,
    contactPreference: 'email',
  }
}

const togglePersonality = (trait: string) => {
  const index = form.value.catPersonality.indexOf(trait)
  if (index > -1) {
    form.value.catPersonality.splice(index, 1)
  } else {
    form.value.catPersonality.push(trait)
  }
}
</script>

<template>
  <div class="adopt-a-cat-page">
    <!-- Header -->
    <section class="form-hero">
      <div class="hero-content">
        <h1>❤️ Rehome Your Cat</h1>
        <p>Help us find a loving new home for your feline friend</p>
      </div>
    </section>

    <!-- Form -->
    <section class="form-section">
      <div class="container">
        <div class="form-intro">
          <h2>Cat Surrender Application</h2>
          <p>
            Please fill out this form completely. We will review your application and contact you
            within 24 hours.
          </p>
        </div>

        <form @submit.prevent="submitForm" class="surrender-form">
          <!-- Owner Information -->
          <div class="form-group-header">
            <h3>👤 Your Information</h3>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="ownerName">Full Name *</label>
              <input id="ownerName" v-model="form.ownerName" type="text" required />
            </div>
            <div class="form-group">
              <label for="ownerEmail">Email Address *</label>
              <input id="ownerEmail" v-model="form.ownerEmail" type="email" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="ownerPhone">Phone Number *</label>
              <input id="ownerPhone" v-model="form.ownerPhone" type="tel" required />
            </div>
            <div class="form-group">
              <label for="contactPreference">Preferred Contact Method</label>
              <select id="contactPreference" v-model="form.contactPreference">
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="text">Text Message</option>
              </select>
            </div>
          </div>

          <!-- Cat Information -->
          <div class="form-group-header">
            <h3>🐱 Cat Information</h3>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="catName">Cat's Name *</label>
              <input id="catName" v-model="form.catName" type="text" required />
            </div>
            <div class="form-group">
              <label for="catAge">Age (years) *</label>
              <input
                id="catAge"
                v-model.number="form.catAge"
                type="number"
                min="0"
                max="25"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="catBreed">Breed *</label>
              <select id="catBreed" v-model="form.catBreed" required>
                <option value="">Select a breed</option>
                <option v-for="breed in breeds" :key="breed" :value="breed">{{ breed }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="catGender">Gender *</label>
              <select id="catGender" v-model="form.catGender" required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <!-- Personality -->
          <div class="form-group">
            <label>Personality Traits *</label>
            <div class="personality-grid">
              <button
                v-for="trait in personalityOptions"
                :key="trait"
                type="button"
                @click="togglePersonality(trait)"
                :class="['personality-btn', { active: form.catPersonality.includes(trait) }]"
              >
                {{ trait }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="catDescription">Describe Your Cat *</label>
            <textarea
              id="catDescription"
              v-model="form.catDescription"
              rows="4"
              placeholder="Tell us about your cat's personality, habits, likes/dislikes..."
              required
            ></textarea>
          </div>

          <!-- Medical & History -->
          <div class="form-group-header">
            <h3>🏥 Medical & History</h3>
          </div>

          <div class="form-group">
            <label for="medicalHistory">Medical History</label>
            <textarea
              id="medicalHistory"
              v-model="form.medicalHistory"
              rows="3"
              placeholder="Vaccinations, spay/neuter status, any medical conditions..."
            ></textarea>
          </div>

          <div class="form-group">
            <label for="reason">Reason for Surrendering *</label>
            <textarea
              id="reason"
              v-model="form.reason"
              rows="3"
              placeholder="Please explain why you need to rehome your cat..."
              required
            ></textarea>
          </div>

          <!-- Cat Photos -->
          <div class="form-group-header">
            <h3>📸 Cat Photos</h3>
            <p class="section-description">
              Upload clear photos of your cat to help potential adopters get to know them better.
            </p>
          </div>

          <div class="form-group">
            <FileUpload :max-files="6" :max-file-size="5" @files-changed="handlePhotosChange" />
          </div>

          <!-- Agreement -->
          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input v-model="form.agreement" type="checkbox" required />
              <span class="checkmark"></span>
              I understand that Cat Adoption Center will work to find the best possible home for my
              cat. I agree to provide accurate information and authorize the center to contact my
              veterinarian if needed.
            </label>
          </div>

          <div class="form-submit">
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.adopt-a-cat-page {
  min-height: 100vh;
}

.form-hero {
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
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.form-section {
  padding: 3rem 0;
  background: #f8f9fa;
}

.form-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.form-intro h2 {
  color: #d17862;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.form-intro p {
  color: #666;
  font-size: 1.1rem;
}

.surrender-form {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-group-header {
  margin: 2rem 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #d17862;
}

.form-group-header h3 {
  color: #d17862;
  font-size: 1.3rem;
  margin: 0;
}

.section-description {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
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

.personality-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.personality-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.personality-btn:hover {
  border-color: #d17862;
}

.personality-btn.active {
  background: #d17862;
  color: white;
  border-color: #d17862;
}

.checkbox-group {
  margin: 2rem 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  line-height: 1.5;
}

.checkbox-label input[type='checkbox'] {
  width: auto;
  margin: 0;
}

.form-submit {
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .surrender-form {
    padding: 2rem 1rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .personality-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

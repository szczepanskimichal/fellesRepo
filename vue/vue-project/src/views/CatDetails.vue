<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import ImageGallery from '@/components/ImageGallery.vue'
import cats from '@/assets/data'
import type { Cat } from '@/assets/data'

defineOptions({
  name: 'CatDetailsPage',
})

const route = useRoute()
const router = useRouter()

const cat = ref<Cat | null>(null)
const loading = ref(true)
const error = ref(false)

// Find cat by name from route params
onMounted(() => {
  const catName = route.params.name as string
  if (catName) {
    const foundCat = cats.find(
      (c) => c.name.toLowerCase().replace(/\s+/g, '-') === catName.toLowerCase(),
    )
    if (foundCat) {
      cat.value = foundCat
    } else {
      error.value = true
    }
  } else {
    error.value = true
  }
  loading.value = false
})

const goBack = () => {
  router.push('/adopt')
}

const navigateToAdopt = () => {
  router.push('/adopt-a-cat')
}
</script>

<template>
  <div class="cat-details-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>Loading cat details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <h1>Cat Not Found</h1>
      <p>Sorry, we couldn't find the cat you're looking for.</p>
      <Button @click="goBack">Back to Gallery</Button>
    </div>

    <!-- Cat Details -->
    <div v-else-if="cat" class="cat-details">
      <!-- Header -->
      <div class="cat-header">
        <button @click="goBack" class="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5m7-7l-7 7 7 7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Back to Gallery
        </button>
        <h1>Meet {{ cat.name }}</h1>
      </div>

      <!-- Cat Image and Basic Info -->
      <div class="cat-showcase">
        <div class="cat-image-container">
          <ImageGallery :images="cat.images" :cat-name="cat.name" size="large" />
        </div>

        <div class="cat-basic-info">
          <div class="cat-name-section">
            <h2>{{ cat.name }}</h2>
            <div class="cat-badges">
              <span class="age-badge"
                >{{ cat.age }} {{ cat.age === 1 ? 'year' : 'years' }} old</span
              >
              <span class="breed-badge">{{ cat.breed }}</span>
            </div>
          </div>

          <div class="cat-personality">
            <h3>Personality</h3>
            <div class="personality-tags">
              <span v-for="trait in cat.personality" :key="trait" class="personality-tag">
                {{ trait }}
              </span>
            </div>
          </div>

          <div class="adoption-actions">
            <Button @click="navigateToAdopt" class="adopt-button"> Start Adoption Process </Button>
            <Button @click="goBack" variant="secondary" class="browse-button">
              Browse More Cats
            </Button>
          </div>
        </div>
      </div>

      <!-- Detailed Information -->
      <div class="cat-detailed-info">
        <div class="info-section">
          <h3>About {{ cat.name }}</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Age:</strong>
              <span>{{ cat.age }} {{ cat.age === 1 ? 'year' : 'years' }} old</span>
            </div>
            <div class="info-item">
              <strong>Breed:</strong>
              <span>{{ cat.breed }}</span>
            </div>
            <div class="info-item">
              <strong>Personality:</strong>
              <span>{{ cat.personality.join(', ') }}</span>
            </div>
            <div class="info-item">
              <strong>Good with:</strong>
              <span>Children, other cats, quiet homes</span>
            </div>
            <div class="info-item">
              <strong>Energy level:</strong>
              <span>{{
                cat.personality.includes('energetic')
                  ? 'High'
                  : cat.personality.includes('lazy')
                    ? 'Low'
                    : 'Medium'
              }}</span>
            </div>
            <div class="info-item">
              <strong>Ideal home:</strong>
              <span>{{
                cat.personality.includes('social') ? 'Active family' : 'Quiet, loving home'
              }}</span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Care Requirements</h3>
          <div class="care-list">
            <div class="care-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor"
                />
              </svg>
              <span>Daily feeding and fresh water</span>
            </div>
            <div class="care-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor"
                />
              </svg>
              <span
                >Regular grooming
                {{
                  cat.breed === 'Maine Coon'
                    ? '(daily brushing needed)'
                    : cat.breed === 'Sphynx'
                      ? '(weekly bathing)'
                      : '(weekly brushing)'
                }}</span
              >
            </div>
            <div class="care-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor"
                />
              </svg>
              <span>{{
                cat.personality.includes('playful') || cat.personality.includes('energetic')
                  ? 'Daily playtime and exercise'
                  : 'Gentle play and interaction'
              }}</span>
            </div>
            <div class="care-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  fill="currentColor"
                />
              </svg>
              <span>Regular vet checkups</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-section">
        <div class="cta-content">
          <h3>Ready to give {{ cat.name }} a loving home?</h3>
          <p>
            Start the adoption process today and give this wonderful cat the family they deserve.
          </p>
          <Button @click="navigateToAdopt" class="cta-button"> Adopt {{ cat.name }} </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cat-details-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #fef7f0 0%, #f8f9fa 100%);
  padding: 2rem 0;
}

.loading,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.error-state h1 {
  color: #d32f2f;
  margin-bottom: 1rem;
}

.cat-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cat-header {
  margin-bottom: 3rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 2px solid #d17862;
  color: #d17862;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.back-button:hover {
  background: #d17862;
  color: white;
}

.cat-header h1 {
  font-size: 3rem;
  color: #333;
  text-align: center;
  margin: 0;
  font-weight: 700;
}

.cat-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;
}

.cat-image-container {
  display: flex;
  justify-content: center;
}

.cat-basic-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cat-name-section h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 700;
}

.cat-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.age-badge,
.breed-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.age-badge {
  background: #e3f2fd;
  color: #1976d2;
}

.breed-badge {
  background: #f3e5f5;
  color: #7b1fa2;
}

.cat-personality h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.personality-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.personality-tag {
  background: #d17862;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
}

.adoption-actions {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.adopt-button {
  background: #d17862 !important;
  font-size: 1.1rem !important;
  padding: 1rem 2rem !important;
}

.browse-button {
  background: transparent !important;
  color: #d17862 !important;
  border: 2px solid #d17862 !important;
}

.cat-detailed-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.info-section {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 2px solid #f0f0f0;
}

.info-section h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #d17862;
  padding-bottom: 0.5rem;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item strong {
  color: #555;
  min-width: 120px;
}

.care-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.care-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #d17862;
}

.care-item svg {
  color: #d17862;
  flex-shrink: 0;
}

.cta-section {
  background: linear-gradient(135deg, #d17862 0%, #b8654a 100%);
  color: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 2rem;
}

.cta-content h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background: white !important;
  color: #d17862 !important;
  font-size: 1.2rem !important;
  padding: 1rem 2rem !important;
  font-weight: 600 !important;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .cat-details {
    padding: 0 1rem;
  }

  .cat-header h1 {
    font-size: 2rem;
  }

  .cat-showcase {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .cat-name-section h2 {
    font-size: 2rem;
  }

  .cat-detailed-info {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .adoption-actions {
    flex-direction: column;
  }

  .cta-section {
    padding: 2rem;
  }

  .cta-content h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .cat-details {
    padding: 0 0.5rem;
  }

  .back-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .info-section {
    padding: 1.5rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

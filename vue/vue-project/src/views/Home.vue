<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

defineOptions({
  name: 'HomePage',
})

const router = useRouter()

const navigateToAdopt = () => {
  router.push('/adopt')
}

const navigateToSurrender = () => {
  router.push('/adopt-a-cat')
}
</script>

<template>
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>🐾 Find Your Perfect Feline Friend</h1>
      <p class="hero-subtitle">
        Every cat deserves a loving home. Every home deserves the joy of a cat.
      </p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">250+</span>
          <span class="stat-label">Cats Adopted</span>
        </div>
        <div class="stat">
          <span class="stat-number">50+</span>
          <span class="stat-label">Cats Available</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">Love Guaranteed</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Action Cards -->
  <section class="action-cards">
    <div class="card adopt-card">
      <div class="card-icon">🏠</div>
      <h3>Looking for a Cat?</h3>
      <p>Browse our amazing cats waiting for their forever homes</p>
      <Button @click="navigateToAdopt">Browse Cats</Button>
    </div>

    <div class="card surrender-card">
      <div class="card-icon">❤️</div>
      <h3>Need to Rehome Your Cat?</h3>
      <p>We help find loving homes for cats that need new families</p>
      <Button @click="navigateToSurrender">Surrender a Cat</Button>
    </div>
  </section>
</template>

<style scoped>
/* Hero Section */
.hero {
  background: linear-gradient(135deg, #d17862 0%, #b8654a 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffe97b;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

/* Action Cards */
.action-cards {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .action-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  background: white;
  border-radius: 15px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 3px solid transparent;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.adopt-card {
  border-color: #d17862;
}

.surrender-card {
  border-color: #ffe97b;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card h3 {
  color: #d17862;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card p {
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>

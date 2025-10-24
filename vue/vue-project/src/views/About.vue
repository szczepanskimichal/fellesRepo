<script setup lang="ts">
import Button from '@/components/Button.vue'

defineOptions({
  name: 'AboutPage',
})
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="about-hero-content">
        <h1>About Cat Adoption Center</h1>
        <p>Connecting loving families with cats in need since 2020</p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission">
      <div class="container">
        <h2>Our Mission</h2>
        <p class="mission-text">
          We believe every cat deserves a loving home and every family deserves the joy that comes
          with feline companionship. Our center provides a safe haven for cats while we work
          tirelessly to match them with their perfect families.
        </p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <h3>250+</h3>
            <p>Successful Adoptions</p>
          </div>
          <div class="stat-card">
            <h3>50+</h3>
            <p>Cats Currently Available</p>
          </div>
          <div class="stat-card">
            <h3>5+</h3>
            <p>Years of Service</p>
          </div>
          <div class="stat-card">
            <h3>100%</h3>
            <p>Love & Care</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="container">
        <h2>What We Do</h2>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🏠</div>
            <h3>Cat Adoption</h3>
            <p>We help you find the perfect feline companion for your family</p>
          </div>
          <div class="service-card">
            <div class="service-icon">❤️</div>
            <h3>Cat Surrendering</h3>
            <p>Safe and caring rehoming for cats that need new families</p>
          </div>
          <div class="service-card">
            <div class="service-icon">🏥</div>
            <h3>Medical Care</h3>
            <p>All cats receive health checkups and necessary medical attention</p>
          </div>
          <div class="service-card">
            <div class="service-icon">📚</div>
            <h3>Education</h3>
            <p>We provide guidance on cat care and responsible pet ownership</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2>Ready to Find Your New Best Friend?</h2>
        <p>Browse our available cats or learn about our adoption process</p>
        <div class="cta-buttons">
          <Button>View Available Cats</Button>
          <Button>Contact Us</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
}

.about-hero {
  background: linear-gradient(135deg, #d17862 0%, #b8654a 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.about-hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.about-hero-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.mission {
  padding: 4rem 0;
  background: #f8f9fa;
}

.mission h2 {
  text-align: center;
  color: #d17862;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.mission-text {
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  color: #555;
}

.stats {
  padding: 4rem 0;
  background: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
}

.stat-card h3 {
  font-size: 3rem;
  color: #d17862;
  margin-bottom: 0.5rem;
}

.stat-card p {
  color: #666;
  font-weight: 500;
}

.services {
  padding: 4rem 0;
  background: #f8f9fa;
}

.services h2 {
  text-align: center;
  color: #d17862;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #d17862;
  margin-bottom: 1rem;
}

.service-card p {
  color: #666;
  line-height: 1.6;
}

.cta {
  padding: 4rem 0;
  background: #d17862;
  color: white;
  text-align: center;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .about-hero-content h1 {
    font-size: 2rem;
  }

  .mission h2,
  .services h2,
  .cta h2 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import CatCart from '@/components/CatCart.vue'
import Button from '@/components/Button.vue'
import cats from '@/assets/data'

defineOptions({
  name: 'AdoptPage',
})

const searchTerm = ref('')
const selectedBreed = ref('')
const selectedAge = ref('')
const showMore = ref(false)

// Get unique breeds
const breeds = [...new Set(cats.map((cat) => cat.breed))]
const ageRanges = ['1-2 years', '3-4 years', '5+ years']

// Filter cats based on search and filters
const filteredCats = ref(cats)
const displayedCats = ref(cats.slice(0, 6))

const filterCats = () => {
  let filtered = cats

  // Search by name
  if (searchTerm.value) {
    filtered = filtered.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        cat.breed.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        cat.personality.some((trait) =>
          trait.toLowerCase().includes(searchTerm.value.toLowerCase()),
        ),
    )
  }

  // Filter by breed
  if (selectedBreed.value) {
    filtered = filtered.filter((cat) => cat.breed === selectedBreed.value)
  }

  // Filter by age
  if (selectedAge.value) {
    filtered = filtered.filter((cat) => {
      if (selectedAge.value === '1-2 years') return cat.age >= 1 && cat.age <= 2
      if (selectedAge.value === '3-4 years') return cat.age >= 3 && cat.age <= 4
      if (selectedAge.value === '5+ years') return cat.age >= 5
      return true
    })
  }

  filteredCats.value = filtered
  displayedCats.value = showMore.value ? filtered : filtered.slice(0, 6)
}

const loadMore = () => {
  showMore.value = true
  displayedCats.value = filteredCats.value
}

const clearFilters = () => {
  searchTerm.value = ''
  selectedBreed.value = ''
  selectedAge.value = ''
  showMore.value = false
  filteredCats.value = cats
  displayedCats.value = cats.slice(0, 6)
}

// Watch for filter changes
import { watch } from 'vue'
watch([searchTerm, selectedBreed, selectedAge], filterCats)
</script>

<template>
  <div class="adopt-page">
    <!-- Header -->
    <section class="adopt-hero">
      <div class="hero-content">
        <h1>🐾 Find Your Perfect Cat</h1>
        <p>Browse our amazing cats waiting for their forever homes</p>
      </div>
    </section>

    <!-- Filters -->
    <section class="filters">
      <div class="container">
        <div class="filters-grid">
          <div class="filter-group">
            <label for="search">Search cats:</label>
            <input
              id="search"
              v-model="searchTerm"
              type="text"
              placeholder="Search by name, breed, or personality..."
              class="filter-input"
            />
          </div>

          <div class="filter-group">
            <label for="breed">Breed:</label>
            <select id="breed" v-model="selectedBreed" class="filter-select">
              <option value="">All Breeds</option>
              <option v-for="breed in breeds" :key="breed" :value="breed">{{ breed }}</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="age">Age:</label>
            <select id="age" v-model="selectedAge" class="filter-select">
              <option value="">All Ages</option>
              <option v-for="range in ageRanges" :key="range" :value="range">{{ range }}</option>
            </select>
          </div>

          <Button @click="clearFilters" class="clear-btn">Clear Filters</Button>
        </div>
      </div>
    </section>

    <!-- Results Summary -->
    <section class="results-summary">
      <div class="container">
        <p>Found {{ filteredCats.length }} cat{{ filteredCats.length !== 1 ? 's' : '' }}</p>
      </div>
    </section>

    <!-- Cats Grid -->
    <section class="cats-grid">
      <div class="container">
        <div class="grid">
          <CatCart v-for="cat in displayedCats" :key="cat.name" :cat="cat" />
        </div>

        <div v-if="!showMore && filteredCats.length > 6" class="load-more">
          <Button @click="loadMore">Load More Cats ({{ filteredCats.length - 6 }} more)</Button>
        </div>

        <div v-if="filteredCats.length === 0" class="no-results">
          <h3>No cats found</h3>
          <p>Try adjusting your search criteria</p>
          <Button @click="clearFilters">Show All Cats</Button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.adopt-page {
  min-height: 100vh;
}

.adopt-hero {
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

.filters {
  padding: 2rem 0;
  background: #f8f9fa;
}

.filters-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.filter-input,
.filter-select {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #d17862;
}

.clear-btn {
  margin-top: 0;
}

.results-summary {
  padding: 1rem 0;
  background: white;
  border-bottom: 1px solid #eee;
}

.results-summary p {
  color: #666;
  font-weight: 500;
}

.cats-grid {
  padding: 2rem 0;
  background: white;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.load-more {
  text-align: center;
  margin-top: 3rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results h3 {
  color: #d17862;
  margin-bottom: 1rem;
}

.no-results p {
  color: #666;
  margin-bottom: 2rem;
}

/* Responsive */
@media (min-width: 414px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }
}
</style>

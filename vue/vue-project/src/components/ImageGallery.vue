<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  images: string[]
  catName: string
  size?: 'small' | 'medium' | 'large'
}>()

const currentImageIndex = ref(0)
const isFullscreen = ref(false)

const currentImage = computed(() => props.images[currentImageIndex.value])
const hasMultipleImages = computed(() => props.images.length > 1)

const nextImage = () => {
  if (currentImageIndex.value < props.images.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0 // Loop back to first
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = props.images.length - 1 // Loop to last
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const closeFullscreen = () => {
  isFullscreen.value = false
}

// Handle keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!isFullscreen.value) return

  switch (event.key) {
    case 'ArrowLeft':
      prevImage()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'Escape':
      closeFullscreen()
      break
  }
}

// Add keyboard listener when fullscreen
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="image-gallery" :class="[`size-${size || 'medium'}`]">
    <!-- Main Image Container -->
    <div class="main-image-container">
      <img
        :src="`/photos/${currentImage}`"
        :alt="`${catName} - Image ${currentImageIndex + 1}`"
        class="main-image"
        @click="toggleFullscreen"
      />

      <!-- Navigation Arrows (only if multiple images) -->
      <div v-if="hasMultipleImages" class="nav-arrows">
        <button @click="prevImage" class="nav-arrow prev" aria-label="Previous image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button @click="nextImage" class="nav-arrow next" aria-label="Next image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- Image Counter -->
      <div v-if="hasMultipleImages" class="image-counter">
        {{ currentImageIndex + 1 }} / {{ images.length }}
      </div>

      <!-- Fullscreen Button -->
      <button @click="toggleFullscreen" class="fullscreen-btn" aria-label="View fullscreen">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- Thumbnail Strip (only if multiple images) -->
    <div v-if="hasMultipleImages" class="thumbnail-strip">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="goToImage(index)"
        class="thumbnail"
        :class="{ active: index === currentImageIndex }"
        :aria-label="`View image ${index + 1}`"
      >
        <img :src="`/photos/${image}`" :alt="`${catName} - Thumbnail ${index + 1}`" />
      </button>
    </div>

    <!-- Fullscreen Modal -->
    <div v-if="isFullscreen" class="fullscreen-modal" @click="closeFullscreen">
      <div class="fullscreen-content" @click.stop>
        <button @click="closeFullscreen" class="close-btn" aria-label="Close fullscreen">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <img
          :src="`/photos/${currentImage}`"
          :alt="`${catName} - Image ${currentImageIndex + 1}`"
          class="fullscreen-image"
        />

        <div v-if="hasMultipleImages" class="fullscreen-nav">
          <button @click="prevImage" class="fullscreen-arrow prev">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button @click="nextImage" class="fullscreen-arrow next">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div class="fullscreen-counter">{{ currentImageIndex + 1 }} / {{ images.length }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 3px solid #d17862;
}

.main-image {
  width: 100%;
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
}

/* Size variants */
.size-small .main-image {
  height: 250px;
  object-fit: cover;
}

.size-medium .main-image {
  height: 400px;
  object-fit: cover;
}

.size-large .main-image {
  height: 500px;
  object-fit: cover;
}

.nav-arrows {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
}

.nav-arrow {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  opacity: 0;
  transform: translateY(-50%);
}

.main-image-container:hover .nav-arrow {
  opacity: 1;
}

.nav-arrow:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.image-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.fullscreen-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
}

.main-image-container:hover .fullscreen-btn {
  opacity: 1;
}

.fullscreen-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.thumbnail-strip {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: #d17862 #f0f0f0;
}

.thumbnail-strip::-webkit-scrollbar {
  height: 6px;
}

.thumbnail-strip::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

.thumbnail-strip::-webkit-scrollbar-thumb {
  background: #d17862;
  border-radius: 3px;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  padding: 0;
}

.thumbnail:hover {
  border-color: #d17862;
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: #d17862;
  box-shadow: 0 0 0 2px rgba(209, 120, 98, 0.3);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Fullscreen Modal */
.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.fullscreen-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: white;
  transform: scale(1.1);
}

.fullscreen-nav {
  position: absolute;
  top: 50%;
  left: -60px;
  right: -60px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.fullscreen-arrow {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  transform: translateY(-50%);
}

.fullscreen-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.fullscreen-counter {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .nav-arrow {
    width: 35px;
    height: 35px;
  }

  .thumbnail {
    width: 60px;
    height: 45px;
  }

  .fullscreen-nav {
    left: -40px;
    right: -40px;
  }

  .fullscreen-arrow {
    width: 40px;
    height: 40px;
  }

  .close-btn {
    top: -40px;
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .size-medium .main-image {
    height: 300px;
  }

  .size-large .main-image {
    height: 350px;
  }

  .thumbnail {
    width: 50px;
    height: 40px;
  }

  .nav-arrows {
    padding: 0 0.5rem;
  }
}
</style>

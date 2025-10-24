<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  maxFiles?: number
  acceptedTypes?: string[]
  maxFileSize?: number // in MB
}>()

const emit = defineEmits<{
  'update:files': [files: File[]]
  'files-changed': [files: File[]]
}>()

const files = ref<File[]>([])
const dragOver = ref(false)
const errors = ref<string[]>([])

const maxFiles = computed(() => props.maxFiles || 5)
const acceptedTypes = computed(
  () => props.acceptedTypes || ['image/jpeg', 'image/png', 'image/webp'],
)
const maxFileSize = computed(() => props.maxFileSize || 5) // 5MB default

const fileInput = ref<HTMLInputElement>()

const openFileDialog = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
  }
}

const handleDrop = (event: DragEvent) => {
  dragOver.value = false
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
}

const addFiles = (newFiles: File[]) => {
  errors.value = []
  const validFiles: File[] = []

  for (const file of newFiles) {
    // Check file type
    if (!acceptedTypes.value.includes(file.type)) {
      errors.value.push(`${file.name}: Invalid file type. Please upload images only.`)
      continue
    }

    // Check file size
    if (file.size > maxFileSize.value * 1024 * 1024) {
      errors.value.push(`${file.name}: File too large. Maximum size is ${maxFileSize.value}MB.`)
      continue
    }

    // Check if we're not exceeding max files
    if (files.value.length + validFiles.length >= maxFiles.value) {
      errors.value.push(`Maximum ${maxFiles.value} files allowed.`)
      break
    }

    validFiles.push(file)
  }

  files.value = [...files.value, ...validFiles]
  emit('update:files', files.value)
  emit('files-changed', files.value)
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
  emit('update:files', files.value)
  emit('files-changed', files.value)
}

const clearAll = () => {
  files.value = []
  errors.value = []
  emit('update:files', files.value)
  emit('files-changed', files.value)
}

// Create preview URLs
const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file)
}

// Clean up object URLs when component unmounts
import { onUnmounted } from 'vue'
onUnmounted(() => {
  files.value.forEach((file) => {
    URL.revokeObjectURL(getFilePreview(file))
  })
})
</script>

<template>
  <div class="file-upload">
    <!-- Upload Area -->
    <div
      class="upload-area"
      :class="{ 'drag-over': dragOver, 'has-files': files.length > 0 }"
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @click="openFileDialog"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        :accept="acceptedTypes.join(',')"
        @change="handleFileSelect"
        style="display: none"
      />

      <div v-if="files.length === 0" class="upload-prompt">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="upload-icon">
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polyline
            points="14,2 14,8 20,8"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <line
            x1="12"
            y1="18"
            x2="12"
            y2="12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polyline
            points="9,15 12,12 15,15"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h3>Upload Cat Photos</h3>
        <p>Drag and drop images here or click to browse</p>
        <p class="upload-info">
          Maximum {{ maxFiles }} files, up to {{ maxFileSize }}MB each<br />
          Supported formats: JPEG, PNG, WebP
        </p>
      </div>

      <div v-else class="upload-summary">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="success-icon">
          <polyline
            points="20,6 9,17 4,12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p>{{ files.length }} file{{ files.length !== 1 ? 's' : '' }} selected</p>
        <button type="button" @click.stop="openFileDialog" class="add-more-btn">
          Add More Photos
        </button>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="errors.length > 0" class="errors">
      <div v-for="error in errors" :key="error" class="error-message">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" />
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" />
        </svg>
        {{ error }}
      </div>
    </div>

    <!-- File Previews -->
    <div v-if="files.length > 0" class="file-previews">
      <div class="previews-header">
        <h4>Selected Photos ({{ files.length }}/{{ maxFiles }})</h4>
        <button type="button" @click="clearAll" class="clear-all-btn">Clear All</button>
      </div>

      <div class="preview-grid">
        <div v-for="(file, index) in files" :key="index" class="preview-item">
          <div class="preview-image">
            <img :src="getFilePreview(file)" :alt="file.name" />
            <button
              type="button"
              @click="removeFile(index)"
              class="remove-btn"
              :aria-label="`Remove ${file.name}`"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" />
              </svg>
            </button>
          </div>
          <div class="preview-info">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-size">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  width: 100%;
}

.upload-area {
  border: 2px dashed #d0d0d0;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
}

.upload-area:hover {
  border-color: #d17862;
  background: #f8f8f8;
}

.upload-area.drag-over {
  border-color: #d17862;
  background: rgba(209, 120, 98, 0.05);
  transform: scale(1.02);
}

.upload-area.has-files {
  padding: 2rem;
  background: rgba(209, 120, 98, 0.05);
  border-color: #d17862;
}

.upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  color: #d17862;
  margin-bottom: 0.5rem;
}

.upload-prompt h3 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.upload-prompt p {
  margin: 0;
  color: #666;
}

.upload-info {
  font-size: 0.9rem;
  color: #888;
  line-height: 1.4;
}

.upload-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.success-icon {
  color: #4caf50;
}

.add-more-btn {
  background: #d17862;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.add-more-btn:hover {
  background: #b8654a;
}

.errors {
  margin-top: 1rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d32f2f;
  background: #ffebee;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.file-previews {
  margin-top: 2rem;
}

.previews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.previews-header h4 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.clear-all-btn {
  background: none;
  border: 2px solid #d32f2f;
  color: #d32f2f;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.clear-all-btn:hover {
  background: #d32f2f;
  color: white;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.preview-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: transform 0.2s ease;
}

.preview-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(211, 47, 47, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
}

.preview-item:hover .remove-btn {
  opacity: 1;
}

.remove-btn:hover {
  background: #d32f2f;
  transform: scale(1.1);
}

.preview-info {
  padding: 0.75rem;
}

.file-name {
  margin: 0 0 0.25rem 0;
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .upload-area {
    padding: 2rem 1rem;
  }

  .preview-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .previews-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .clear-all-btn {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .upload-area {
    padding: 1.5rem 1rem;
  }

  .upload-prompt h3 {
    font-size: 1.2rem;
  }

  .preview-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }
}
</style>

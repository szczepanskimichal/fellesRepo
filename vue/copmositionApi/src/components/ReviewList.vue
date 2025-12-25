<script setup>
defineProps({
  reviews: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="review-container">
    <h3>Reviews:</h3>

    <ul v-if="reviews.length">
      <li v-for="(review, index) in reviews" :key="index">
        <span>{{ review.name }} gave this {{ review.rating }} stars</span>
        <br />
        <span>"{{ review.content }}"</span>
        <br />
        <span>
          Would recommend:
          <strong>{{ review.recommend }}</strong>
        </span>
      </li>
    </ul>

    <p v-else>No reviews yet.</p>
  </div>
</template>
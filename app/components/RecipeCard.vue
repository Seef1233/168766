<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow w-72">
    <img
      :src="recipe.image"
      :alt="recipe.title"
      class="w-full h-48 object-cover"
      @error="onImageError"
    />
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900 mb-1">{{ recipe.title }}</h3>
      <p class="text-gray-500 text-sm mb-4 leading-relaxed">{{ recipe.description }}</p>
      <NuxtLink
        :to="`/recipes/${recipe.id}`"
        class="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Bekijk recept →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const onImageError = (event) => {
  event.target.src = '/images/salad.svg'
}

defineProps({
  recipe: Object
})
</script>

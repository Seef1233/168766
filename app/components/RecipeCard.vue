<template>
  <NuxtLink
    :to="`/recipes/${recipe.id}`"
    class="group block bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover shadow-sm"
  >
    <!-- Image -->
    <div class="relative overflow-hidden h-52">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        @error="onImageError"
      />
      <!-- Category badge -->
      <span
        class="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm"
        :class="categoryClass"
      >
        {{ recipe.category }}
      </span>
      <!-- Favorite button -->
      <button
        @click.prevent="toggleFavorite"
        class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors no-print"
        :class="isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-400'"
        :title="isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
        </svg>
      </button>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
        {{ recipe.title }}
      </h3>
      <p class="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
        {{ recipe.description }}
      </p>

      <!-- Meta row -->
      <div class="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-3">
        <!-- Time -->
        <span class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke-linecap="round" stroke-width="2"/>
          </svg>
          {{ recipe.time }}
        </span>

        <!-- Difficulty dots -->
        <span class="flex items-center gap-1">
          <span
            v-for="n in 3"
            :key="n"
            class="w-2 h-2 rounded-full"
            :class="n <= difficultyLevel ? 'dot-fill' : 'dot-empty'"
          />
        </span>

        <!-- Rating -->
        <span class="flex items-center gap-1 text-amber-400 font-semibold">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="text-gray-500">{{ recipe.rating }}</span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ recipe: Object })

const onImageError = (e) => { e.target.src = '/images/salad.svg' }

const categoryClass = computed(() => {
  const map = { Ontbijt: 'badge-ontbijt', Lunch: 'badge-lunch', Diner: 'badge-diner' }
  return map[props.recipe?.category] ?? 'bg-gray-500 text-white'
})

const difficultyLevel = computed(() => {
  const map = { Makkelijk: 1, Gemiddeld: 2, Moeilijk: 3 }
  return map[props.recipe?.difficulty] ?? 1
})

const isFavorite = ref(false)

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
  isFavorite.value = saved.includes(props.recipe?.id)
})

const toggleFavorite = () => {
  const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
  const id = props.recipe?.id
  const idx = saved.indexOf(id)
  if (idx === -1) saved.push(id)
  else saved.splice(idx, 1)
  localStorage.setItem('favorites', JSON.stringify(saved))
  isFavorite.value = idx === -1
}
</script>

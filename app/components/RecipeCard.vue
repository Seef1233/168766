<template>
  <NuxtLink
    :to="`/recipes/${recipe.id}`"
    class="recipe-card group flex flex-col"
  >
    <!-- ── Image ── -->
    <div class="relative overflow-hidden h-52 shrink-0">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="w-full h-full object-cover group-hover:scale-107 transition-transform duration-700 ease-out"
        @error="onImageError"
      />

      <!-- Bottom image fade -->
      <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

      <!-- Category badge -->
      <span class="badge absolute top-3 left-3" :class="categoryClass">
        {{ recipe.category }}
      </span>

      <!-- Favorite btn -->
      <button
        @click.prevent="toggleFavorite"
        class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 no-print"
        :class="isFavorite
          ? 'bg-rose-500 text-white scale-110'
          : 'bg-white/90 text-stone-300 hover:text-rose-400 hover:scale-110'"
        :title="isFavorite ? 'Verwijder uit favorieten' : 'Bewaar recept'"
      >
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
        </svg>
      </button>
    </div>

    <!-- ── Content ── -->
    <div class="flex flex-col flex-1 px-5 pb-5 -mt-1">
      <h3 class="font-serif text-lg font-bold leading-snug mb-1.5 group-hover:text-orange-500 transition-colors duration-200">
        {{ recipe.title }}
      </h3>
      <p class="text-stone-400 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
        {{ recipe.description }}
      </p>

      <!-- Meta -->
      <div class="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">

        <!-- Time -->
        <span class="flex items-center gap-1 text-stone-400">
          <svg class="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 6v6l3.5 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </svg>
          {{ recipe.time }}
        </span>

        <!-- Difficulty -->
        <span class="flex items-center gap-0.5">
          <span
            v-for="n in 3"
            :key="n"
            class="w-2 h-2 rounded-full"
            :class="n <= difficultyLevel ? 'dot-fill' : 'dot-empty'"
          />
        </span>

        <!-- Rating -->
        <span class="flex items-center gap-1 font-semibold text-stone-500">
          <svg class="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {{ recipe.rating }}
        </span>
      </div>
    </div>

    <!-- Orange left border on hover -->
    <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-400 origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r-full"></div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({ recipe: Object })

const onImageError = (e) => { e.target.src = '/images/salad.svg' }

const categoryClass = computed(() => ({
  'badge-ontbijt': props.recipe?.category === 'Ontbijt',
  'badge-lunch':   props.recipe?.category === 'Lunch',
  'badge-diner':   props.recipe?.category === 'Diner',
}))

const difficultyLevel = computed(() => {
  return { Makkelijk: 1, Gemiddeld: 2, Moeilijk: 3 }[props.recipe?.difficulty] ?? 1
})

const isFavorite = ref(false)

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('smaakvol-favorites') || '[]')
  isFavorite.value = saved.includes(props.recipe?.id)
})

const toggleFavorite = () => {
  const saved = JSON.parse(localStorage.getItem('smaakvol-favorites') || '[]')
  const id = props.recipe?.id
  const idx = saved.indexOf(id)
  if (idx === -1) saved.push(id)
  else saved.splice(idx, 1)
  localStorage.setItem('smaakvol-favorites', JSON.stringify(saved))
  isFavorite.value = idx === -1
}
</script>

<style scoped>
/* scale-107 isn't in default Tailwind, define it here */
.group:hover .group-hover\:scale-107 { transform: scale(1.07); }
</style>

<script setup>
import { useRoute } from 'vue-router'
import allRecipes from '../../data/recipes.json'

const route = useRoute()

const categories = ['Alle', 'Ontbijt', 'Lunch', 'Diner']
const sortOptions = [
  { value: 'default',    label: 'Standaard' },
  { value: 'rating',     label: 'Beste beoordeling' },
  { value: 'time',       label: 'Kortste tijd' },
  { value: 'difficulty', label: 'Makkelijkste eerst' },
]

const searchQuery = ref(route.query.search || '')
const sortBy = ref('default')

const activeCategory = computed(() => route.query.category || 'Alle')

const filteredRecipes = computed(() => {
  let result = [...allRecipes]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    )
  }

  if (activeCategory.value !== 'Alle') {
    result = result.filter(r => r.category === activeCategory.value)
  }

  if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'time') {
    result.sort((a, b) => parseInt(a.time) - parseInt(b.time))
  } else if (sortBy.value === 'difficulty') {
    const order = { Makkelijk: 1, Gemiddeld: 2, Moeilijk: 3 }
    result.sort((a, b) => (order[a.difficulty] ?? 2) - (order[b.difficulty] ?? 2))
  }

  return result
})

const pageTitle = computed(() => {
  if (activeCategory.value !== 'Alle') return activeCategory.value
  if (searchQuery.value.trim()) return `Resultaten voor "${searchQuery.value}"`
  return 'Alle recepten'
})

watch(() => route.query.search, (v) => {
  searchQuery.value = v || ''
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Header band -->
    <div class="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-10 px-6">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-3xl font-extrabold mb-1 text-shadow">{{ pageTitle }}</h1>
        <p class="text-orange-100 text-sm">{{ filteredRecipes.length }} recepten gevonden</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-8">

      <!-- Search + Sort row -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Zoek een recept..."
            class="search-input pl-11"
          />
        </div>
        <select v-model="sortBy" class="sort-select shrink-0">
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Category tabs -->
      <div class="flex gap-2 flex-wrap mb-8">
        <NuxtLink
          v-for="cat in categories"
          :key="cat"
          :to="cat === 'Alle' ? '/recipes' : `/recipes?category=${cat}`"
          class="px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 border"
          :class="activeCategory === cat
            ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
            : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500'"
        >
          {{ cat }}
        </NuxtLink>
      </div>

      <!-- Recipe grid -->
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        move-class="transition-all duration-300"
      >
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </TransitionGroup>

      <!-- Empty state -->
      <div v-if="!filteredRecipes.length" class="text-center py-20 animate-fade-in">
        <p class="text-6xl mb-4">🍽️</p>
        <p class="text-xl font-bold text-gray-700 mb-2">Geen recepten gevonden</p>
        <p class="text-gray-400 mb-6">Probeer een andere zoekterm of categorie.</p>
        <NuxtLink
          to="/recipes"
          class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
        >
          Bekijk alle recepten
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

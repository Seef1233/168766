<script setup>
import { useRoute } from 'vue-router'
import allRecipes from '../../data/recipes.json'

const route = useRoute()

const categories = ['Alle', 'Ontbijt', 'Lunch', 'Diner']
const sortOptions = [
  { value: 'default',    label: 'Standaard' },
  { value: 'rating',     label: '★ Beste beoordeling' },
  { value: 'time',       label: '⏱ Kortste tijd' },
  { value: 'difficulty', label: '✓ Makkelijkste eerst' },
]

const searchQuery = ref(route.query.search || '')
const sortBy = ref(route.query.sort || 'default')

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

const categoryHeroBg = computed(() => ({
  Ontbijt: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80',
  Lunch:   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
  Diner:   'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=1200&q=80',
}[activeCategory.value] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80'))

watch(() => route.query.search, v => { searchQuery.value = v || '' })
watch(() => route.query.sort,   v => { sortBy.value = v || 'default' })
</script>

<template>
  <div class="min-h-screen" style="background: var(--bg);">

    <!-- ── Header band ── -->
    <div class="relative h-52 overflow-hidden">
      <img :src="categoryHeroBg" alt="" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
      <div class="relative z-10 h-full flex flex-col justify-end max-w-5xl mx-auto px-6 pb-8">
        <p class="text-orange-300 text-xs font-bold uppercase tracking-widest mb-1">Smaakvol</p>
        <h1 class="font-serif text-4xl font-black text-white text-shadow">{{ pageTitle }}</h1>
        <p class="text-white/60 text-sm mt-1">{{ filteredRecipes.length }} recepten gevonden</p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-8">

      <!-- Search + Sort -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <div class="relative flex-1">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Zoek een recept, ingrediënt…"
            class="search-input pl-11"
          />
        </div>
        <select v-model="sortBy" class="sort-select shrink-0">
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
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
            : 'bg-white text-stone-500 border-stone-200 hover:border-orange-300 hover:text-orange-500'"
        >
          {{ cat }}
        </NuxtLink>
      </div>

      <!-- Recipe grid -->
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in absolute"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-all duration-300"
      >
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </TransitionGroup>

      <!-- Empty state -->
      <div v-if="!filteredRecipes.length" class="text-center py-24 animate-fade-in">
        <div class="text-6xl mb-5">🍽️</div>
        <h3 class="font-serif text-2xl font-bold text-stone-700 mb-2">Geen recepten gevonden</h3>
        <p class="text-stone-400 mb-8">Probeer een andere zoekterm of categorie.</p>
        <NuxtLink to="/recipes" class="btn-primary">
          Bekijk alle recepten
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

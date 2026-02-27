<script setup>
import { useRoute } from 'vue-router'
import allRecipes from '../../data/recipes.json'

const route = useRoute()

const categories = ['Alle', 'Ontbijt', 'Lunch', 'Diner']

const activeCategory = computed(() => route.query.category || 'Alle')

const filteredRecipes = computed(() => {
  if (activeCategory.value === 'Alle') return allRecipes
  return allRecipes.filter(r => r.category === activeCategory.value)
})

const pageTitle = computed(() => {
  if (activeCategory.value === 'Alle') return 'Alle recepten'
  return activeCategory.value
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-5xl mx-auto px-6 py-10">

      <!-- Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ pageTitle }}</h1>

      <!-- Category tabs -->
      <div class="flex gap-2 flex-wrap mb-8">
        <NuxtLink
          v-for="cat in categories"
          :key="cat"
          :to="cat === 'Alle' ? '/recipes' : `/recipes?category=${cat}`"
          class="px-5 py-2 rounded-full text-sm font-semibold transition-colors border"
          :class="activeCategory === cat
            ? 'bg-orange-500 text-white border-orange-500'
            : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500'"
        >
          {{ cat }}
        </NuxtLink>
      </div>

      <!-- Recipe grid -->
      <div v-if="filteredRecipes.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20 text-gray-400">
        <p class="text-5xl mb-4">🍽️</p>
        <p class="text-lg">Geen recepten gevonden in deze categorie.</p>
      </div>

    </div>
  </div>
</template>

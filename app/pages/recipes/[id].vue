<script setup>
import { useRoute } from 'vue-router'
import recipes from '../../data/recipes.json'

const route = useRoute()
const recipeId = Number(route.params.id)
const recipe = recipes.find(r => r.id === recipeId)
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <div class="w-full bg-white shadow-sm">
      <div class="max-w-3xl mx-auto px-4 py-8">
        <NuxtLink to="/recipes" class="recipe-back-link inline-flex items-center gap-2 mb-6 transition-colors">
          ← Terug naar recepten
        </NuxtLink>

        <img
          v-if="recipe"
          :src="recipe.image"
          :alt="recipe.title"
          class="w-full max-h-72 object-cover rounded-2xl shadow-md"
        />
      </div>
    </div>

    <main v-if="recipe" class="max-w-3xl mx-auto px-4 py-10 space-y-10">

      <div>
        <h1 class="text-4xl font-bold text-gray-900 mb-3">{{ recipe.title }}</h1>
        <p class="text-gray-500 italic text-base">{{ recipe.description }}</p>
      </div>

      <p v-if="recipe.intro" class="text-gray-700 leading-relaxed text-lg">
        {{ recipe.intro }}
      </p>

      <section v-if="recipe.ingredients">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🛒 Ingrediënten
        </h2>
        <ul class="bg-white rounded-2xl shadow-sm divide-y divide-gray-100 overflow-hidden">
          <li
            v-for="item in recipe.ingredients"
            :key="item.name"
            class="flex gap-3 px-5 py-4"
          >
            <span class="ingredient-bullet w-2 h-2 mt-2.5 rounded-full shrink-0"></span>
            <div>
              <span class="font-semibold text-gray-800">{{ item.name }}</span>
              <span class="text-gray-500"> – {{ item.description }}</span>
            </div>
          </li>
        </ul>
      </section>

      <section v-if="recipe.steps">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          👨‍🍳 Bereidingswijze
        </h2>
        <ol class="space-y-4">
          <li
            v-for="(step, index) in recipe.steps"
            :key="index"
            class="flex gap-4 bg-white rounded-2xl shadow-sm px-5 py-4"
          >
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
              {{ index + 1 }}
            </span>
            <p class="text-gray-700 leading-relaxed pt-1">{{ step }}</p>
          </li>
        </ol>
      </section>

      <section v-if="recipe.variations">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          💡 Variatietips
        </h2>
        <div class="recipe-tip-box">
          <p class="text-gray-700 leading-relaxed">{{ recipe.variations }}</p>
        </div>
      </section>

    </main>

    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p class="text-5xl mb-4">🍽️</p>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Recept niet gevonden</h2>
      <NuxtLink to="/recipes" class="mt-4 text-orange-500 hover:underline">← Terug naar recepten</NuxtLink>
    </div>

  </div>
</template>

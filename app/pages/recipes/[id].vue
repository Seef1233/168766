<script setup>
import { useRoute } from 'vue-router'
import allRecipes from '../../data/recipes.json'

const route = useRoute()

const recipe = allRecipes.find(r => r.id.toString() === route.params.id)

if (!recipe) {
  await navigateTo('/recipes')
}
</script>

<template>
  <div v-if="recipe" class="min-h-screen bg-stone-50 pb-20">

    <!-- ── Hero ── -->
    <div class="relative h-[450px] overflow-hidden group">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div class="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-12 animate-fade-in">
        <NuxtLink
          to="/recipes"
          class="text-orange-400 hover:text-orange-300 transition-colors mb-6 flex items-center gap-2 w-fit group/back"
        >
          <svg class="w-5 h-5 transition-transform group-hover/back:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Terug naar het overzicht
        </NuxtLink>

        <div class="flex items-center gap-4 mb-4">
          <span class="bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            {{ recipe.category }}
          </span>
          <span class="text-white/90 text-sm flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-lg">
            <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ recipe.time }}
          </span>
          <span v-if="recipe.difficulty" class="text-white/90 text-sm backdrop-blur-sm bg-white/10 px-3 py-1 rounded-lg">
            {{ recipe.difficulty }}
          </span>
        </div>

        <h1 class="text-4xl md:text-6xl font-serif font-black text-white drop-shadow-2xl">
          {{ recipe.title }}
        </h1>
      </div>
    </div>

    <!-- ── Content ── -->
    <div class="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- ── Ingrediënten (sidebar) ── -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-[2rem] shadow-2xl p-8 sticky top-8 animate-slide-right">
            <h2 class="text-2xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-3">
              <span class="bg-orange-100 p-2 rounded-xl text-2xl">🌿</span> Ingrediënten
            </h2>
            <ul class="space-y-4">
              <li
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
                class="text-stone-600 group"
              >
                <div class="flex items-start gap-3">
                  <span class="mt-2 w-2 h-2 rounded-full bg-orange-400 shrink-0 transition-transform group-hover:scale-150"></span>
                  <div>
                    <span class="font-semibold text-stone-800">{{ ingredient.name }}</span>
                    <p v-if="ingredient.description" class="text-sm text-stone-400 mt-0.5 leading-snug">
                      {{ ingredient.description }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- ── Bereiding + Intro + Variations ── -->
        <div class="lg:col-span-2 space-y-8">

          <!-- Intro -->
          <div v-if="recipe.intro" class="bg-white rounded-[2rem] shadow-2xl p-8 animate-fade-in-up">
            <p class="text-stone-600 leading-relaxed text-lg">{{ recipe.intro }}</p>
          </div>

          <!-- Bereidingswijze -->
          <div class="bg-white rounded-[2rem] shadow-2xl p-8 animate-slide-left">
            <h2 class="text-2xl font-serif font-bold text-stone-800 mb-10 flex items-center gap-3">
              <span class="bg-orange-100 p-2 rounded-xl text-2xl">👨‍🍳</span> Bereidingswijze
            </h2>
            <div class="space-y-10">
              <div
                v-for="(step, index) in recipe.steps"
                :key="index"
                class="relative pl-16 border-l-2 border-orange-100 ml-4"
              >
                <div class="absolute -left-5 top-0 w-10 h-10 bg-orange-500 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-200">
                  {{ index + 1 }}
                </div>
                <p class="text-stone-600 leading-relaxed text-base">{{ step }}</p>
              </div>
            </div>
          </div>

          <!-- Variatietips -->
          <div v-if="recipe.variations" class="bg-amber-50 border border-amber-200 rounded-[2rem] p-8 animate-fade-in-up">
            <h2 class="text-2xl font-serif font-bold text-stone-800 mb-4 flex items-center gap-3">
              <span class="bg-orange-100 p-2 rounded-xl text-2xl">💡</span> Variatietips
            </h2>
            <p class="text-stone-600 leading-relaxed">{{ recipe.variations }}</p>
          </div>

          <!-- Video -->
          <div v-if="recipe.videoUrl" class="bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up">
            <div class="p-8 pb-4">
              <h2 class="text-2xl font-serif font-bold text-stone-800 flex items-center gap-3">
                <span class="bg-orange-100 p-2 rounded-xl text-2xl">🎬</span> Recept Video
              </h2>
            </div>
            <div class="aspect-video w-full p-4">
              <iframe
                :src="recipe.videoUrl.replace('watch?v=', 'embed/')"
                class="w-full h-full rounded-2xl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(50px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to   { opacity: 1; transform: translateX(0); }
}

.animate-fade-in       { animation: fadeIn 1s ease-out forwards; }
.animate-slide-right   { animation: slideRight 1s ease-out forwards; }
.animate-slide-left    { animation: slideLeft 1s ease-out forwards; }
.animate-fade-in-up    { animation: fadeIn 1s ease-out 0.3s both; }

h1, h2, h3 { line-height: 1.4; }
</style>

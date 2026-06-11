<script setup>
import recipes from '../data/recipes.json'

const searchQuery = ref('')

const categories = [
  { name: 'Ontbijt', icon: '🍳', description: 'Start de dag goed', color: 'from-amber-400 to-orange-400', to: '/recipes?category=Ontbijt' },
  { name: 'Lunch',   icon: '🥗', description: 'Licht en lekker',   color: 'from-emerald-400 to-teal-400',  to: '/recipes?category=Lunch' },
  { name: 'Diner',   icon: '🍝', description: 'Heerlijk avondeten', color: 'from-violet-400 to-indigo-500', to: '/recipes?category=Diner' },
]

const stats = [
  { value: recipes.length, label: 'Recepten', icon: '📖' },
  { value: 3,              label: 'Categorieën', icon: '🗂️' },
  { value: '30 min',       label: 'Gemiddelde tijd', icon: '⏱️' },
]

const featured = recipes.find(r => r.id === 10)
const latestRecipes = [...recipes].slice(-6).reverse()

const goSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/recipes?search=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}
</script>

<template>
  <div>

    <!-- ── Hero ── -->
    <section class="relative h-[520px] flex items-end justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80"
        alt="Food background"
        class="absolute inset-0 w-full h-full object-cover scale-105"
        style="animation: subtleZoom 12s ease-in-out infinite alternate;"
      />
      <div class="absolute inset-0 hero-overlay"></div>

      <div class="relative z-10 w-full max-w-2xl mx-auto px-6 pb-16 text-center animate-fade-in-up">
        <p class="text-orange-300 font-semibold text-sm uppercase tracking-widest mb-3">Welkom bij Smaakvol</p>
        <h1 class="text-5xl font-extrabold text-white leading-tight mb-4 text-shadow">
          Ontdek heerlijke<br><span class="gradient-text">recepten</span>
        </h1>
        <p class="text-white/80 text-lg mb-8">
          Makkelijk te maken gerechten voor elk moment van de dag.
        </p>

        <!-- Search bar -->
        <div class="flex gap-2 max-w-lg mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Zoek een recept..."
            class="search-input shadow-lg flex-1"
            @keyup.enter="goSearch"
          />
          <button
            @click="goSearch"
            class="bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-colors shrink-0"
          >
            Zoeken
          </button>
        </div>
      </div>
    </section>

    <!-- ── Stats bar ── -->
    <section class="bg-gradient-to-r from-orange-500 to-orange-400">
      <div class="max-w-4xl mx-auto px-6 py-7 grid grid-cols-3 divide-x divide-orange-300/50">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat-item text-white px-4 animate-fade-in-up"
          :class="`delay-${(i + 1) * 100}`"
        >
          <span class="text-2xl mb-1">{{ stat.icon }}</span>
          <p class="text-3xl font-extrabold">{{ stat.value }}</p>
          <p class="text-orange-100 text-sm">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- ── Categories ── -->
    <section class="max-w-5xl mx-auto px-6 py-14">
      <div class="flex items-center justify-between mb-7">
        <h2 class="text-2xl font-extrabold text-gray-900">Categorieën</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <NuxtLink
          v-for="(cat, i) in categories"
          :key="cat.name"
          :to="cat.to"
          class="relative overflow-hidden rounded-2xl shadow-sm card-hover animate-fade-in-up"
          :class="`delay-${(i + 1) * 100}`"
        >
          <div class="absolute inset-0 bg-gradient-to-br opacity-90" :class="cat.color"></div>
          <div class="relative z-10 flex items-center gap-4 px-6 py-6">
            <span class="text-5xl drop-shadow-sm">{{ cat.icon }}</span>
            <div>
              <p class="font-extrabold text-white text-lg">{{ cat.name }}</p>
              <p class="text-white/80 text-sm">{{ cat.description }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── Recept van de dag ── -->
    <section v-if="featured" class="max-w-5xl mx-auto px-6 pb-10">
      <h2 class="text-2xl font-extrabold text-gray-900 mb-6">Recept van de dag</h2>
      <div class="relative rounded-3xl overflow-hidden shadow-xl h-80 flex items-end card-hover">
        <img
          :src="featured.image"
          :alt="featured.title"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 hero-overlay"></div>
        <div class="relative z-10 p-8 flex items-end justify-between w-full">
          <div>
            <span class="text-xs font-bold text-orange-300 uppercase tracking-wider">{{ featured.category }}</span>
            <h3 class="text-3xl font-extrabold text-white mt-1 mb-1.5 text-shadow">{{ featured.title }}</h3>
            <p class="text-white/75 text-sm max-w-lg line-clamp-2">{{ featured.description }}</p>
          </div>
          <NuxtLink
            :to="`/recipes/${featured.id}`"
            class="shrink-0 ml-6 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-lg"
          >
            Bekijk →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── Nieuwste recepten ── -->
    <section class="max-w-5xl mx-auto px-6 pb-16">
      <div class="flex items-center justify-between mb-7">
        <h2 class="text-2xl font-extrabold text-gray-900">Nieuwste recepten</h2>
        <NuxtLink to="/recipes" class="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
          Alle recepten →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <RecipeCard
          v-for="(recipe, i) in latestRecipes"
          :key="recipe.id"
          :recipe="recipe"
          class="animate-fade-in-up"
          :style="`animation-delay: ${i * 0.07}s`"
        />
      </div>
    </section>

  </div>
</template>

<style scoped>
@keyframes subtleZoom {
  from { transform: scale(1.05); }
  to   { transform: scale(1.12); }
}
</style>

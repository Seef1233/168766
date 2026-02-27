<script setup>
import recipes from '../data/recipes.json'

const categories = [
  { name: 'Ontbijt', icon: '🍳', description: 'Start de dag goed' },
  { name: 'Lunch',   icon: '🥗', description: 'Licht en lekker' },
  { name: 'Diner',   icon: '🍝', description: 'Heerlijk avondeten' },
]

const stats = [
  { value: recipes.length, label: 'Recepten' },
  { value: 3, label: 'Categorieën' },
  { value: '30 min', label: 'Gemiddelde tijd' },
]

const featured = recipes.find(r => r.id === 10)
</script>

<template>
  <div>

    <!-- Hero Section -->
    <section class="relative h-[480px] flex items-center justify-center text-center text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80"
        alt="Food background"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 px-6 max-w-2xl mx-auto">
        <h1 class="text-5xl font-bold mb-4 leading-tight text-white">
          Ontdek heerlijke recepten
        </h1>
        <p class="text-lg text-white/85 mb-8">
          Makkelijk te maken gerechten voor elk moment van de dag.
        </p>
        <NuxtLink
          to="/recipes"
          class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg shadow-lg"
        >
          Bekijk recepten →
        </NuxtLink>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-orange-500">
      <div class="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 divide-x divide-orange-400">
        <div v-for="stat in stats" :key="stat.label" class="text-center text-white px-4">
          <p class="text-3xl font-bold">{{ stat.value }}</p>
          <p class="text-orange-100 text-sm mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-5xl mx-auto px-6 py-14">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Categorieën</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.name"
          :to="`/recipes?category=${cat.name}`"
          class="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 hover:shadow-md transition-shadow"
        >
          <span class="text-4xl">{{ cat.icon }}</span>
          <div>
            <p class="font-bold text-gray-900 text-lg">{{ cat.name }}</p>
            <p class="text-gray-500 text-sm">{{ cat.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Recipe -->
    <section v-if="featured" class="max-w-5xl mx-auto px-6 pb-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Recept van de dag</h2>
      <div class="relative rounded-3xl overflow-hidden shadow-lg h-72 flex items-end">
        <img
          :src="featured.image"
          :alt="featured.title"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="relative z-10 p-8 flex items-end justify-between w-full">
          <div>
            <span class="text-xs font-semibold text-orange-300 uppercase tracking-wider">{{ featured.category }}</span>
            <h3 class="text-3xl font-bold text-white mt-1 mb-2">{{ featured.title }}</h3>
            <p class="text-white/80 text-sm max-w-lg">{{ featured.description }}</p>
          </div>
          <NuxtLink
            :to="`/recipes/${featured.id}`"
            class="shrink-0 ml-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
          >
            Bekijk recept →
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

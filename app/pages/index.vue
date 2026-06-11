<script setup>
import recipes from '../data/recipes.json'

const searchQuery = ref('')

const categoryCards = [
  {
    name:  'Ontbijt',
    desc:  'Start de dag goed',
    img:   'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=80',
    color: 'from-amber-600/80 to-orange-500/70',
    to:    '/recipes?category=Ontbijt',
    icon:  '🍳',
  },
  {
    name:  'Lunch',
    desc:  'Licht en voedzaam',
    img:   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80',
    color: 'from-emerald-700/80 to-teal-500/70',
    to:    '/recipes?category=Lunch',
    icon:  '🥗',
  },
  {
    name:  'Diner',
    desc:  'Heerlijk avondeten',
    img:   'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=700&q=80',
    color: 'from-violet-700/80 to-indigo-500/70',
    to:    '/recipes?category=Diner',
    icon:  '🍝',
  },
]

const stats = [
  { value: recipes.length, label: 'Recepten',       icon: '📖' },
  { value: 3,              label: 'Categorieën',     icon: '🗂️'  },
  { value: '< 30 min',    label: 'Meeste recepten', icon: '⚡'  },
]

const featured  = recipes.find(r => r.id === 10)
const topRated  = [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 3)
const latestSix = [...recipes].slice(-6).reverse()

const goSearch = () => {
  if (searchQuery.value.trim())
    navigateTo(`/recipes?search=${encodeURIComponent(searchQuery.value.trim())}`)
}
</script>

<template>
  <div>

    <!-- ══ HERO (full-bleed, overlaps nav with -mt) ══ -->
    <section class="relative -mt-[66px] h-[92vh] min-h-[600px] flex items-end overflow-hidden">

      <!-- Background image (slow zoom) -->
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=85"
        alt="Hero food"
        class="absolute inset-0 w-full h-full object-cover"
        style="animation: hero-zoom 14s ease-in-out infinite alternate;"
      />
      <div class="absolute inset-0 hero-overlay"></div>

      <!-- Content -->
      <div class="relative z-10 w-full max-w-3xl mx-auto px-6 pb-20 text-center">

        <p class="text-orange-300 text-sm font-semibold uppercase tracking-[0.2em] mb-4 animate-fade-in-up">
          Welkom bij Smaakvol
        </p>

        <h1 class="font-serif font-black text-white text-shadow leading-[1.1] mb-6 animate-fade-in-up delay-100"
            style="font-size: clamp(2.6rem, 7vw, 4.5rem);">
          Ontdek de lekkerste<br>
          <span class="gradient-text">recepten voor jou</span>
        </h1>

        <p class="text-white/75 text-lg mb-9 animate-fade-in-up delay-200 max-w-xl mx-auto">
          Makkelijk te maken gerechten voor elk moment van de dag — van ontbijt tot diner.
        </p>

        <!-- Search bar -->
        <div class="flex gap-2 max-w-xl mx-auto animate-fade-in-up delay-300">
          <div class="relative flex-1">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Zoek een recept…"
              class="search-input pl-11 shadow-2xl"
              @keyup.enter="goSearch"
            />
          </div>
          <button @click="goSearch" class="btn-primary shrink-0">Zoek</button>
        </div>

        <!-- Quick category pills -->
        <div class="flex gap-2 justify-center mt-5 animate-fade-in-up delay-400">
          <NuxtLink
            v-for="c in categoryCards"
            :key="c.name"
            :to="c.to"
            class="glass text-stone-700 hover:bg-white text-sm font-semibold px-4 py-1.5 rounded-full transition-all hover:scale-105 border border-white/40"
          >
            {{ c.icon }} {{ c.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 animate-bounce-y no-print">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </section>

    <!-- ══ STATS ══ -->
    <section class="bg-gradient-to-r from-orange-500 to-amber-400">
      <div class="max-w-4xl mx-auto px-6 py-8 grid grid-cols-3 divide-x divide-orange-300/40">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="text-center text-white px-4 animate-fade-in-up"
          :class="`delay-${(i+1)*100}`"
        >
          <div class="text-2xl mb-1">{{ stat.icon }}</div>
          <p class="text-3xl font-black font-serif">{{ stat.value }}</p>
          <p class="text-orange-100 text-xs mt-0.5 font-medium">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- ══ CATEGORIES ══ -->
    <section class="max-w-5xl mx-auto px-6 py-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <p class="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Bladeren</p>
          <h2 class="font-serif text-3xl font-bold text-stone-900">Categorieën</h2>
        </div>
        <NuxtLink to="/recipes" class="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
          Alle recepten →
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <NuxtLink
          v-for="(cat, i) in categoryCards"
          :key="cat.name"
          :to="cat.to"
          class="group relative overflow-hidden rounded-2xl h-36 shadow-card animate-fade-in-up"
          :class="`delay-${(i+1)*100}`"
        >
          <img :src="cat.img" :alt="cat.name" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-80" :class="cat.color"></div>
          <div class="relative z-10 flex items-center gap-4 h-full px-7">
            <span class="text-4xl drop-shadow-md">{{ cat.icon }}</span>
            <div>
              <p class="text-white font-serif font-bold text-xl leading-tight">{{ cat.name }}</p>
              <p class="text-white/75 text-sm">{{ cat.desc }}</p>
            </div>
          </div>
          <div class="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ══ RECEPT VAN DE DAG ══ -->
    <section v-if="featured" class="bg-stone-50 py-16">
      <div class="max-w-5xl mx-auto px-6">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Uitgelicht</p>
            <h2 class="font-serif text-3xl font-bold text-stone-900">Recept van de dag</h2>
          </div>
        </div>

        <NuxtLink
          :to="`/recipes/${featured.id}`"
          class="group relative block rounded-3xl overflow-hidden shadow-xl h-80 animate-fade-in-up"
        >
          <img :src="featured.image" :alt="featured.title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" />
          <div class="absolute inset-0 hero-overlay"></div>
          <div class="relative z-10 h-full flex flex-col justify-end p-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span class="badge mb-2 inline-block" :class="featured.category === 'Diner' ? 'badge-diner' : 'badge-ontbijt'">
                {{ featured.category }}
              </span>
              <h3 class="font-serif text-3xl font-bold text-white text-shadow mb-2">{{ featured.title }}</h3>
              <p class="text-white/70 text-sm max-w-md line-clamp-2">{{ featured.description }}</p>
              <div class="flex items-center gap-4 mt-3 text-white/60 text-xs">
                <span>⏱ {{ featured.time }}</span>
                <span>👥 {{ featured.servings }} personen</span>
                <span>★ {{ featured.rating }}</span>
              </div>
            </div>
            <div class="mt-5 sm:mt-0 sm:ml-8 shrink-0">
              <span class="btn-primary inline-flex items-center gap-2">
                Bekijk recept
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ══ BEST BEOORDEELD ══ -->
    <section class="max-w-5xl mx-auto px-6 py-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <p class="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Populair</p>
          <h2 class="font-serif text-3xl font-bold text-stone-900">Best beoordeeld</h2>
        </div>
        <NuxtLink to="/recipes?sort=rating" class="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
          Bekijk meer →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <RecipeCard
          v-for="(recipe, i) in topRated"
          :key="recipe.id"
          :recipe="recipe"
          class="animate-fade-in-up"
          :style="`animation-delay:${i * 0.08}s`"
        />
      </div>
    </section>

    <!-- ══ NIEUWSTE ══ -->
    <section class="bg-stone-50 py-16">
      <div class="max-w-5xl mx-auto px-6">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Vers toegevoegd</p>
            <h2 class="font-serif text-3xl font-bold text-stone-900">Nieuwste recepten</h2>
          </div>
          <NuxtLink to="/recipes" class="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
            Alle recepten →
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <RecipeCard
            v-for="(recipe, i) in latestSix"
            :key="recipe.id"
            :recipe="recipe"
            class="animate-fade-in-up"
            :style="`animation-delay:${i * 0.07}s`"
          />
        </div>
      </div>
    </section>

    <!-- ══ CTA BANNER ══ -->
    <section class="py-20 px-6 text-center">
      <div class="max-w-2xl mx-auto animate-fade-in-up">
        <p class="text-4xl mb-4">🍳</p>
        <h2 class="font-serif text-3xl font-bold text-stone-900 mb-3">Klaar om te koken?</h2>
        <p class="text-stone-400 mb-8">Bekijk al onze {{ recipes.length }} recepten en ontdek wat jij vanavond maakt.</p>
        <NuxtLink to="/recipes" class="btn-primary text-base px-8 py-4">
          Bekijk alle recepten →
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<style scoped>
@keyframes hero-zoom {
  from { transform: scale(1.0); }
  to   { transform: scale(1.08); }
}
/* Tailwind doesn't have scale-103 by default */
.group:hover .group-hover\:scale-103 { transform: scale(1.03); }
</style>

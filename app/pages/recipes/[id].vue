<script setup>
import { useRoute } from 'vue-router'
import recipes from '../../data/recipes.json'

const route = useRoute()
const recipeId = Number(route.params.id)
const recipe = recipes.find(r => r.id === recipeId)

/* ── Servings ── */
const servings = ref(recipe?.servings ?? 2)
const adjustServings = (d) => { if (servings.value + d >= 1) servings.value += d }
const servingsRatio = computed(() =>
  recipe?.servings ? (servings.value / recipe.servings).toFixed(1) : '1.0'
)

/* ── Ingredient checklist ── */
const checkedIngredients = ref([])
const toggleIngredient = (i) => {
  const idx = checkedIngredients.value.indexOf(i)
  idx === -1 ? checkedIngredients.value.push(i) : checkedIngredients.value.splice(idx, 1)
}
const isIngredientChecked = (i) => checkedIngredients.value.includes(i)
const checkedCount = computed(() => checkedIngredients.value.length)
const ingredientProgress = computed(() =>
  recipe?.ingredients?.length
    ? (checkedCount.value / recipe.ingredients.length) * 100
    : 0
)

/* ── Steps ── */
const completedSteps = ref([])
const toggleStep = (i) => {
  const idx = completedSteps.value.indexOf(i)
  idx === -1 ? completedSteps.value.push(i) : completedSteps.value.splice(idx, 1)
}
const isStepCompleted = (i) => completedSteps.value.includes(i)
const stepsProgress = computed(() =>
  recipe?.steps?.length
    ? Math.round((completedSteps.value.length / recipe.steps.length) * 100)
    : 0
)
const allDone = computed(() => stepsProgress.value === 100 && recipe?.steps?.length > 0)

/* ── Rating ── */
const rating = ref(0)
const hoverRating = ref(0)
const displayRating = computed(() => hoverRating.value || rating.value)
onMounted(() => {
  const saved = localStorage.getItem(`smaakvol-rating-${recipeId}`)
  if (saved) rating.value = parseInt(saved)
})
const setRating = (s) => {
  rating.value = s
  localStorage.setItem(`smaakvol-rating-${recipeId}`, String(s))
}

/* ── Favorite ── */
const isFavorite = ref(false)
onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('smaakvol-favorites') || '[]')
  isFavorite.value = saved.includes(recipeId)
})
const toggleFavorite = () => {
  const saved = JSON.parse(localStorage.getItem('smaakvol-favorites') || '[]')
  const idx = saved.indexOf(recipeId)
  idx === -1 ? saved.push(recipeId) : saved.splice(idx, 1)
  localStorage.setItem('smaakvol-favorites', JSON.stringify(saved))
  isFavorite.value = idx === -1
}

/* ── Helpers ── */
const printRecipe = () => window.print()

const categoryClass = computed(() =>
  ({ Ontbijt: 'badge-ontbijt', Lunch: 'badge-lunch', Diner: 'badge-diner' }[recipe?.category] ?? 'bg-gray-500 text-white')
)

const difficultyLevel = computed(() =>
  ({ Makkelijk: 1, Gemiddeld: 2, Moeilijk: 3 }[recipe?.difficulty] ?? 1)
)
</script>

<template>
  <div class="min-h-screen" style="background: var(--bg);">

    <!-- ── Hero ── -->
    <div v-if="recipe" class="relative h-[55vh] min-h-64 overflow-hidden">
      <img :src="recipe.image" :alt="recipe.title" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 hero-overlay"></div>

      <!-- Back -->
      <NuxtLink to="/recipes" class="no-print absolute top-5 left-5 glass-dark text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 hover:bg-black/55 transition-colors recipe-back-link">
        ← Recepten
      </NuxtLink>

      <!-- Actions -->
      <div class="no-print absolute top-5 right-5 flex gap-2">
        <button
          @click="toggleFavorite"
          class="glass-dark text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 hover:bg-black/55 transition-all"
          :class="isFavorite ? 'text-rose-300' : ''"
        >
          {{ isFavorite ? '♥ Bewaard' : '♡ Bewaar' }}
        </button>
        <button
          @click="printRecipe"
          class="glass-dark text-white/85 hover:text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
          </svg>
          Print
        </button>
      </div>

      <!-- Title -->
      <div class="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-8">
        <span class="badge inline-block mb-2" :class="categoryClass">{{ recipe.category }}</span>
        <h1 class="font-serif text-4xl sm:text-5xl font-black text-white text-shadow max-w-2xl leading-tight">
          {{ recipe.title }}
        </h1>
      </div>
    </div>

    <!-- ── 2-column layout ── -->
    <div v-if="recipe" class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div class="flex flex-col lg:flex-row gap-8 items-start">

        <!-- ════ LEFT SIDEBAR (sticky) ════ -->
        <aside class="recipe-sidebar w-full lg:w-80 shrink-0 lg:sticky lg:top-[72px] space-y-5 no-print">

          <!-- Quick info card -->
          <div class="bg-white rounded-2xl p-6 border border-stone-100 shadow-card">
            <h3 class="font-serif font-bold text-stone-800 text-lg mb-5">Snel overzicht</h3>

            <div class="space-y-4 text-sm">

              <!-- Time -->
              <div class="flex items-center justify-between">
                <span class="text-stone-400 flex items-center gap-2">
                  <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <path d="M12 6v6l3.5 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                  Bereidingstijd
                </span>
                <span class="font-semibold text-stone-700">{{ recipe.time }}</span>
              </div>

              <!-- Difficulty -->
              <div class="flex items-center justify-between">
                <span class="text-stone-400">Moeilijkheidsgraad</span>
                <div class="flex items-center gap-2">
                  <div class="flex gap-1">
                    <span v-for="n in 3" :key="n" class="w-2.5 h-2.5 rounded-full" :class="n <= difficultyLevel ? 'dot-fill' : 'dot-empty'" />
                  </div>
                  <span class="font-semibold text-stone-700 text-xs">{{ recipe.difficulty }}</span>
                </div>
              </div>

              <!-- Rating -->
              <div class="flex items-center justify-between">
                <span class="text-stone-400">Gemiddeld</span>
                <span class="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  ★ {{ recipe.rating }}
                </span>
              </div>

              <!-- Divider -->
              <div class="border-t border-stone-100 pt-4">

                <!-- Servings adjuster -->
                <div class="flex items-center justify-between mb-1">
                  <span class="text-stone-400">Porties</span>
                  <div class="flex items-center gap-2">
                    <button class="servings-btn" @click="adjustServings(-1)" :disabled="servings <= 1">−</button>
                    <span class="font-bold text-stone-800 w-6 text-center text-base">{{ servings }}</span>
                    <button class="servings-btn" @click="adjustServings(1)">+</button>
                  </div>
                </div>
                <p v-if="servingsRatio !== '1.0'" class="text-xs text-orange-500 font-medium text-right">
                  Schaalfactor × {{ servingsRatio }}
                </p>

              </div>

              <!-- Star rating -->
              <div class="border-t border-stone-100 pt-4">
                <p class="text-stone-400 text-xs mb-2">Jouw beoordeling</p>
                <div class="flex gap-0.5">
                  <button
                    v-for="s in 5"
                    :key="s"
                    class="star-btn"
                    :class="s <= displayRating ? 'text-amber-400' : 'text-stone-200'"
                    @mouseenter="hoverRating = s"
                    @mouseleave="hoverRating = 0"
                    @click="setRating(s)"
                  >★</button>
                </div>
                <p v-if="rating > 0" class="text-xs text-stone-400 mt-1">
                  Jij gaf {{ rating }} {{ rating === 1 ? 'ster' : 'sterren' }}
                </p>
              </div>

            </div>
          </div>

          <!-- Ingredients card -->
          <div class="bg-white rounded-2xl border border-stone-100 shadow-card overflow-hidden">
            <div class="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 class="font-serif font-bold text-stone-800 text-lg flex items-center gap-2">
                🛒 Ingrediënten
              </h3>
              <div class="flex items-center gap-2">
                <span class="text-xs text-stone-400">{{ checkedCount }}/{{ recipe.ingredients?.length }}</span>
                <button
                  v-if="checkedCount > 0"
                  @click="checkedIngredients = []"
                  class="text-xs text-orange-500 hover:text-orange-700 font-semibold transition-colors"
                >Reset</button>
              </div>
            </div>

            <!-- Progress bar -->
            <div v-if="checkedCount > 0" class="mx-5 mb-3 h-1 bg-stone-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                :style="`width: ${ingredientProgress}%`"
              />
            </div>

            <!-- List (max height + scroll on desktop) -->
            <ul class="divide-y divide-stone-50 px-2 pb-2 max-h-80 overflow-y-auto">
              <li
                v-for="(item, i) in recipe.ingredients"
                :key="item.name"
                class="ingredient-item"
                :class="{ checked: isIngredientChecked(i) }"
                @click="toggleIngredient(i)"
              >
                <!-- checkbox -->
                <span
                  class="shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  :class="isIngredientChecked(i) ? 'bg-green-500 border-green-500' : 'border-stone-300'"
                >
                  <svg v-if="isIngredientChecked(i)" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                <div class="min-w-0">
                  <span class="ing-name font-semibold text-stone-700 text-sm">{{ item.name }}</span>
                  <span class="text-stone-400 text-xs"> – {{ item.description }}</span>
                </div>
              </li>
            </ul>
          </div>

        </aside>

        <!-- ════ RIGHT: Main content ════ -->
        <div class="flex-1 min-w-0 space-y-10">

          <!-- Intro -->
          <p v-if="recipe.intro" class="text-stone-600 leading-relaxed text-lg animate-fade-in-up">
            {{ recipe.intro }}
          </p>

          <!-- Steps -->
          <section v-if="recipe.steps">
            <div class="flex items-center justify-between mb-5">
              <h2 class="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                👨‍🍳 Bereidingswijze
              </h2>
              <div class="flex items-center gap-3 no-print">
                <span class="text-sm text-stone-400">{{ completedSteps.length }}/{{ recipe.steps.length }}</span>
                <button
                  v-if="completedSteps.length > 0"
                  @click="completedSteps = []"
                  class="text-xs text-orange-500 hover:text-orange-700 font-semibold transition-colors"
                >Reset</button>
              </div>
            </div>

            <!-- Step progress bar -->
            <div v-if="stepsProgress > 0" class="mb-6 no-print">
              <div class="flex justify-between text-xs text-stone-400 mb-1.5">
                <span>Voortgang</span>
                <span class="font-semibold" :class="stepsProgress === 100 ? 'text-green-500' : 'text-orange-500'">
                  {{ stepsProgress }}%
                </span>
              </div>
              <div class="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :class="stepsProgress === 100
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : 'bg-gradient-to-r from-orange-400 to-amber-400'"
                  :style="`width: ${stepsProgress}%`"
                />
              </div>
            </div>

            <ol class="space-y-3">
              <li
                v-for="(step, i) in recipe.steps"
                :key="i"
                class="step-item flex gap-4 bg-white rounded-2xl border border-stone-100 shadow-card px-5 py-4 hover:shadow-card-hover transition-shadow"
                :class="{ done: isStepCompleted(i) }"
                @click="toggleStep(i)"
              >
                <span
                  class="flex-shrink-0 w-9 h-9 rounded-full text-sm font-extrabold flex items-center justify-center transition-all duration-300"
                  :class="isStepCompleted(i) ? 'step-number-done' : 'step-number-active'"
                >
                  <svg v-if="isStepCompleted(i)" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span v-else>{{ i + 1 }}</span>
                </span>
                <p class="text-stone-600 leading-relaxed pt-1.5 text-sm sm:text-base flex-1">{{ step }}</p>
              </li>
            </ol>

            <!-- Done banner -->
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 scale-95 translate-y-4"
              enter-to-class="opacity-100 scale-100 translate-y-0"
            >
              <div
                v-if="allDone"
                class="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-6 py-6 text-center no-print"
              >
                <p class="text-4xl mb-3">🎉</p>
                <p class="font-serif text-xl font-bold text-green-700 mb-1">Gerecht klaar!</p>
                <p class="text-green-500 text-sm">Geniet van je {{ recipe.title }}. Eet smakelijk!</p>
              </div>
            </Transition>
          </section>

          <!-- Variations -->
          <section v-if="recipe.variations">
            <h2 class="font-serif text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              💡 Variatietips
            </h2>
            <div class="recipe-tip-box">
              <p class="text-stone-600 leading-relaxed">{{ recipe.variations }}</p>
            </div>
          </section>

        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p class="text-6xl mb-4">🍽️</p>
      <h2 class="font-serif text-2xl font-bold text-stone-700 mb-2">Recept niet gevonden</h2>
      <NuxtLink to="/recipes" class="mt-4 btn-ghost">← Terug naar recepten</NuxtLink>
    </div>

  </div>
</template>

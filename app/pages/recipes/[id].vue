<script setup>
import { useRoute } from 'vue-router'
import recipes from '../../data/recipes.json'

const route = useRoute()
const recipeId = Number(route.params.id)
const recipe = recipes.find(r => r.id === recipeId)

/* ── Servings adjuster ── */
const servings = ref(recipe?.servings ?? 2)
const servingsRatio = computed(() =>
  recipe?.servings ? servings.value / recipe.servings : 1
)
const adjustServings = (delta) => {
  const next = servings.value + delta
  if (next >= 1) servings.value = next
}

/* ── Ingredient checklist ── */
const checkedIngredients = ref([])
const toggleIngredient = (i) => {
  const idx = checkedIngredients.value.indexOf(i)
  if (idx === -1) checkedIngredients.value.push(i)
  else checkedIngredients.value.splice(idx, 1)
}
const isIngredientChecked = (i) => checkedIngredients.value.includes(i)
const checkedCount = computed(() => checkedIngredients.value.length)

/* ── Step progress ── */
const completedSteps = ref([])
const toggleStep = (i) => {
  const idx = completedSteps.value.indexOf(i)
  if (idx === -1) completedSteps.value.push(i)
  else completedSteps.value.splice(idx, 1)
}
const isStepCompleted = (i) => completedSteps.value.includes(i)
const stepsProgress = computed(() =>
  recipe?.steps?.length
    ? Math.round((completedSteps.value.length / recipe.steps.length) * 100)
    : 0
)

/* ── Star rating ── */
const rating = ref(0)
const hoverRating = ref(0)
onMounted(() => {
  const saved = localStorage.getItem(`rating-${recipeId}`)
  if (saved) rating.value = parseInt(saved)
})
const setRating = (star) => {
  rating.value = star
  localStorage.setItem(`rating-${recipeId}`, String(star))
}

/* ── Print ── */
const printRecipe = () => { window.print() }

/* ── Category badge class ── */
const categoryClass = computed(() => {
  const map = { Ontbijt: 'badge-ontbijt', Lunch: 'badge-lunch', Diner: 'badge-diner' }
  return map[recipe?.category] ?? 'bg-gray-500 text-white'
})

/* ── Difficulty dots ── */
const difficultyLevel = computed(() => {
  const map = { Makkelijk: 1, Gemiddeld: 2, Moeilijk: 3 }
  return map[recipe?.difficulty] ?? 1
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <!-- ── Hero image ── -->
    <div v-if="recipe" class="relative h-72 sm:h-96 overflow-hidden">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 hero-overlay"></div>

      <!-- Back button -->
      <NuxtLink
        to="/recipes"
        class="recipe-back-link no-print absolute top-5 left-5 glass-dark px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 hover:bg-black/50 transition-colors"
      >
        ← Recepten
      </NuxtLink>

      <!-- Print button -->
      <button
        @click="printRecipe"
        class="no-print absolute top-5 right-5 glass-dark text-white/85 hover:text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
        </svg>
        Afdrukken
      </button>

      <!-- Title overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
        <div class="max-w-3xl mx-auto">
          <span class="text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block" :class="categoryClass">
            {{ recipe.category }}
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white text-shadow">{{ recipe.title }}</h1>
        </div>
      </div>
    </div>

    <!-- ── Quick info bar ── -->
    <div v-if="recipe" class="bg-white shadow-sm border-b border-gray-100 sticky top-[56px] z-30 no-print">
      <div class="max-w-3xl mx-auto px-4 py-3 flex flex-wrap gap-5 items-center justify-between text-sm">

        <!-- Time -->
        <div class="flex items-center gap-2 text-gray-600">
          <svg class="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke-linecap="round" stroke-width="2"/>
          </svg>
          <span class="font-semibold">{{ recipe.time }}</span>
        </div>

        <!-- Difficulty -->
        <div class="flex items-center gap-2 text-gray-600">
          <span class="text-gray-400">Niveau:</span>
          <span class="font-semibold">{{ recipe.difficulty }}</span>
          <div class="flex gap-1">
            <span
              v-for="n in 3"
              :key="n"
              class="w-2 h-2 rounded-full"
              :class="n <= difficultyLevel ? 'dot-fill' : 'dot-empty'"
            />
          </div>
        </div>

        <!-- Servings adjuster -->
        <div class="flex items-center gap-2">
          <span class="text-gray-400">Porties:</span>
          <button class="servings-btn" @click="adjustServings(-1)" :disabled="servings <= 1">−</button>
          <span class="font-bold text-gray-800 w-6 text-center">{{ servings }}</span>
          <button class="servings-btn" @click="adjustServings(1)">+</button>
          <span v-if="servingsRatio !== 1" class="text-xs text-orange-500 font-semibold ml-1">
            ×{{ servingsRatio.toFixed(1) }}
          </span>
        </div>

        <!-- Star rating -->
        <div class="flex items-center gap-1">
          <span class="text-gray-400 mr-1">Beoordeel:</span>
          <button
            v-for="star in 5"
            :key="star"
            class="star-btn"
            :class="star <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-200'"
            @mouseenter="hoverRating = star"
            @mouseleave="hoverRating = 0"
            @click="setRating(star)"
          >★</button>
        </div>

      </div>
    </div>

    <!-- ── Main content ── -->
    <main v-if="recipe" class="max-w-3xl mx-auto px-4 py-10 space-y-12">

      <!-- Intro -->
      <p v-if="recipe.intro" class="text-gray-700 leading-relaxed text-lg animate-fade-in-up">
        {{ recipe.intro }}
      </p>

      <!-- Ingredients with checklist -->
      <section v-if="recipe.ingredients" class="animate-fade-in-up delay-100">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            🛒 Ingrediënten
          </h2>
          <div class="flex items-center gap-3 no-print">
            <span class="text-sm text-gray-400">{{ checkedCount }}/{{ recipe.ingredients.length }}</span>
            <button
              v-if="checkedCount > 0"
              @click="checkedIngredients = []"
              class="text-xs text-orange-500 hover:text-orange-600 font-semibold transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Progress bar -->
        <div v-if="checkedCount > 0" class="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden no-print">
          <div
            class="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
            :style="`width: ${(checkedCount / recipe.ingredients.length) * 100}%`"
          ></div>
        </div>

        <ul class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          <li
            v-for="(item, i) in recipe.ingredients"
            :key="item.name"
            class="ingredient-item flex items-start gap-3 no-print"
            :class="{ checked: isIngredientChecked(i) }"
            @click="toggleIngredient(i)"
          >
            <!-- Custom checkbox -->
            <span
              class="mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
              :class="isIngredientChecked(i)
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300'"
            >
              <svg v-if="isIngredientChecked(i)" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            <div>
              <span class="font-semibold text-gray-800">{{ item.name }}</span>
              <span class="text-gray-400"> – {{ item.description }}</span>
            </div>
          </li>
          <!-- Print-only plain list -->
          <li
            v-for="item in recipe.ingredients"
            :key="`print-${item.name}`"
            class="hidden print:flex gap-3 px-5 py-3"
          >
            <span class="ingredient-bullet w-2 h-2 mt-2 rounded-full shrink-0"></span>
            <span><strong>{{ item.name }}</strong> – {{ item.description }}</span>
          </li>
        </ul>
      </section>

      <!-- Steps with progress -->
      <section v-if="recipe.steps" class="animate-fade-in-up delay-200">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            👨‍🍳 Bereidingswijze
          </h2>
          <div class="flex items-center gap-3 no-print">
            <span class="text-sm text-gray-400">{{ completedSteps.length }}/{{ recipe.steps.length }} stappen</span>
            <button
              v-if="completedSteps.length > 0"
              @click="completedSteps = []"
              class="text-xs text-orange-500 hover:text-orange-600 font-semibold transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Steps progress bar -->
        <div v-if="stepsProgress > 0" class="mb-5 no-print">
          <div class="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Voortgang</span>
            <span class="font-semibold text-green-500">{{ stepsProgress }}%</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
              :style="`width: ${stepsProgress}%`"
            ></div>
          </div>
        </div>

        <ol class="space-y-3">
          <li
            v-for="(step, i) in recipe.steps"
            :key="i"
            class="step-item flex gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 no-print"
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
            <p class="text-gray-700 leading-relaxed pt-1.5 text-sm sm:text-base">{{ step }}</p>
          </li>
          <!-- Print-only plain steps -->
          <li
            v-for="(step, i) in recipe.steps"
            :key="`print-step-${i}`"
            class="hidden print:flex gap-4 bg-white rounded-xl px-4 py-3"
          >
            <span class="step-number-active w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center shrink-0">{{ i + 1 }}</span>
            <p class="text-gray-700 leading-relaxed pt-1">{{ step }}</p>
          </li>
        </ol>

        <!-- All done banner -->
        <Transition enter-active-class="transition-all duration-500" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100">
          <div
            v-if="stepsProgress === 100"
            class="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-6 py-5 text-center no-print"
          >
            <p class="text-3xl mb-2">🎉</p>
            <p class="text-lg font-extrabold text-green-700">Gerecht klaar!</p>
            <p class="text-green-500 text-sm">Geniet van je {{ recipe.title }}!</p>
          </div>
        </Transition>
      </section>

      <!-- Variations -->
      <section v-if="recipe.variations" class="animate-fade-in-up delay-300">
        <h2 class="text-2xl font-extrabold text-gray-800 mb-4 flex items-center gap-2">
          💡 Variatietips
        </h2>
        <div class="recipe-tip-box">
          <p class="text-gray-700 leading-relaxed">{{ recipe.variations }}</p>
        </div>
      </section>

    </main>

    <!-- Not found -->
    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p class="text-6xl mb-4">🍽️</p>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Recept niet gevonden</h2>
      <NuxtLink to="/recipes" class="mt-4 text-orange-500 hover:underline font-semibold">← Terug naar recepten</NuxtLink>
    </div>

  </div>
</template>

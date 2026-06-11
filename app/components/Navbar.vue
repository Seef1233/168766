<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)
const isHome = computed(() => route.path === '/')

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})

watch(() => route.path, () => { mobileOpen.value = false })

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const links = [
  { to: '/',        label: 'Home' },
  { to: '/recipes', label: 'Recepten' },
  { to: '/about',   label: 'Over ons' },
]

const navClass = computed(() => {
  if (isHome.value && !scrolled.value) {
    return 'bg-transparent'
  }
  return 'bg-orange-500 shadow-lg'
})
</script>

<template>
  <nav
    class="sticky top-0 z-50 transition-all duration-500"
    :class="navClass"
  >
    <div class="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5 group no-underline">
        <span class="text-2xl transition-transform group-hover:scale-110 inline-block">🍽️</span>
        <div class="flex flex-col leading-tight">
          <span class="font-serif text-white text-xl font-bold tracking-tight">Smaakvol</span>
          <span class="text-orange-200 text-xs font-medium opacity-90">by Yehea Sammour</span>
        </div>
      </NuxtLink>

      <!-- Desktop links -->
      <div class="hidden sm:flex items-center gap-1">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="sm:hidden text-white p-2 rounded-xl hover:bg-white/20 transition-colors no-print"
        @click="mobileOpen = !mobileOpen"
      >
        <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h10"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="mobileOpen" class="sm:hidden bg-orange-600/95 backdrop-blur-md px-4 pb-5 pt-1 space-y-1 border-t border-orange-400/40">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          :class="isActive(link.to)
            ? 'bg-white text-orange-500'
            : 'text-white/90 hover:bg-white/20 hover:text-white'"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

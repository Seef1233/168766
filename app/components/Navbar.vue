<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 10
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
</script>

<template>
  <nav
    class="sticky top-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-orange-500/95 backdrop-blur-md shadow-lg'
      : 'bg-orange-500 shadow-md'"
  >
    <div class="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <span class="text-2xl group-hover:scale-110 transition-transform inline-block">🍽️</span>
        <span class="text-white text-xl font-extrabold tracking-tight">Smaakvol</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden sm:flex items-center gap-1">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-200"
          :class="isActive(link.to)
            ? 'bg-white text-orange-500 shadow-sm'
            : 'text-white/90 hover:text-white hover:bg-white/20'"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="sm:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors no-print"
        @click="mobileOpen = !mobileOpen"
        :aria-label="mobileOpen ? 'Sluit menu' : 'Open menu'"
      >
        <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu dropdown -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="sm:hidden bg-orange-600 px-4 pb-4 space-y-1">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          :class="isActive(link.to)
            ? 'bg-white text-orange-500'
            : 'text-white/90 hover:bg-white/20'"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

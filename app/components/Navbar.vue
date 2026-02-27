<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="bg-orange-500 shadow-md sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-white text-xl font-bold tracking-wide">
        🍽️ Smaakvol
      </NuxtLink>
      <div class="flex gap-2">
        <NuxtLink
          to="/"
          class="px-4 py-1.5 rounded-full font-medium transition-colors"
          :class="isActive('/') ? 'bg-white text-orange-500' : 'text-white hover:bg-orange-400'"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/recipes"
          class="px-4 py-1.5 rounded-full font-medium transition-colors"
          :class="isActive('/recipes') ? 'bg-white text-orange-500' : 'text-white hover:bg-orange-400'"
        >
          Recepten
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="px-4 py-1.5 rounded-full font-medium transition-colors"
          :class="isActive('/about') ? 'bg-white text-orange-500' : 'text-white hover:bg-orange-400'"
        >
          Over ons
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 mt-auto">
      <div class="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">

        <!-- Brand -->
        <div>
          <p class="text-white text-lg font-bold mb-2">🍽️ Smaakvol</p>
          <p class="text-sm text-gray-400 leading-relaxed">
            Heerlijke recepten voor elk moment van de dag. Simpel, lekker en voor iedereen.
          </p>
        </div>

        <!-- Links -->
        <div>
          <p class="text-white font-semibold mb-3">Pagina's</p>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/" class="hover:text-orange-400 transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/recipes" class="hover:text-orange-400 transition-colors">Alle recepten</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-orange-400 transition-colors">Over ons</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <p class="text-white font-semibold mb-3">Categorieën</p>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/recipes?category=Ontbijt" class="hover:text-orange-400 transition-colors">🍳 Ontbijt</NuxtLink></li>
            <li><NuxtLink to="/recipes?category=Lunch" class="hover:text-orange-400 transition-colors">🥗 Lunch</NuxtLink></li>
            <li><NuxtLink to="/recipes?category=Diner" class="hover:text-orange-400 transition-colors">🍝 Diner</NuxtLink></li>
          </ul>
        </div>

      </div>

      <div class="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {{ new Date().getFullYear() }} Smaakvol. Alle rechten voorbehouden.
      </div>
    </footer>
  </div>
</template>

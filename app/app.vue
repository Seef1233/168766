<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-stone-950 text-stone-400 relative overflow-hidden">
      <!-- Top orange accent line -->
      <div class="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"></div>

      <div class="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">

        <!-- Brand -->
        <div class="sm:col-span-1">
          <div class="flex items-center gap-2.5 mb-4">
            <span class="text-2xl">🍽️</span>
            <span class="text-white font-serif text-xl font-bold">Smaakvol</span>
          </div>
          <p class="text-sm leading-relaxed text-stone-500">
            Heerlijke recepten voor elk moment van de dag — simpel, lekker en voor iedereen.
          </p>
        </div>

        <!-- Links -->
        <div>
          <p class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Pagina's</p>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/"        class="hover:text-orange-400 transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/recipes" class="hover:text-orange-400 transition-colors">Alle recepten</NuxtLink></li>
            <li><NuxtLink to="/about"   class="hover:text-orange-400 transition-colors">Over ons</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <p class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categorieën</p>
          <ul class="space-y-2.5 text-sm">
            <li><NuxtLink to="/recipes?category=Ontbijt" class="flex items-center gap-2 hover:text-orange-400 transition-colors"><span class="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>Ontbijt</NuxtLink></li>
            <li><NuxtLink to="/recipes?category=Lunch"   class="flex items-center gap-2 hover:text-orange-400 transition-colors"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>Lunch</NuxtLink></li>
            <li><NuxtLink to="/recipes?category=Diner"   class="flex items-center gap-2 hover:text-orange-400 transition-colors"><span class="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block"></span>Diner</NuxtLink></li>
          </ul>
        </div>

      </div>

      <div class="border-t border-stone-900 py-5 text-center text-xs text-stone-600">
        © {{ new Date().getFullYear() }} Smaakvol — Alle rechten voorbehouden.
      </div>
    </footer>
  </div>
</template>

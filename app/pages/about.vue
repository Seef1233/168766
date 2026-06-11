<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Hero -->
    <section class="relative h-64 flex items-end justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1400&q=80"
        alt="Over ons"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 hero-overlay"></div>
      <div class="relative z-10 pb-10 text-center px-6 animate-fade-in-up">
        <h1 class="text-4xl font-extrabold text-white text-shadow mb-2">Over Smaakvol</h1>
        <p class="text-white/80 text-lg">Lekker koken, simpel beginnen</p>
      </div>
    </section>

    <main class="max-w-4xl mx-auto px-6 py-14 space-y-8">

      <!-- Feature cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 card-hover animate-fade-in-up delay-100">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4">🎯</div>
          <h2 class="text-lg font-extrabold text-gray-900 mb-2">Ons doel</h2>
          <p class="text-gray-500 leading-relaxed text-sm">
            Smaakvol is gemaakt voor iedereen die graag thuis kookt — van beginners tot ervaren thuiskoks.
            Ons doel: heerlijke recepten toegankelijk maken voor iedereen, zonder ingewikkelde technieken of moeilijk te vinden ingrediënten.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 card-hover animate-fade-in-up delay-200">
          <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl mb-4">📖</div>
          <h2 class="text-lg font-extrabold text-gray-900 mb-2">Hoe werkt het?</h2>
          <p class="text-gray-500 leading-relaxed text-sm">
            Elk recept heeft een duidelijke ingrediëntenlijst, stap-voor-stap bereidingswijze en handige variatietips.
            Je kunt ingrediënten afvinken terwijl je kookt en je voortgang bijhouden per stap.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 card-hover animate-fade-in-up delay-300">
          <div class="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-2xl mb-4">👨‍👩‍👧</div>
          <h2 class="text-lg font-extrabold text-gray-900 mb-2">Voor wie?</h2>
          <p class="text-gray-500 leading-relaxed text-sm">
            Of je nu voor jezelf kookt, voor je gezin of voor een etentje met vrienden — Smaakvol heeft voor ieder wat wils.
            Pas eenvoudig het aantal porties aan voor elk gerecht.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 card-hover animate-fade-in-up delay-400">
          <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl mb-4">⭐</div>
          <h2 class="text-lg font-extrabold text-gray-900 mb-2">Beoordeel & bewaar</h2>
          <p class="text-gray-500 leading-relaxed text-sm">
            Geef elk recept een beoordeling met sterren en sla je favorieten op. Zo vind je jouw lievelingsrecepten altijd snel terug.
          </p>
        </div>

      </div>

      <!-- Categories section -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 animate-fade-in-up delay-300">
        <h2 class="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2">
          🍽️ Wat bieden wij?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex items-center gap-4 bg-amber-50 rounded-xl px-5 py-4">
            <span class="text-3xl">🍳</span>
            <div>
              <p class="font-bold text-gray-800">Ontbijt</p>
              <p class="text-gray-500 text-sm">Een goede start van de dag</p>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-emerald-50 rounded-xl px-5 py-4">
            <span class="text-3xl">🥗</span>
            <div>
              <p class="font-bold text-gray-800">Lunch</p>
              <p class="text-gray-500 text-sm">Licht en voedzaam</p>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-violet-50 rounded-xl px-5 py-4">
            <span class="text-3xl">🍝</span>
            <div>
              <p class="font-bold text-gray-800">Diner</p>
              <p class="text-gray-500 text-sm">Heerlijk avondeten</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl px-8 py-10 text-center shadow-lg animate-fade-in-up delay-400">
        <p class="text-2xl font-extrabold text-white mb-2">Klaar om te beginnen?</p>
        <p class="text-orange-100 mb-7">Bekijk alle recepten en ontdek wat jij vanavond gaat maken.</p>
        <NuxtLink
          to="/recipes"
          class="inline-block bg-white text-orange-500 font-extrabold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors shadow-md"
        >
          Bekijk recepten →
        </NuxtLink>
      </div>

    </main>
  </div>
</template>

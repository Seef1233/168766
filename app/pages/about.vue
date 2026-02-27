<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Hero -->
    <section class="relative h-64 flex items-center justify-center text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1400&q=80"
        alt="Over ons"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/55"></div>
      <div class="relative z-10 text-center px-6">
        <h1 class="text-4xl font-bold mb-2">Over Smaakvol</h1>
        <p class="text-white/80 text-lg">Lekker koken, simpel beginnen</p>
      </div>
    </section>

    <main class="max-w-3xl mx-auto px-6 py-14 space-y-12">

      <!-- Doel -->
      <section class="flex gap-5 items-start">
        <span class="text-4xl mt-1">🎯</span>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Ons doel</h2>
          <p class="text-gray-600 leading-relaxed">
            Smaakvol is gemaakt voor iedereen die graag thuis kookt, van beginners tot ervaren thuiskoks.
            Ons doel is simpel: heerlijke recepten toegankelijk maken voor iedereen, zonder ingewikkelde
            technieken of moeilijk te vinden ingrediënten.
          </p>
        </div>
      </section>

      <!-- Wat bieden we -->
      <section class="flex gap-5 items-start">
        <span class="text-4xl mt-1">🍽️</span>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Wat bieden wij?</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            Op Recipe Site vind je recepten voor elk moment van de dag, netjes ingedeeld per categorie:
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-center gap-3">
              <span class="text-xl">🍳</span>
              <span><strong>Ontbijt</strong> – Een goede start van de dag, van pancakes tot granola.</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-xl">🥗</span>
              <span><strong>Lunch</strong> – Lichte en voedzame maaltijden voor overdag.</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-xl">🍝</span>
              <span><strong>Diner</strong> – Smakelijke gerechten voor een heerlijk avondeten.</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Hoe werkt het -->
      <section class="flex gap-5 items-start">
        <span class="text-4xl mt-1">📖</span>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Hoe werkt het?</h2>
          <p class="text-gray-600 leading-relaxed">
            Elk recept is opgebouwd uit een duidelijke ingrediëntenlijst met exacte hoeveelheden,
            stap-voor-stap bereidingswijze en handige variatietips. Zo weet je precies wat je nodig hebt
            en hoe je het aanpakt — ook als je weinig kookervaring hebt.
          </p>
        </div>
      </section>

      <!-- Voor wie -->
      <section class="flex gap-5 items-start">
        <span class="text-4xl mt-1">👨‍👩‍👧</span>
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Voor wie is dit?</h2>
          <p class="text-gray-600 leading-relaxed">
            Of je nu voor jezelf kookt, voor je gezin of voor een etentje met vrienden —
            Recipe Site heeft voor ieder wat wils. De recepten zijn geschreven met een duidelijk
            aantal personen in gedachten, zodat je precies weet hoeveel je nodig hebt.
          </p>
        </div>
      </section>

      <!-- CTA -->
      <div class="bg-orange-50 border border-orange-100 rounded-2xl px-8 py-8 text-center">
        <p class="text-xl font-bold text-gray-900 mb-2">Klaar om te beginnen?</p>
        <p class="text-gray-500 mb-5">Bekijk alle recepten en ontdek wat jij vanavond gaat maken.</p>
        <NuxtLink
          to="/recipes"
          class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Bekijk recepten →
        </NuxtLink>
      </div>

    </main>
  </div>
</template>

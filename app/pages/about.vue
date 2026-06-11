<template>
  <div class="min-h-screen" style="background: var(--bg);">

    <!-- Hero -->
    <section class="relative h-64 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1400&q=80"
        alt="Over ons"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 hero-overlay"></div>
      <div class="relative z-10 h-full flex flex-col justify-end max-w-4xl mx-auto px-6 pb-10">
        <p class="text-orange-300 text-xs font-bold uppercase tracking-widest mb-2 animate-fade-in-up">Smaakvol</p>
        <h1 class="font-serif text-4xl font-black text-white text-shadow animate-fade-in-up delay-100">Over Smaakvol</h1>
        <p class="text-white/70 mt-1 animate-fade-in-up delay-200">Lekker koken, simpel beginnen</p>
      </div>
    </section>

    <main class="max-w-4xl mx-auto px-6 py-14 space-y-8">

      <!-- Intro block -->
      <p class="text-stone-500 text-lg leading-relaxed text-center max-w-2xl mx-auto animate-fade-in-up">
        Smaakvol is gemaakt voor iedereen die graag thuis kookt — van beginners tot ervaren thuiskoks.
        Heerlijke recepten, toegankelijk voor iedereen.
      </p>

      <!-- Feature grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div class="bg-white rounded-2xl p-7 border border-stone-100 shadow-card hover:shadow-card-hover transition-shadow animate-fade-in-up delay-100">
          <div class="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center text-xl mb-4">🎯</div>
          <h2 class="font-serif text-lg font-bold text-stone-900 mb-2">Ons doel</h2>
          <p class="text-stone-500 leading-relaxed text-sm">
            Heerlijke recepten toegankelijk maken voor iedereen, zonder ingewikkelde technieken of moeilijk te vinden ingrediënten.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-7 border border-stone-100 shadow-card hover:shadow-card-hover transition-shadow animate-fade-in-up delay-200">
          <div class="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-xl mb-4">✅</div>
          <h2 class="font-serif text-lg font-bold text-stone-900 mb-2">Interactief koken</h2>
          <p class="text-stone-500 leading-relaxed text-sm">
            Vink ingrediënten af terwijl je ze gebruikt, volg je stappen en zie je voortgang in real time. Koken was nooit zo eenvoudig.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-7 border border-stone-100 shadow-card hover:shadow-card-hover transition-shadow animate-fade-in-up delay-300">
          <div class="w-11 h-11 bg-violet-100 rounded-xl flex items-center justify-center text-xl mb-4">⚖️</div>
          <h2 class="font-serif text-lg font-bold text-stone-900 mb-2">Porties aanpassen</h2>
          <p class="text-stone-500 leading-relaxed text-sm">
            Kook je voor jezelf of voor een hele groep? Pas het aantal porties aan in elk recept en zie de verhouding direct.
          </p>
        </div>

        <div class="bg-white rounded-2xl p-7 border border-stone-100 shadow-card hover:shadow-card-hover transition-shadow animate-fade-in-up delay-400">
          <div class="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-xl mb-4">♥</div>
          <h2 class="font-serif text-lg font-bold text-stone-900 mb-2">Favorieten bewaren</h2>
          <p class="text-stone-500 leading-relaxed text-sm">
            Bewaar je lievelingsrecepten met één klik op het hartje. Geef een beoordeling en kom er altijd snel op terug.
          </p>
        </div>

      </div>

      <!-- Categories section -->
      <div class="bg-white rounded-2xl border border-stone-100 shadow-card p-7 animate-fade-in-up delay-300">
        <h2 class="font-serif text-xl font-bold text-stone-900 mb-6">Wat bieden wij?</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <NuxtLink to="/recipes?category=Ontbijt" class="group relative overflow-hidden rounded-xl h-28">
            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-br from-amber-600/80 to-orange-500/70"></div>
            <div class="relative z-10 h-full flex items-center gap-3 px-5">
              <span class="text-2xl">🍳</span>
              <div>
                <p class="font-serif font-bold text-white text-base">Ontbijt</p>
                <p class="text-white/70 text-xs">Start de dag goed</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/recipes?category=Lunch" class="group relative overflow-hidden rounded-xl h-28">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-700/80 to-teal-500/70"></div>
            <div class="relative z-10 h-full flex items-center gap-3 px-5">
              <span class="text-2xl">🥗</span>
              <div>
                <p class="font-serif font-bold text-white text-base">Lunch</p>
                <p class="text-white/70 text-xs">Licht en voedzaam</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/recipes?category=Diner" class="group relative overflow-hidden rounded-xl h-28">
            <img src="https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-br from-violet-700/80 to-indigo-500/70"></div>
            <div class="relative z-10 h-full flex items-center gap-3 px-5">
              <span class="text-2xl">🍝</span>
              <div>
                <p class="font-serif font-bold text-white text-base">Diner</p>
                <p class="text-white/70 text-xs">Heerlijk avondeten</p>
              </div>
            </div>
          </NuxtLink>

        </div>
      </div>

      <!-- CTA -->
      <div class="relative overflow-hidden rounded-3xl animate-fade-in-up delay-400">
        <img
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80"
          class="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div class="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-500/80"></div>
        <div class="relative z-10 px-8 py-12 text-center">
          <p class="font-serif text-2xl font-black text-white mb-2">Klaar om te beginnen?</p>
          <p class="text-orange-100 mb-7 text-sm">Bekijk alle recepten en ontdek wat jij vanavond maakt.</p>
          <NuxtLink to="/recipes" class="inline-block bg-white text-orange-600 font-extrabold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors shadow-orange">
            Bekijk recepten →
          </NuxtLink>
        </div>
      </div>

    </main>
  </div>
</template>

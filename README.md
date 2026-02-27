# Smaakvol 🍽️

**Smaakvol** is een receptenwebsite gebouwd met **Nuxt 3** (Vue-gebaseerd framework).
De site toont recepten per categorie (Ontbijt, Lunch, Diner) met ingrediënten, bereidingswijze en variatietips.
Data wordt geladen vanuit een lokaal JSON-bestand. De site is volledig statisch en gehost op GitHub Pages.

---

## Installatie

**Vereisten:** Node.js LTS (v18 of hoger)

```bash
npm install
```

---

## Ontwikkelen

Start de ontwikkelserver op `http://localhost:3000`:

```bash
npm run dev
```

---

## Build

Bouw de statische versie van de site:

```bash
npm run generate
```

De gegenereerde bestanden staan in de map `dist/` — dit is wat op GitHub Pages wordt gepubliceerd.

---

## Deploy naar GitHub Pages

1. Push de broncode naar de `main` branch
2. Ga naar **Settings → Pages** in je GitHub-repository
3. Kies als source: **GitHub Actions**
4. De workflow in `.github/workflows/deploy.yml` zorgt automatisch voor de build en publicatie

**Live URL:** `https://<jouw-gebruikersnaam>.github.io/recipe-website1/`

---

## Projectstructuur

```
recipe-website1/
├── app/
│   ├── components/
│   │   ├── Navbar.vue        # Navigatiebalk (sticky, actieve pagina gemarkeerd)
│   │   └── RecipeCard.vue    # Kaartcomponent per recept
│   ├── data/
│   │   └── recipes.json      # Alle receptdata (JSON)
│   ├── pages/
│   │   ├── index.vue         # Homepagina
│   │   ├── about.vue         # Over-pagina
│   │   └── recipes/
│   │       ├── index.vue     # Receptenoverzicht met categoriefilter
│   │       └── [id].vue      # Detailpagina per recept
│   └── app.vue               # Root layout met Navbar en Footer
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Functionaliteit

| Feature | Beschrijving |
|---------|-------------|
| **4 pagina's** | Home, Recipes, Recipe detail, About |
| **Routing** | Nuxt file-based routing incl. dynamische route `[id]` |
| **Componenten** | `Navbar`, `RecipeCard`, `Footer` (in app.vue) |
| **Data uit JSON** | 10 recepten geladen vanuit `recipes.json` |
| **Filtering** | Recepten filterbaar op categorie via query parameter |
| **Styling** | Tailwind CSS |
| **Toegankelijkheid** | Semantische HTML (`nav`, `main`, `section`, `footer`), `alt`-teksten op alle afbeeldingen |

---

## Framework-keuze

Gekozen framework: **Nuxt 3**

- Gebouwd op **Vue 3** met Composition API
- **File-based routing** — geen aparte router-configuratie nodig
- Uitstekende ondersteuning voor **statische generatie** (`nuxt generate`) → geschikt voor GitHub Pages
- Grote community, goede documentatie
- Integratie met **Tailwind CSS** via officiële module

---

## Bronvermelding

- Framework: [Nuxt 3](https://nuxt.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Afbeeldingen: [Unsplash](https://unsplash.com/) (vrij te gebruiken)
- Receptinspiratie: eigen inhoud

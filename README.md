# Portfolio Fotografico Editoriale — Nicla Cristiano

Sito web portfolio d'autore in stile editoriale / magazine per la fotografa **Nicla Cristiano**, sviluppato con **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Framer Motion** e **Sanity Studio v3** embedded.

---

## 🌟 Caratteristiche Principali

- **Splash Screen Scroll-Driven Reattivo**:
  - Foto d'autore in formato circolare (`001.jpg`) con didascalia *"Nicla Cristiano | @niclacristiano_foto_"*.
  - Scompare fluidamente al primo tocco o movimento di scroll (senza bloccare la navigazione).
  - Riappare in modo perfettamente simmetrico se si ritorna in cima alla pagina (`scrollY === 0`).
  - Funzionamento identico su desktop e mobile/touch.
- **Griglia Asimmetrica Editoriale**:
  - Layout dinamico con dimensioni e proporzioni variabili (composizione a rivista di moda/arte).
  - Progetti *Featured* in evidenza e ordinamento personalizzabile.
  - Hover con zoom e scheda descrittiva animata (attiva al tap su mobile).
- **Pagine Progetto & Lightbox**:
  - Visualizzazione di gallerie complete ad alta risoluzione.
  - Lightbox a schermo intero con supporto a tasti freccia (Next / Prev), tasto Esc, captions e swipe.
  - Navigazione continua al progetto precedente / successivo.
- **Pagina "Chi Sono"**:
  - Ritratto fotografico d'autore, biografia ricca (rich text), contatti diretti con click-to-copy/mailto e link social.
- **Sanity Studio v3 Embedded (`/studio`)**:
  - Gestione autonoma dei contenuti sia da parte tua che della fotografa tramite login email o Google.
  - Schema per progetti (titolo, slug, categoria, cover con hotspot, galleria con didascalie, portable text, anno, featured, ordinamento).
  - Schema singleton per impostazioni sito, bio, profilo e social.
- **Revalidazione Istantanea ISR (`/api/revalidate`)**:
  - Webhook integrato con Vercel per pubblicare nuovi contenuti senza necessità di redeploy manuale.
- **Zero-Config Fallback Mode**:
  - Il sito è immediatamente utilizzabile e presentabile con dati mock ad alta fedeltà anche prima di inserire le chiavi API di Sanity.

---

## 🚀 Avvio Rapido

### 1. Installazione Dipendenze
```bash
npm install
```

### 2. Avvio in Locale
```bash
npm run dev
```
Apri il browser su [http://localhost:3000](http://localhost:3000).

Per accedere a Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio).

### 3. Compilazione per la Produzione
```bash
npm run build
npm run start
```

---

## 📖 Configurazione CMS e Vercel

Per istruzioni dettagliate su come configurare Sanity, invitare Nicla come editor e collegare il webhook a Vercel, consulta la guida:
👉 **[SANITY_SETUP_GUIDE.md](./SANITY_SETUP_GUIDE.md)**

---

## 📂 Struttura del Progetto

```
Sito Nicla/
├── public/
│   └── 001.jpg               # Immagine dello splash screen e profilo
├── src/
│   ├── app/
│   │   ├── api/revalidate/   # Endpoint Webhook per ISR automatica
│   │   ├── chi-sono/         # Pagina Chi Sono & Contatti
│   │   ├── progetti/[slug]/  # Dettaglio progetto con Lightbox
│   │   ├── studio/           # Sanity Studio CMS embedded
│   │   ├── globals.css       # Stili CSS e Tailwind
│   │   ├── layout.tsx        # Layout globale con font editoriali
│   │   └── page.tsx          # Homepage con Splash e griglia asimmetrica
│   ├── components/
│   │   ├── SplashScreen.tsx  # Splash screen interattivo scroll-driven
│   │   ├── ProjectGrid.tsx   # Griglia asimmetrica editoriale
│   │   ├── ProjectCard.tsx   # Card animata con hover / mobile tap
│   │   ├── ProjectGallery.tsx# Galleria a rivista per la pagina progetto
│   │   ├── Lightbox.tsx      # Visualizzatore a schermo intero
│   │   ├── PortableBody.tsx  # Renderer del testo formattato Sanity
│   │   ├── Navbar.tsx        # Barra di navigazione responsive
│   │   └── Footer.tsx        # Piè di pagina con contatti e social
│   ├── sanity/
│   │   ├── client.ts         # Client di fetch Sanity con caching Next.js
│   │   ├── env.ts            # Gestione variabili d'ambiente
│   │   ├── image.ts          # Sanity image URL builder con hotspot
│   │   ├── mockData.ts       # Dati di fallback completi
│   │   ├── queries.ts        # Query GROQ
│   │   └── schemas/          # Schemi Sanity per project e siteSettings
│   └── types/                # Interfacce TypeScript
├── sanity.config.ts          # Configurazione Sanity Studio v3
└── SANITY_SETUP_GUIDE.md     # Guida per il team e per la fotografa
```

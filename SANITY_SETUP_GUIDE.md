# Guida Configurazione Sanity CMS & Vercel
## Portfolio Fotografico di Nicla Cristiano

Questa guida spiega passo-passo, in modo semplice e senza bisogno di competenze tecniche avanzate, come attivare il CMS gratuito Sanity e collegarlo al sito web e a Vercel.

---

### Indice
1. [Creare l'account Sanity gratuito](#1-creare-laccount-sanity-gratuito)
2. [Ottenere il Project ID e il Dataset](#2-ottenere-il-project-id-e-il-dataset)
3. [Abilitare i domini (CORS) in Sanity](#3-abilitare-i-domini-cors-in-sanity)
4. [Aggiungere la fotografa (Nicla) come editor](#4-aggiungere-la-fotografa-nicla-come-editor)
5. [Collegare il sito a Vercel (Hosting gratuito)](#5-collegare-il-sito-a-vercel-hosting-gratuito)
6. [Configurare il Webhook di Revalidazione Istantanea](#6-configurare-il-webhook-di-revalidazione-istantanea)
7. [Come usare lo Studio per inserire progetti](#7-come-usare-lo-studio-per-inserire-progetti)

---

### 1. Creare l'account Sanity gratuito
1. Vai su **[https://www.sanity.io](https://www.sanity.io)** e clicca su **"Get Started"** (oppure "Sign In").
2. Accedi con il tuo account Google o con la tua email.
3. Il piano base (Free Tier) include ampi limiti gratuiti:
   - Fino a 3 utenti del team
   - 100 GB di traffico dati al mese
   - 10 GB di storage per foto ad alta risoluzione
   - CDN globale ultraveloce

---

### 2. Ottenere il Project ID e il Dataset
1. Dalla dashboard di Sanity ([sanity.io/manage](https://www.sanity.io/manage)), clicca su **"Create project"** (o usa un progetto esistente).
2. Dai un nome al progetto, ad esempio: `nicla-cristiano-portfolio`.
3. Nella schermata del progetto appena creato:
   - Troverai in alto il **Project ID** (una stringa di caratteri alfanumerici tipo `a1b2c3d4`).
   - Nella scheda **Datasets**, troverai il dataset predefinito chiamato **`production`**.
4. Copia il tuo Project ID e incollalo nel file `.env.local` del tuo progetto:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=tuo_project_id_reale
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01
   ```

---

### 3. Abilitare i domini (CORS) in Sanity
Per consentire al sito web (sia in locale che su Vercel) di comunicare con Sanity:
1. Nella pagina del progetto su [sanity.io/manage](https://www.sanity.io/manage), vai su **API** → **CORS Origins**.
2. Clicca su **"Add CORS origin"**.
3. Aggiungi i seguenti indirizzi con **"Allow credentials" selezionato**:
   - `http://localhost:3000` (per lo sviluppo in locale sul tuo computer)
   - L'indirizzo del tuo sito Vercel (es. `https://sito-nicla.vercel.app` o il dominio personalizzato finale `https://www.niclacristiano.it`).

---

### 4. Aggiungere la fotografa (Nicla) come editor
Sia tu che la fotografa potrete modificare foto, descrizioni e bio senza toccare il codice:
1. Su [sanity.io/manage](https://www.sanity.io/manage), apri il progetto e vai nella scheda **Members** (Membri).
2. Clicca su **"Invite member"** (Invita membro).
3. Inserisci l'email di Nicla e seleziona il ruolo **Editor** o **Administrator**.
4. Nicla riceverà un'email di invito con cui potrà accedere direttamente:
   - Dalla route del sito: `tuosito.com/studio`
   - Basterà cliccare "Accedi con Google" o inserire la propria email.

---

### 5. Collegare il sito a Vercel (Hosting gratuito)
1. Carica il progetto su un repository GitHub (es. `nicla-cristiano-portfolio`).
2. Vai su **[vercel.com](https://vercel.com)** e fai il login col tuo account GitHub.
3. Clicca su **"Add New..."** → **"Project"** e importa il repository del portfolio.
4. Nella sezione **Environment Variables** (Variabili d'ambiente), aggiungi:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `il tuo project ID`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-03-01`
   - `SANITY_REVALIDATE_SECRET` = `una stringa casuale e sicura (es. nicla_secret_2026_x89z)`
5. Clicca su **Deploy**. In circa 60 secondi il sito sarà online con certificato SSL HTTPS gratuito!

---

### 6. Configurare il Webhook di Revalidazione Istantanea
Per fare in modo che ogni volta che tu o Nicla pubblicate una nuova foto o modificate un testo, il sito su Vercel si aggiorni **immediatamente** senza dover riavviare o ricompilare il codice:
1. Su [sanity.io/manage](https://www.sanity.io/manage), vai su **API** → **Webhooks**.
2. Clicca su **"Create webhook"**:
   - **Name**: `Vercel Revalidate`
   - **URL**: `https://tuo-sito.vercel.app/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Seleziona `Create`, `Update`, `Delete`
   - **Filter**: lascia vuoto o imposta `_type in ["project", "siteSettings"]`
   - **HTTP Headers**:
     - Key: `Authorization`
     - Value: `Bearer tuo_segreto_scelto` (lo stesso inserito in `SANITY_REVALIDATE_SECRET`)
3. Salva il webhook. Da questo momento la sincronizzazione è in tempo reale!

---

### 7. Come usare lo Studio per inserire progetti
Una volta avviato il sito o aperto `tuosito.com/studio`:
1. **Impostazioni Sito & Chi Sono**:
   - Modifica il nome, il motto, la foto profilo, la biografia e i link a Instagram/social.
   - Clicca sul pulsante verde **Publish** in basso a destra.
2. **Progetti Fotografici**:
   - Clicca su **"Tutti i Progetti Fotografici"** → icona matita per creare un nuovo progetto.
   - Inserisci:
     - **Titolo** (es. *"Luce sulla Laguna"*)
     - **Slug** (clicca sul pulsante *"Generate"* a lato)
     - **Categoria** (scegli tra Ritratti, Moda, Matrimoni, Reportage, ecc.)
     - **Anno** (es. `2024`)
     - **In Evidenza** (spunta se vuoi che appaia in prima posizione nella home)
     - **Immagine di Copertina**: carica la foto principale e regola il crop (punto focale/hotspot)
     - **Descrizione**: scrivi il testo editoriale formattato
     - **Galleria Immagini**: trascina tutte le foto del servizio, con possibilità di inserire una didascalia (caption) per ciascuna
   - Clicca su **Publish**: il progetto comparirà all'istante sulla Home e nella sua pagina dedicata!

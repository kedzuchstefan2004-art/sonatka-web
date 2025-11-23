# Reštaurácia Sonáta - Web Stránka

Moderná webová stránka pre reštauráciu Sonáta v Spišskej Novej Vsi.

## 🎯 Funkcie

- **Domovská stránka** - Predstavenie reštaurácie s hero fotkou
- **Denné menu** - Dynamicky aktualizované denné menu s polievkami a jedlami
- **Stála ponuka** - Kompletný katalóg jedál
- **Galéria** - Fotografie z reštaurácie
- **Rezervácie** - Formulár na rezerváciu stolov
- **Kontakt** - Kontaktné informácie a mapa
- **Admin panel** - Správa obsahu (denné menu, aktuality, rezervácie)
- **Aktuality** - Popup s oznámami pre zákazníkov

## 🛠️ Technológie

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library
- **Lucide React** - Icons

## 📋 Požiadavky

- Node.js 18+
- npm alebo yarn

## 🚀 Inštalácia

```bash
# Klonujte repozitár
git clone https://github.com/vase-meno/sonatka-web.git
cd sonatka-web

# Nainštalujte dependencies
npm install

# Spustite dev server
npm run dev
```

Otvorte [http://localhost:3000](http://localhost:3000) v prehliadači.

## 📁 Štruktúra projektu

```
sonatka-web/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Domovská stránka
│   ├── stala-ponuka/      # Stála ponuka
│   ├── galeria/           # Galéria
│   ├── rezervacia/        # Rezervácie
│   ├── kontakt/           # Kontakt
│   ├── admin/             # Admin panel
│   └── api/               # API endpointy
├── components/            # React komponenty
├── data/                  # JSON dáta
├── lib/                   # Utility funkcie
└── public/                # Statické súbory
```

## 🔧 Dostupné príkazy

```bash
npm run dev      # Spustí dev server
npm run build    # Build pre produkciu
npm run start    # Spustí produkčný server
npm run lint     # Spustí linter
npm run format   # Formátuje kód
```

## 📝 Konfigurácia

### Dáta

Všetky dáta sú uložené v JSON súboroch v `data/` adresári:

- `daily-menu.json` - Denné menu
- `permanent-menu.json` - Stála ponuka
- `announcements.json` - Aktuality
- `restaurant-info.json` - Informácie o reštaurácii
- `reservations.json` - Rezervácie

### Prostredie

Vytvorte `.env.local` súbor:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🌐 Deployment

### Vercel (Odporúčané)

1. Pushните kód na GitHub
2. Prejdite na [vercel.com](https://vercel.com)
3. Importujte projekt
4. Vercel automaticky nakonfiguruje a nasadí

### Netlify

Projekt je kompatibilný s Netlify, ale Vercel je odporúčaný pre Next.js.

## 🔐 Admin Panel

Prihláste sa do admin panelu na `/admin/login`

**Prihlasovacie údaje:** (Nastavte si vlastné)
- Používateľ: admin
- Heslo: admin

## 📧 Kontakt

- **Email:** sonatka@sonatka.sk
- **Telefón:** +421-53-44 111 82
- **Adresa:** Radničné námestie 4, 052 01 Spišská Nová Ves

## 📄 Licencia

MIT License - viď LICENSE súbor

## 👨‍💻 Autor

Vytvorené pre Reštauráciu Sonáta

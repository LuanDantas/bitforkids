# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BitForKids is a React Native/Expo cryptocurrency education app for kids. It features courses, Bitcoin price tracking, portfolio management, market indices, and a VSL (Video Sales Letter) monetization system. The app targets iOS, Android, and Web.

## Tech Stack

- **Expo SDK 54** with React Native 0.81.4, React 19.1
- **TypeScript** (strict mode) — path alias `@/*` maps to project root
- **Expo Router 6** (file-based routing) with typed routes
- **React Context API** for state management (`ThemeContext`, `VSLContext`)
- **AsyncStorage** for local persistence
- **Lucide React Native** for icons
- **React Native SVG** for charts (candlestick, line, bar, pie)
- New Architecture enabled

## Commands

```bash
npm run dev          # Start Expo dev server (EXPO_NO_TELEMETRY=1 expo start)
npm run build:web    # Export for web (expo export --platform web)
npm run lint         # Run linter (expo lint)
```

No test framework is configured.

## Architecture

### Routing (app/)

Expo Router file-based routing:
- `app/_layout.tsx` — Root layout: `ThemeProvider` → `VSLProvider` → `Stack`
- `app/index.tsx` — Landing page educativa (entry point do app, CTA para login)
- `app/(tabs)/` — Bottom tab navigation (home, courses, profile, indices, portfolio, admin)
- `app/auth/` — Login, register, forgot-password screens
- `app/course/[id].tsx`, `app/portfolio/[id].tsx` — Dynamic detail routes
- `app/payments.tsx` — Payment/checkout flow
- `app/mentoria-completa.tsx` — Complete mentoring sales page

### State Management (contexts/)

- **ThemeContext** — Light/dark/system theme with 30+ color tokens, persisted via AsyncStorage
- **VSLContext** — VSL modal visibility, video progress tracking, conversion tracking with session/cooldown rules

### Services (services/)

- **BitcoinPriceService** — Fetches BTC price from CoinGecko API (BRL), manages price alerts (5% threshold), daily notifications, 30-min monitoring intervals

### Components (components/)

- `charts/` — Five chart types (CandlestickChart, LineChart, PieChart, VerticalBarChart, HorizontalBarChart) using react-native-svg
- VSL-related components (VSLHero, VSLVideo, VSLBenefits, VSLPricing, VSLTestimonials, VSLModal)
- Monetization components (SubscriptionPlan, BundleOffer, CrossSellCard, CashbackBanner)

## Code Style

- Prettier: 2-space indent, single quotes, bracket spacing
- Functional components with hooks throughout
- NPM configured with `legacy-peer-deps=true`

## Build & Deploy

- **EAS Build** configured in `eas.json` with profiles: development (internal), preview (internal), production
- Bundle ID: `com.bitforkids.app`
- EAS Project ID: `15102c8d-6d22-4833-9213-298d3d58572c`, owner: `luan-apps`

## Manutenção deste arquivo

**Este arquivo DEVE ser atualizado sempre que houver mudanças significativas no projeto.** Ao finalizar uma implementação, verifique se alguma das seções acima precisa ser atualizada. Exemplos de quando atualizar:

- Nova dependência principal adicionada ou versão major atualizada → atualizar **Tech Stack**
- Novo script adicionado ao package.json → atualizar **Commands**
- Nova rota, tela ou grupo de tabs criado → atualizar **Routing**
- Novo contexto, serviço ou hook global criado → atualizar **State Management** / **Services**
- Nova família de componentes reutilizáveis criada → atualizar **Components**
- Mudança em configuração de build, deploy ou code style → atualizar seção correspondente
- Adoção de framework de testes → atualizar **Commands** e remover nota sobre ausência de testes

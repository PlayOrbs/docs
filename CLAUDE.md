# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PlayOrbs documentation site built with Docusaurus 3. This is the docs site for a decentralized battle royale game powered by Solana (execution) and ICP (randomness). The site is deployed to Cloudflare Pages.

## Commands

```bash
# Development server (hot reload)
pnpm start

# Production build
pnpm build

# Serve production build locally
pnpm serve

# Deploy to Cloudflare Pages
pnpm deploy

# Clear build cache (useful when changes don't appear)
pnpm clear
```

## Architecture

**Framework**: Docusaurus 3 with TypeScript
**Deployment**: Cloudflare Pages via Wrangler
**Package Manager**: pnpm

### Key Configuration Files

- `docusaurus.config.ts` - Main site config (title, URL, navbar, footer, themes)
- `sidebars.ts` - Documentation sidebar structure with all categories and pages
- `wrangler.toml` - Cloudflare Pages deployment config

### Documentation Structure

All documentation lives in `docs/` organized by category:
- `intro/` - Introduction and overview
- `gameplay/` - Game mechanics (rounds, tiers, seasons)
- `earning/` - Points, emissions, leaderboards, referrals
- `tokenomics/` - PORB token economics
- `technical/` - Architecture and Solana integration
- `randomness/` - ICP integration for fairness
- `physics/` - Deterministic game engine
- `economics/` - Fee distribution and payouts
- `reference/` - Glossary, constants, diagrams

### Styling

Custom dark theme in `src/css/custom.css` using JetBrains Mono font. Color scheme:
- Primary accent: `#00ff88` (green)
- Gold for rewards: `#ffd700`
- Dark background: `#0a0a0a`

Dark mode is forced (no light mode toggle).

### Search

Uses `@easyops-cn/docusaurus-search-local` for client-side search (no Algolia).

### Static Assets

Place images in `static/img/`. The `static/llms.txt` provides LLM-friendly site summary.

## Adding Documentation

1. Create `.md` file in appropriate `docs/` subdirectory
2. Add to `sidebars.ts` in the correct category
3. Use frontmatter for page title: `---\ntitle: Page Title\n---`

## Code Highlighting

Prism is configured for `rust`, `typescript`, and `bash` languages.

## Social Cards for X

Cards live in `cards/` with shared styles in `cards/base.css`. Templates go in `cards/templates/`. Export with `pnpm card:export <name>` (uses bun + Puppeteer).

### Copy Rules (MUST follow for all card text)

- Do NOT use language that implies guaranteed profit, investment, ROI, or passive income
- Avoid phrases like "get paid", "bigger prizes", "earn early", "guaranteed rewards"
- Soften any direct prize pool payout language
- Keep the tone competitive and skill-focused
- Emphasize that this is a skill-based game
- Keep copy concise and suitable for a single card
- Do not add disclaimers — just use clean, compliant copy

### Visual Design Requirements (MUST follow for all social media assets)

**Goal**: Bold gamefi presence — cards should feel like an arena, not a slide deck. Clean but high-energy.

- **No generic text** — use gaming-native language and terminology that fits the orbs universe
- **Brand colors + neon accents** — use the existing logo palette as a base (#00ff88 green, dark backgrounds) and layer neon accents to make posts pop
- **Energy and motion** — use text-shadow glows on titles and key values, box-shadow glows on containers, and color-matched text-shadows on highlighted terminal/data text
- **Large background orbs** — use `orb--xl` (72px) and `orb--xxl` (110px) bleeding off card edges for depth and arena scale. Pair with `orb--dim` for background layers. Always include multiple orbs at different sizes to create layered depth
- **Tether lines** — add 2-4 `orb-tether` elements at varying angles to create collision/arena energy in the background
- **Glow on containers** — any surface element (terminal boxes, stat panels, feature cards) should have a subtle green-tinted box-shadow and border (e.g., `border: 1px solid rgba(0,255,136,0.12)`, multi-layer `box-shadow` with green tones)
- **Modular templates** — design dynamic, recognizable layouts and templates for banners and posts that are reusable across announcements, gameplay highlights, and interactive content
- **Visual consistency** — every asset should be instantly identifiable as PlayOrbs; consistent style drives engagement, shares, and follows
- **Minimalism in content, not energy** — keep text and layout clean, but push the background energy (orbs, tethers, glows) to make cards scroll-stopping
- **Feed presence** — cards must stand out in crowded feeds. If a card looks like it could belong to any project, it needs more PlayOrbs energy

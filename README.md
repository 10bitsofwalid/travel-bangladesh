# ExploreBD — Geospatial Tourism & Heritage Platform for Bangladesh

**ExploreBD** is a map-centric exploration platform highlighting Bangladesh's natural landscapes, archaeological wonders, cultural landmarks, and curated trails.

---

## 🌟 Core Features

- **Interactive Geospatial Surface**: Mapbox GL JS engine with Bangladesh boundary constraints, dynamic clustering, and responsive camera fly-to animations.
- **Dual Visual Taxonomy**:
  - 🌲 **Nature & Wild (Emerald Theme)**: Hills, Mangroves, Wetlands, Waterfalls, Beaches.
  - 🏛️ **Archaeology & Heritage (Amber Theme)**: Buddhist Viharas, Sultanate Mosques, Mughal Forts, Terracotta Temples.
- **Discovery Drawers & Fact Sheets**: Non-intrusive bottom/side drawer with travel facts, best visiting season, difficulty ratings, and verified historical citations.
- **PostGIS Spatial Architecture**: High-speed spatial indexing (`GIST`), bounding-box queries (`ST_MakeEnvelope`), and GeoJSON layers.
- **Bilingual Support**: Dual English and Bengali (বাংলা) nomenclature for all destinations, districts, and divisions.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+) with PostGIS extension

### 2. Setup Environment
Copy `.env.example` to `.env` in root and configure database and Mapbox credentials:
```bash
cp .env.example .env
```

### 3. Run Development Servers
```bash
# In backend/
cd backend
npm install
npx prisma generate
npm run dev

# In frontend/
cd frontend
npm install
npm run dev
```

---

## 📚 Project Documentation

All specifications and guidelines are located in `Docs/`:
- [PRD](Docs/PRD.md): Product Requirements & User Personas
- [Architecture](Docs/Architecture.md): System design & Data Flow
- [Database](Docs/Database.md): PostgreSQL + PostGIS Schema & Queries
- [API Specification](Docs/API.md): REST v1 Endpoints & Contracts
- [Map Specifications](Docs/Map_Specs.md): Mapbox GL JS configuration & bounding rules
- [UI Design System](Docs/UI_Design_System.md): Aesthetic tokens & guidelines
- [AI Workbook](Docs/AI_WORKBOOK.md): Task Tracking & Roadmap

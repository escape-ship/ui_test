# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
bun dev
```
- Runs the development server with hot reloading
- Server defined in `src/index.tsx`

**Build for production:**
```bash
bun run build.ts
```
- Custom build script that scans for HTML entrypoints in `src/`
- Outputs compiled assets to `dist/`
- Supports CLI flags like `--minify`, `--source-map`, `--outdir`

**Start production server:**
```bash
bun start
```
- Runs with `NODE_ENV=production`

**Install dependencies:**
```bash
bun install
```

## Architecture Overview

This is a **React 19 + TypeScript + Bun + Tailwind CSS** e-commerce application with the following key architectural patterns:

### Runtime & Build System
- **Bun** is used as both the runtime and build tool (not Node.js)
- Custom build script in `build.ts` with CLI argument parsing
- Hot reloading in development via `--hot` flag

### Frontend Architecture
- **React Router v6** handles client-side routing with all routes defined in `App.tsx`
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS** with custom configuration in `styles/globals.css`
- **TypeScript** with path aliases (`@/` → `src/`)

### Component Structure
```
src/
├── components/
│   ├── ui/           # shadcn/ui base components (Button, Input, etc.)
│   ├── auth/         # Login/Register forms
│   ├── header/       # NavBar component
│   ├── footer/       # Footer component
│   ├── home/         # Homepage-specific components
│   ├── product/      # Product display and detail components
│   └── layout/       # PageWrapper layout component
├── pages/            # Route components (one per page)
├── context/          # React Context providers
└── lib/              # Utilities and configuration
```

### State Management
- **React Context** for authentication (`AuthContext.tsx`)
- **localStorage** for cart state and login persistence
- **URL parameters** for product details via React Router

### Data Flow
- API calls to `http://localhost:8081` for product data and authentication
- Product options loaded via gRPC REST API
- Kakao OAuth integration for social login
- Cart stored in localStorage with complex option selection

### Key Patterns
- **Function components** with hooks (no class components)
- **TypeScript interfaces** for all props and API responses
- **Composite component pattern** (PageWrapper wraps all pages with NavBar/Footer)
- **Dynamic option rendering** in ProductDetail component based on API response
- **Form handling** with react-hook-form + zod validation

### Special Considerations
- Contains hardcoded Kakao client ID that should be moved to environment variables
- API endpoints are hardcoded to localhost:8081
- Complex cart logic handles product variations with multiple options
- Uses placeholder images from Unsplash for product galleries
- Build system supports multiple HTML entrypoints (though only one is used)

### Development Workflow
- Components should use the `@/` alias for imports
- UI components should extend shadcn/ui base components
- New pages require both a file in `src/pages/` and a route in `App.tsx`
- Authentication state is managed globally via AuthContext
- All styling uses Tailwind classes with the `cn()` utility for conditional classes
---
name: "Bun React Tailwind Template"
description: "Guide for developing with a React 19 + TypeScript + Bun + Tailwind stack"
category: "Frontend Framework"
author: "Agents.md Collection"
authorUrl: "https://github.com/gakeez/agents_md_collection"
tags: ["react", "typescript", "bun", "tailwind", "shadcn"]
lastUpdated: "2024-12-19"
---

# Bun React Project Development Guide

## Project Overview

This template uses **Bun** as the runtime and build tool. The frontend is built with **React 19**, **TypeScript**, and **Tailwind CSS**, providing a lightweight e-commerce style UI. Routing is handled with **React Router** and UI components are based on the **shadcn/ui** collection.

## Tech Stack

- **Runtime & Build**: Bun
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI based)
- **Routing**: React Router v6
- **Form Handling**: react-hook-form + zod

## Project Structure

```
ui_test/
├── src/
│   ├── components/       # Reusable UI and page components
│   ├── pages/            # Route pages
│   ├── context/          # React context providers
│   ├── lib/              # Utility helpers
│   ├── styles/           # Tailwind configuration
│   ├── App.tsx           # Router configuration
│   ├── frontend.tsx      # React entry for the browser
│   ├── index.tsx         # Bun server entry
│   └── index.html        # HTML template
├── styles/globals.css    # Tailwind base styles
├── build.ts              # Bun build script
├── bunfig.toml           # Bun configuration
└── package.json
```

## Getting Started

### Prerequisites
- **Bun** runtime >= 1.2.15
- Optional: Node.js if additional tooling is needed

### Installation
```bash
bun install
```

### Development Server
```bash
bun dev
```
This starts the Bun server defined in `src/index.tsx` with hot reloading.

### Production Build
```bash
bun run build.ts
```
The build script scans `src/` for `.html` entrypoints and outputs the compiled assets to `dist/`.

### Production Start
```bash
bun start
```
Runs the compiled server with `NODE_ENV=production`.

## Development Guidelines

1. **Use Function Components** and React Hooks.
2. **TypeScript First**: define interfaces for component props.
3. **Tailwind CSS** is preconfigured in `styles/globals.css`. Use the `cn` helper from `src/lib/utils.ts` to compose class names.
4. **Alias Imports**: `@/` maps to `src/` (configured in `tsconfig.json`). Example:
   ```ts
   import Button from "@/components/ui/button";
   ```
5. **Forms**: Use the custom form components in `src/components/ui/form.tsx` together with `react-hook-form`.
6. **Routing**: See `src/App.tsx` for route definitions. Pages live under `src/pages`.

## Common Tasks

- **Add a New Page**: Create a file in `src/pages/` and add a `<Route>` entry in `src/App.tsx`.
- **Create UI Components**: Place reusable components under `src/components/`. Follow PascalCase naming and export a default component.
- **API Requests**: Use the built-in `fetch` API from Bun. The example `src/APITester.tsx` demonstrates simple usage.

## Reference Commands

```bash
# Format and lint if desired (no tooling included by default)
# bun run lint
# bun run format
```

## Additional Resources
- [Bun Documentation](https://bun.sh/docs)
- [React Router](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/)

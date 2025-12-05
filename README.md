# RoshiniLovesFood

A sassy, scrapbook-style vegetarian recipe journal built with modern web technologies.

**Current Version:** 1.1.0  
**Last Updated:** 2025-12-05 @ 10:30 UTC

## Features

- **Password-Protected Access** - Secure entry with obfuscated access codes
- **Recipe Management** - Add, edit, delete, and organize vegetarian recipes
- **Import/Export** - Backup and restore recipes via JSON
- **Search & Filter** - Find recipes by title, description, or tags
- **Vegetarian Validation** - Automatic validation ensures all recipes are vegetarian-friendly
- **Pull-to-Refresh** - Mobile gesture support for refreshing recipe list
- **Swipe Navigation** - Swipe left/right to browse recipes on mobile
- **Custom Cursor** - Unique R-cursor design for desktop users
- **Scrapbook Aesthetic** - Handcrafted visual design with animations

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Query
- **Routing**: React Router DOM
- **Fonts**: Playfair Display (headings), Roboto Mono (body)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd roshini-loves-food

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
├── public/
│   ├── r-cursor.png        # Custom cursor image
│   ├── redbow.png          # Decorative bow image
│   ├── roshie-avatar.jpg   # Profile avatar
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn/ui components (40+)
│   │   ├── AccessGate.tsx  # Password entry screen
│   │   ├── NavLink.tsx     # Navigation link component
│   │   ├── RecipeCard.tsx  # Recipe card display
│   │   ├── RecipeDetail.tsx # Full recipe view with swipe
│   │   ├── RecipeForm.tsx  # Add/edit recipe form
│   │   └── RecipeImport.tsx # JSON import interface
│   ├── hooks/
│   │   ├── use-mobile.tsx  # Mobile detection hook
│   │   ├── use-toast.ts    # Toast notification hook
│   │   ├── usePullToRefresh.ts # Pull-to-refresh gesture
│   │   ├── useRecipes.ts   # Recipe CRUD operations
│   │   └── useSwipe.ts     # Swipe gesture detection
│   ├── pages/
│   │   ├── Index.tsx       # Main application page
│   │   └── NotFound.tsx    # 404 error page
│   ├── types/
│   │   └── recipe.ts       # Recipe TypeScript types
│   ├── utils/
│   │   ├── demoRecipes.ts  # Sample recipe data
│   │   └── vegValidator.ts # Vegetarian validation
│   ├── lib/
│   │   └── utils.ts        # cn() utility function
│   ├── App.tsx             # Root component
│   ├── index.css           # Design system & styles
│   └── main.tsx            # Entry point
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── CHANGELOG.md            # Detailed version history
└── package.json
```

## Design System

The application uses a dark theme with the following color palette:

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | `0 0% 0%` | Page background |
| `--foreground` | `56 100% 64%` | Primary text (golden yellow) |
| `--primary` | `6 35% 40%` | Primary accent (brownish red) |
| `--secondary` | `267 25% 66%` | Secondary accent (purple) |
| `--accent` | `88 25% 32%` | Accent color (olive green) |

## Recent Changes

### v1.1.0 (2025-12-05)
- Enhanced CHANGELOG format with timestamps and function tracking
- Updated README documentation

### v1.0.10 (2025-12-04)
- Fixed mobile button overflow issues
- **Files Modified:** `Index.tsx`, `RecipeForm.tsx`, `RecipeDetail.tsx`

### v1.0.9 (2025-12-04)
- Added pull-to-refresh gesture for mobile
- **Files Added:** `usePullToRefresh.ts`
- **Files Modified:** `Index.tsx`

### v1.0.8 (2025-12-04)
- Obfuscated passwords with base64 encoding
- **Files Modified:** `AccessGate.tsx`, `RecipeDetail.tsx`

### v1.0.7 (2025-12-04)
- Added swipe navigation for recipes
- **Files Added:** `useSwipe.ts`
- **Files Modified:** `RecipeDetail.tsx`, `Index.tsx`

See [CHANGELOG.md](./CHANGELOG.md) for complete version history with timestamps and function-level changes.

## Key Functions Reference

| File | Function | Purpose |
|------|----------|---------|
| `useRecipes.ts` | `useRecipes()` | Recipe CRUD, localStorage persistence |
| `usePullToRefresh.ts` | `usePullToRefresh()` | Touch gesture for refresh |
| `useSwipe.ts` | `useSwipe()` | Swipe gesture detection |
| `vegValidator.ts` | `isVegetarian()` | Validates recipe ingredients |
| `AccessGate.tsx` | `AccessGate()` | Password protection UI |

## License

Private project - All rights reserved.

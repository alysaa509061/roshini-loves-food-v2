# RoshiniLovesFood

A sassy, scrapbook-style vegetarian recipe journal built with modern web technologies.

## Features

- **Password-Protected Access** - Secure entry with personalized access codes
- **Recipe Management** - Add, edit, delete, and organize vegetarian recipes
- **Import/Export** - Backup and restore recipes via JSON
- **Search & Filter** - Find recipes by title, description, or tags
- **Vegetarian Validation** - Automatic validation ensures all recipes are vegetarian-friendly
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
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AccessGate.tsx  # Password entry screen
│   │   ├── NavLink.tsx
│   │   ├── RecipeCard.tsx
│   │   ├── RecipeDetail.tsx
│   │   ├── RecipeForm.tsx
│   │   └── RecipeImport.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useRecipes.ts
│   ├── pages/
│   │   ├── Index.tsx       # Main application page
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── recipe.ts
│   ├── utils/
│   │   ├── demoRecipes.ts
│   │   └── vegValidator.ts
│   ├── App.tsx
│   ├── index.css           # Design system & custom styles
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── vite.config.ts
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

## License

Private project - All rights reserved.

# Changelog

All notable changes to RoshiniLovesFood are documented in this file.

---

## [1.0.6] - 2025-12-03

### Changed
- Improved responsive design across all components
- Removed remaining emojis from RecipeCard, RecipeDetail, RecipeForm, RecipeImport

### Files Modified
- `src/components/RecipeCard.tsx` - Removed emoji from Veg badge
- `src/components/RecipeDetail.tsx` - Made header responsive, removed emojis
- `src/components/RecipeForm.tsx` - Made grid responsive for mobile, removed emoji
- `src/components/RecipeImport.tsx` - Removed emojis from info text

### Responsive Improvements
- RecipeDetail: Stacked layout on mobile for header and actions
- RecipeForm: Single column grid on mobile, two columns on larger screens
- All components now adapt properly to device width

---

## [1.0.5] - 2025-12-03

### Changed
- Updated custom cursor system: r-cursor.png as default, system cursor on hover
- Removed all emoji characters from UI text
- Removed decorative bow image from AccessGate screen
- Removed floating bow decoration from main header
- Updated password validation to accept multiple date formats

### Files Modified
- `src/index.css` - Updated cursor CSS rules with cache-busting
- `src/components/AccessGate.tsx` - Removed bow image, emojis, updated password list
- `src/pages/Index.tsx` - Removed emojis from toasts, removed bow from header
- `public/r-cursor.png` - Restored original uploaded cursor image

### Security
- Updated password validation to accept multiple date-based formats

---

## [1.0.4] - 2025-12-03

### Changed
- Resized redbow.png cursor to 32x32 pixels
- Updated cursor hotspot positions in CSS

### Files Modified
- `public/redbow.png` - Resized to 32x32
- `src/index.css` - Updated cursor hotspot values

---

## [1.0.3] - 2025-12-03

### Added
- Custom hover cursor (r-cursor.png) from user upload
- Smooth cursor transition animations

### Files Modified
- `public/r-cursor.png` - Added new hover cursor image
- `src/index.css` - Added cursor transition effects

---

## [1.0.2] - 2025-12-03

### Added
- Password-protected AccessGate component
- Custom cursor support for desktop devices (redbow.png, r-cursor.png)
- Scrapbook-style animations (float, shake)
- Torn edge and sticky note CSS effects
- User-select restrictions for non-interactive text

### Files Modified
- `src/components/AccessGate.tsx` - Created password gate component
- `src/pages/Index.tsx` - Integrated AccessGate, added header with avatar
- `src/index.css` - Added custom cursor rules, animations, scrapbook effects

---

## [1.0.1] - 2025-12-03

### Added
- Recipe management system (CRUD operations)
- Recipe import/export functionality (JSON)
- Search and filter capabilities
- Vegetarian validation utility
- Demo recipes data

### Files Created
- `src/components/RecipeCard.tsx`
- `src/components/RecipeDetail.tsx`
- `src/components/RecipeForm.tsx`
- `src/components/RecipeImport.tsx`
- `src/hooks/useRecipes.ts`
- `src/types/recipe.ts`
- `src/utils/demoRecipes.ts`
- `src/utils/vegValidator.ts`

---

## [1.0.0] - 2025-12-03

### Initial Release
- Project scaffolding with Vite + React + TypeScript
- Tailwind CSS configuration with custom design system
- shadcn/ui component library integration
- Dark theme with golden yellow foreground
- Playfair Display + Roboto Mono typography

### Project Structure
```
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   ├── r-cursor.png
│   ├── redbow.png
│   ├── robots.txt
│   └── roshie-avatar.jpg
├── src/
│   ├── components/
│   │   ├── ui/              # 40+ shadcn components
│   │   ├── AccessGate.tsx
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
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── recipe.ts
│   ├── utils/
│   │   ├── demoRecipes.ts
│   │   └── vegValidator.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── postcss.config.js
├── components.json
└── package.json
```

---

## Version History Summary

| Version | Date | Summary |
|---------|------|---------|
| 1.0.5 | 2025-12-03 | Cursor updates, emoji removal, password expansion |
| 1.0.4 | 2025-12-03 | Cursor size optimization |
| 1.0.3 | 2025-12-03 | Custom hover cursor added |
| 1.0.2 | 2025-12-03 | AccessGate, custom cursors, animations |
| 1.0.1 | 2025-12-03 | Recipe management system |
| 1.0.0 | 2025-12-03 | Initial release |

# Changelog

All notable changes to RoshiniLovesFood are documented in this file.

Format: `[Version] - YYYY-MM-DD @ HH:MM UTC`

---

## [1.1.0] - 2025-12-05 @ 10:30 UTC

### Changed
- Enhanced CHANGELOG format with timestamps and function tracking
- Updated README with detailed change documentation

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `CHANGELOG.md` | Modified | N/A (documentation) |
| `README.md` | Modified | N/A (documentation) |

---

## [1.0.10] - 2025-12-04 @ 16:45 UTC

### Fixed
- Mobile button overflow causing horizontal scroll
- Action buttons now wrap properly on small screens

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `src/pages/Index.tsx` | Modified | `Index()` - action bar button layout |
| `src/components/RecipeForm.tsx` | Modified | `RecipeForm()` - form button stacking |
| `src/components/RecipeDetail.tsx` | Modified | `RecipeDetail()` - back/action button responsive layout |

---

## [1.0.9] - 2025-12-04 @ 15:20 UTC

### Added
- Pull-to-refresh gesture for mobile recipe list
- Visual refresh indicator with animated spinner icon

### Files Added
| File | Action | Functions/Exports |
|------|--------|-------------------|
| `src/hooks/usePullToRefresh.ts` | Created | `usePullToRefresh()` hook |

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `src/pages/Index.tsx` | Modified | `Index()` - added touch handlers, `handleRefresh()` callback |

---

## [1.0.8] - 2025-12-04 @ 14:00 UTC

### Security
- Obfuscated access codes using base64 encoding to prevent plain-text exposure

### Changed
- Improved touch targets on mobile (larger buttons with touch-manipulation)

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `src/components/AccessGate.tsx` | Modified | `AccessGate()` - `atob()` decoding for passwords |
| `src/components/RecipeDetail.tsx` | Modified | `RecipeDetail()` - button sizing classes |

---

## [1.0.7] - 2025-12-04 @ 12:30 UTC

### Added
- Touch-friendly swipe gestures for recipe navigation on mobile
- Previous/Next navigation buttons on desktop
- Custom swipe gesture hook

### Files Added
| File | Action | Functions/Exports |
|------|--------|-------------------|
| `src/hooks/useSwipe.ts` | Created | `useSwipe()` hook |

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `src/components/RecipeDetail.tsx` | Modified | `RecipeDetail()` - added `useSwipe`, navigation handlers |
| `src/pages/Index.tsx` | Modified | `Index()` - added `onNavigate`, `currentIndex`, `totalRecipes` props |

---

## [1.0.6] - 2025-12-03 @ 22:15 UTC

### Changed
- Improved responsive design across all components
- Removed remaining emojis from UI

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `src/components/RecipeCard.tsx` | Modified | `RecipeCard()` - badge text |
| `src/components/RecipeDetail.tsx` | Modified | `RecipeDetail()` - header layout |
| `src/components/RecipeForm.tsx` | Modified | `RecipeForm()` - grid classes |
| `src/components/RecipeImport.tsx` | Modified | `RecipeImport()` - info text |

---

## [1.0.5] - 2025-12-03 @ 20:00 UTC

### Changed
- Updated custom cursor system
- Removed all emoji characters from UI
- Removed decorative bow images
- Updated password validation formats

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `src/index.css` | Modified | CSS cursor rules |
| `src/components/AccessGate.tsx` | Modified | `AccessGate()` - password validation logic |
| `src/pages/Index.tsx` | Modified | `Index()` - toast messages, header JSX |

---

## [1.0.4] - 2025-12-03 @ 18:30 UTC

### Changed
- Resized redbow.png cursor to 32x32 pixels
- Updated cursor hotspot positions

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `public/redbow.png` | Modified | N/A (asset) |
| `src/index.css` | Modified | CSS hotspot values |

---

## [1.0.3] - 2025-12-03 @ 17:00 UTC

### Added
- Custom hover cursor from user upload
- Smooth cursor transition animations

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `public/r-cursor.png` | Added | N/A (asset) |
| `src/index.css` | Modified | CSS transition effects |

---

## [1.0.2] - 2025-12-03 @ 15:00 UTC

### Added
- Password-protected AccessGate component
- Custom cursor support for desktop
- Scrapbook-style animations
- Torn edge and sticky note effects

### Files Added
| File | Action | Functions/Exports |
|------|--------|-------------------|
| `src/components/AccessGate.tsx` | Created | `AccessGate()` component |

### Files Modified
| File | Action | Functions Changed |
|------|--------|-------------------|
| `src/pages/Index.tsx` | Modified | `Index()` - state management, conditional rendering |
| `src/index.css` | Modified | Added keyframes, utility classes |

---

## [1.0.1] - 2025-12-03 @ 12:00 UTC

### Added
- Recipe management system (CRUD operations)
- Recipe import/export functionality
- Search and filter capabilities
- Vegetarian validation utility

### Files Created
| File | Action | Functions/Exports |
|------|--------|-------------------|
| `src/components/RecipeCard.tsx` | Created | `RecipeCard()` |
| `src/components/RecipeDetail.tsx` | Created | `RecipeDetail()` |
| `src/components/RecipeForm.tsx` | Created | `RecipeForm()` |
| `src/components/RecipeImport.tsx` | Created | `RecipeImport()` |
| `src/hooks/useRecipes.ts` | Created | `useRecipes()` hook |
| `src/types/recipe.ts` | Created | `Recipe` type |
| `src/utils/demoRecipes.ts` | Created | `demoRecipes` array |
| `src/utils/vegValidator.ts` | Created | `isVegetarian()`, `NON_VEG_KEYWORDS` |

---

## [1.0.0] - 2025-12-03 @ 10:00 UTC

### Initial Release
- Project scaffolding with Vite + React + TypeScript
- Tailwind CSS configuration with custom design system
- shadcn/ui component library integration
- Dark theme with golden yellow foreground

### Files Created
| File | Action | Description |
|------|--------|-------------|
| `src/App.tsx` | Created | Root application component |
| `src/main.tsx` | Created | React entry point |
| `src/index.css` | Created | Design system, global styles |
| `src/pages/Index.tsx` | Created | Main page component |
| `src/pages/NotFound.tsx` | Created | 404 page |
| `src/lib/utils.ts` | Created | `cn()` utility function |
| `tailwind.config.ts` | Created | Tailwind configuration |
| `vite.config.ts` | Created | Vite configuration |
| `index.html` | Created | HTML entry point |

---

## Version History Summary

| Version | Date | Time (UTC) | Summary |
|---------|------|------------|---------|
| 1.1.0 | 2025-12-05 | 10:30 | Enhanced changelog format |
| 1.0.10 | 2025-12-04 | 16:45 | Mobile button overflow fix |
| 1.0.9 | 2025-12-04 | 15:20 | Pull-to-refresh gesture |
| 1.0.8 | 2025-12-04 | 14:00 | Password obfuscation |
| 1.0.7 | 2025-12-04 | 12:30 | Swipe navigation |
| 1.0.6 | 2025-12-03 | 22:15 | Responsive improvements |
| 1.0.5 | 2025-12-03 | 20:00 | Cursor & emoji cleanup |
| 1.0.4 | 2025-12-03 | 18:30 | Cursor optimization |
| 1.0.3 | 2025-12-03 | 17:00 | Custom hover cursor |
| 1.0.2 | 2025-12-03 | 15:00 | AccessGate, animations |
| 1.0.1 | 2025-12-03 | 12:00 | Recipe management |
| 1.0.0 | 2025-12-03 | 10:00 | Initial release |

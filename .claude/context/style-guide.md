# The Bear's To-Do List - Design Style Guide

**Version:** 1.0
**Last Updated:** 2025-12-29
**Design Direction:** Modern & Minimal with Bear-Themed Warm Aesthetics

## Design Philosophy

This style guide defines the visual language for The Bear's To-Do List, combining:
- **Linear's** sleek interactions and subtle depth
- **Todoist's** clear priority system and task hierarchy
- **Notion's** excellent typography and content-focused spacing
- **Bear-themed warmth** through earthy, natural color palette

### Core Principles
1. **Warm & Inviting:** Use earthy tones that feel natural and comfortable
2. **Clear Hierarchy:** Information should be instantly scannable
3. **Subtle Depth:** Minimal shadows and layers to create spatial relationships
4. **Generous Spacing:** Let content breathe with ample white space
5. **Fast & Responsive:** Snappy interactions with purposeful micro-animations

---

## Color System

### Primary Brand Colors

```css
/* Primary - Warm Brown (The Bear) */
--color-primary-50: #fdf8f6;
--color-primary-100: #f2e8e5;
--color-primary-200: #eaddd7;
--color-primary-300: #e0cec7;
--color-primary-400: #d2bab0;
--color-primary-500: #bfa094;  /* Main brand color */
--color-primary-600: #a18072;
--color-primary-700: #836655;
--color-primary-800: #6d5347;
--color-primary-900: #5c4a3f;

/* Accent - Warm Amber */
--color-accent-50: #fffbeb;
--color-accent-100: #fef3c7;
--color-accent-200: #fde68a;
--color-accent-300: #fcd34d;
--color-accent-400: #fbbf24;
--color-accent-500: #f59e0b;  /* Accent for highlights */
--color-accent-600: #d97706;
--color-accent-700: #b45309;
--color-accent-800: #92400e;
--color-accent-900: #78350f;
```

### Neutral Palette

```css
/* Neutrals - Warm Grays */
--color-neutral-0: #ffffff;
--color-neutral-50: #fafaf9;
--color-neutral-100: #f5f5f4;
--color-neutral-200: #e7e5e4;
--color-neutral-300: #d6d3d1;
--color-neutral-400: #a8a29e;
--color-neutral-500: #78716c;
--color-neutral-600: #57534e;
--color-neutral-700: #44403c;
--color-neutral-800: #292524;
--color-neutral-900: #1c1917;
--color-neutral-950: #0c0a09;
```

### Semantic Colors

```css
/* Success - Earthy Green */
--color-success-50: #f0fdf4;
--color-success-100: #dcfce7;
--color-success-500: #22c55e;
--color-success-600: #16a34a;
--color-success-700: #15803d;

/* Error - Warm Red */
--color-error-50: #fef2f2;
--color-error-100: #fee2e2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;
--color-error-700: #b91c1c;

/* Warning - Amber */
--color-warning-50: #fffbeb;
--color-warning-100: #fef3c7;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;
--color-warning-700: #b45309;

/* Info - Muted Blue */
--color-info-50: #eff6ff;
--color-info-100: #dbeafe;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;
--color-info-700: #1d4ed8;
```

### Priority Colors (Task-Specific)

```css
/* High Priority - Urgent Red */
--priority-high-bg: #fee2e2;
--priority-high-text: #991b1b;
--priority-high-border: #fca5a5;

/* Medium Priority - Balanced Amber */
--priority-medium-bg: #fef3c7;
--priority-medium-text: #92400e;
--priority-medium-border: #fcd34d;

/* Low Priority - Calm Green */
--priority-low-bg: #dcfce7;
--priority-low-text: #166534;
--priority-low-border: #86efac;
```

### Background Colors

```css
--bg-primary: #ffffff;
--bg-secondary: #fafaf9;
--bg-tertiary: #f5f5f4;
--bg-overlay: rgba(0, 0, 0, 0.5);
```

### Text Colors

```css
--text-primary: #1c1917;      /* Body text, headings */
--text-secondary: #57534e;    /* Supporting text */
--text-tertiary: #a8a29e;     /* Placeholders, disabled */
--text-inverse: #ffffff;      /* On dark backgrounds */
--text-link: #a18072;         /* Links */
--text-link-hover: #836655;   /* Link hover */
```

### Border Colors

```css
--border-light: #e7e5e4;
--border-medium: #d6d3d1;
--border-dark: #a8a29e;
--border-focus: #bfa094;      /* Primary-500 */
```

---

## Typography

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
```

**Primary Font:** Inter (via Bunny Fonts - privacy-friendly CDN)
**CDN Link:** `https://fonts.bunny.net/css?family=inter:400,500,600,700`
**Fallback:** System font stack for performance

### Type Scale

```css
/* Headings */
--text-h1: 32px;      /* Page titles */
--text-h2: 24px;      /* Section headers */
--text-h3: 20px;      /* Subsection headers */
--text-h4: 18px;      /* Card titles */

/* Body */
--text-base: 15px;    /* Default body text */
--text-sm: 13px;      /* Secondary text, metadata */
--text-xs: 11px;      /* Captions, timestamps */

/* Large */
--text-lg: 17px;      /* Emphasized content */
--text-xl: 20px;      /* Hero text */
```

### Font Weights

```css
--font-normal: 400;    /* Regular body text */
--font-medium: 500;    /* Subtle emphasis */
--font-semibold: 600;  /* Headings, buttons */
--font-bold: 700;      /* Strong emphasis (sparingly) */
```

### Line Heights

```css
--leading-tight: 1.25;     /* Headings */
--leading-normal: 1.5;     /* Body text */
--leading-relaxed: 1.75;   /* Long-form content */
```

### Letter Spacing

```css
--tracking-tight: -0.02em;  /* Large headings */
--tracking-normal: 0;       /* Default */
--tracking-wide: 0.02em;    /* Uppercase labels */
```

---

## Spacing System

**Base Unit:** 8px (0.5rem)

```css
--space-1: 4px;      /* 0.25rem - Tight spacing */
--space-2: 8px;      /* 0.5rem - Base unit */
--space-3: 12px;     /* 0.75rem - Small gaps */
--space-4: 16px;     /* 1rem - Default spacing */
--space-5: 20px;     /* 1.25rem - Medium spacing */
--space-6: 24px;     /* 1.5rem - Large spacing */
--space-8: 32px;     /* 2rem - Section spacing */
--space-10: 40px;    /* 2.5rem - Large sections */
--space-12: 48px;    /* 3rem - Page margins */
--space-16: 64px;    /* 4rem - Major sections */
--space-20: 80px;    /* 5rem - Hero sections */
```

### Usage Guidelines

- **Tight spacing (4-8px):** Between related items, icon-text pairs
- **Default spacing (16px):** Between form fields, list items
- **Section spacing (24-32px):** Between distinct UI sections
- **Page margins (48-64px):** Around main content areas

---

## Border Radius

```css
--radius-sm: 6px;      /* Input fields, small buttons */
--radius-md: 8px;      /* Buttons, badges */
--radius-lg: 12px;     /* Cards, modals */
--radius-xl: 16px;     /* Large containers */
--radius-full: 9999px; /* Pills, circular elements */
```

---

## Shadows & Elevation

Subtle shadows inspired by Linear's depth system.

```css
/* Elevation Layers */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* Focus Shadow */
--shadow-focus: 0 0 0 3px rgba(191, 160, 148, 0.3); /* Primary-500 at 30% */
```

### Usage

- **shadow-sm:** Hover states on buttons
- **shadow-base:** Default cards, task items
- **shadow-md:** Dropdowns, popovers
- **shadow-lg:** Modals, dialogs
- **shadow-xl:** Large overlays (rare)

---

## Component Specifications

### Buttons

#### Primary Button
```css
background: var(--color-primary-500);
color: var(--color-neutral-0);
padding: 10px 16px;
border-radius: var(--radius-md);
font-weight: var(--font-semibold);
font-size: var(--text-base);
transition: all 150ms ease-in-out;

/* Hover */
background: var(--color-primary-600);
box-shadow: var(--shadow-sm);

/* Active */
background: var(--color-primary-700);
transform: translateY(1px);

/* Focus */
box-shadow: var(--shadow-focus);
```

#### Secondary Button
```css
background: var(--color-neutral-100);
color: var(--text-primary);
border: 1px solid var(--border-light);
padding: 10px 16px;
border-radius: var(--radius-md);
font-weight: var(--font-medium);

/* Hover */
background: var(--color-neutral-200);
border-color: var(--border-medium);
```

#### Icon Button
```css
width: 36px;
height: 36px;
border-radius: var(--radius-md);
background: transparent;
color: var(--text-secondary);

/* Hover */
background: var(--color-neutral-100);
color: var(--text-primary);
```

### Input Fields

```css
padding: 10px 12px;
border: 1px solid var(--border-light);
border-radius: var(--radius-sm);
font-size: var(--text-base);
color: var(--text-primary);
background: var(--bg-primary);
transition: all 150ms ease-in-out;

/* Focus */
border-color: var(--border-focus);
box-shadow: var(--shadow-focus);
outline: none;

/* Error State */
border-color: var(--color-error-500);
```

### Task List Items

```css
padding: 12px 16px;
border: 1px solid var(--border-light);
border-radius: var(--radius-lg);
background: var(--bg-primary);
margin-bottom: 8px;
transition: all 150ms ease-in-out;

/* Hover */
border-color: var(--border-medium);
box-shadow: var(--shadow-sm);

/* Completed */
opacity: 0.6;
text-decoration: line-through;
```

### Project Sidebar Items

```css
padding: 8px 12px;
border-radius: var(--radius-md);
color: var(--text-secondary);
font-size: var(--text-base);
font-weight: var(--font-medium);
cursor: pointer;
transition: all 120ms ease-in-out;

/* Hover */
background: var(--color-neutral-100);
color: var(--text-primary);

/* Active/Selected */
background: var(--color-primary-100);
color: var(--color-primary-700);
font-weight: var(--font-semibold);
```

### Modal/Dialog

```css
background: var(--bg-primary);
border-radius: var(--radius-lg);
padding: 24px;
box-shadow: var(--shadow-xl);
max-width: 500px;
border: 1px solid var(--border-light);
```

### Toast Notification

```css
background: var(--color-neutral-900);
color: var(--text-inverse);
padding: 12px 16px;
border-radius: var(--radius-md);
box-shadow: var(--shadow-lg);
font-size: var(--text-sm);
font-weight: var(--font-medium);
```

### Priority Badges

```css
/* High Priority */
background: var(--priority-high-bg);
color: var(--priority-high-text);
border: 1px solid var(--priority-high-border);
padding: 4px 8px;
border-radius: var(--radius-sm);
font-size: var(--text-xs);
font-weight: var(--font-semibold);
text-transform: uppercase;
letter-spacing: var(--tracking-wide);

/* Similar structure for medium and low */
```

---

## Layout & Grid

### Main Layout Structure

```
┌─────────────────────────────────────┐
│ Header (h=60px)                     │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │  Main Content Area       │
│ (w=280px)│                          │
│          │                          │
│          │                          │
└──────────┴──────────────────────────┘
│ Footer (h=60px)                     │
└─────────────────────────────────────┘
```

### Responsive Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

---

## Animations & Transitions

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration

```css
--duration-fast: 120ms;     /* Quick hover states */
--duration-base: 200ms;     /* Default transitions */
--duration-slow: 300ms;     /* Complex animations */
--duration-slower: 500ms;   /* Page transitions */
```

### Common Transitions

```css
/* All-purpose smooth transition */
transition: all 200ms var(--ease-in-out);

/* Specific property transitions (preferred) */
transition: background-color 150ms ease-in-out,
            border-color 150ms ease-in-out,
            transform 150ms ease-in-out;
```

### Micro-interactions

- **Button Press:** `transform: translateY(1px)` on active
- **Hover Lift:** `transform: translateY(-2px)` + subtle shadow
- **Modal Entry:** Fade in + scale from 0.95 to 1
- **Toast Entry:** Slide in from bottom + fade in

---

## Icons

### Icon System

**Source:** Font Awesome 6.0.0 (already integrated)
**Style:** Regular weight for consistency
**Size Scale:**
```css
--icon-xs: 12px;
--icon-sm: 14px;
--icon-base: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### Icon Colors

```css
--icon-primary: var(--text-primary);
--icon-secondary: var(--text-secondary);
--icon-tertiary: var(--text-tertiary);
--icon-accent: var(--color-primary-500);
--icon-success: var(--color-success-600);
--icon-error: var(--color-error-600);
```

### Common Icons

- **Add:** `fa-plus`
- **Delete:** `fa-trash`
- **Edit:** `fa-pencil`
- **Move:** `fa-right-left`
- **Calendar:** `fa-calendar`
- **Project:** `fa-folder`
- **Complete:** `fa-check`
- **Priority High:** `fa-exclamation`
- **Priority Medium:** `fa-minus`
- **Priority Low:** `fa-arrow-down`

---

## Accessibility

### Focus States

All interactive elements must have visible focus states:
```css
outline: none; /* Remove default */
box-shadow: var(--shadow-focus); /* Custom focus ring */
```

### Contrast Ratios (WCAG AA)

- **Normal text:** 4.5:1 minimum
- **Large text (18px+):** 3:1 minimum
- **UI components:** 3:1 minimum

### Keyboard Navigation

- Tab order must be logical
- All actions must be keyboard accessible
- Esc closes modals/dialogs
- Enter submits forms

### Screen Reader Support

- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`)
- Provide `aria-label` for icon-only buttons
- Include `role` attributes where appropriate
- Ensure form labels are properly associated

---

## Dark Mode (Future)

*Reserved for Phase 2. Will include:*
- Dark background palette
- Adjusted contrast ratios
- Inverted shadow system
- System preference detection

---

## Implementation Checklist

- [ ] Add Inter font from Bunny Fonts CDN
- [ ] Define CSS custom properties in `:root`
- [ ] Create utility classes for common patterns
- [ ] Build component library (buttons, inputs, cards)
- [ ] Implement focus states on all interactive elements
- [ ] Test color contrast ratios
- [ ] Add smooth transitions to state changes
- [ ] Optimize for mobile viewports

---

## Design Resources

- **Color Palette:** [Warm Browns & Amber Accents]
- **Typography:** Inter font family via Bunny Fonts
- **Font CDN:** https://fonts.bunny.net/css?family=inter:400,500,600,700
- **Icons:** Font Awesome 6.0.0
- **Inspiration:** Linear, Todoist, Notion

**Design System Version:** 1.0
**Maintained by:** The Bear's To-Do List Team

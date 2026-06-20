# TaskFlow – Frontend Assessment

A fully responsive landing page for the SaaS product **TaskFlow**, built as part of the O2H Front-End Developer Assessment.

# Folder Structure

```
frontend-task/
├── index.html          # Main HTML (semantic, accessible)
├── css/
│   ├── style.css       # Design tokens, base, all components
│   └── responsive.css  # Tablet & mobile breakpoints
├── js/
│   └── app.js          # Mobile menu · Dark mode · Form validation · Blog API
├── images/             # (place any optimised images here)
└── README.md
```

# Features Implemented

# Layout (Section 1)
- Hero — logo, nav, h1, sub-heading, dual CTA, animated mock UI
- Features — 6 cards with icon, title, description
- Pricing — Starter / Professional (highlighted) / Enterprise
- contact — name, email, message form with validation

### Responsive Design (Section 2)
- Mobile (<768px) — hamburger menu, single-column layout
- **Tablet** — two-column features & blog grid
- **Desktop** — full multi-column layout
- Flexbox + CSS Grid + Media Queries throughout

### JavaScript (Section 3)
- **Mobile menu toggle** — animated hamburger, closes on link click / outside click / Escape
- **Form validation** — required fields, email regex, live error messages, success state
- **Dark mode** — persisted via `localStorage`, respects OS preference on first visit

### Accessibility (Section 4)
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels, roles, `aria-expanded`, `aria-required`, `aria-live`, `aria-busy`
- Alt text ready for all images
- Keyboard navigation + visible `:focus-visible` ring
- `prefers-reduced-motion` respected
- Sufficient colour contrast (accent on white ≥ 4.5:1)

### Performance (Section 5)
- CSS custom properties (single source of truth, no duplication)
- Lazy-loading of Blog API via `IntersectionObserver` (only fetches when section scrolls into view)
- Skeleton loaders while API data loads
- Efficient DOM manipulation (batched innerHTML updates, no layout thrash)
- Images lazy-loadable (`loading="lazy"` attribute pattern ready in `images/`)

### Bonus – API Integration (Section 6)
- Fetches 6 posts from `https://jsonplaceholder.typicode.com/posts`
- **Loading state** — shimmer skeleton cards
- **Error state** — styled error banner with message

## 🚀 Setup

No build step required — open `index.html` directly in a browser, or serve with any static server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

## 🌐 Deploy

- **Netlify**: drag the `frontend-task/` folder into [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: `vercel --cwd frontend-task`

## 🧾 Git Commit History (suggested)

```
git init
git add index.html
git commit -m "Initial layout setup"

git add css/style.css
git commit -m "Responsive navbar completed"

git add css/responsive.css
git commit -m "Feature section added"

git add js/app.js
git commit -m "Form validation implemented"

git commit -am "Final optimization and cleanup"
```

## Technologies

- HTML5, CSS3 (custom properties, Grid, Flexbox, Media Queries)
- Vanilla JavaScript ES6+ (no frameworks)
- Google Fonts (Syne + Inter)
- JSONPlaceholder API

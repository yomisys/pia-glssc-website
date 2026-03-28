# Process Intelligence Academy — GLSSC

Landing page for the **Global Lean Six Sigma Consulting (GLSSC) Process Intelligence Academy** — Africa's first professional certification program combining Lean Six Sigma methodology with practical AI integration.

## Project Structure

```
pia-glssc-website/
├── index.html              # Main page
├── assets/
│   ├── css/
│   │   └── style.css       # All styles (design tokens, layout, components)
│   ├── js/
│   │   └── main.js         # Form submission handler, smooth-scroll
│   └── images/             # Place page images here
└── README.md
```

## Page Sections

| Section | Anchor | Description |
|---|---|---|
| Hero | — | Headline, sub-copy, CTA buttons |
| Stats | — | 4 key programme numbers |
| Program | `#program` | About the academy, director credential, 5 pillars |
| Curriculum | `#curriculum` | 8-week DMAIC + AI module grid, industry tracks |
| Pricing | `#pricing` | Green Belt, Black Belt, Corporate Bundle tiers |
| Cohorts | `#cohorts` | 2026 cohort schedule table |
| Apply | `#contact` | Application form with success state |

## Running Locally

No build step required. Open `index.html` directly in a browser, or serve with any static server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Key Design Tokens

Defined as CSS custom properties in `assets/css/style.css`:

| Token | Value | Usage |
|---|---|---|
| `--gold` | `#C9A84C` | Accents, headings, borders |
| `--navy` | `#0E1F38` | Page background |
| `--navy-mid` | `#132947` | Section backgrounds |
| `--cream` | `#F4F0E6` | Body text |
| `--serif` | Cormorant Garamond | Display headings |
| `--mono` | DM Mono | Labels, metadata, UI text |
| `--sans` | Syne | Sub-headings, nav logo |

## Fonts

Loaded from Google Fonts (requires internet connection):
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- [DM Mono](https://fonts.google.com/specimen/DM+Mono)
- [Syne](https://fonts.google.com/specimen/Syne)

## Form Behaviour

The application form (`#application-form`) is handled entirely client-side by `assets/js/main.js`. On submission it:
1. Prevents default browser submission
2. Hides the form
3. Shows the `.form-success` confirmation block, personalised with the applicant's first name

To wire up real form submission, replace the `submit` handler in `main.js` with a `fetch` POST to your backend or a form service (Formspree, Netlify Forms, etc.).

---

© 2026 Global Lean Six Sigma Consulting · Lagos, Nigeria

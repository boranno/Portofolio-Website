# Boranno Golder — Technical Portfolio

Personal technical portfolio for **Boranno Golder**, Computer Science and Engineering graduate (Daffodil International University) focused on **AI, Machine Learning, Data Science, Embedded Systems, and IoT**.

**Live Site:** [https://boranno-golder-portfolio.vercel.app/](https://boranno-golder-portfolio.vercel.app/)

## Architecture

- **Framework-free static HTML5**, modular CSS (`tokens.css` → `base.css` → `layout.css` → `components.css` → `pages/*.css`), and native JavaScript.
- **Shared Navigation & Footer:** Single-source header, mobile drawer, and footer mounted via `assets/js/shell-loader.js` with static first-paint markup on `index.html`.
- **GitHub Pages Compatible:** All internal links and assets use explicit relative paths (`./`, `../`, `../../`) for deployment under `/Portofolio-Website/`.

## Site Structure

```text
├── index.html                          # Homepage
├── about/index.html                    # About & Academic Background
├── work/
│   ├── index.html                      # Selected Work Listing
│   ├── agrishift/index.html            # AgriShift Case Study
│   ├── academic-performance-ml/        # Academic Performance ML Case Study
│   └── esp32-iot/index.html            # ESP32 & IoT Engineering Case Study
├── research/index.html                 # Academic Research Profile
├── cv/index.html                       # Online Curriculum Vitae + Europass PDF
├── contact/index.html                  # Direct Contact & Profiles
├── assets/
│   ├── css/                            # Design tokens, base, layout, components, page styles
│   ├── js/                             # shell-loader.js, main.js, modular ES scripts
│   ├── docs/Boranno_Golder_Europass_CV.pdf
│   └── icons/favicon.svg
└── images/                             # Visual assets & images/README.md asset guide
```

## Local Preview

Serve the repository root over HTTP:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/index.html`.

# Portfolio Visual Asset Guide

This directory stores all visual assets for the portfolio website. All paths referenced from HTML pages must remain **relative** (never root-relative `/images/...`) to preserve compatibility with both `http://localhost:8080/` and GitHub Pages (`/Portofolio-Website/`).

## Directory Structure

| Folder | Purpose | Relative Path from Root (`index.html`) | Relative Path from Depth-1 (`about/`, `work/`, `research/`, `cv/`) | Relative Path from Depth-2 (`work/<project>/`) |
|---|---|---|---|---|
| `images/profile/` | Approved personal portraits (optimized WebP/AVIF + fallback) | `images/profile/` | `../images/profile/` | `../../images/profile/` |
| `images/projects/agrishift/` | AgriShift hero visual, dashboard captures, UI screens | `images/projects/agrishift/` | `../images/projects/agrishift/` | `../../images/projects/agrishift/` |
| `images/projects/academic-ml/` | Academic Performance ML charts, SHAP plots, methodology figures | `images/projects/academic-ml/` | `../images/projects/academic-ml/` | `../../images/projects/academic-ml/` |
| `images/projects/esp32-iot/` | ESP32-S3 prototype photos, wiring, firmware/dashboard captures | `images/projects/esp32-iot/` | `../images/projects/esp32-iot/` | `../../images/projects/esp32-iot/` |
| `images/research/` | Research overview figures, conceptual frameworks, study visuals | `images/research/` | `../images/research/` | `../../images/research/` |
| `images/diagrams/` | System architecture, data pipelines, ML workflows, IoT topologies | `images/diagrams/` | `../images/diagrams/` | `../../images/diagrams/` |
| `images/hardware/` | Board photos, sensor layouts, circuit schematics, lab tests | `images/hardware/` | `../images/hardware/` | `../../images/hardware/` |
| `images/general/` | Shared editorial graphics or general supporting visuals | `images/general/` | `../images/general/` | `../../images/general/` |

*(Existing uncategorized photographs in `images/` root are preserved untouched until curated.)*

## Recommended Formats & Sizing

- **Photographs & UI Screenshots:** Export as **WebP** (or **AVIF** with WebP/JPEG fallback via `<picture>`). Target `1600px` max width for hero visuals and `1200px` max width for gallery items; keep files under `250 KB` where possible.
- **Technical Diagrams & Architecture Charts:** Export as **SVG** (crisp at all DPIs) or high-resolution transparent **PNG / lossless WebP**.
- **Research Plots & Confusion Matrices:** Export as **SVG** or **PNG / WebP** at `2x` resolution (`1400–1800px` wide) so axis labels remain legible in the lightbox.

## Recommended Aspect Ratios & Presentation Rules

| Component Class | Intended Asset Type | Aspect Ratio | `object-fit` |
|---|---|---|---|
| `.media-frame--hero` | Project cover / hero visual | `16 / 9` | `cover` |
| `.media-frame--screen` | Application / dashboard screenshots | `16 / 10` | `cover` |
| `.media-frame--diagram` | System architecture, pipelines, workflows | `16 / 10` | `contain` |
| `.media-frame--viz` | Research charts, confusion matrices, SHAP plots | `16 / 10` (or `4 / 3`) | `contain` |
| `.media-frame--hardware` | Physical hardware & prototype photographs | `4 / 3` | `cover` |
| `.media-frame--schematic` | Circuit diagrams & pinout schematics | `16 / 10` | `contain` |
| `.media-frame--portrait` | Personal portrait plates | `4 / 5` | `cover` |

## Naming Conventions

Use lowercase `kebab-case` with descriptive prefixes and no spaces:

```text
agrishift-hero-dashboard.webp
academic-ml-shap-summary.png
academic-ml-confusion-matrix.webp
esp32-s3-farm-prototype.webp
esp32-system-architecture.svg
portrait-boranno-golder.webp
```

## Replacing a Placeholder with a Real Asset

1. Save the optimized asset into the appropriate subfolder above.
2. Replace the placeholder block inside `<figure>` with a semantic `<picture>` or `<img>`:
   - Include explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
   - Add `loading="lazy"` and `decoding="async"` on all below-the-fold images (omit `loading="lazy"` on above-the-fold hero images).
   - Write descriptive `alt` text (or `alt=""` if purely decorative).
   - Add `data-lightbox` to the `.media-frame` (or `<img>`) to enable the accessible click-to-zoom lightbox viewer.

### Example: Project Screenshot with Lightbox

```html
<figure class="media-figure">
  <div class="media-frame media-frame--screen" data-lightbox>
    <img
      src="../../images/projects/agrishift/agrishift-dashboard.webp"
      alt="AgriShift bilingual crop-rotation decision-support dashboard interface"
      width="1600"
      height="1000"
      loading="lazy"
      decoding="async"
    >
  </div>
  <figcaption class="media-caption">
    <span class="mono-label">FIG. 02</span>
    <span class="mono-meta">AgriShift crop-rotation dashboard view.</span>
  </figcaption>
</figure>
```

### Example: Technical Diagram (`object-fit: contain`)

```html
<figure class="media-figure media-diagram">
  <div class="media-frame media-frame--diagram" data-lightbox>
    <img
      src="../../images/diagrams/esp32-system-architecture.svg"
      alt="End-to-end ESP32-S3 sensor, TinyML inference, and Firebase data pipeline diagram"
      width="1600"
      height="1000"
      loading="lazy"
      decoding="async"
    >
  </div>
  <figcaption class="media-caption">
    <span class="mono-label">FIG. 03</span>
    <span class="mono-meta">System architecture from DHT22/MQ-135 sensors to Firebase dashboard.</span>
  </figcaption>
</figure>
```

# SLA Calculator Specification

## 1. Introduction
This document specifies requirements and design for a lightweight, client-side SLA (Service Level Agreement) downtime calculator. The application will be hosted on GitHub Pages, require no server-side dependencies, and run entirely in the browser.

## 2. Objectives
- Provide users with accurate downtime breakdowns for common SLA tiers.
- Allow custom SLA targets and dynamic recalculation.
- Support configurable working hours and weekend inclusion/exclusion.
- Enable shareable deep links via URL parameters.
- Maintain a minimal, modern, and accessible user interface.

## 3. Audience
Target users include site reliability engineers, system administrators, and project managers who need quick, on-the-fly calculations of allowable downtime.

## 4. Scope
- Calculation of downtime based on SLA percentages.
- Presentation of breakdowns across minute, hour, day, week, month, quarter, and year intervals.
- Custom user inputs for SLA targets and business hours rules.
- URL parameter parsing for pre-filled calculations.
- Responsive, accessible UI without third-party frameworks.

## 5. Functional Requirements

### 5.1 Predefined SLA Options
- Offer common SLAs: 99%, 99.9%, 99.99%.
- Display breakdown tables for each time interval.

### 5.2 Custom SLA Input
- Accept arbitrary percentage values (e.g., 95.5%).
- Recalculate breakdowns in real time.

### 5.3 Time Configuration
- Toggle inclusion/exclusion of weekends.
- Choose between 24/7 and business-hour calculations.
  - Configurable workweek length (default 40 hours).
  - Custom daily work hours and optional holiday list.

### 5.4 URL Parameter Support
- Support `?sla=<value>` to pre-populate the input.
- Automatically compute on page load when parameter is present.

### 5.5 Output & Export
- Show results in a clean table or list.
- (Optional) Export results to CSV or JSON format.

## 6. Non-Functional Requirements

### 6.1 Performance
- Ultra-lightweight assets (no heavy libraries). 
- Instant recalculation (<50ms) for any input.

### 6.2 Accessibility
- Keyboard navigable.
- ARIA labels for inputs and tables.
- High color contrast.

### 6.3 Compatibility
- Modern browsers (latest Chrome, Firefox, Safari, Edge).
- Mobile-responsive layout.

## 7. UI/UX Guidelines
- Minimalist design with clear typography (e.g., Inter or system UI).
- Logical grouping of controls and results.
- Responsive layout: single-column on narrow viewports.
- Clear call-to-action for custom input and toggles.

## 8. Technical Architecture
- Vanilla JavaScript for computation and DOM updates.
- Semantic HTML5 and modular CSS (no preprocessors).
- Optional inclusion of a small utility library (e.g., day.js) for date/time handling.
- Deployment via GitHub Pages (static site).

## 9. Future Extensions
- Time zone awareness and DST handling.
- Dark mode toggle.
- Localization support (i18n).
- Embeddable widget version.
- Historical trend visualizations and alerts.

## 10. CI/CD & Deployment
- GitHub Pages setup options:
  - Deploy from `main` branch using `/docs` folder
  - Deploy to `gh-pages` branch
- Create `/docs` directory (or build output folder) and include:
  - `index.html`, CSS, JS assets
  - `.nojekyll` file to prevent Jekyll processing
- GitHub Actions workflow (`.github/workflows/deploy.yml`):
  - Trigger on `push` to `main`
  - Use `peaceiris/actions-gh-pages@v3` to publish `/docs` (or build output) to GitHub Pages
- Configure repository settings:
  - GitHub Pages source: `main` branch `/docs` folder (or `gh-pages` branch)
- Update project `README.md` with deployment and update instructions

## 11. README & Documentation

### 11.1 README.md
- Provide concise project overview and purpose
- List key features and capabilities
- Instructions for getting started:
  - Clone repository
  - Open `index.html` in browser (or navigate to GitHub Pages URL)
  - Use preconfigured or custom SLAs
- Guidance on URL parameter usage (e.g., `?sla=99.9`)
- Notes on configuration toggles (weekends, business hours)
- Contribution guidelines and code of conduct
- License information (e.g., MIT)

### 11.2 In-Repo Documentation (docs/ folder)
- Create a `docs/` directory at the project root
- Include `usage.md` (detailed walkthrough of every feature):
  - SLA breakdown tables explanation
  - Custom SLA input behavior
  - Time configuration toggles
  - URL parameter deep link usage
- Optionally separate files:
  - `architecture.md` (technical overview)
  - `developer-guide.md` (how to extend or integrate)
- Link documentation files from README


---
*End of specification.*

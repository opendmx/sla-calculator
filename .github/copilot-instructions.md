# SLA Calculator - GitHub Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the information here.

## Project Overview

SLA Calculator is a static web application built with vanilla HTML, CSS, and JavaScript that calculates Service Level Agreement uptime percentages and downtime allowances. It requires no build process, no dependencies, and runs entirely in the browser.

## Working Effectively

### Bootstrap and Run the Application
- Clone the repository and navigate to the root directory
- Run locally using any static web server:
  ```bash
  # Using Python 3 (recommended)
  python3 -m http.server 8000
  
  # Using Python 2
  python -m SimpleHTTPServer 8000
  
  # Using Node.js http-server (if available)
  npx http-server
  
  # Using PHP
  php -S localhost:8000
  ```
- Navigate to `http://localhost:8000` in your browser
- **Timing**: Application loads in under 10ms - it's instant
- **Alternative**: Open `index.html` directly in browser (file:// protocol works)

### No Installation or Build Required
- **CRITICAL**: This project has NO package.json, NO dependencies, NO build process
- Do NOT run `npm install` or any build commands - they don't exist and aren't needed
- Do NOT look for or create package.json, webpack, or other build tools
- Everything runs directly in the browser with vanilla JavaScript

### Manual Validation Scenarios
Always manually test the application after making changes by running through these scenarios:

1. **Basic SLA Calculation Test**:
   - Start the local server and open the app
   - Change SLA Target to 99.95%
   - Verify Allowed Downtime shows "21.6 minutes" for Monthly period
   - Change Time Period to "Yearly" 
   - Verify Allowed Downtime changes to "4h 23m"

2. **URL Parameter Test**:
   - Navigate to `http://localhost:8000?sla=99.5`
   - Verify SLA Target field is pre-filled with "99.5"
   - Verify calculations update automatically

3. **Real-time Calculation Test**:
   - Type different values in SLA Target field
   - Verify results update immediately as you type
   - Test edge cases: 0%, 100%, 99.999%

4. **Time Period Testing**:
   - Test all time periods: Per Minute, Per Hour, Daily, Weekly, Monthly, Quarterly, Yearly
   - Verify calculations adjust appropriately for each period

## Project Structure

```
├── index.html          # Main application (91 lines)
├── js/app.js          # Core calculation logic (168 lines) 
├── css/styles.css     # Modern UI styles (229 lines)
├── css/style.css      # Alternative/older styles (51 lines)
├── docs/              # Alternative simple version deployed to GitHub Pages
│   └── index.html     # Simpler calculator version (130 lines)
├── .github/workflows/ # Deployment automation
│   └── deploy.yml     # GitHub Pages deployment
├── README.md          # Project documentation
├── spec.md           # Detailed project specification
├── brainstorm.md     # Project ideas and planning
└── .nojekyll         # Prevents Jekyll processing
```

## Key Files and Components

### Main Application (`index.html`)
- Modern, responsive SLA calculator interface
- Uses Inter font from Google Fonts
- References `css/styles.css` and `js/app.js`

### Calculation Engine (`js/app.js`)
- Pure vanilla JavaScript, no dependencies
- Real-time calculation updates via event listeners
- URL parameter parsing for `?sla=` parameter
- Time formatting logic for human-readable output
- Supports time periods: minute, hour, day, week, month, quarter, year

### Styling (`css/styles.css`)
- Modern CSS Grid and Flexbox layout
- Responsive design for mobile and desktop
- Inter font family with system font fallbacks
- Clean, minimal design with subtle shadows and gradients

## Common Tasks

### Testing Changes
- Always start a local web server to test changes
- Never test with file:// protocol for development - use HTTP server
- Test on both desktop and mobile viewports
- Verify calculations with known SLA values:
  - 99.9% yearly = 8h 45m downtime
  - 99.95% yearly = 4h 23m downtime  
  - 99.99% yearly = 52m 34s downtime

### Making Code Changes
- HTML changes: Edit `index.html` directly
- JavaScript changes: Edit `js/app.js` directly  
- CSS changes: Edit `css/styles.css` directly
- No compilation or build step required
- Refresh browser to see changes immediately

### Adding New Features
- Follow existing vanilla JavaScript patterns in `js/app.js`
- Use existing CSS utility classes and design patterns
- Maintain mobile responsiveness
- Test across all supported time periods
- Always validate calculations manually

## Deployment

### GitHub Pages Deployment
- Deployment happens automatically via GitHub Actions (`.github/workflows/deploy.yml`)
- **Important**: GitHub Pages serves the `docs/` folder, not the root
- The `docs/index.html` is a simpler version of the calculator
- Main development happens in root `index.html`
- Production site: GitHub Pages URL (configured in repository settings)

### Manual Deployment Verification
- Check GitHub Actions workflow status after pushing changes
- Verify the `docs/` folder contains the version intended for production
- Test the live GitHub Pages URL after deployment

## Validation and Testing

### Manual Testing Checklist
Always complete this checklist before considering changes complete:

- [ ] Start local server: `python3 -m http.server 8000`
- [ ] Open `http://localhost:8000` and verify app loads
- [ ] Test basic calculation: 99.9% monthly should show ~43.2 minutes
- [ ] Test URL parameter: Add `?sla=99.5` and verify pre-fill
- [ ] Test time period changes: Switch between Monthly/Yearly
- [ ] Test real-time updates: Type in SLA field and watch results
- [ ] Test mobile view: Resize browser to mobile width
- [ ] Test edge cases: 0%, 100%, very precise values like 99.999%

### Performance Expectations
- **Application load time**: Under 10ms (instant)
- **Calculation updates**: Real-time (under 1ms)
- **File sizes**: All files under 5KB each
- **Browser compatibility**: Works in all modern browsers

## Troubleshooting

### Common Issues
- **App not loading**: Check if static server is running on correct port
- **Calculations wrong**: Verify logic in `js/app.js` calculateSLA() function
- **Styling broken**: Check CSS file paths in `index.html`
- **URL parameters not working**: Check parseURLParameters() function

### Browser Console Debugging
- Open browser DevTools console
- Should see "SLA Calculator loaded" message
- Check for any JavaScript errors
- Verify network requests load successfully

### File Conflicts
- Main app is in root: `index.html`, `js/app.js`, `css/styles.css`
- Docs version is simpler: `docs/index.html` (standalone file)
- Do NOT mix files between root and docs versions
- Always verify which version you're editing

## Important Notes

- **No linting tools**: No ESLint, Prettier, or other tools configured
- **No testing framework**: Manual testing only - no Jest, Mocha, etc.
- **No package management**: No npm, yarn, or dependency management
- **Browser-only**: Application runs entirely in browser, no server-side code
- **Vanilla JavaScript**: No frameworks, libraries, or build tools
- **Static hosting**: Designed for GitHub Pages, Netlify, or similar static hosts
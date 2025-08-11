# SLA Calculator

A simple, web-based Service Level Agreement (SLA) calculator that helps you calculate uptime requirements, downtime allowances, and SLA metrics.

## Overview

This tool provides an easy way to:
- Calculate uptime percentages (99%, 99.9%, 99.99%, 99.999%)
- Convert between different time periods (daily, monthly, yearly)
- Determine allowable downtime for given SLA targets
- Understand the real-world impact of SLA commitments

## Quick Start

### Running Locally

Since this is a static web application, you can run it locally in several ways:

1. **Simple file opening**: Open `index.html` directly in your browser
2. **Local web server** (recommended for development):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Using VS Code Live Server extension**: Right-click on `index.html` and select "Open with Live Server"

Then navigate to `http://localhost:8000` in your browser.

### GitHub Pages Deployment

This application is designed to work with GitHub Pages. Simply enable GitHub Pages in your repository settings and point it to the main branch.

## Project Structure

```
├── index.html          # Main application page
├── css/               # Stylesheets
├── js/                # JavaScript files
├── docs/              # Documentation
├── spec.md            # Detailed project specification
├── brainstorm.md      # Project ideas and planning
├── .nojekyll          # Prevents Jekyll processing on GitHub Pages
└── README.md          # This file
```

## Documentation

For detailed project specifications and requirements, see [spec.md](spec.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
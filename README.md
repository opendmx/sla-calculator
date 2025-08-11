# SLA Calculator

A simple, web-based Service Level Agreement (SLA) calculator that helps you calculate uptime requirements, downtime allowances, and SLA metrics for different time periods.

## Features

- **Real-time calculations**: Automatic updates as you change inputs
- **Multiple time periods**: Support for minute, hour, day, week, month, quarter, and year intervals
- **URL parameter support**: Prefill SLA values via URL parameters (e.g., `?sla=99.9`)
- **Clean, modern interface**: Responsive design that works on desktop and mobile
- **Comprehensive breakdown**: Shows allowed downtime, required uptime, and availability percentage

## Usage Instructions

### Basic Usage

1. **Open the calculator**: Navigate to `index.html` in your web browser or visit the deployed URL
2. **Set SLA Target**: Enter your desired SLA percentage (e.g., 99.9, 99.99, 99.999)
3. **Select Time Period**: Choose from:
   - Per Minute
   - Per Hour  
   - Daily
   - Weekly
   - Monthly
   - Quarterly
   - Yearly
4. **View Results**: The calculator automatically displays:
   - **Allowed Downtime**: Maximum downtime permitted for your SLA
   - **Uptime Required**: Minimum uptime needed to meet SLA
   - **Availability**: Your SLA percentage

### URL Parameters

You can prefill the SLA target using URL parameters:

```
https://your-domain.com/?sla=99.95
```

This will automatically populate the input field with 99.95% when the page loads.

### Examples

- **99.9% Monthly SLA**: Allows 43.2 minutes of downtime per month
- **99.99% Yearly SLA**: Allows 52.6 minutes of downtime per year  
- **99.5% Daily SLA**: Allows 7.2 minutes of downtime per day
- **99.9% Per Hour SLA**: Allows 0.6 minutes (36 seconds) of downtime per hour

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
│   └── styles.css     # Main stylesheet with modern design
├── js/                # JavaScript files
│   └── app.js         # SLA calculation logic and UI integration
├── docs/              # Documentation and alternative implementation
├── spec.md            # Detailed project specification
├── brainstorm.md      # Project ideas and planning
├── .nojekyll          # Prevents Jekyll processing on GitHub Pages
└── README.md          # This file
```

## How It Works

The calculator uses precise mathematical calculations to determine SLA metrics:

1. **Downtime Calculation**: `(100 - SLA%) / 100 * Total Time Period`
2. **Uptime Calculation**: `Total Time Period - Allowed Downtime`
3. **Time Formatting**: Intelligent formatting showing the most appropriate units (seconds, minutes, hours, days, weeks, years)

## Documentation

For detailed project specifications and requirements, see [spec.md](spec.md).

## Styling Guidelines

The SLA Calculator follows modern UI/UX design principles with a focus on accessibility and usability:

### Typography
- **Primary font**: Inter (Google Fonts) with comprehensive fallback stack
- **Font weights**: 300, 400, 500, 600, 700 for proper hierarchy
- **Line height**: 1.6 for optimal readability
- **Font smoothing**: Enabled for crisp rendering across browsers

### Color Palette
- **Background**: #f8fafc (light gray-blue)
- **Primary text**: #1e293b (dark slate)
- **Secondary text**: #64748b (slate gray)
- **Accent**: #3b82f6 (blue) for interactive elements
- **Cards**: White with subtle shadows for depth

### Layout & Spacing
- **Container**: Maximum width of 1200px, centered with 2rem padding
- **Grid system**: 2-column layout on desktop, single column on mobile
- **Card spacing**: 2rem gap between sections, 1.5rem internal padding
- **Border radius**: 12px for cards, 8px for inputs

### Responsive Design
- **Breakpoints**: 768px for tablet, 480px for mobile
- **Mobile-first approach**: Single column layout with reduced padding
- **Touch-friendly**: Minimum 44px touch targets

### Accessibility Features
- **ARIA labels**: Comprehensive labeling for screen readers
- **Skip link**: Keyboard navigation to main content
- **Color contrast**: WCAG AA compliant ratios
- **Focus indicators**: Clear visual focus states
- **Live regions**: Dynamic content updates announced to screen readers

### Component Guidelines
- **Input fields**: Consistent padding, focus states, and validation styling
- **Buttons/toggles**: Clear visual feedback and hover states
- **Results cards**: High contrast, tabular numbers for easy scanning
- **Error states**: Clear messaging with appropriate ARIA attributes

## Browser Support

Works in all modern browsers that support:
- CSS Grid and Flexbox
- ES6 JavaScript features
- URL API for parameter parsing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

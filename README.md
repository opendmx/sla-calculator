# SLA Calculator

A web-based Service Level Agreement (SLA) calculator that helps you calculate allowable downtime for different uptime percentages.

## Features

- Calculate allowable downtime for any SLA uptime percentage
- Support for different time periods (daily, monthly, yearly)
- Clean, responsive web interface
- Common SLA examples (99.9%, 99.95%, 99.99%, 99.999%)

## Live Demo

The SLA Calculator is automatically deployed to GitHub Pages: [https://opendmx.github.io/sla-calculator/](https://opendmx.github.io/sla-calculator/)

## Local Development

To run the SLA Calculator locally:

1. Clone this repository
2. Open `docs/index.html` in your web browser
3. No build process required - it's a static HTML/CSS/JavaScript application

## Deployment

This project uses GitHub Pages for automatic deployment. The deployment workflow is configured to:

- Trigger on pushes to the `main` branch
- Deploy the `docs/` folder to GitHub Pages
- Include a `.nojekyll` file to disable Jekyll processing

### GitHub Pages Setup

The deployment is handled automatically by the GitHub Actions workflow in `.github/workflows/deploy.yml`. To verify the deployment:

1. **Check Workflow Status**: Go to the "Actions" tab in the GitHub repository to see deployment status
2. **Verify Pages Settings**: 
   - Go to repository Settings → Pages
   - Ensure source is set to "Deploy from a branch"
   - Ensure branch is set to `gh-pages` (automatically created by the workflow)
3. **Test the Live Site**: Visit the GitHub Pages URL to confirm the calculator is working

### Manual Deployment Verification Steps

For reviewers to verify the deployment setup:

1. **Check Workflow File**: Review `.github/workflows/deploy.yml` for proper configuration
2. **Verify Docs Structure**: Confirm `docs/index.html` exists and contains the SLA calculator
3. **Test Workflow**: Push a change to the `main` branch and monitor the Actions tab
4. **Validate Pages Configuration**: 
   - Repository Settings → Pages
   - Source should be "Deploy from a branch"
   - Branch should be `gh-pages` / `/ (root)`
5. **Test Live URL**: Open the GitHub Pages URL and verify:
   - Page loads correctly
   - SLA calculator functions work
   - Enter test values (e.g., 99.9% uptime, monthly period)
   - Verify calculation results are displayed

### Troubleshooting

If the GitHub Pages site is not working:

1. Check the Actions tab for failed deployments
2. Verify repository Pages settings are correctly configured
3. Ensure the `docs/` folder contains `index.html`
4. Check that the workflow has proper permissions to deploy to Pages

## How to Use

1. Enter your desired SLA uptime percentage (e.g., 99.9%)
2. Select the time period (daily, monthly, or yearly)
3. Click "Calculate Allowable Downtime"
4. View the results showing the maximum allowable downtime

## Common SLA Levels

- **99.9%** (Three 9s) - 8.77 hours downtime per year
- **99.95%** (Three and a half 9s) - 4.38 hours downtime per year  
- **99.99%** (Four 9s) - 52.6 minutes downtime per year
- **99.999%** (Five 9s) - 5.26 minutes downtime per year

## Contributing

1. Fork the repository
2. Make your changes to files in the `docs/` folder
3. Test locally by opening `docs/index.html`
4. Submit a pull request

Changes to the `main` branch will automatically trigger a new deployment to GitHub Pages.
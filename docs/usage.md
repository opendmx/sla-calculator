# Usage Guide

This document provides a comprehensive walkthrough of the SLA Calculator features.

## Overview

The SLA Calculator helps you calculate Service Level Agreement metrics and availability percentages for your services. It supports both traditional 24/7 calculations and business-hour-only calculations with configurable work schedules.

## Getting Started

1. **Open the calculator**: Navigate to `index.html` in your web browser or visit the deployed URL
2. **Set SLA Target**: Enter your desired SLA percentage (e.g., 99.9, 99.99, 99.999)
3. **Select Time Period**: Choose from Per Minute, Per Hour, Daily, Weekly, Monthly, Quarterly, or Yearly
4. **View Results**: The calculator automatically displays allowed downtime, required uptime, and availability percentage

## Feature Walkthrough

### Basic SLA Calculation

The default mode calculates SLA metrics based on 24/7 calendar time:

- **99.9% Yearly**: 8h 46m allowed downtime
- **99.95% Yearly**: 4h 23m allowed downtime  
- **99.99% Yearly**: 52.6 minutes allowed downtime

### Advanced Time Configuration

Click "Show Advanced Options" to access advanced time configuration settings:

#### Weekend Configuration
- **Include Weekends**: Toggle to include or exclude weekends from calculations
- When disabled, calculations are based on weekdays only (5-day work week)
- Example: 99.9% yearly with weekends excluded = 6h 15m (vs 8h 46m with weekends)

#### Business Hours Configuration
- **Business Hours Only**: Toggle to calculate based on business hours instead of 24/7
- When enabled, additional configuration options appear:
  - **Work Hours per Week**: Configure total work hours (default: 40)
  - **Work Start Hour**: Set daily work start time (default: 8:00 AM)
  - **Work End Hour**: Set daily work end time (default: 6:00 PM)

#### Business Hours Examples
- **99.9% Yearly (40h/week)**: 2h 5m allowed downtime
- **99.9% Yearly (50h/week)**: 2h 36m allowed downtime
- **99.99% Yearly (40h/week)**: 12.5 minutes allowed downtime

### URL Parameters

You can prefill configuration using URL parameters:

#### Basic Parameters
```
https://your-domain.com/?sla=99.95
https://your-domain.com/?sla=99.9&period=year
```

#### Advanced Parameters
```
# Business hours calculation with custom settings
https://your-domain.com/?sla=99.99&business=true&workHours=50

# Weekdays only, no business hours
https://your-domain.com/?sla=99.9&weekends=false&business=false

# Full configuration
https://your-domain.com/?sla=99.95&period=year&weekends=true&business=true&workHours=40&startHour=9&endHour=17
```

#### Supported URL Parameters
- `sla`: SLA percentage (0-100)
- `period`: Time period (`minute`, `hour`, `day`, `week`, `month`, `quarter`, `year`)
- `weekends`: Include weekends (`true`, `false`)
- `business`: Business hours mode (`true`, `false`) 
- `workHours`: Work hours per week (1-168)
- `startHour`: Work start hour (0-23)
- `endHour`: Work end hour (0-23)

### Settings Persistence

Your advanced configuration settings are automatically saved to browser localStorage and restored when you return to the calculator. URL parameters always take precedence over saved settings.

## Calculation Modes

The calculator supports three distinct calculation modes:

1. **Calendar Mode** (default): 24/7 calculations including weekends
2. **Weekdays Mode**: 24-hour days but excluding weekends (5/7 of calendar time)
3. **Business Hours Mode**: Based on configured work schedule only

## Examples

### DevOps Team Planning
A DevOps team needs to plan their 99.9% SLA for a service that only operates during business hours (40h/week):

```
URL: ?sla=99.9&period=year&business=true&workHours=40
Result: 2h 5m allowed downtime per year
```

### Enterprise Service with Weekday Coverage
An enterprise service operates 24/7 but support is only available on weekdays:

```
URL: ?sla=99.95&period=quarter&weekends=false&business=false  
Result: Shows quarterly downtime allowance for weekdays only
```

### Traditional 24/7 Service
A traditional web service with 24/7 uptime requirements:

```
URL: ?sla=99.99&period=year&weekends=true&business=false
Result: 52.6 minutes allowed downtime per year
```

## Troubleshooting

### Common Issues

**Advanced options not showing**: Click the "Show Advanced Options" toggle in the configuration section.

**Settings not persisting**: Ensure your browser allows localStorage. Settings are automatically saved when changed.

**URL parameters not working**: Check parameter spelling and values. All boolean parameters use `true`/`false`.

**Unexpected calculations**: Verify your time configuration mode. Business hours mode will show significantly lower allowed downtime than calendar mode.

### Browser Compatibility

The SLA Calculator works in all modern browsers that support:
- CSS Grid and Flexbox
- ES6 JavaScript features  
- URL API for parameter parsing
- localStorage for settings persistence
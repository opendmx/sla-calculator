// SLA Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('SLA Calculator loaded');
    
    // Get DOM elements
    const slaTargetInput = document.getElementById('sla-target');
    const downtimeResults = {
        minute: document.getElementById('downtime-minute'),
        hour: document.getElementById('downtime-hour'),
        day: document.getElementById('downtime-day'),
        week: document.getElementById('downtime-week'),
        month: document.getElementById('downtime-month'),
        quarter: document.getElementById('downtime-quarter'),
        year: document.getElementById('downtime-year')
    };
    
    // Advanced options elements
    const showAdvancedToggle = document.getElementById('show-advanced');
    const advancedOptions = document.getElementById('advanced-options');
    const includeWeekendsToggle = document.getElementById('include-weekends');
    const businessHoursToggle = document.getElementById('business-hours');
    const businessConfig = document.getElementById('business-config');
    const workHoursPerWeekInput = document.getElementById('work-hours-per-week');
    const workStartHourSelect = document.getElementById('work-start-hour');
    const workEndHourSelect = document.getElementById('work-end-hour');
    
    // Parse URL parameters and load settings on load
    loadSettings(); // Load from localStorage first
    parseURLParameters(); // Then override with URL parameters (higher priority)
    
    // Calculate initial values
    updateResults();
    
    // Add event listeners for real-time updates
    slaTargetInput.addEventListener('input', updateResults);
    
    // Advanced options event listeners
    showAdvancedToggle.addEventListener('change', toggleAdvancedOptions);
    includeWeekendsToggle.addEventListener('change', function() {
        saveSettings();
        updateResults();
    });
    businessHoursToggle.addEventListener('change', function() {
        toggleBusinessConfig();
        saveSettings();
        updateResults();
    });
    workHoursPerWeekInput.addEventListener('input', function() {
        saveSettings();
        updateResults();
    });
    workStartHourSelect.addEventListener('change', function() {
        saveSettings();
        updateResults();
    });
    workEndHourSelect.addEventListener('change', function() {
        saveSettings();
        updateResults();
    });
    
    function toggleAdvancedOptions() {
        if (showAdvancedToggle.checked) {
            advancedOptions.style.display = 'block';
        } else {
            advancedOptions.style.display = 'none';
        }
        saveSettings();
    }
    
    function toggleBusinessConfig() {
        if (businessHoursToggle.checked) {
            businessConfig.style.display = 'block';
        } else {
            businessConfig.style.display = 'none';
        }
    }
    
    function parseURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const slaParam = urlParams.get('sla');
        
        if (slaParam) {
            const slaValue = parseFloat(slaParam);
            if (slaValue >= 0 && slaValue <= 100) {
                slaTargetInput.value = slaValue;
            }
        }
        
        // Parse advanced settings from URL
        const includeWeekends = urlParams.get('weekends');
        const businessHours = urlParams.get('business');
        const workHours = urlParams.get('workHours');
        const startHour = urlParams.get('startHour');
        const endHour = urlParams.get('endHour');

        if (includeWeekends !== null) {
            includeWeekendsToggle.checked = includeWeekends === 'true';
        }
        if (businessHours !== null) {
            businessHoursToggle.checked = businessHours === 'true';
            toggleBusinessConfig();
        }
        if (workHours !== null) {
            const hours = parseInt(workHours);
            if (hours >= 1 && hours <= 168) {
                workHoursPerWeekInput.value = hours;
            }
        }
        if (startHour !== null) {
            const hour = parseInt(startHour);
            if (hour >= 0 && hour <= 23) {
                workStartHourSelect.value = hour;
            }
        }
        if (endHour !== null) {
            const hour = parseInt(endHour);
            if (hour >= 0 && hour <= 23) {
                workEndHourSelect.value = hour;
            }
        }
    }
    
    function loadSettings() {
        try {
            const settings = localStorage.getItem('sla-calculator-settings');
            if (settings) {
                const parsed = JSON.parse(settings);
                
                if (parsed.showAdvanced) {
                    showAdvancedToggle.checked = true;
                    toggleAdvancedOptions();
                }
                if (parsed.includeWeekends !== undefined) {
                    includeWeekendsToggle.checked = parsed.includeWeekends;
                }
                if (parsed.businessHours !== undefined) {
                    businessHoursToggle.checked = parsed.businessHours;
                    toggleBusinessConfig();
                }
                if (parsed.workHoursPerWeek !== undefined) {
                    workHoursPerWeekInput.value = parsed.workHoursPerWeek;
                }
                if (parsed.workStartHour !== undefined) {
                    workStartHourSelect.value = parsed.workStartHour;
                }
                if (parsed.workEndHour !== undefined) {
                    workEndHourSelect.value = parsed.workEndHour;
                }
            }
        } catch (e) {
            console.warn('Could not load settings from localStorage:', e);
        }
    }
    
    function saveSettings() {
        try {
            const settings = {
                showAdvanced: showAdvancedToggle.checked,
                includeWeekends: includeWeekendsToggle.checked,
                businessHours: businessHoursToggle.checked,
                workHoursPerWeek: parseInt(workHoursPerWeekInput.value),
                workStartHour: parseInt(workStartHourSelect.value),
                workEndHour: parseInt(workEndHourSelect.value)
            };
            localStorage.setItem('sla-calculator-settings', JSON.stringify(settings));
        } catch (e) {
            console.warn('Could not save settings to localStorage:', e);
        }
    }
    
    function getTimeConfiguration() {
        return {
            includeWeekends: includeWeekendsToggle.checked,
            businessHours: businessHoursToggle.checked,
            workHoursPerWeek: parseInt(workHoursPerWeekInput.value) || 40,
            workStartHour: parseInt(workStartHourSelect.value) || 8,
            workEndHour: parseInt(workEndHourSelect.value) || 18
        };
    }
    
    function updateResults() {
        const slaPercentage = parseFloat(slaTargetInput.value);
        const timeConfig = getTimeConfiguration();
        
        if (isNaN(slaPercentage) || slaPercentage < 0 || slaPercentage > 100) {
            displayError();
            return;
        }
        
        // Calculate for all time periods
        const timePeriods = ['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'];
        const allResults = {};
        
        timePeriods.forEach(period => {
            allResults[period] = calculateSLA(slaPercentage, period, timeConfig);
        });
        
        displayResults(allResults);
    }
    
    function displayError() {
        Object.keys(downtimeResults).forEach(period => {
            downtimeResults[period].textContent = '--';
        });
    }
    
    function displayResults(allResults) {
        Object.keys(allResults).forEach(period => {
            const result = allResults[period];
            
            if (result.isWorkImpactAnalysis) {
                // Show work impact analysis with availability percentage
                const workAvailability = result.workAvailabilityPercentage.toFixed(2);
                downtimeResults[period].innerHTML = `
                    <div>${result.formattedDowntime}</div>
                    <div class="work-impact">
                        Work Impact: ${workAvailability}% available
                    </div>
                `;
            } else {
                // Standard display
                downtimeResults[period].textContent = result.formattedDowntime;
            }
        });
    }
});

// SLA calculation functions
function calculateSLA(uptimePercentage, timePeriod, timeConfig = {}) {
    const downtimePercentage = 100 - uptimePercentage;
    const periodData = getTimePeriodData(timePeriod, timeConfig);
    
    // Calculate total downtime in minutes based on calendar time (standard SLA calculation)
    const allowedDowntimeMinutes = (downtimePercentage / 100) * periodData.totalMinutes;
    
    // Calculate uptime in minutes
    const uptimeMinutes = periodData.totalMinutes - allowedDowntimeMinutes;
    
    // When analyzing work impact, we need to show the results in work context
    if (periodData.configuration.analyzeWorkImpact && periodData.workMinutes) {
        // The downtime is still the same absolute amount based on calendar time
        // For work impact analysis, we show the worst-case scenario where all downtime occurs during work hours
        
        // Format the results - uptime remains calendar-based, downtime shows absolute amount
        const formattedDowntime = formatTime(allowedDowntimeMinutes);
        const formattedUptime = formatTime(uptimeMinutes); // Use calendar uptime, not work uptime
        
        // Calculate the worst-case availability during work hours
        // This shows what happens if all downtime occurs during work hours
        const worstCaseWorkUptimeMinutes = Math.max(0, periodData.workMinutes - allowedDowntimeMinutes);
        const workAvailabilityPercentage = Math.max(0, (worstCaseWorkUptimeMinutes / periodData.workMinutes) * 100);
        
        return {
            slaPercentage: uptimePercentage,
            timePeriod: timePeriod,
            allowedDowntimeMinutes: allowedDowntimeMinutes,
            uptimeMinutes: uptimeMinutes,
            workUptimeMinutes: worstCaseWorkUptimeMinutes,
            workAvailabilityPercentage: workAvailabilityPercentage,
            formattedDowntime: formattedDowntime,
            formattedUptime: formattedUptime,
            periodData: periodData,
            timeConfig: timeConfig,
            isWorkImpactAnalysis: true
        };
    } else {
        // Standard calculation and formatting
        const formattedDowntime = formatTime(allowedDowntimeMinutes);
        const formattedUptime = formatTime(uptimeMinutes);
        
        return {
            slaPercentage: uptimePercentage,
            timePeriod: timePeriod,
            allowedDowntimeMinutes: allowedDowntimeMinutes,
            uptimeMinutes: uptimeMinutes,
            formattedDowntime: formattedDowntime,
            formattedUptime: formattedUptime,
            periodData: periodData,
            timeConfig: timeConfig,
            isWorkImpactAnalysis: false
        };
    }
}

function getTimePeriodData(timePeriod, timeConfig = {}) {
    // Default configuration for backward compatibility  
    const includeWeekends = timeConfig.includeWeekends !== false; // default true
    const analyzeWorkImpact = timeConfig.businessHours === true; // renamed for clarity
    const workHoursPerWeek = timeConfig.workHoursPerWeek || 40;
    const workStartHour = timeConfig.workStartHour || 8;
    const workEndHour = timeConfig.workEndHour || 18;
    
    // Calculate work hours per day
    let workHoursPerDay = workEndHour - workStartHour;
    if (workHoursPerDay <= 0) {
        workHoursPerDay += 24; // Handle overnight shifts
    }
    
    // Base periods (24/7 calendar time) - SLA is always calculated against calendar time
    const basePeriods = {
        minute: 1,
        hour: 60,
        day: 24 * 60, // 1440 minutes
        week: 7 * 24 * 60, // 10080 minutes
        month: 30 * 24 * 60, // 43200 minutes (30 days)
        quarter: 91 * 24 * 60, // 131040 minutes (91 days)
        year: 365 * 24 * 60, // 525600 minutes
    };
    
    let totalMinutes = basePeriods[timePeriod] || basePeriods.month;
    
    // Apply weekend exclusion only when not analyzing work impact
    // When analyzing work impact, we need full calendar calculation for the base SLA
    if (!includeWeekends && !analyzeWorkImpact) {
        // Reduce by weekend ratio (5/7 for weekdays only)
        totalMinutes = totalMinutes * (5/7);
    }
    
    const periodData = {
        totalMinutes: totalMinutes,
        name: timePeriod
    };
    
    // When analyzing work impact, calculate work time periods for context
    if (analyzeWorkImpact) {
        let workMinutes;
        switch (timePeriod) {
            case 'minute':
                // For work impact, show how much of work minute this represents
                workMinutes = (workHoursPerDay * 60) / (24 * 60); // fraction of work time in a day
                break;
            case 'hour':
                // For work impact, show how much of work hour this represents  
                workMinutes = (workHoursPerDay * 60) / (24 * 60) * 60; // work fraction * 60 minutes
                break;
            case 'day':
                // Work hours per day
                workMinutes = workHoursPerDay * 60;
                break;
            case 'week':
                // Work hours per week
                workMinutes = workHoursPerWeek * 60;
                break;
            case 'month':
                // Approximately 4.33 weeks per month
                workMinutes = workHoursPerWeek * 4.33 * 60;
                break;
            case 'quarter':
                // 13 weeks per quarter
                workMinutes = workHoursPerWeek * 13 * 60;
                break;
            case 'year':
                // 52 weeks per year
                workMinutes = workHoursPerWeek * 52 * 60;
                break;
            default:
                workMinutes = workHoursPerWeek * 60;
        }
        
        periodData.workMinutes = workMinutes;
        periodData.workImpactRatio = workMinutes / totalMinutes;
    }
    
    // Add configuration info to the period data
    periodData.configuration = {
        includeWeekends,
        analyzeWorkImpact,
        workHoursPerWeek,
        workHoursPerDay,
        calculationMode: analyzeWorkImpact ? 'work-impact' : (includeWeekends ? 'calendar' : 'weekdays')
    };
    
    return periodData;
}

function formatTime(totalMinutes) {
    // Convert minutes to total seconds
    const totalSeconds = Math.round(totalMinutes * 60);
    
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    
    // Format as dd:hh:mm:ss with leading zeros
    const dd = days.toString().padStart(2, '0');
    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');
    const ss = seconds.toString().padStart(2, '0');
    
    return `${dd}:${hh}:${mm}:${ss}`;
}
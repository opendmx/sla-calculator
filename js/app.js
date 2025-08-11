// SLA Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('SLA Calculator loaded');
    
    // Get DOM elements
    const slaTargetInput = document.getElementById('sla-target');
    const timePeriodSelect = document.getElementById('time-period');
    const downtimeResult = document.getElementById('downtime-result');
    const uptimeResult = document.getElementById('uptime-result');
    const availabilityResult = document.getElementById('availability-result');
    
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
    parseURLParameters();
    loadSettings();
    
    // Calculate initial values
    updateResults();
    
    // Add event listeners for real-time updates
    slaTargetInput.addEventListener('input', updateResults);
    timePeriodSelect.addEventListener('change', updateResults);
    
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
        const timePeriod = timePeriodSelect.value;
        const timeConfig = getTimeConfiguration();
        
        if (isNaN(slaPercentage) || slaPercentage < 0 || slaPercentage > 100) {
            displayError();
            return;
        }
        
        const results = calculateSLA(slaPercentage, timePeriod, timeConfig);
        displayResults(results);
    }
    
    function displayError() {
        downtimeResult.textContent = '--';
        uptimeResult.textContent = '--';
        availabilityResult.textContent = '--';
    }
    
    function displayResults(results) {
        downtimeResult.textContent = results.formattedDowntime;
        uptimeResult.textContent = results.formattedUptime;
        availabilityResult.textContent = results.slaPercentage + '%';
    }
});

// SLA calculation functions
function calculateSLA(uptimePercentage, timePeriod, timeConfig = {}) {
    const downtimePercentage = 100 - uptimePercentage;
    const periodData = getTimePeriodData(timePeriod, timeConfig);
    
    // Calculate total downtime in minutes
    const allowedDowntimeMinutes = (downtimePercentage / 100) * periodData.totalMinutes;
    
    // Calculate uptime in minutes
    const uptimeMinutes = periodData.totalMinutes - allowedDowntimeMinutes;
    
    // Format the results
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
        timeConfig: timeConfig
    };
}

function getTimePeriodData(timePeriod, timeConfig = {}) {
    // Default configuration for backward compatibility  
    const includeWeekends = timeConfig.includeWeekends !== false; // default true
    const businessHours = timeConfig.businessHours === true; // default false
    const workHoursPerWeek = timeConfig.workHoursPerWeek || 40;
    const workStartHour = timeConfig.workStartHour || 8;
    const workEndHour = timeConfig.workEndHour || 18;
    
    // Calculate work hours per day
    let workHoursPerDay = workEndHour - workStartHour;
    if (workHoursPerDay <= 0) {
        workHoursPerDay += 24; // Handle overnight shifts
    }
    
    // Base periods (24/7 calendar time)
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
    
    // Apply weekend exclusion (if not including weekends)
    if (!includeWeekends && !businessHours) {
        // Reduce by weekend ratio (5/7 for weekdays only)
        totalMinutes = totalMinutes * (5/7);
    }
    
    // Apply business hours calculation
    if (businessHours) {
        switch (timePeriod) {
            case 'minute':
                // For business hours, a minute is still a minute
                totalMinutes = 1;
                break;
            case 'hour':
                // For business hours, an hour is still an hour  
                totalMinutes = 60;
                break;
            case 'day':
                // Use configured work hours per day
                totalMinutes = workHoursPerDay * 60;
                break;
            case 'week':
                // Use configured work hours per week
                totalMinutes = workHoursPerWeek * 60;
                break;
            case 'month':
                // Approximately 4.33 weeks per month
                totalMinutes = workHoursPerWeek * 4.33 * 60;
                break;
            case 'quarter':
                // 13 weeks per quarter
                totalMinutes = workHoursPerWeek * 13 * 60;
                break;
            case 'year':
                // 52 weeks per year
                totalMinutes = workHoursPerWeek * 52 * 60;
                break;
        }
    }
    
    const periodData = {
        totalMinutes: totalMinutes,
        name: timePeriod
    };
    
    // Add configuration info to the period data
    periodData.configuration = {
        includeWeekends,
        businessHours,
        workHoursPerWeek,
        workHoursPerDay,
        calculationMode: businessHours ? 'business' : (includeWeekends ? 'calendar' : 'weekdays')
    };
    
    return periodData;
}

function formatTime(totalMinutes) {
    if (totalMinutes < 1) {
        return (totalMinutes * 60).toFixed(1) + ' seconds';
    }
    
    if (totalMinutes < 60) {
        return totalMinutes.toFixed(1) + ' minutes';
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    if (hours < 24) {
        if (minutes === 0) {
            return hours + ' hours';
        }
        return hours + 'h ' + minutes + 'm';
    }
    
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    if (days < 7) {
        if (remainingHours === 0) {
            return days + ' days';
        }
        return days + 'd ' + remainingHours + 'h';
    }
    
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    
    if (weeks < 52) {
        if (remainingDays === 0) {
            return weeks + ' weeks';
        }
        return weeks + 'w ' + remainingDays + 'd';
    }
    
    const years = Math.floor(weeks / 52);
    const remainingWeeks = weeks % 52;
    
    if (remainingWeeks === 0) {
        return years + ' years';
    }
    return years + 'y ' + remainingWeeks + 'w';
}
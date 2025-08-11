// SLA Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('SLA Calculator loaded');
    
    // Get DOM elements
    const slaTargetInput = document.getElementById('sla-target');
    const timePeriodSelect = document.getElementById('time-period');
    const downtimeResult = document.getElementById('downtime-result');
    const uptimeResult = document.getElementById('uptime-result');
    const availabilityResult = document.getElementById('availability-result');
    
    // Parse URL parameters on load
    parseURLParameters();
    
    // Calculate initial values
    updateResults();
    
    // Add event listeners for real-time updates
    slaTargetInput.addEventListener('input', updateResults);
    timePeriodSelect.addEventListener('change', updateResults);
    
    function parseURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const slaParam = urlParams.get('sla');
        
        if (slaParam) {
            const slaValue = parseFloat(slaParam);
            if (slaValue >= 0 && slaValue <= 100) {
                slaTargetInput.value = slaValue;
            }
        }
    }
    
    function updateResults() {
        const slaPercentage = parseFloat(slaTargetInput.value);
        const timePeriod = timePeriodSelect.value;
        
        if (isNaN(slaPercentage) || slaPercentage < 0 || slaPercentage > 100) {
            displayError();
            return;
        }
        
        const results = calculateSLA(slaPercentage, timePeriod);
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
function calculateSLA(uptimePercentage, timePeriod) {
    const downtimePercentage = 100 - uptimePercentage;
    const periodData = getTimePeriodData(timePeriod);
    
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
        periodData: periodData
    };
}

function getTimePeriodData(timePeriod) {
    const periods = {
        minute: {
            totalMinutes: 1,
            name: 'minute'
        },
        hour: {
            totalMinutes: 60,
            name: 'hour'
        },
        day: {
            totalMinutes: 24 * 60, // 1440 minutes
            name: 'day'
        },
        week: {
            totalMinutes: 7 * 24 * 60, // 10080 minutes
            name: 'week'
        },
        month: {
            totalMinutes: 30 * 24 * 60, // 43200 minutes (30 days)
            name: 'month'
        },
        quarter: {
            totalMinutes: 91 * 24 * 60, // 131040 minutes (91 days)
            name: 'quarter'
        },
        year: {
            totalMinutes: 365 * 24 * 60, // 525600 minutes
            name: 'year'
        }
    };
    
    return periods[timePeriod] || periods.month;
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
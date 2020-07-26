// Returns the earliest start time and latest end time in an array of sections
// e.g. {start: 900, end: 1650}
export const getEarliestLatestTimes = (sections) => {
    let earliestStartTime = 2400;
    let latestEndTime = 0;

    sections.forEach(section => {
        section.meeting_times.forEach(meeting => {
            console.log('section.meeting_times:');
            console.log(meeting);

            let times = parseStartEndFromTimeblock(meeting.time);
            let start = parseInt(times.start);
            let end = parseInt(times.end);

            if(start < earliestStartTime) {
                earliestStartTime = start;
            }
            if (end > latestEndTime) {
                latestEndTime = end;
            }
        })
    });

    let res = {
        start: earliestStartTime,
        end: latestEndTime,
    }

    return res;
}

// Returns start and end times in 24-hour format 
// e.g. {start: 1000, end: 1150}
export const parseStartEndFromTimeblock = (timeblock) => {
    let timeUpper = timeblock.replace(/\s/g, '').toUpperCase();
    let res = isTwentyFourHour(timeUpper) 
        ? parseTwentyFourHourTime(timeUpper)
        : parseTwelveHourTime(timeUpper);
    return res;
}

const isTwentyFourHour = (timeblock) => {
    // TODO: time could possibly come in as "2:00-3:00" without "am/pm"
    if(timeblock.includes('AM') || timeblock.includes('PM')) {
        return false;
    }
    return true;
}

const parseTwelveHourTime = (timeblock) => {
    let sepIndex = timeblock.indexOf('-');

    let startTimeRaw = timeblock.substring(0, sepIndex);
    let startTimeProcessed = convertTime12to24(startTimeRaw);

    let endTimeRaw = timeblock.substring(sepIndex + 1);
    let endTimeProcessed = convertTime12to24(endTimeRaw);

    let res = {
        start: startTimeProcessed,
        end: endTimeProcessed
    }

    return res;
}

const parseTwentyFourHourTime = (timeblock) => {
    // TODO
}

export const convertTime12to24 = (time12h) => {
    const time = time12h.substring(0, time12h.length - 2)
    const modifier = time12h.substring(time12h.length - 2)
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}${minutes}`;
}

// 1100
export const convertTime24to12 = (time24h) => {
    var hour = time24h % 12;
    if (hour === 0) hour = 12;
    return hour + ':00' + (time24h < 12 ? ' am' : ' pm');
}
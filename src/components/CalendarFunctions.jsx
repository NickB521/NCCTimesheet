import { DateTime } from "luxon";

const MAX_SHIFTS_PER_DAY = 3;

export const initializeWeek = () => ({
    monday: createInitialDayState(),
    tuesday: createInitialDayState(),
    wednesday: createInitialDayState(),
    thursday: createInitialDayState(),
    friday: createInitialDayState(),
    saturday: createInitialDayState(),
    sunday: createInitialDayState(),
});

const createInitialDayState = () => ({
    day: "",
    totalHours: 0,
    saved: false,
    shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
});

export const initializeCurrentPage = () => ({
    monday: 1,
    tuesday: 1,
    wednesday: 1,
    thursday: 1,
    friday: 1,
    saturday: 1,
    sunday: 1
});

export const CalendarHandle = (input, notification, week, setWeek) => {
    let weekOf = input instanceof DateTime ? input.startOf('week') : DateTime.fromISO(input).startOf('week');

    if (notification) {
        weekOf = DateTime.fromObject({
            day: notification.day,
            month: notification.month,
            year: notification.year
        }).startOf('week');
    }

    const updatedWeek = { ...week };

    Object.keys(updatedWeek).forEach((day) => {
        updatedWeek[day].day = weekOf.toFormat('M/d');
        document.getElementById(day).innerHTML = updatedWeek[day].day + "";
        weekOf = weekOf.plus({ days: 1 });
    });

    setWeek(updatedWeek);
};

export const breakHandle = (day, index, week, setWeek) => {
    const newShifts = [...week[day].shifts];
    newShifts[index].breakTaken = !newShifts[index].breakTaken;
    setWeek({ ...week, [day]: { ...week[day], shifts: newShifts } });
};

export const addShift = (day, totalPages, setCurrentPage, setWeek) => {
    setWeek((prevWeek) => {
        const lastShift = prevWeek[day].shifts[prevWeek[day].shifts.length - 1];
        const newStartTime = lastShift ? { ...lastShift.endTime } : { hour: 0, minute: 0 };

        if (prevWeek[day].shifts.length >= MAX_SHIFTS_PER_DAY) {
            console.error(`Daily ${MAX_SHIFTS_PER_DAY} Shift Limit Reached`);
            return prevWeek;
        }

        const newShift = {
            startTime: newStartTime,
            endTime: { hour: 0, minute: 0 },
            breakTaken: false,
            breakStart: { hour: 0, minute: 0 },
            breakEnd: { hour: 0, minute: 0 }
        };

        return {
            ...prevWeek,
            [day]: { ...prevWeek[day], 
                shifts: [...prevWeek[day].shifts, newShift],
                saved: false }
        };
    });
    setCurrentPage(totalPages + 1);
};

export const deleteShift = (day, totalPages, setCurrentPage, week, setWeek) => {
    setWeek((prevWeek) => {
        // If there are no shifts for the day, log an error and return the previous state
        if (prevWeek[day].shifts.length === 0) {
            console.error(`No shifts to delete for "${day}"`);
            return prevWeek;
        }

        // Get the new list of shifts excluding the one to delete
        const newShifts = prevWeek[day].shifts.slice(0, prevWeek[day].shifts.length - 1);

        // Calculate new total hours (assuming you subtract the hours of the last shift)
        const shiftToRemove = prevWeek[day].shifts[prevWeek[day].shifts.length - 1];
        const newTotalHours = prevWeek[day].totalHours - calculateShiftHours(shiftToRemove);

        return {
            ...prevWeek,
            [day]: { 
                ...prevWeek[day], 
                shifts: newShifts, 
                totalHours: newTotalHours, 
                saved: false 
            }
        };
    });

    // Update the current page. If the total number of shifts becomes 0, reset to page 1
    const newTotalPages = totalPages - 1;
    setCurrentPage(newTotalPages <= 0 ? 1 : newTotalPages);
};

export const timeSet = (inpt, day, timeType, index, week, setWeek) => {
    if (!week[day]) {
        console.error(`Day "${day}" is not defined in the week object.`);
        return;
    }

    const updatedWeek = { ...week };
    const updatedDay = { ...updatedWeek[day] };

    const updatedShifts = [...updatedDay.shifts];
    
    const roundedTime = roundToNearest15Minutes(inpt);
    
    updatedShifts[index] = {
        ...updatedShifts[index],
        [timeType]: roundedTime,
    };

    updatedDay.shifts = updatedShifts;
    updatedWeek[day] = updatedDay;

    setWeek(updatedWeek); 
};

export const saveHandle = (day, week, setWeek, setErrorMessage) => {
    let totalHours = 0;
    let hasError = false;

    console.log('Saving for day:', day);  // Log the current day being saved

    if (week[day].shifts.length === 0) {
        totalHours = 0;
    } 
    else {
        week[day].shifts.forEach((shift, index) => {
            const { startTime, endTime } = shift;


            if (
                (startTime.hour === 0 && startTime.minute === 0) ||
                (endTime.hour === 0 && endTime.minute === 0)
            ) 
            {
                hasError = true;
            } 
            else {
                const shiftHours = calculateShiftHours(shift);

                if (shiftHours === 0) {
                    hasError = true;
                } else {
                    totalHours += shiftHours;
                }
            }
        });
    }

    if (hasError) {
        setErrorMessage("Shift Times Cannot Have 0 Hours Or Invalid Entries");
        return;
    }

    console.log(`Total hours worked for ${day}:`, totalHours);

    setWeek(prevWeek => {
        const updatedWeek = { ...prevWeek };
        updatedWeek[day] = {
            ...updatedWeek[day],
            totalHours, 
            saved: !updatedWeek[day].saved
        };
        

        return updatedWeek;
    });

    setErrorMessage("");
};

export const calculateShiftHours = (shift) => {
    const start = roundToNearest15Minutes(shift.startTime);
    const end = roundToNearest15Minutes(shift.endTime);
    
    let startDecimal = start.hour + start.minute / 60;
    let endDecimal = end.hour + end.minute / 60;

    if (isNaN(startDecimal) || isNaN(endDecimal)) {
        return 0;
    }

    if (startDecimal > endDecimal) {
        endDecimal += 12;
    }

    let breakTime = 0;
    if (shift.breakTaken) {
        const breakStart = roundToNearest15Minutes(shift.breakStart);
        const breakEnd = roundToNearest15Minutes(shift.breakEnd);
        
        let breakStartDecimal = breakStart.hour + breakStart.minute / 60;
        let breakEndDecimal = breakEnd.hour + breakEnd.minute / 60;
        
        if (!isNaN(breakStartDecimal) && !isNaN(breakEndDecimal)) {
            if (breakEndDecimal <= breakStartDecimal) {
                breakEndDecimal += 12;
            }
            breakTime = breakEndDecimal - breakStartDecimal;
        }
    }

    return Math.max(0, endDecimal - startDecimal - breakTime);
};

// export const resetDay = (day, setWeek) => {
//     setWeek(prevWeek => {
//         if (!prevWeek[day]) {
//             console.warn(`resetDay: Attempted to reset a non-existent day: ${day}`);
//             return prevWeek;
//         }

//         return {
//             ...prevWeek,
//             [day]: {
//                 ...prevWeek[day],
//                 totalHours: 0,
//                 saved: false,
//                 shifts: [{}] // Empty the shifts array
//             }
//         };
//     });
// };

const roundToNearest15Minutes = (time) => {
    const minutes = time.minute;
    const roundedMinutes = Math.round(minutes / 15) * 15;
    const roundedTime = { ...time, minute: roundedMinutes % 60 };
    const hourAdjustment = Math.floor(roundedMinutes / 60);
    roundedTime.hour = (time.hour + hourAdjustment) % 24;
    return roundedTime;
};

export const noteHandle = (event, week, setWeek) => {
    setWeek({ ...week, shiftNote: event.target.value });
};

export const submissionHandle = (week) => {
    console.log("Week submitted", week);
};

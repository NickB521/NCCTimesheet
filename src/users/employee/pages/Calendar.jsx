import React, { useState, useEffect } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell, DatePicker
} from "@nextui-org/react";
import { DateTime } from 'luxon';  
import CalendarWeekTool from "../../../components/CalendarWeekTool";

const Calendar = () => {

    const initialDayState = {
        day: "",
        startTime: { hour: 0, minute: 0 },
        endTime: { hour: 0, minute: 0 },
        breakStart: { hour: 0, minute: 0 },
        breakEnd: { hour: 0, minute: 0 },
        totalHours: 0,
        breakTaken: false,
        saved: false,
        shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
    };

    const [week, setWeek] = useState({
        monday: { ...initialDayState },
        tuesday: { ...initialDayState },
        wednesday: { ...initialDayState },
        thursday: { ...initialDayState },
        friday: { ...initialDayState },
        saturday: { ...initialDayState },
        sunday: { ...initialDayState }
    });

    const [currentPage, setCurrentPage] = useState({
        monday: 1,
        tuesday: 1,
        wednesday: 1,
        thursday: 1,
        friday: 1,
        saturday: 1,
        sunday: 1
    });
    
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const savedNotification = JSON.parse(sessionStorage.getItem('activeNotification'));

        let currentDate = DateTime.local();
        CalendarHandle(currentDate, savedNotification);

        const handlePageLoad = () => {
            const pageReloaded = sessionStorage.getItem('pageReloaded');
            const currentPath = window.location.pathname;

            if (!pageReloaded) {
                sessionStorage.setItem('pageReloaded', 'true');
                sessionStorage.setItem('lastPath', currentPath);
            } 
            else {
                sessionStorage.setItem('lastPath', currentPath);
            }

            setIsReady(true);
        };

        handlePageLoad();
    }, []);

    useEffect(() => {
        if (isReady) {
            const savedPath = sessionStorage.getItem('lastPath');
            const pageReloaded = sessionStorage.getItem('pageReloaded');
            const currentPath = window.location.pathname;

            if (pageReloaded && savedPath === currentPath) {
                sessionStorage.removeItem('pageReloaded');
                sessionStorage.removeItem('activeNotification');
            }
        }
    }, [isReady]);

    const CalendarHandle = (input, notification) => {
        let weekOf;
      
        if (input && !(input instanceof DateTime)) {
          input = DateTime.fromISO(input);
        }
      
        if (notification) {
          weekOf = DateTime.fromObject({
            day: notification.day,
            month: notification.month,
            year: notification.year
          }).startOf('week');
        } else {
          weekOf = input.startOf('week');
        }
      
        const key = Object.keys(week);
      
        for (let i = 0; i < key.length; i++) {
          week[key[i]].day = weekOf.toFormat('M/d');
          document.getElementById(key[i]).innerHTML = week[key[i]].day + "";
          weekOf = weekOf.plus({ days: 1 });
        }
      
        setWeek(week);
    };

    const breakHandle = (day, index) => {
        const newShifts = [...week[day].shifts];
        newShifts[index].breakTaken = !newShifts[index].breakTaken;
        setWeek(week => ({
            ...week, [day]: { ...week[day], shifts: newShifts }
        }));
    }

    const addShift = (day, totalPages, setCurrentPage) => {
        setWeek(prevWeek => {
            const lastShift = prevWeek[day].shifts[prevWeek[day].shifts.length - 1];
            
            const newStartTime = lastShift ? { ...lastShift.endTime } : { hour: 0, minute: 0 };
            const newShift = {
                startTime: newStartTime,
                endTime: { hour: 0, minute: 0 },
                breakTaken: false,
                breakStart: { hour: 0, minute: 0 },
                breakEnd: { hour: 0, minute: 0 }
            };
            return {
                ...prevWeek,
                [day]: {
                    ...prevWeek[day],
                    shifts: [...prevWeek[day].shifts, newShift],
                    saved: false // Ensure new shifts are not saved initially
                }
            };
        });
        setCurrentPage(totalPages + 1);
    };

    const deleteShift = (day, index) => {
        const shift = week[day].shifts[index];
        const shiftHours = calculateShiftHours(shift);
        const newShifts = [...week[day].shifts];
        newShifts.splice(index, 1); 
        const newTotalHours = week[day].totalHours - shiftHours;
    
        setWeek(week => ({
            ...week,
            [day]: { ...week[day], shifts: newShifts, totalHours: newTotalHours }
        }));
    
        const totalPages = Math.ceil(newShifts.length / 1); 
        setCurrentPage(prevPage => ({
            ...prevPage,
            [day]: Math.max(1, Math.min(prevPage[day], totalPages))
        }));
    };

    const timeSet = (inpt, day, timeType, index) => {
        if(inpt.minute > 52){
            inpt.hour += 1
        }
        if(inpt.hour >= 13){
            inpt.hour -= 12
        }
        inpt.minute = ((((inpt.minute + 7.5) / 15 | 0) * 15) % 60)
        const newShifts = [...week[day].shifts];
        newShifts[index][timeType] = { hour: inpt.hour, minute: inpt.minute };
        setWeek(week => ({
            ...week, [day]: { ...week[day], shifts: newShifts }
        }));
    }

    const saveHandle = (day, setErrorMessage) => {
        let totalHours = 0;
        let hasError = false;
    
        // Check if there are any shifts for the day
        if (week[day].shifts.length === 0) {
            totalHours = 0;
        } else {
            week[day].shifts.forEach((shift, index) => {
                const { startTime, endTime } = shift;
    
                // Check for invalid times (0:00)
                if (
                    (startTime.hour === 0 && startTime.minute === 0) ||
                    (endTime.hour === 0 && endTime.minute === 0)
                ) {
                    hasError = true;
                    console.log(`Error in shift ${index + 1}: Start or End time is 00:00`);
                } else {
                    // Calculate hours worked (including break time)
                    const shiftHours = calculateShiftHours(shift);
                    if (shiftHours === 0) {
                        hasError = true;
                        console.log(`Error in shift ${index + 1}: Invalid shift duration`);
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
    
        setWeek(prevWeek => ({
            ...prevWeek,
            [day]: { ...prevWeek[day], totalHours, saved: !prevWeek[day].saved }
        }));
    
        setErrorMessage("");  
    };

    const calculateShiftHours = (shift) => {
        if ((shift.startTime.hour === 0 && shift.startTime.minute === 0) || 
            (shift.endTime.hour === 0 && shift.endTime.minute === 0)) {
            return 0;
        } else {
            let start = shift.startTime.hour + (shift.startTime.minute / 60);
            let end = shift.endTime.hour + (shift.endTime.minute / 60);
    
            if (isNaN(start) || isNaN(end)) {
                return 0;
            }
    
            // Subtract 12 hours if shift spans over midnight
            if (start > end) {
                end += 12;
            }
    
            // Calculate the break time in hours (if break was taken)
            let breakTime = 0;
            if (shift.breakTaken) {
                let breakStart = shift.breakStart.hour + (shift.breakStart.minute / 60);
                let breakEnd = shift.breakEnd.hour + (shift.breakEnd.minute / 60);
                if (!isNaN(breakStart) && !isNaN(breakEnd)) {
                    if (breakEnd <= breakStart) {
                        breakEnd += 12; 
                    }
                    breakTime = breakEnd - breakStart;
                }
            }
    
            // Subtract break time from total worked time
            let totalShiftTime = end - start - breakTime;
            return totalShiftTime > 0 ? totalShiftTime : 0; 
        }
    };

    const noteHandle = (inpt) => {
        setWeek(week => ({
            ...week, shiftNote: inpt
        }));
    }
    
    const submissionHandle = () => {
        console.log("Week submitted", week)
    }

    return (
        <>
            <div className="weeklyWrapper">
                <Card className="headerCard">
                    <CardHeader>
                        Week View
                    </CardHeader>
                </Card>
                <Card className="tableCard">
                    <CardHeader>
                        <div className="tableCardHead">
                            <DatePicker aria-label="workWeekSelect" id="workWeekSelect" onChange={CalendarHandle} />
                            <Button onClick={submissionHandle}>Submit</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHeader>
                                <TableColumn></TableColumn>
                                <TableColumn>Monday <div id={"monday"}></div></TableColumn>
                                <TableColumn>Tuesday <div id={"tuesday"}></div></TableColumn>
                                <TableColumn>Wednesday <div id={"wednesday"}></div></TableColumn>
                                <TableColumn>Thursday <div id={"thursday"}></div></TableColumn>
                                <TableColumn>Friday <div id={"friday"}></div></TableColumn>
                                <TableColumn>Saturday <div id={"saturday"}></div></TableColumn>
                                <TableColumn>Sunday <div id={"sunday"}></div></TableColumn>
                                <TableColumn>Shift Note</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    {Object.keys(week).map((day) => (
                                        <TableCell key={day}>
                                            <CalendarWeekTool 
                                                week={week} 
                                                timeSet={timeSet} 
                                                breakHandle={breakHandle} 
                                                day={day} 
                                                saveHandle={saveHandle} 
                                                addShift={addShift} 
                                                currentPage={currentPage[day]} 
                                                setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, [day]: page }))} 
                                                deleteShift={deleteShift}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <textarea onChange={(inpt) => noteHandle(inpt)} id="shift-note"></textarea>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default Calendar;
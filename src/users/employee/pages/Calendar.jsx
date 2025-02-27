import React, { useState, useEffect } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    Textarea, DatePicker, Checkbox, TimeInput, Popover, PopoverTrigger, PopoverContent, Pagination
} from "@nextui-org/react";
import { DateTime } from 'luxon';  
import { Shift } from "../../../components/shift";

const MAX_SHIFTS_PER_DAY = 3; 

const WeekTool = ({ week, timeSet, addShift, breakHandle, day, saveHandle, currentPage, setCurrentPage, deleteShift }) => {

    const [buttonColor, setButtonColor] = useState("#292F36");
    const [isTimeInputted, setIsTimeInputted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const shiftsPerPage = 1;
    const totalShifts = week[day].shifts.length;
    const totalPages = Math.ceil(totalShifts / shiftsPerPage);
    const [placement, setPlacement] = useState("bottom");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight < 875) {
                setPlacement("right");
            } else {
                setPlacement("bottom");
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * shiftsPerPage;
    const currentShifts = week[day].shifts.slice(startIndex, startIndex + shiftsPerPage);

    const handleTimeInput = (inpt, day, timeType, index) => {
        const previousShift = index > 0 ? week[day].shifts[index - 1] : null;

        if (timeType === "startTime" && previousShift && (inpt.hour < previousShift.endTime.hour || (inpt.hour === previousShift.endTime.hour && inpt.minute <= previousShift.endTime.minute))) {
            const formattedMinute = inpt.minute < 10 ? `0${inpt.minute}` : inpt.minute;
            setErrorMessage(`*Must be after ${previousShift.endTime.hour}:${formattedMinute}*`);
            return;
        }

        setErrorMessage("");
        setIsTimeInputted(true);
        timeSet(inpt, day, timeType, index);
    };
    
    const isShiftComplete = (shift) => {
        if (!shift) return false;
    
        const { startTime, endTime } = shift;
    
        if (
            (startTime.hour === 0 && startTime.minute === 0) ||
            (endTime.hour === 0 && endTime.minute === 0)
        ) {
            return false;
        }
    
        const start = startTime.hour + startTime.minute / 60;
        const end = endTime.hour + endTime.minute / 60;
    
        if (isNaN(start) || isNaN(end)) {
            return false;
        }
    
        return true;
    };

    const handleAddShift = () => {
        const lastShift = week[day].shifts[week[day].shifts.length - 1];
    
        if (totalShifts >= MAX_SHIFTS_PER_DAY) {
            setErrorMessage(`Daily ${MAX_SHIFTS_PER_DAY} Shift Limit Reached`);
            return;
        }
    
        if (lastShift && !isShiftComplete(lastShift)) {
            setErrorMessage("Please Complete The Current Shift Before Adding A New One");
            return;
        }
    
        setErrorMessage(""); 
        addShift(day, totalPages, setCurrentPage);
    };

    const handleDeleteShift = () => {
        if(totalShifts <= 1){
            setErrorMessage("Unable To Delete Last Remaining Shift");
            return;
        }
        setErrorMessage("");
        deleteShift(day, startIndex)
    }

    return (
        <>
            <Popover placement={placement} showArrow style={{ marginTop: "10px", display: "flex", padding: "10px" }}>
                <PopoverTrigger>
                    <Button style={{ width: "80%", color: "white", background: `${buttonColor}` }}>{week[day].saved ? "Hours: " + week[day].totalHours : "Add Shift"}</Button>
                </PopoverTrigger>
                <PopoverContent style={{ display: "flex", flexDirection: "column", height: "fit-content", width: "170px", border: "gray 1px", alignItems: "center" }}>
                    <div className="flex w-full flex-col" id="popup-card">
                        <h4 id="shift-title">
                            {String(day).charAt(0).toUpperCase() + String(day).slice(1)} Shift {currentPage}
                        </h4>
                        <div id="error-message">{errorMessage}</div>
                        <div className="flex w-full flex-col" style={{ gap: "20px", width: "90%", display: "flex", alignItems: "center" }}>
                            {currentShifts.map((shift, index) => (
                                <div key={index} id="shrunken-shift" style={{ position: "relative"}}>
                                    <div id="shrunken-shift-content">
                                        <div className="shift-content">
                                            <TimeInput isRequired label={"Start Time"} onChange={(inpt) => handleTimeInput(inpt, day, "startTime", startIndex + index)} value={shift.startTime} hourCycle={24} granularity="minute" isDisabled={week[day].saved} />
                                            <TimeInput isRequired label={"End Time"} onChange={(inpt) => handleTimeInput(inpt, day, "endTime", startIndex + index)} value={shift.endTime} isDisabled={week[day].saved} hourCycle={24} granularity="minute" />
                                        </div>
                                        {shift.breakTaken && (
                                            <div className="shift-content">
                                                <TimeInput isRequired label={"Break Start"} onChange={(inpt) => handleTimeInput(inpt, day, "breakStart", startIndex + index)} value={shift.breakStart} hourCycle={24} granularity="minute" isDisabled={week[day].saved} />
                                                <TimeInput isRequired label={"Break End"} onChange={(inpt) => handleTimeInput(inpt, day, "breakEnd", startIndex + index)} value={shift.breakEnd} hourCycle={24} granularity="minute" isDisabled={week[day].saved} />
                                            </div>
                                        )}
                                    </div>
                                    <div id="popup-checkbox">
                                        <Checkbox style={{ margin: "6px 0px", fontWeight: "500"}} onClick={() => breakHandle(day, startIndex + index)} isSelected={shift.breakTaken} isDisabled={week[day].saved}>
                                            <p style={{fontSize: "16px"}}>Meal Break?</p>
                                        </Checkbox>
                                    </div>
                                </div>
                            ))}
                            {week[day].saved ? "Total Hours Worked: " + week[day].totalHours : ""}
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                <Button style={{ height: "30px", alignItems: "center", justifyContent: "center", color: "white", background: "#1C6296" }} onClick={() => { saveHandle(day, setErrorMessage), setButtonColor("#1C6296") }} disabled={!isTimeInputted}> {week[day].saved ? "Edit" : "Save"}</Button>
                                <Button color="danger" style={{ height: "30px" }} onClick={handleDeleteShift}>Delete</Button>
                            </div>
                            <Shift className="add-btn" style={{ cursor: "pointer", alignItems: "center", justifyContent: "center", color: "black" }} onClick={handleAddShift} />
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Pagination loop showControls color="warning" key={currentPage} initialPage={currentPage} total={totalPages} onChange={handlePageChange} boundaries={0} siblings={0} />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

const Calendar = () => {

    const [week, setWeek] = useState({
        monday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0
            },
            endTime: {
                hour: 0,
                minute: 0
            },
            breakStart: {
                hour: 0,
                minute: 0
            },
            breakEnd: {
                hour: 0,
                minute: 0
            },
            totalHours: 0,
            breakTaken: false,
            saved: false,
            shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
        },
        tuesday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0
            },
            endTime: {
                hour: 0,
                minute: 0
            },
            breakStart: {
                hour: 0,
                minute: 0
            },
            breakEnd: {
                hour: 0,
                minute: 0
            },
            totalHours: 0,
            breakTaken: false,
            saved: false,
            shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
        },
        wednesday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0
            },
            endTime: {
                hour: 0,
                minute: 0
            },
            breakStart: {
                hour: 0,
                minute: 0
            },
            breakEnd: {
                hour: 0,
                minute: 0
            },
            totalHours: 0,
            breakTaken: false,
            saved: false,
            shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
        },
        thursday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0
            },
            endTime: {
                hour: 0,
                minute: 0
            },
            breakStart: {
                hour: 0,
                minute: 0
            },
            breakEnd: {
                hour: 0,
                minute: 0
            },
            totalHours: 0,
            breakTaken: false,
            saved: false,
            shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
        },
        friday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0
            },
            endTime: {
                hour: 0,
                minute: 0
            },
            breakStart: {
                hour: 0,
                minute: 0
            },
            breakEnd: {
                hour: 0,
                minute: 0
            },
            totalHours: 0,
            breakTaken: false,
            saved: false,
            shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
        },
        saturday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0
            },
            endTime: {
                hour: 0,
                minute: 0
            },
            breakStart: {
                hour: 0,
                minute: 0
            },
            breakEnd: {
                hour: 0,
                minute: 0
            },
            totalHours: 0,
            breakTaken: false,
            saved: false,
            shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
        },
        sunday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0
            },
            endTime: {
                hour: 0,
                minute: 0
            },
            breakStart: {
                hour: 0,
                minute: 0
            },
            breakEnd: {
                hour: 0,
                minute: 0
            },
            totalHours: 0,
            breakTaken: false,
            saved: false,
            shifts: [{ startTime: "", endTime: "", breakTaken: false, breakStart: "", breakEnd: "" }]
        }
    });

    const [isReady, setIsReady] = useState(false);
    const [currentPage, setCurrentPage] = useState({
        monday: 1,
        tuesday: 1,
        wednesday: 1,
        thursday: 1,
        friday: 1,
        saturday: 1,
        sunday: 1
    });

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
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"monday"} saveHandle={saveHandle} addShift={addShift} currentPage={currentPage.monday} setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, monday: page }))} deleteShift={deleteShift}/>
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"tuesday"} saveHandle={saveHandle} addShift={addShift} currentPage={currentPage.tuesday} setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, tuesday: page }))} deleteShift={deleteShift}/>
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"wednesday"} saveHandle={saveHandle} addShift={addShift} currentPage={currentPage.wednesday} setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, wednesday: page }))} deleteShift={deleteShift}/>
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"thursday"} saveHandle={saveHandle} addShift={addShift} currentPage={currentPage.thursday} setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, thursday: page }))} deleteShift={deleteShift}/>
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"friday"} saveHandle={saveHandle} addShift={addShift} currentPage={currentPage.friday} setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, friday: page }))} deleteShift={deleteShift}/>
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"saturday"} saveHandle={saveHandle} addShift={addShift} currentPage={currentPage.saturday} setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, saturday: page }))} deleteShift={deleteShift}/>
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"sunday"} saveHandle={saveHandle} addShift={addShift} currentPage={currentPage.sunday} setCurrentPage={(page) => setCurrentPage(prev => ({ ...prev, sunday: page }))} />
                                    </TableCell>
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
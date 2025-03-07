import { useState, useEffect } from "react";
import { Shift } from "./shift";
import {
    Button, Checkbox, TimeInput, Popover, PopoverTrigger, PopoverContent, Pagination
} from "@nextui-org/react";

const MAX_SHIFTS_PER_DAY = 3;

// FIX THE THING WHERE YOU CHANGE THE START TIME AFTER CREATING A NEW SHIFT

const CalendarWeekTool = ({ week, timeSet, breakHandle, day, saveHandle, currentPage, setCurrentPage, deleteShift, addShift, setWeek }) => {
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
    
        if (inpt.hour > 12) {
            const formattedMinute = inpt.minute < 10 ? `0${inpt.minute}` : inpt.minute;
            setErrorMessage(`*Hour must be between 0 and 12. Setting hour to 12.*`);
            inpt.hour = 12; 
        }
    
        setErrorMessage("");
        setIsTimeInputted(true);
    
        timeSet(inpt, day, timeType, index, week, setWeek);
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
        addShift(day, totalPages, setCurrentPage, setWeek);
    };

    const handleDeleteShift = () => {
        if (totalShifts <= 1) {
            setErrorMessage("Unable To Delete Last Remaining Shift");
            return;
        }
        setErrorMessage("");
        deleteShift(day, totalPages, setCurrentPage, week, setWeek);
    };

    // const thing = (shift) => {
    //     console.log(shift.startTime);
    //     shift.startTime.hour = 0;
    // }

    return (
        <>
            <Popover placement={placement} showArrow style={{ marginTop: "10px", display: "flex", padding: "10px" }}>
                <PopoverTrigger>
                    <Button style={{ width: "80%", color: "white", background: `${buttonColor}` }}>
                        {week[day].saved ? "Hours: " + week[day].totalHours : "Add Shift"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent style={{ display: "flex", flexDirection: "column", height: "fit-content", width: "170px", border: "gray 1px", alignItems: "center" }}>
                    <div className="flex w-full flex-col" id="popup-card">
                        <h4 id="shift-title">
                            {String(day).charAt(0).toUpperCase() + String(day).slice(1)} Shift {currentPage}
                        </h4>
                        <div id="error-message">{errorMessage}</div>
                        <div className="flex w-full flex-col" style={{ gap: "20px", width: "90%", display: "flex", alignItems: "center" }}>
                            {currentShifts.map((shift, index) => (
                                <div key={index} id="shrunken-shift" style={{ position: "relative" }}>
                                    <div id="shrunken-shift-content">
                                        <div className="shift-content">
                                            <TimeInput
                                                isRequired label={"Start Time"} onChange={(inpt) => handleTimeInput(inpt, day, "startTime", startIndex + index)}
                                                value={shift.startTime} hourCycle={24} granularity="minute" isDisabled={week[day].saved}
                                            />
                                            <TimeInput
                                                isRequired label={"End Time"} onChange={(inpt) => handleTimeInput(inpt, day, "endTime", startIndex + index)}
                                                value={shift.endTime} isDisabled={week[day].saved} hourCycle={24} granularity="minute" content="10:30"
                                            />
                                        </div>
                                        {shift.breakTaken && (
                                            <div className="shift-content">
                                                <TimeInput
                                                    isRequired label={"Break Start"} onChange={(inpt) => handleTimeInput(inpt, day, "breakStart", startIndex + index)}
                                                    value={shift.breakStart} hourCycle={24} granularity="minute" isDisabled={week[day].saved}
                                                />
                                                <TimeInput
                                                    isRequired label={"Break End"} onChange={(inpt) => handleTimeInput(inpt, day, "breakEnd", startIndex + index)}
                                                    value={shift.breakEnd} hourCycle={24} granularity="minute" isDisabled={week[day].saved}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div id="popup-checkbox">
                                        <Checkbox
                                            style={{ margin: "6px 0px", fontWeight: "500"}} onClick={() => breakHandle(day, startIndex + index, week, setWeek)}
                                            isSelected={shift.breakTaken} isDisabled={week[day].saved}
                                        >
                                            <p style={{fontSize: "16px"}}>Meal Break?</p>
                                        </Checkbox>
                                    </div>
                                    
                                    {/* <button onClick={() => { thing(shift); resetDay(day, setWeek); setCurrentPage(1); }}>RESET</button> */}
                                </div>
                            ))}
                            {week[day].saved ? "Total Hours Worked: " + week[day].totalHours : ""}
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                <Button
                                    style={{ height: "30px", alignItems: "center", justifyContent: "center", color: "white", background: "#1C6296" }}
                                    onClick={() => { saveHandle(day, week, setWeek, setErrorMessage); setButtonColor("#1C6296"); }}
                                    disabled={!isTimeInputted}
                                >
                                    {week[day].saved ? "Edit" : "Save"}
                                </Button>
                                <Button color="danger" style={{ height: "30px" }} onClick={handleDeleteShift}>
                                    Delete
                                </Button>
                            </div>
                            <Shift className="add-btn" style={{ cursor: "pointer", alignItems: "center", justifyContent: "center", color: "black" }} onClick={handleAddShift} />
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Pagination loop showControls color="warning" key={currentPage} initialPage={currentPage} total={totalPages} onChange={handlePageChange} boundaries={0} siblings={0} />
                            </div>
                            {/* COME BACK AND TRY TO GET THIS TO RESET THE INPUTS SO THE SHIFT LOOKS COMPLETELY EMPTY */}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default CalendarWeekTool;

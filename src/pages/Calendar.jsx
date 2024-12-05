import React, { useState } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    Textarea, DatePicker, Tooltip, Checkbox, TimeInput
} from "@nextui-org/react";
import { CalendarDate, getDayOfWeek } from "@internationalized/date";

const WeekTool = ({ week, timeSet, breakHandle, day, saveHandle }) => {
    return (
        <>
            <Tooltip
                showArrow
                placement="bottom"
                content={
                    // change the provider to allow for native handling or adapt to aria????
                    <>
                        <TimeInput isRequired label={"Start Time"} onChange={(inpt) => timeSet(inpt, day, "startTime")} value={week[day].startTime} 
                            isDisabled={week[day].saved}/>
                        <Checkbox onClick={() => breakHandle(day)} isSelected={week[day].breakTaken}
                            isDisabled={week[day].saved}>Meal Break?</Checkbox>
                        {week[day].breakTaken ?
                            <>
                                <TimeInput isRequired label={"Break Start"} onChange={(inpt) => timeSet(inpt, day, "breakStart")} value={week[day].breakStart}
                                isDisabled={week[day].saved} />
                                <TimeInput isRequired label={"Break End"} onChange={(inpt) => timeSet(inpt, day, "breakEnd")} value={week[day].breakEnd}
                                isDisabled={week[day].saved} />
                            </>
                            : ""}
                        <TimeInput isRequired label={"End Time"} onChange={(inpt) => timeSet(inpt, day, "endTime")} value={week[day].endTime}
                        isDisabled={week[day].saved} />
                        {week[day].saved ? "Total Hours Worked: " + week[day].totalHours : ""}
                        <Button onClick={() => saveHandle(day)}> { week[day].saved ? "Edit" : "Save"}</Button>
                    </>
                }
                classNames={{
                    base: [
                        // arrow color
                        "before:bg-neutral-400 dark:before:bg-white",
                    ],
                    content: [
                        "py-2 px-4 shadow-xl",
                        "text-black bg-gradient-to-br from-white to-neutral-400",
                    ],
                }}
            >
                <Button></Button>
            </Tooltip>
        </>
    );
}

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
            saved: false
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
            saved: false
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
            saved: false
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
            saved: false
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
            saved: false
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
            saved: false
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
            saved: false
        }
    });

    const CalendarHandle = (input) => {
        const date = new CalendarDate(input.year, input.month, input.day);
        const key = Object.keys(week)
        if (getDayOfWeek(date, "en-US") == 1) {
            for (let i = 0; i < key.length; i++) {
                week[key[i]].day = input.month + "/" + input.day
                document.getElementById(key[i]).innerHTML = week[key[i]].day + ""
                input.day += 1
            }
            input.day -= 7
            setWeek(week);
            document.getElementById("errorCode").innerHTML = "";
        } else {
            document.getElementById("errorCode").innerHTML = "Please select a Monday!";
            if (document.getElementById("monday").innerHTML.includes("/")) {
                for (let i = 0; i < key.length; i++) {
                    document.getElementById(key[i]).innerHTML = ""
                }
            }
        }
    }

    const breakHandle = (day) => {
        setWeek(week => ({
            ...week, [day]: { ...week[day], breakTaken: !(week[day].breakTaken) }
        }));
    }

    const timeSet = (inpt, day, timeType) => {
        if (inpt.hour == null) {
            inpt.hour = 0;
        }
        setWeek(week => ({
            ...week, [day]: { ...week[day], [timeType]: { ...week[day][timeType], hour: inpt.hour, minute: ((((inpt.minute + 7.5) / 15 | 0) * 15) % 60) } }
        }));
    }

    const saveHandle = (day) => {
        if(!week[day].saved){
            console.log("hours be houring")
        }
        setWeek(week => ({
            ...week, [day]: { ...week[day], saved: !(week[day].saved) }
        }));
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
                            <CardBody>
                                <DatePicker aria-label="workWeekSelect" id="workWeekSelect" onChange={CalendarHandle} />
                                <div id={"errorCode"}></div>
                            </CardBody>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHeader>
                                <TableColumn></TableColumn>
                                <TableColumn> Monday <div id={"monday"}></div></TableColumn>
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
                                    <TableCell>I am User Man</TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"monday"} saveHandle={saveHandle} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"tuesday"} saveHandle={saveHandle} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"wednesday"} saveHandle={saveHandle} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"thursday"} saveHandle={saveHandle} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"friday"} saveHandle={saveHandle} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"saturday"} saveHandle={saveHandle} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} timeSet={timeSet} breakHandle={breakHandle} day={"sunday"} saveHandle={saveHandle} />
                                    </TableCell>
                                    <TableCell>
                                        <Textarea></Textarea>
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
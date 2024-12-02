import React, { useState } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    Textarea, DatePicker, Tooltip, Checkbox, TimeInput
} from "@nextui-org/react";
import { CalendarDate, getDayOfWeek, Time } from "@internationalized/date";

const WeekTool = ({ week, stuffed, breaked, day }) => {
    const handleSubmit = (inpt, timeType) => {
        // console.log(Math.round((inpt.minute / 15) * 15));
        console.log(inpt)
        setWeek(week => ({
            ...week, [day]: { ...week[day], [timeType]: { ...week[day][timeType], hour: inpt.hour, minute: ((((inpt.minute + 7.5)/15 | 0) * 15) % 60), second: inpt.second }}
        }));
    }
    return (
        <>
            <Tooltip
                showArrow
                placement="bottom"
                content={
                    // Make the form handle all input
                    // change the provider to allow for native handling or adapt to aria????
                    <>
                        <h1>Shift</h1>
                        {/* Make the onchange change the value of the start time and set value to starttime value for controlled input???? */}
                        <TimeInput isRequired id={`StartTime-${day}`} label={"Start Time"} 
                            onChange={(inpt) => stuffed(inpt, day, "startTime")} value={week[day].startTime}></TimeInput>
                        <Checkbox onClick={() => breaked(day)} isSelected={week[day].break.taken}>Meal Break?</Checkbox>
                        {week[day].break.taken ?
                            <>
                                <Textarea label={"Break Start"}></Textarea>
                                <Textarea label={"Break End"}></Textarea>
                            </>
                            : <></>}
                        <Textarea id={`EndTime-${day}`} label={"End Time"}></Textarea>
                        <Button type="submit">Finish</Button>
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
                minute: 0,
                second: 0
            },
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            },
            submitted: false
        },
        tuesday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0,
                second: 0
            },
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            },
            submitted: false
        },
        wednesday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0,
                second: 0
            },
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            },
            submitted: false
        },
        thursday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0,
                second: 0
            },
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            },
            submitted: false
        },
        friday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0,
                second: 0
            },
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            },
            submitted: false
        },
        saturday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0,
                second: 0
            },
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            },
            submitted: false
        },
        sunday: {
            day: "",
            startTime: {
                hour: 0,
                minute: 0,
                second: 0
            },
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            },
            submitted: false
        }
    });

    const stuff = (input) => {
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

    const breaked = (day) => {
        setWeek(week => ({
            ...week, [day]: { ...week[day], break: { ...week[day].break, taken: !(week[day].break.taken) } }
        }));
    }

    const timeSet = (inpt, day, timeType) => {
        setWeek(week => ({
            ...week, [day]: { ...week[day], [timeType]: { ...week[day][timeType], hour: inpt.hour, minute: ((((inpt.minute + 7.5)/15 | 0) * 15) % 60), second: inpt.second }}
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
                                <DatePicker aria-label="workWeekSelect" id="workWeekSelect" onChange={stuff} />
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
                                        <WeekTool week={week} stuffed={timeSet} breaked={breaked} day={"monday"} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} stuffed={timeSet} breaked={breaked} day={"tuesday"} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} stuffed={timeSet} breaked={breaked} day={"wednesday"} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} stuffed={timeSet} breaked={breaked} day={"thursday"} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} stuffed={timeSet} breaked={breaked} day={"friday"} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} stuffed={timeSet} breaked={breaked} day={"saturday"} />
                                    </TableCell>
                                    <TableCell>
                                        <WeekTool week={week} stuffed={timeSet} breaked={breaked} day={"sunday"} />
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
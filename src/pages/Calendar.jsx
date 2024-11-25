import React, { useState, useCallback } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    Textarea, DatePicker, Tooltip, Checkbox
} from "@nextui-org/react";
import { CalendarDate, getDayOfWeek } from "@internationalized/date";

const Calendar = () => {
    const [week, setWeek] = useState({
        monday: {
            day: "",
            startTime: "",
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            }
        },
        tuesday: {
            day: "",
            startTime: "",
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            }
        },
        wednesday: {
            day: "",
            startTime: "",
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            }
        },
        thursday: {
            day: "",
            startTime: "",
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            }
        },
        friday: {
            day: "",
            startTime: "",
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            }
        },
        saturday: {
            day: "",
            startTime: "",
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            }
        },
        sunday: {
            day: "",
            startTime: "",
            endTime: "",
            break: {
                taken: false,
                start: "",
                end: ""
            }
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

    const breaked = (input) => {
        const key = input
        setWeek(week => ({
            ...week, [key]: {...week[key], break: {...week[key].break, taken: !(week[key].break.taken)}}
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
                                        <Tooltip
                                            showArrow
                                            placement="bottom"
                                            content={
                                                <>
                                                    <h1>Monday Shift</h1>
                                                    <Textarea label={"Start Time"}></Textarea>
                                                    {
                                                    // week.monday.break.taken ?
                                                        // <Checkbox id="Break" onClick={() => breaked("monday")} defaultSelected>Break</Checkbox>
                                                        // :
                                                        <Checkbox onClick={() => breaked("monday")} isSelected={week.monday.break.taken}>Break</Checkbox>
                                                    }
                                                    {week.monday.break.taken ?
                                                        <>
                                                            <Textarea label={"Break Start"}></Textarea>
                                                            <Textarea label={"Break End"}></Textarea>
                                                        </>
                                                        : <></>}
                                                    <Textarea label={"End Time"}></Textarea>
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
                                    </TableCell>
                                    <TableCell>
                                        <Button></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button></Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button></Button>
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
import React, { useState, useCallback } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    Textarea, DatePicker
} from "@nextui-org/react";
import {CalendarDate, getDayOfWeek } from "@internationalized/date";

const Calendar = () => {
    const [week, setWeek] = useState({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    });

    const stuff = (input) => {
        const date = new CalendarDate(input.year, input.month, input.day);
        if (getDayOfWeek(date, "en-US") == 1) {
            for (const [key, value] of Object.entries(week)) {
                if (key != "key") {
                    week.key = input.month + "/" + input.day
                    console.log(key)
                    document.getElementById(key).innerHTML = week.key
                    input.day += 1
                }
            }
            input.day -= 7
            console.log(input)
            setWeek(week);
            document.getElementById("errorCode").innerHTML = "";
        } else {
            document.getElementById("errorCode").innerHTML = "Please select a Monday!";
        }

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
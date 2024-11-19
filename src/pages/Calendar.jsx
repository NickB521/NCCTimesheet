import React, { useState, useCallback } from "react";
import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn,
    Card, CardHeader, CardBody, CardFooter, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    Pagination, Spinner, getKeyValue, DateRangePicker,
    Textarea
} from "@nextui-org/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

const Calendar = () => {
    const [week, setWeek] = useState({
        start: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        end: ""
    });
    const stuff = (input) => {
        // for (const [key, value] of Object.entries(week)) {
        //     if (key == "end") {
        //         week.key = input.start.month + "/" + input.end.day
        //         document.getElementById(key).innerHTML = ("Sunday " + week.key)
        //     } else if (key == "start") {
        //         week.key = input.start.month + "/" + input.start.day
        //         document.getElementById(key).innerHTML = ("Monday " + week.key)
        //     } else {
        //         week.key = input.start.month + "/" + input.start.day
        //         document.getElementById(key).innerHTML = (key[0].toUpperCase() + key.slice(1, key.length) + " " + week.key)
        //         input.start.day += 1
        //     }
        // }


        // setWeek(week);
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
                                {/* <DateRangePicker aria-label="workWeekSelect" onChange={stuff} /> */}
                            </CardBody>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHeader>
                                <TableColumn></TableColumn>
                                <TableColumn id={"start"}>Monday</TableColumn>
                                <TableColumn id={"tuesday"}>Tuesday</TableColumn>
                                <TableColumn id={"wednesday"}>Wednesday</TableColumn>
                                <TableColumn id={"thursday"}>Thursday</TableColumn>
                                <TableColumn id={"friday"}>Friday</TableColumn>
                                <TableColumn id={"saturday"}>Saturday</TableColumn>
                                <TableColumn id={"end"}>Sunday</TableColumn>
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
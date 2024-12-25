import React, { useState, useEffect } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    Textarea, DatePicker, Checkbox, TimeInput, Popover, PopoverTrigger, PopoverContent
} from "@nextui-org/react";

import { Link } from "react-router-dom";


import { getDayOfWeek, getLocalTimeZone, today } from "@internationalized/date";

const SupervisorTable = () => {
    const[employeeList, setEmployeeList] = useState([{id:1, name: "bob", workedHours: 23.0, breakTime: 123, totalTime: 123, sender: "bob", information: "forwarded"}]
    )
    const[week, setWeek] = useState()

    const CalendarHandle = (input) => {
            const key = Object.keys(week)
            input.day -= (getDayOfWeek(input, "en-US") - 1)
            for (let i = 0; i < key.length; i++) {
                week[key[i]].day = input.month + "/" + input.day
                document.getElementById(key[i]).innerHTML = week[key[i]].day + ""
                input.day += 1
            }
            input.day -= 7
            setWeek(week);
        }
    
    const fetchData = () => {
        
    }
    

    return(  
            <div id= "supervisor-table" className="weeklyWrapper" > 
                <Card className="headerCard">
                    <CardHeader>
                        List View - 
                    </CardHeader>
                </Card>
                <Card className="tableCard">
                    <CardHeader>
                        <div className="tableCardHead">
                            <CardBody>
                                <DatePicker aria-label="workWeekSelectTable" id="workWeekSelectTable" onChange={CalendarHandle} />
                                 <div id={"errorCode"}></div>
                            </CardBody>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHeader>
                                <TableColumn></TableColumn>
                                <TableColumn>Worked Hours</TableColumn>
                                <TableColumn>Break Time</TableColumn>
                                <TableColumn>Total Time</TableColumn>
                                <TableColumn>Direct View</TableColumn>
                                <TableColumn>Sender</TableColumn>
                                <TableColumn>Information</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {employeeList.map((row, index) =>
                                    <TableRow id={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.workedHours}</TableCell>
                                        <TableCell>{row.breakTime}</TableCell>
                                        <TableCell>{row.totalTime}</TableCell>
                                        <TableCell><button>{row.name} View</button></TableCell>
                                        <TableCell>{row.sender}</TableCell>
                                        <TableCell>{row.information}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
    )
}

export default SupervisorTable;
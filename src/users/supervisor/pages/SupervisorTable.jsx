import React, { useState, useEffect } from "react";
import {
    Button, Card, CardHeader, CardBody, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell,
    DatePicker, Pagination, Input
} from "@nextui-org/react";

import { Link } from "react-router-dom";
import { getDayOfWeek } from "@internationalized/date";
import { employeeData } from "../../../assets/data/supervisortable-data";


const SupervisorTable = () => {
    const [employeeList, setEmployeeList] = useState(employeeData)
    const [filteredEmployeeList, setFilteredEmployeeList] = useState(employeeList);
    const [searchQuery, setSearchQuery] = useState("");
    const [week, setWeek] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = Math.ceil(employeeList.length/ itemsPerPage);
    const indexLast = currentPage * itemsPerPage;
    const indexFirst= indexLast - itemsPerPage;
    const currentItems = filteredEmployeeList.slice(indexFirst, indexLast);

    const handlePageChange = (value) =>{
        setCurrentPage(value);
    }

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
            //need to figure out logic for sending week data
            fetchData();
        }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filteredList = employeeList.filter((employee) =>
          employee.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredEmployeeList(filteredList); 
        };
    
    const fetchData = () => {
        
    }
    

    return(  
            <div id= "supervisor-table" className="weeklyWrapper" > 
                <Card className="headerCard">
                    <CardHeader>
                        List View 
                    </CardHeader>
                </Card>
                <Card className="tableCard">
                    <CardHeader>
                        <div className="tableCardHead" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div className="tableCardHead">
                                <CardBody>
                                    <DatePicker aria-label="workWeekSelectTable" id="workWeekSelectTable" onChange={CalendarHandle} />
                                    <div id={"errorCode"}></div>
                                </CardBody>
                            </div>
                            <div>
                                <Input
                                clearable
                                bordered
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                css={{ width: "250px"}}
                                />
                            </div>
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
                            <TableBody >
                                {
                                //for the link it needs to be changed later on to represent specific endpoint fo reach user so the id of the user like: /Calendar/{userId}
                                currentItems.map((row, index) =>
                                    <TableRow id={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.workedHours}</TableCell>
                                        <TableCell>{row.breakTime}</TableCell>
                                        <TableCell>{row.totalTime}</TableCell>
                                        <TableCell><Link to="/Calendar"><Button style={{width: "30%", color: "white", background: "var(--gray)" }}>{row.name} View</Button></Link></TableCell>
                                        <TableCell>{row.sender}</TableCell>
                                        <TableCell>{row.information}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                    marginBottom: "16px",
                    }}
                >
                    <Pagination
                        color="default"
                        variant="flat"
                        showControls
                        total={totalPages}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
    )
}

export default SupervisorTable;
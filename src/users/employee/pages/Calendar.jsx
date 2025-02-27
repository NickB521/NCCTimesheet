import React, { useState, useEffect } from "react";
import {
    Card, CardHeader, CardBody, Table, TableBody, TableRow, TableCell, TableHeader, TableColumn, DatePicker, Button, 
} from "@nextui-org/react";
import CalendarWeekTool from "../../../components/CalendarWeekTool";
import { initializeWeek, initializeCurrentPage, CalendarHandle, submissionHandle, timeSet, breakHandle, saveHandle, addShift, deleteShift, noteHandle } from "../../../components/CalendarFunctions";
import { DateTime } from "luxon";

const Calendar = () => {
    const [week, setWeek] = useState(initializeWeek());
    const [currentPage, setCurrentPage] = useState(initializeCurrentPage());

    useEffect(() => {
        const savedNotification = JSON.parse(sessionStorage.getItem('activeNotification'));
        CalendarHandle(DateTime.local(), savedNotification, week, setWeek);
    }, []);

    return (
        <>
            <div className="weeklyWrapper">
                <Card className="headerCard">
                    <CardHeader>Week View</CardHeader>
                </Card>
                <Card className="tableCard">
                    <CardHeader>
                        <div className="tableCardHead">
                            <DatePicker aria-label="workWeekSelect" id="workWeekSelect" onChange={(e) => CalendarHandle(e, null, week, setWeek)} />
                            <Button onClick={() => submissionHandle(week)}>Submit</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHeader>
                                <TableColumn></TableColumn>
                                {Object.keys(week).map((day) => (
                                    <TableColumn key={day}>
                                        {day.charAt(0).toUpperCase() + day.slice(1)} <div id={day}></div>
                                    </TableColumn>
                                ))}
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
                                                setWeek={setWeek}
                                                // resetDay={resetDay}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <textarea onChange={(e) => noteHandle(e)} id="shift-note"></textarea>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default Calendar;

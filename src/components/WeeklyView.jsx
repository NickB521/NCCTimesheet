import React, { useState, useCallback} from "react";
import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn,
    Card, CardHeader, CardBody, CardFooter, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell, 
    Pagination, Spinner, getKeyValue, DateRangePicker,
    Textarea
} from "@nextui-org/react";
const WeeklyView = () => {

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
                            <DateRangePicker></DateRangePicker>
                            </CardBody>
                            {/* <Button className="tableCardButton" >Circle</Button> */}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHeader>
                                    <TableColumn></TableColumn>
                                    <TableColumn>Monday</TableColumn>
                                    <TableColumn>Tuesday</TableColumn>
                                    <TableColumn>Wednesday</TableColumn>
                                    <TableColumn>Thursday</TableColumn>
                                    <TableColumn>Friday</TableColumn>
                                    <TableColumn>Saturday</TableColumn>
                                    <TableColumn>Sunday</TableColumn>
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

export default WeeklyView;
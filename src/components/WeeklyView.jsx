import React, { useState, useCallback} from "react";
import {
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn,
    Card, CardHeader, CardBody, CardFooter, Table,
    TableHeader, TableBody, TableRow, TableColumn, TableCell, 
    Pagination, Spinner, getKeyValue, DateRangePicker
} from "@nextui-org/react";
const WeeklyView = () => {

    return (
        <>
            <div className="weeklyWrapper">
                <Card className="headerCard">
                    <CardHeader>
                        <h2>Week View</h2>
                    </CardHeader>
                </Card>
                <Card className="tableCard">
                    <CardHeader>
                        <div className="tableCardHead">
                            <CardBody>
                            <DateRangePicker></DateRangePicker>
                            </CardBody>
                            <Button className="tableCardButton" >Circle</Button>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <TableHeader>
                                    <TableColumn></TableColumn>
                                    <TableColumn>h1</TableColumn>
                                    <TableColumn>h1</TableColumn>
                                    <TableColumn>h1</TableColumn>
                                    <TableColumn>h1</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>I am User Man</TableCell>
                                    <TableCell>s</TableCell>
                                    <TableCell>g</TableCell>
                                    <TableCell>1231231231</TableCell>
                                    <TableCell>Pineapple</TableCell>
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
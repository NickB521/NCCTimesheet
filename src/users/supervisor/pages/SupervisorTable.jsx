import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  DatePicker,
  Pagination,
  Input,
} from "@nextui-org/react";

import { Link } from "react-router-dom";
import { getDayOfWeek } from "@internationalized/date";
import { employeeData } from "../../../assets/data/supervisortable-data";

const SupervisorTable = () => {
  const [employeeList, setEmployeeList] = useState(employeeData); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const getFilteredList = () => {
    if (!searchQuery) return employeeList; 
    return employeeList.filter((employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const fetchCurrentItems = () => {
    const filteredList = getFilteredList(); 
    const startIndex = (currentPage - 1) * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage;
    return filteredList.slice(startIndex, endIndex); 
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const CalendarHandle = (input) => {
    const key = Object.keys(week);
    input.day -= getDayOfWeek(input, "en-US") - 1;
    for (let i = 0; i < key.length; i++) {
      week[key[i]].day = input.month + "/" + input.day;
      document.getElementById(key[i]).innerHTML = week[key[i]].day + "";
      input.day += 1;
    }
    input.day -= 7;
    setWeek(week);
    fetchData();
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight < 800) {
        setitemsPerPage(3);
      } 
      else if (screenHeight < 950) {
        setitemsPerPage(5);
      } 
      else if (screenHeight < 1100) {
        setitemsPerPage(10);
      } 
      else if (screenHeight < 1200) {
        setitemsPerPage(12);
      } 
      else{
        setitemsPerPage(15);
      } 
    }
  
    updateItemsPerPage();
  
    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }), [];

  // Get total pages after filtering
  const totalFilteredPages = Math.ceil(getFilteredList().length / itemsPerPage);

  return (
    <div id="supervisor-table" className="weeklyWrapper">
      <Card className="headerCard">
        <CardHeader>List View</CardHeader>
      </Card>
      <Card className="tableCard">
        <CardHeader>
          <div
            className="tableCardHead"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="tableCardHead">
              <CardBody>
                <DatePicker
                  aria-label="workWeekSelectTable"
                  id="workWeekSelectTable"
                  onChange={CalendarHandle}
                />
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
                css={{ width: "250px" }}
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
            <TableBody>
              {fetchCurrentItems().slice(0, itemsPerPage).map((row, index) => (
                <TableRow key={index} id={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.workedHours}</TableCell>
                  <TableCell>{row.breakTime}</TableCell>
                  <TableCell>{row.totalTime}</TableCell>
                  <TableCell>
                    <Link to="/employee-focus">
                      <Button
                        style={{
                          width: "30%",
                          color: "white",
                          background: "var(--gray)",
                        }}
                      >
                        {row.name} View
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>{row.sender}</TableCell>
                  <TableCell>{row.information}</TableCell>
                </TableRow>
              ))}
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
          total={totalFilteredPages}
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SupervisorTable;

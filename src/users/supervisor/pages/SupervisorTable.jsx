
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

import { Link, useNavigate } from "react-router-dom";
import { DateTime } from 'luxon';
import { useLocation } from "react-router-dom";
import { businessData } from "../../../assets/data/table-data";

const SupervisorTable = () => {
  const location = useLocation();

  const [employeeList, setEmployeeList] = useState(location.state?.employeeData);
  const businessName = location.state?.businessName;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const navigate = useNavigate();

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
    console.log(filteredList)
    return filteredList.slice(startIndex, endIndex);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    let week = DateTime.local().startOf("week");
    console.log (week.toISODate().toString())
  }, [])
  
  const CalendarHandle = (input) => {
    let weekOf;
      
    if (input && !(input instanceof DateTime)) {
      input = DateTime.fromISO(input);
    }  
      
    weekOf = input.startOf('week').toISODate().toString();

    console.log(weekOf);
    
    // setEmployeeList(supervisorTableData(weekOf));
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight < 800) {
        setitemsPerPage(3);
      } else if (screenHeight < 950) {
        setitemsPerPage(5);
      } else if (screenHeight < 1100) {
        setitemsPerPage(10);
      } else if (screenHeight < 1200) {
        setitemsPerPage(12);
      } else {
        setitemsPerPage(15);
      }
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }),
    [];

  // Get total pages after filtering
  const totalFilteredPages = Math.ceil(getFilteredList().length / itemsPerPage);

  return (
    <div id="supervisor-table" className="weeklyWrapper">
      <Card className="headerCard">
        <CardHeader>Supervisor List View: {businessName}</CardHeader>
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
              {fetchCurrentItems()
                .slice(0, itemsPerPage)
                .map((row, index) => (
                  <TableRow key={index} id={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.workedHours}</TableCell>
                    <TableCell>{row.breakTime}</TableCell>
                    <TableCell>{row.totalTime}</TableCell>
                    <TableCell>
                      <Button
                        style={{
                          width: "30%",
                          color: "white",
                          background: "var(--gray)",
                        }}
                        onClick={() =>
                          navigate("/employee-focus", {
                            state: { name: row.name },
                          })
                        }
                      >
                        {row.name} View
                      </Button>
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

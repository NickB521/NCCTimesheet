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
import { businessData } from "../../../assets/data/table-data";

const CoordinatorTable = () => {
  const [weekOf, setWeekOf] = useState(DateTime.local().startOf("week").toISODate().toString());
  const [businessList, setBusinessList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    CalendarHandle(weekOf);
  },[weekOf])

  const CalendarHandle = (input) => {      
    if (input && !(input instanceof DateTime)) {
      input = DateTime.fromISO(input);
    }  
    
    setWeekOf(input.startOf('week').toISODate().toString());
    
    //sees if the date exists in the array
    try {
      setBusinessList(businessData.find(list => (list.date == weekOf)).companies)
    }
    //If the date does not exist, then it fills businesslist with a "blank" list
    catch {
      let blankList = [{name: "N/A", employees: [ 
          {
            id: 1,
            name: "N/A",
            workedHours: 0,
            breakTime: 0,
            totalTime: 0,
            sender: "N/A",
            information: "N/A"
          },
        ]
      }];
      
      setBusinessList(blankList);
    }
  };

  const getFilteredList = () => {
    if (!searchQuery) return businessList;
    return businessList.filter((business) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase())
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
  
  const getTotalWorkedHours = (employees) => {
    let totalWorkedHours = 0
    employees.forEach(employee =>{
      totalWorkedHours += employee.workedHours;
    })
    return totalWorkedHours
  }
  const getTotalBreakTime = (employees) => {
    let totalBreakTime = 0
    employees.forEach(employee =>{
      totalBreakTime += employee.breakTime;
    })
    return totalBreakTime
  }
  const getTotalTime = (employees) => {
    let totalTime = 0
    employees.forEach(employee =>{
      totalTime += employee.totalTime;
    })
    return totalTime
  }

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
  }, []);

  // Get total pages after filtering
  const totalFilteredPages = Math.ceil(getFilteredList().length / itemsPerPage);

  return (
    <div id="supervisor-table" className="weeklyWrapper">
      <Card className="headerCard">
        <CardHeader>Coordinator List View</CardHeader>
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
              <TableColumn>Name</TableColumn>
              <TableColumn>Total Worked Hours</TableColumn>
              <TableColumn>Total Break Time</TableColumn>
              <TableColumn>Total Time</TableColumn>
              <TableColumn>Direct View</TableColumn>
              <TableColumn>Total Entries</TableColumn>
            </TableHeader>
            <TableBody>
              {
                
              fetchCurrentItems()
                .map((row, index) => (
                  <TableRow key={index} id={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{getTotalWorkedHours(row.employees)}</TableCell>
                    <TableCell>{getTotalBreakTime(row.employees)}</TableCell>
                    <TableCell>{getTotalTime(row.employees)}</TableCell>
                    <TableCell>
                      <Button
                        style={{
                          width: "50%",
                          color: "white",
                          background: "var(--gray)",
                        }}
                        onClick={() =>
                          navigate("/supervisor-table",
                            {
                              state: {employeeData: row.employees, businessName : row.name}
                            }
                          )

                        }
                      >
                        {row.name} View
                      </Button>
                    </TableCell>
                    <TableCell>{row.employees.length}</TableCell>
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
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CoordinatorTable;

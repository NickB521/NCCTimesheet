import React, { useState, useEffect } from "react";
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
  Textarea,
  DatePicker,
  Checkbox,
  TimeInput,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import { Link, useLocation } from "react-router-dom";

import { getDayOfWeek, getLocalTimeZone, today } from "@internationalized/date";

const WeekTool = ({ week, timeSet, breakHandle, day, saveHandle }) => {
  const [buttonColor, setButtonColor] = useState("#292F36");

  return (
    <>
      <Popover placement="bottom" showArrow style={{ marginTop: "10px" }}>
        <PopoverTrigger placement="bottom" showArrow>
          <Button
            style={{
              width: "80%",
              color: "white",
              background: `${buttonColor}`,
            }}
          >
            {week[day].saved ? "Hours: " + week[day].totalHours : "Add Shift"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            width: "170px",
            border: "gray 1px",
            alignItems: "center",
          }}
        >
          <div
            className="flex w-full flex-col"
            style={{
              width: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingBottom: "20px",
            }}
          >
            <h4
              className="text-medium font-medium"
              id="notification-title"
              style={{ padding: "20px" }}
            >
              Shift Information
            </h4>
            <div
              className="flex w-full flex-col"
              style={{
                gap: "20px",
                width: "90%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TimeInput
                isRequired
                label={"Start Time"}
                onChange={(inpt) => timeSet(inpt, day, "startTime")}
                value={week[day].startTime.hour != 0 ? week[day].startTime : ""}
                isDisabled={week[day].saved}
              />
              <Checkbox
                onClick={() => breakHandle(day)}
                isSelected={week[day].breakTaken}
                isDisabled={week[day].saved}
              >
                Meal Break?
              </Checkbox>
              {week[day].breakTaken ? (
                <>
                  <TimeInput
                    isRequired
                    label={"Break Start"}
                    onChange={(inpt) => timeSet(inpt, day, "breakStart")}
                    value={
                      week[day].breakStart.hour != 0 ? week[day].breakStart : ""
                    }
                    isDisabled={week[day].saved}
                  />
                  <TimeInput
                    isRequired
                    label={"Break End"}
                    onChange={(inpt) => timeSet(inpt, day, "breakEnd")}
                    value={
                      week[day].breakEnd.hour != 0 ? week[day].breakEnd : ""
                    }
                    isDisabled={week[day].saved}
                  />
                </>
              ) : (
                ""
              )}

              <TimeInput
                isRequired
                label={"End Time"}
                onChange={(inpt) => timeSet(inpt, day, "endTime")}
                value={week[day].endTime.hour != 0 ? week[day].endTime : ""}
                isDisabled={week[day].saved}
              />
              {week[day].saved
                ? "Total Hours Worked: " + week[day].totalHours
                : ""}
              <Button
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60%",
                  padding: "20px",
                  color: "white",
                  background: "#1C6296",
                }}
                onClick={() => {
                  saveHandle(day), setButtonColor("#1C6296");
                }}
              >
                {" "}
                {week[day].saved ? "Edit" : "Save"}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

const SupervisorCalendar = () => {
  const location = useLocation();
  const employeeName = location.state?.name || "Name";

  const [week, setWeek] = useState({
    monday: {
      day: "",
      startTime: {
        hour: 0,
        minute: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
      },
      breakStart: {
        hour: 0,
        minute: 0,
      },
      breakEnd: {
        hour: 0,
        minute: 0,
      },
      totalHours: 0,
      breakTaken: false,
      saved: false,
    },
    tuesday: {
      day: "",
      startTime: {
        hour: 0,
        minute: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
      },
      breakStart: {
        hour: 0,
        minute: 0,
      },
      breakEnd: {
        hour: 0,
        minute: 0,
      },
      totalHours: 0,
      breakTaken: false,
      saved: false,
    },
    wednesday: {
      day: "",
      startTime: {
        hour: 0,
        minute: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
      },
      breakStart: {
        hour: 0,
        minute: 0,
      },
      breakEnd: {
        hour: 0,
        minute: 0,
      },
      totalHours: 0,
      breakTaken: false,
      saved: false,
    },
    thursday: {
      day: "",
      startTime: {
        hour: 0,
        minute: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
      },
      breakStart: {
        hour: 0,
        minute: 0,
      },
      breakEnd: {
        hour: 0,
        minute: 0,
      },
      totalHours: 0,
      breakTaken: false,
      saved: false,
    },
    friday: {
      day: "",
      startTime: {
        hour: 0,
        minute: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
      },

      breakStart: {
        hour: 0,
        minute: 0,
      },
      breakEnd: {
        hour: 0,
        minute: 0,
      },
      totalHours: 0,
      breakTaken: false,
      saved: false,
    },
    saturday: {
      day: "",
      startTime: {
        hour: 0,
        minute: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
      },

      breakStart: {
        hour: 0,
        minute: 0,
      },
      breakEnd: {
        hour: 0,
        minute: 0,
      },
      totalHours: 0,
      breakTaken: false,
      saved: false,
    },
    sunday: {
      day: "",
      startTime: {
        hour: 0,
        minute: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
      },

      breakStart: {
        hour: 0,
        minute: 0,
      },
      breakEnd: {
        hour: 0,
        minute: 0,
      },
      totalHours: 0,
      breakTaken: false,
      saved: false,
    },
  });

  useEffect(() => {
    let currentDate = today(getLocalTimeZone());
    CalendarHandle(currentDate);
  });

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
  };

  const breakHandle = (day) => {
    setWeek((week) => ({
      ...week,
      [day]: { ...week[day], breakTaken: !week[day].breakTaken },
    }));
  };

  const timeSet = (inpt, day, timeType) => {
    // if (inpt.hour == null) {
    //     inpt.hour = week[day][timeType].hour;
    // }
    setWeek((week) => ({
      ...week,
      [day]: {
        ...week[day],
        [timeType]: {
          ...week[day][timeType],
          hour: inpt.hour,
          minute: ((((inpt.minute + 7.5) / 15) | 0) * 15) % 60,
        },
      },
    }));
  };

  const saveHandle = (day) => {
    let end = week[day].endTime.hour + week[day].endTime.minute / 60;
    let start = week[day].startTime.hour + week[day].startTime.minute / 60;
    if (!week[day].saved) {
      if (start > end) {
        week[day].totalHours = end + 12 - start;
      } else {
        week[day].totalHours = end - start;
      }
    }
    setWeek((week) => ({
      ...week,
      [day]: { ...week[day], saved: !week[day].saved },
    }));
  };

  return (
    <>
      <div className="weeklyWrapper">
        <Card className="headerCard">
          <CardHeader>Supervisor Week View</CardHeader>
        </Card>
        <Card className="tableCard">
          <CardHeader>
            <div className="tableCardHead">
              <CardBody>
                <DatePicker
                  aria-label="workWeekSelect"
                  id="workWeekSelect"
                  onChange={CalendarHandle}
                />
                <div id={"errorCode"}></div>
              </CardBody>
            </div>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                <TableColumn></TableColumn>
                <TableColumn>
                  Monday <div id={"monday"}></div>
                </TableColumn>
                <TableColumn>
                  Tuesday <div id={"tuesday"}></div>
                </TableColumn>
                <TableColumn>
                  Wednesday <div id={"wednesday"}></div>
                </TableColumn>
                <TableColumn>
                  Thursday <div id={"thursday"}></div>
                </TableColumn>
                <TableColumn>
                  Friday <div id={"friday"}></div>
                </TableColumn>
                <TableColumn>
                  Saturday <div id={"saturday"}></div>
                </TableColumn>
                <TableColumn>
                  Sunday <div id={"sunday"}></div>
                </TableColumn>
                <TableColumn>Shift Note</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{employeeName}</TableCell>
                  <TableCell>
                    <WeekTool
                      week={week}
                      timeSet={timeSet}
                      breakHandle={breakHandle}
                      day={"monday"}
                      saveHandle={saveHandle}
                    />
                  </TableCell>
                  <TableCell>
                    <WeekTool
                      week={week}
                      timeSet={timeSet}
                      breakHandle={breakHandle}
                      day={"tuesday"}
                      saveHandle={saveHandle}
                    />
                  </TableCell>
                  <TableCell>
                    <WeekTool
                      week={week}
                      timeSet={timeSet}
                      breakHandle={breakHandle}
                      day={"wednesday"}
                      saveHandle={saveHandle}
                    />
                  </TableCell>
                  <TableCell>
                    <WeekTool
                      week={week}
                      timeSet={timeSet}
                      breakHandle={breakHandle}
                      day={"thursday"}
                      saveHandle={saveHandle}
                    />
                  </TableCell>
                  <TableCell>
                    <WeekTool
                      week={week}
                      timeSet={timeSet}
                      breakHandle={breakHandle}
                      day={"friday"}
                      saveHandle={saveHandle}
                    />
                  </TableCell>
                  <TableCell>
                    <WeekTool
                      week={week}
                      timeSet={timeSet}
                      breakHandle={breakHandle}
                      day={"saturday"}
                      saveHandle={saveHandle}
                    />
                  </TableCell>
                  <TableCell>
                    <WeekTool
                      week={week}
                      timeSet={timeSet}
                      breakHandle={breakHandle}
                      day={"sunday"}
                      saveHandle={saveHandle}
                    />
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
};

export default SupervisorCalendar;

import React, { useState } from "react";
import HolidayList from "./HolidayList.jsx";

const HolidayParent = () => {
  const [holidayData, setHolidayData] = useState([
    { date: "2025-01-01", content: "New Year's Day" },
    { date: "2025-12-25", content: "Christmas Day" },
  ]);

  const handleAddHoliday = (newContent) => {
    const newHoliday = { date: new Date().toISOString().split("T")[0], content: newContent };
    setHolidayData([...holidayData, newHoliday]);
    console.log("Add:", newHoliday);
  };

  const handleEditHoliday = (index, updatedContent) => {
    const updatedHolidays = [...holidayData];
    updatedHolidays[index].content = updatedContent;
    setHolidayData(updatedHolidays);
    console.log("Edit:", index, updatedContent);
  };

  const handleDeleteHoliday = (index) => {
    const updatedHolidays = holidayData.filter((_, i) => i !== index);
    setHolidayData(updatedHolidays);
    console.log("Delete:", index);
  };

  return (
    <HolidayList
      holidays={holidayData}
      isEditable={true}
      onAddHoliday={handleAddHoliday}
      onEditHoliday={handleEditHoliday}
      onDeleteHoliday={handleDeleteHoliday}
    />
  );
};

export default HolidayParent;

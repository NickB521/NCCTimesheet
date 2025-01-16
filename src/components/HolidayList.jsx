import React, { useState } from "react";
import Widget from "./Widget";

const HolidayList = ({
  holidays,
  isEditable,
  onAddHoliday = () => {}, 
  onEditHoliday = () => {},
  onDeleteHoliday = () => {},
}) => {
  const [isHolidayWindowOpen, setIsHolidayWindowOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [newHolidayContent, setNewHolidayContent] = useState("");

  const handleOpen = (holiday, index) => {
    if (!isEditable) return; 
    setSelectedHoliday(index !== undefined ? index : null);
    setNewHolidayContent(holiday?.content || "");
    setIsHolidayWindowOpen(true);
  };

  const handleClose = () => {
    setSelectedHoliday(null);
    setNewHolidayContent("");
    setIsHolidayWindowOpen(false);
  };

  const handleSubmit = () => {
    if (!isEditable) return;
    if (selectedHoliday !== null) {
      onEditHoliday(selectedHoliday, newHolidayContent);
    } else {
      onAddHoliday(newHolidayContent);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (!isEditable || selectedHoliday === null) return;
    onDeleteHoliday(selectedHoliday);
    handleClose();
  };

  return (
    <div className="side-card">
      <h1>Upcoming Holidays</h1>
      <div className="dashboard-edit-content">
        {holidays.map((holiday, index) => (
          <div
            key={index}
            onClick={() => handleOpen(holiday, index)}
            style={{ cursor: isEditable ? "pointer" : "default" }}
          >
            <Widget date={holiday.date} content={holiday.content} />
          </div>
        ))}
      </div>

      {isEditable && (
        <button className="dashboard-edit-button" onClick={() => handleOpen(null)}>
          Add Holiday
        </button>
      )}

      {isHolidayWindowOpen && isEditable && (
        <div className="dashboard-edit-window">
          <div className="dashboard-edit-window-content">
            <h1>{selectedHoliday !== null ? "Edit Holiday" : "New Holiday"}</h1>
            <textarea
              value={newHolidayContent}
              onChange={(e) => setNewHolidayContent(e.target.value)}
              placeholder="Enter holiday details..."
              style={{ width: "100%", height: "80%", color: "black" }}
            />
            <div className="dashboard-edit-button-div">
              <button onClick={handleClose}>Cancel</button>
              {selectedHoliday !== null && (
                <button onClick={handleDelete}>Delete</button>
              )}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayList;
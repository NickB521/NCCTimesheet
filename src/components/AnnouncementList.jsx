import React, { useState } from "react";
import Widget from "./Widget";

const AnnouncementList = ({
  announcements,
  isEditable,
  onAddAnnouncement = () => {},
  onEditAnnouncement = () => {},
  onDeleteAnnouncement = () => {},
}) => {
  const [isAnnouncementWindowOpen, setIsAnnouncementWindowOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newAnnouncementContent, setNewAnnouncementContent] = useState("");

  const handleOpen = (announcement, index) => {
    if (!isEditable) return;
    setSelectedAnnouncement(index !== undefined ? index : null);
    setNewAnnouncementContent(announcement?.content || "");
    setIsAnnouncementWindowOpen(true);
  };

  const handleClose = () => {
    setSelectedAnnouncement(null);
    setNewAnnouncementContent("");
    setIsAnnouncementWindowOpen(false);
  };

  const handleSubmit = () => {
    if (!isEditable) return;
    if (selectedAnnouncement !== null) {
      onEditAnnouncement(selectedAnnouncement, newAnnouncementContent);
    } else {
      onAddAnnouncement(newAnnouncementContent);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (!isEditable || selectedAnnouncement === null) return;
    onDeleteAnnouncement(selectedAnnouncement);
    handleClose();
  };

  return (
    <div className="side-card">
      <h1>Announcements</h1>
      <div className="dashboard-edit-content">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            onClick={() => handleOpen(announcement, index)}
            style={{ cursor: isEditable ? "pointer" : "default" }}
          >
            <Widget date={announcement.date} content={announcement.content} />
          </div>
        ))}
      </div>

      {isEditable && (
        <button className="dashboard-edit-button" onClick={() => handleOpen(null)}>
          Make Announcement
        </button>
      )}

      {isAnnouncementWindowOpen && isEditable && (
        <div className="dashboard-edit-window">
          <div className="dashboard-edit-window-content">
            <h1>{selectedAnnouncement !== null ? "Edit Announcement" : "New Announcement"}</h1>
            <textarea
              value={newAnnouncementContent}
              onChange={(e) => setNewAnnouncementContent(e.target.value)}
              placeholder="Enter announcement content..."
              style={{ width: "100%", height: "80%", color: "black" }}
            />
            <div className="dashboard-edit-button-div">
              <button onClick={handleClose}>Cancel</button>
              {selectedAnnouncement !== null && (
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

export default AnnouncementList;
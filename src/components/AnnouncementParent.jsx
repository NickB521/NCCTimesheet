import React, { useState } from "react";
import AnnouncementList from "./AnnouncementList";

const AnnouncementParent = () => {
  const [announcementData, setAnnouncementData] = useState([
    { date: "2025-01-01", content: "Welcome to the New Year!" },
    { date: "2025-12-25", content: "Merry Christmas and Happy Holidays!" },
  ]);

  const handleAddAnnouncement = (newContent) => {
    const newAnnouncement = { date: new Date().toISOString().split("T")[0], content: newContent };
    setAnnouncementData([...announcementData, newAnnouncement]);
  };

  const handleEditAnnouncement = (index, updatedContent) => {
    const updatedAnnouncements = [...announcementData];
    updatedAnnouncements[index].content = updatedContent;
    setAnnouncementData(updatedAnnouncements);
  };

  const handleDeleteAnnouncement = (index) => {
    const updatedAnnouncements = announcementData.filter((_, i) => i !== index);
    setAnnouncementData(updatedAnnouncements);
  };

  return (
    <AnnouncementList
      announcements={announcementData}
      isEditable={true}
      onAddAnnouncement={handleAddAnnouncement}
      onEditAnnouncement={handleEditAnnouncement}
      onDeleteAnnouncement={handleDeleteAnnouncement}
    />
  );
};

export default AnnouncementParent;

import React, { useState, useEffect } from "react";
import { Edit, Forward, Success, Denied, Seperator } from "/src/assets/icons/dashboard";
import { Tooltip } from "@nextui-org/react";
import { announcements as initialAnnouncements } from "../../../assets/data/announcement-data";

const useResponsiveMaxChars = (defaultMax) => {
  const [maxChars, setMaxChars] = useState(defaultMax);

  useEffect(() => {
    const updateMaxChars = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 950) setMaxChars(5);
      else if (screenWidth < 1100) setMaxChars(10);
      else if (screenWidth < 1350) setMaxChars(15);
      else if (screenWidth < 1600) setMaxChars(20);
      else if (screenWidth < 1850) setMaxChars(30);
      else if (screenWidth < 1970) setMaxChars(40);
      else setMaxChars(45);
    };

    updateMaxChars();
    window.addEventListener("resize", updateMaxChars);
    return () => window.removeEventListener("resize", updateMaxChars);
  }, []);

  return maxChars;
};

const Widget = ({ date, content }) => {
  const maxChars = useResponsiveMaxChars(25);
  const isOverflowing = content.length > maxChars;

  return (
    <div id="card-row">
      <Seperator />
      <Tooltip
        isDisabled={!isOverflowing}
        showArrow
        placement="right"
        offset={25}
        closeDelay={0}
        content={
          <div className="px-1 py-2">
            <div className="text-small text-center" style={{ paddingBottom: "5px", fontWeight: "600" }}>{date}</div>
            <div className="text-tiny text-left break-words pt-5 rounded-md" style={{ width: "125px" }}>{content}</div>
          </div>
        }
      >
        <div className="flex-1 text-white" id="card-row-content">
          <p className="font-semibold">{date}</p>
          <p>{isOverflowing ? `${content.substring(0, maxChars)}...` : content}</p>
        </div>
      </Tooltip>
    </div>
  );
};

const TimesheetCard = ({ date, hours, icon, status }) => (
  <div id="card-row">
    <Seperator />
    <div className="flex-1 text-white" id="card-row-content" style={{ display: "flex" }}>
      <div className="flex-1 text-white">
        <p className="font-semibold">{date}</p>
        <p>{hours} Hours</p>
      </div>
      <button className="text-white" style={{ display: "flex", justifyContent: "Right", alignItems: "center", transform: "rotate(90deg)" }}>
        <Forward />
      </button>
    </div>
    <div className="flex space-x-2">
      <button className={`text-${status}`} style={{ marginLeft: "10px" }}>{icon}</button>
    </div>
  </div>
);

const EmailCard = ({ name, email }) => {
  const maxChars = useResponsiveMaxChars(100);
  return (
    <>
      <p>{name}</p>
      <a href={`mailto:${email}`} className="break-words">
        {email.length > maxChars ? `${email.substring(0, maxChars)}...` : email}
      </a>
    </>
  );
};

const AnnouncementWindow = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  value, 
  onChange, 
  onDelete, 
  isEditing 
}) => {
  if (!isOpen) return null;

  return (
    <div id="announcement-window">
      <div id="announcement-window-content">
        <h1 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>
          {isEditing ? "Edit Announcement" : "New Announcement"}
        </h1>
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Enter announcement content..."
          style={{ width: "100%", height: "80%", color: "black" }}
        />
        <div id="announcement-button-div">
          <button onClick={onClose} id="cancel">Cancel</button>
          {isEditing && (
            <button onClick={onDelete} id="delete">Delete</button>
          )}
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

const SupervisorDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [editPolicies, setEditPolicies] = useState(true);
  const [submitText, setSubmitText] = useState("Edit");
  const [worksitePolicies, setWorksitePolicies] = useState("");
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isAnnouncementWindowOpen, setIsAnnouncementWindowOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const greeting =
      currentHour >= 5 && currentHour < 12 ? "Morning" :
      currentHour >= 12 && currentHour < 18 ? "Afternoon" :
      currentHour >= 18 && currentHour < 22 ? "Evening" : "Night";
    setGreeting(greeting);
  }, []);

  const handleAnnouncementClick = (index) => {
    setSelectedAnnouncement(index);
    setNewAnnouncement(announcements[index].content);
    setIsAnnouncementWindowOpen(true);
  };

  const handleCreateAnnouncement = () => {
    setSelectedAnnouncement(null);
    setNewAnnouncement("");
    setIsAnnouncementWindowOpen(true);
  };

  const handleSubmitAnnouncement = () => {
    if (newAnnouncement.trim()) {
      if (selectedAnnouncement !== null) {
        const updatedAnnouncements = announcements.map((announcement, index) =>
          index === selectedAnnouncement
            ? { ...announcement, content: newAnnouncement }
            : announcement
        );
        setAnnouncements(updatedAnnouncements);
      } else {
        const newDate = new Date().toLocaleDateString();
        setAnnouncements([...announcements, { date: newDate, content: newAnnouncement }]);
      }
      setNewAnnouncement("");
      setSelectedAnnouncement(null);
      setIsAnnouncementWindowOpen(false);
    }
  };

  const handleDeleteAnnouncement = () => {
    if (selectedAnnouncement !== null) {
      setAnnouncements(
        announcements.filter((_, index) => index !== selectedAnnouncement)
      );
      setSelectedAnnouncement(null);
      setIsAnnouncementWindowOpen(false); 
    }
  };

  return (
    <div id="dashboard">
      <div id="dashboard-header" className="bg-red-100">
        <div id="dashboard-header-content">
          <p className="text-5xl" style={{ fontSize: "48px" }}>Supervisor Good {greeting}!</p>
          <p className="text-2xl" style={{ fontSize: "32px" }}>name</p>
        </div>
      </div>
      <div id="dashboard-body">
        <div id="main-card">
          <h1 style={{ fontSize: "36px", fontWeight: "600", padding: "15px 0px 10px" }}>Timesheets</h1>
          <h1 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>Recent Timesheets</h1>
          <TimesheetCard date="2023-11-19" hours="40" status="default" icon={<Edit />} />
          <h1 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>Past Timesheets</h1>
          <TimesheetCard date="2023-11-12" hours="40" status="danger" icon={<Denied />} />
          <TimesheetCard date="2023-11-05" hours="35" status="success" icon={<Success />} />
          <button id="timesheet-button">View All Timesheets</button>
        </div>

        <div id="side-cards">
          <div className="side-card">
            <h1>Upcoming Holidays</h1>
            <Widget date="12/24-25/2024" content="Christmas" />
            <Widget date="01/01/2025" content="New Year's Day" />
            <Widget date="01/20/2025" content="Martin Luther King, Jr. Day" />
            <Widget date="05/26/2025" content="Memorial Day" />
          </div>

          <div id="worksite-policies">
          <h2 style={{ fontSize: "18px", fontWeight: "600", textAlign: "center" }}>Code Differently</h2>
          <div style={{ paddingTop: "20px", height: "80%" }}>
            <textarea
              disabled={editPolicies}
              placeholder="Enter your policies..."
              onChange={(e) => setWorksitePolicies(e.target.value)}
              value={worksitePolicies}
              style={{ width: "100%", height: "90%" }}
            />
            <button
              id="textarea-button"
              onClick={() => {
                setEditPolicies(!editPolicies);
                setSubmitText(editPolicies ? "Submit" : "Edit");
              }}
            >
              {submitText}
            </button>
          </div>
        </div>

          <div className="side-card break-words" style={{ textAlign: "center", gap: "20px" }}>
            <h1>Contact Information</h1>
            <div style={{ width: "80%" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", paddingTop: "20px", borderTop: "#ECC644 2px solid"}}>County Coordinator(s)</h2>
              <EmailCard name="Zanora Berry-El" email="Zanora.Berry-El@newcastlede.gov" />
              <EmailCard name="Raymond Gravuer" email="Raymond.Gravuer@newcastlede.gov" />
            </div>
          </div>
          <div className="side-card">
            <h1>Announcements</h1>
            <div id="announcement-content">
              {announcements.map((item, index) => (
                <div onClick={() => handleAnnouncementClick(index)} key={index}>
                  <Widget date={item.date} content={item.content} />
                </div>
              ))}
            </div>
            <button id="announcement-button" onClick={handleCreateAnnouncement}>
              Make Announcement
            </button>
          </div>
        </div>
      </div>

      <AnnouncementWindow
        isOpen={isAnnouncementWindowOpen}
        onClose={() => {
          setIsAnnouncementWindowOpen(false);
          setSelectedAnnouncement(null);
        }}
        onSubmit={handleSubmitAnnouncement}
        onDelete={handleDeleteAnnouncement}
        value={newAnnouncement}
        onChange={(e) => setNewAnnouncement(e.target.value)}
        isEditing={selectedAnnouncement !== null}
      />
    </div>
  );
};

export default SupervisorDashboard;

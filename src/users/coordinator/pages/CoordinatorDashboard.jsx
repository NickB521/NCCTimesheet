import React, { useState, useEffect } from "react";
import { Forward, Seperator } from "/src/assets/icons/dashboard";
import { Tooltip } from "@nextui-org/react";
import {announcements as initialAnnouncements} from "../../../assets/data/announcement-data";
import {holidays as initialHolidays} from "../../../assets/data/holiday-data";
import { timesheets } from "../../../assets/data/timesheets-data";
import { resubmitted } from "../../../assets/data/timesheets-data";
import { Link } from "react-router-dom";

const useResponsiveMaxChars = (defaultMax) => {
  const [maxChars, setMaxChars] = useState(defaultMax);

  useEffect(() => {
    const updateMaxChars = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1000) setMaxChars(5);
      else if (screenWidth < 1175) setMaxChars(10);
      else if (screenWidth < 1275) setMaxChars(12);
      else if (screenWidth < 1400) setMaxChars(15);
      else if (screenWidth < 1700) setMaxChars(17);
      else if (screenWidth < 1950) setMaxChars(25);
      else if (screenWidth < 2250) setMaxChars(30);
      else if (screenWidth < 2450) setMaxChars(35);
      else setMaxChars(40);
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

const setActiveNotification = (item) => {

  const notificationItems = {
      day: item.day,
      month: item.month,
      year: item.year,
  }

  sessionStorage.setItem('activeNotification', JSON.stringify(notificationItems));
  console.log(sessionStorage.getItem('activeNotification'));
};

const TimesheetCard = ({ name, hours, newHours, item }) => (
  <div id="card-row">
    <Seperator />
    <div className="flex-1 text-white" id="card-row-content" style={{ display: "flex" }}>
      <div className="flex-1 text-white">
        <p className="font-semibold">{name}</p>
        <p>
          {newHours ? `${hours} hours -> ${newHours} hours` : `${hours} Hours`}
        </p>
      </div>
      <Link 
        to="/calendar" 
        onClick={() => {
            setActiveNotification(item);
        }}
        style={{ display: "flex", justifyContent: "Right", alignItems: "center"}}
      >
        <button
          className="text-white"
          style={{ transform: "rotate(90deg)" }}
        >
          <Forward />
        </button>
      </Link>
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

const HolidayWindow = ({
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
    <div className="dashboard-edit-window">
      <div className="dashboard-edit-window-content">
        <h1 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>
          {isEditing ? "Edit Holiday" : "New Holiday"}
        </h1>
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Enter holiday details..."
          style={{ width: "100%", height: "80%", color: "black" }}
        />
        <div className="dashboard-edit-button-div">
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
    <div className="dashboard-edit-window">
      <div className="dashboard-edit-window-content">
        <h1 style={{ fontSize: "24px", fontWeight: "600", padding: "10px 0px" }}>
          {isEditing ? "Edit Announcement" : "New Announcement"}
        </h1>
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Enter announcement content..."
          style={{ width: "100%", height: "80%", color: "black" }}
        />
        <div className="dashboard-edit-button-div">
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

const CoordinatorDashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isAnnouncementWindowOpen, setIsAnnouncementWindowOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loopCount, setLoopCount] = useState(0);
  const [holidays, setHolidays] = useState(initialHolidays);
  const [isHolidayWindowOpen, setIsHolidayWindowOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState("");
  const [selectedHoliday, setSelectedHoliday] = useState(null);


  const getGreeting = () => {
    const currentHour = new Date().getHours();
  
    if (currentHour >= 5 && currentHour < 12) {
      return "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Evening";
    } else {
      return "Night";
    }
  };

  useEffect(() => {
    setGreeting(getGreeting());
    updateLoopCount();

    window.addEventListener("resize", updateLoopCount);
    return () => window.removeEventListener("resize", updateLoopCount);
  }, []);

  const handleHolidayClick = (index) => {
    setSelectedHoliday(index);
    setNewHoliday(holidays[index].content);
    setIsHolidayWindowOpen(true);
  };

  const handleCreateHoliday = () => {
    setSelectedHoliday(null);
    setNewHoliday("");
    setIsHolidayWindowOpen(true);
  };

  const handleSubmitHoliday = () => {
    if (newHoliday.trim()) {
      if (selectedHoliday !== null) {
        const updatedHolidays = holidays.map((holiday, index) =>
          index === selectedHoliday
            ? { ...holiday, content: newHoliday }
            : holiday
        );
        setHolidays(updatedHolidays);
      } else {
        const newDate = new Date().toLocaleDateString();
        setHolidays([...holidays, { date: newDate, content: newHoliday }]);
      }
      setNewHoliday("");
      setSelectedHoliday(null);
      setIsHolidayWindowOpen(false);
    }
  };

  const handleDeleteHoliday = () => {
    if (selectedHoliday !== null) {
      setHolidays(holidays.filter((_, index) => index !== selectedHoliday));
      setSelectedHoliday(null);
      setIsHolidayWindowOpen(false);
    }
  };

  const updateLoopCount = () => {
    const screenHeight = window.innerHeight;

    if (screenHeight < 900) {
      setLoopCount(1);
    } else if (screenHeight < 1175) {
      setLoopCount(2);
    } else {
      setLoopCount(3);
    }
  };

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
          <p className="text-5xl" style={{fontSize:"48px"}}>Good {greeting} Coordinator!</p>
          <p className="text-2xl" style={{fontSize:"32px"}}>name</p>
        </div>
      </div>
      <div id="dashboard-body">
        <div id="main-card">
          <h1 style={{fontSize: "36px", fontWeight: "600", padding: "15px 0px 10px"}}>Timesheets</h1>
          <h1 style={{fontSize: "24px", fontWeight: "600", padding: "10px 0px"}}>Submitted Timesheets</h1>

          {timesheets.slice(0, loopCount).map((item, index) => (
            <TimesheetCard key={index} name={item.name} hours={item.hours} item={item}/>
          ))}
              
          <h1 style={{fontSize: "24px", fontWeight: "600", padding: "10px 0px"}}>Resubmitted Timesheets</h1>

          {resubmitted.slice(0, loopCount).map((item, index) => (
            <TimesheetCard key={index} name={item.name} hours={item.hours} newHours={item.newHours} item={item}/>
          ))}
          <button id="timesheet-button">View All Timesheets</button>
        </div>

        <div id="side-cards">
          <div className="side-card">
            <h1>Upcoming Holidays</h1>
            <div className="dashboard-edit-content" style={{cursor:"pointer"}} >
              {holidays.map((item, index) => (
                <div onClick={() => handleHolidayClick(index)} key={index}>
                  <Widget date={item.date} content={item.content}/>
                </div>
              ))}
            </div>
            <button className="dashboard-edit-button" onClick={handleCreateHoliday}>
              Add Holiday
            </button>
          </div>

          <div className="side-card break-words" style={{ textAlign: "center"}}>
            <h1>Contact Information</h1>
            <div style={{width: "80%"}}>
              <div style={{paddingBottom: "20px"}}>
                <h2 style={{fontSize: "18px", fontWeight: "600"}}>Worksite 1</h2>
                <div style={{paddingTop: "20px"}}>
                  <EmailCard name="Jeff Lawrence" email="jeff@codedifferently.com"/>
                </div>
                <div>
                  <EmailCard name="Nick Blackson" email="nicolas@codedifferently.com"/>
                </div>
              </div>
              <div style={{paddingBottom: "20px"}}>
                <h2 style={{fontSize: "18px", fontWeight: "600", paddingTop: "20px", borderTop: "#ECC644 2px solid"}}>Worksite 2</h2>
                <div style={{paddingTop: "20px"}}>
                  <EmailCard name="Zanora Berry-El" email="Zanora.Berry-El@newcastlede.gov"/>
                </div>
                <div>
                  <EmailCard name="Raymond Gravuer" email="Raymond.Gravuer@newcastlede.gov"/>
                </div>
              </div>
              <div style={{paddingBottom: "20px"}}>
                <h2 style={{fontSize: "18px", fontWeight: "600", paddingTop: "20px", borderTop: "#ECC644 2px solid"}}>Worksite 3</h2>
                <div style={{paddingTop: "20px"}}>
                  <EmailCard name="Zanora Berry-El" email="Zanora.Berry-El@newcastlede.gov"/>
                </div>
                <div>
                  <EmailCard name="Raymond Gravuer" email="Raymond.Gravuer@newcastlede.gov"/>
                </div>
              </div>
            </div>
          </div>
          <div className="side-card">
            <h1>Announcements</h1>
            <div className="dashboard-edit-content" style={{cursor:"pointer"}} >
              {announcements.map((item, index) => (
                <div onClick={() => handleAnnouncementClick(index)} key={index}>
                  <Widget date={item.date} content={item.content}/>
                </div>
              ))}
            </div>
            <button className="dashboard-edit-button" onClick={handleCreateAnnouncement}>
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
      <HolidayWindow
        isOpen={isHolidayWindowOpen}
        onClose={() => {
          setIsHolidayWindowOpen(false);
          setSelectedHoliday(null);
        }}
        onSubmit={handleSubmitHoliday}
        onDelete={handleDeleteHoliday}
        value={newHoliday}
        onChange={(e) => setNewHoliday(e.target.value)}
        isEditing={selectedHoliday !== null}
      />
    </div>
  );
};

export default CoordinatorDashboard;
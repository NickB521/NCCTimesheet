import { Link } from "react-router-dom";
import { Forward, Seperator } from "/src/assets/icons/dashboard";

const TimesheetCard = ({ title, hours, icon, status, newHours, total }) => {
  console.log({ title, hours, icon, status, total });

  return (
    <div id="card-row">
      <Seperator />
      <div className="flex-1 text-white" id="card-row-content" style={{ display: "flex" }}>
        <div className="flex-1 text-white">
          <p className="font-semibold">{title}</p>
          <p>
            {total ? `${total} Submissions` : `${hours} Hours ${newHours ? `-> ${newHours} Hours` : ""}`}
          </p>
        </div>
        <button
          className="text-white"
          style={{ display: "flex", justifyContent: "Right", alignItems: "center", transform: "rotate(90deg)" }}
        >
          <Forward />
        </button>
      </div>
      <div className="flex space-x-2">
        <Link
          to="/calendar"
          onClick={() => {
            setActiveNotification(item); 
            window.location.reload();
          }}
        >
          <button className={`text-${status || 'default'}`} style={{ marginLeft: "10px" }}>
            {icon || ''}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TimesheetCard;
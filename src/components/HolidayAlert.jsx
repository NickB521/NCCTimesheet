import { Denied } from "../assets/icons/alert";

const HolidayAlert = ({ isOpen, onClose}) => {
    
    if (!isOpen) return null;

    return(
        <div id="alert-body">
            <button id="alert-button" className={'text-white'} onClick={onClose}><Denied/></button>
            <div id="alert-content">
                <h1 id="alert-header">You Have Been Assigned A Day Off!</h1>
                <h1 id="alert-subheader">Please do not log hours for today</h1>
            </div>
        </div>
    );
}

export default HolidayAlert
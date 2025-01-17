import { employeeData1 } from "./01-13-2025";
import { employeeData2 } from "./01-06-2025";
import { employeeData3 } from "./12-30-2024";

//This function is used as a way to more or less mimic how I believed the information would be pulled from the backend
export function supervisorTableData(date) {
    let employeeData = [];

    //Give a date to backend -> backend gives date to database -> database returns list that pertains to that date
    switch (date) {
        case "2025-01-13":
            employeeData = employeeData1;
            break;
        case "2025-01-06":
            employeeData = employeeData2;
            break;
        case "2024-12-30":
            employeeData = employeeData3;
            break;
    };

    // console.log(date);

    return (employeeData);
}
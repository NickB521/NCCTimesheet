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

// export const employeeData = [
//     {id: 1, name: "Bob", workedHours: 23.0, breakTime: 123, totalTime: 123, sender: "Bob", information: "forwarded"},
//     {id: 2, name: "Alice", workedHours: 35.2, breakTime: 98, totalTime: 125, sender: "not sent", information: "in progress"},
//     {id: 3, name: "Charlie", workedHours: 40.5, breakTime: 150, totalTime: 190, sender: "Supervisor A", information: "incomplete"},
//     {id: 4, name: "Diane", workedHours: 29.8, breakTime: 110, totalTime: 139, sender: "Supervisor B", information: "forwarded"},
//     {id: 5, name: "Eve", workedHours: 22.3, breakTime: 95, totalTime: 117, sender: "not sent", information: "in progress"},
//     {id: 6, name: "Frank", workedHours: 38.7, breakTime: 120, totalTime: 185, sender: "Supervisor A", information: "incomplete"},
//     {id: 7, name: "Grace", workedHours: 26.4, breakTime: 105, totalTime: 135, sender: "Supervisor B", information: "forwarded"},
//     {id: 8, name: "Hank", workedHours: 33.1, breakTime: 92, totalTime: 150, sender: "not sent", information: "in progress"},
//     {id: 9, name: "Ivy", workedHours: 20.9, breakTime: 80, totalTime: 105, sender: "Supervisor A", information: "incomplete"},
//     {id: 10, name: "Jack", workedHours: 41.0, breakTime: 130, totalTime: 200, sender: "Supervisor B", information: "forwarded"},
//     {id: 11, name: "Kathy", workedHours: 30.2, breakTime: 100, totalTime: 140, sender: "not sent", information: "in progress"},
//     {id: 12, name: "Leo", workedHours: 28.5, breakTime: 115, totalTime: 148, sender: "Supervisor A", information: "incomplete"},
//     {id: 13, name: "Mia", workedHours: 39.0, breakTime: 125, totalTime: 185, sender: "Supervisor B", information: "forwarded"},
//     {id: 14, name: "Nina", workedHours: 25.3, breakTime: 87, totalTime: 120, sender: "not sent", information: "in progress"},
//     {id: 15, name: "Oscar", workedHours: 37.4, breakTime: 122, totalTime: 175, sender: "Supervisor A", information: "incomplete"},
//     {id: 16, name: "Paula", workedHours: 32.8, breakTime: 108, totalTime: 155, sender: "Supervisor B", information: "forwarded"},
//     {id: 17, name: "Quinn", workedHours: 24.7, breakTime: 90, totalTime: 119, sender: "not sent", information: "in progress"},
//     {id: 18, name: "Ray", workedHours: 36.9, breakTime: 132, totalTime: 170, sender: "Supervisor A", information: "incomplete"},
//     {id: 19, name: "Sophie", workedHours: 31.2, breakTime: 101, totalTime: 140, sender: "Supervisor B", information: "forwarded"},
//     {id: 20, name: "Tom", workedHours: 29.0, breakTime: 115, totalTime: 148, sender: "not sent", information: "in progress"},
//     {id: 21, name: "Uma", workedHours: 27.6, breakTime: 118, totalTime: 140, sender: "Supervisor A", information: "incomplete"},
//     {id: 22, name: "Vera", workedHours: 34.1, breakTime: 85, totalTime: 160, sender: "Supervisor B", information: "forwarded"},
//     {id: 23, name: "Will", workedHours: 22.9, breakTime: 105, totalTime: 117, sender: "not sent", information: "in progress"},
//     {id: 24, name: "Xander", workedHours: 38.8, breakTime: 112, totalTime: 180, sender: "Supervisor A", information: "incomplete"},
//     {id: 25, name: "Yara", workedHours: 30.7, breakTime: 95, totalTime: 135, sender: "Supervisor B", information: "forwarded"},
//     {id: 26, name: "Zane", workedHours: 28.4, breakTime: 102, totalTime: 142, sender: "not sent", information: "in progress"},
//     {id: 27, name: "Anna", workedHours: 33.3, breakTime: 99, totalTime: 148, sender: "Supervisor A", information: "incomplete"},
//     {id: 28, name: "Brian", workedHours: 35.5, breakTime: 140, totalTime: 175, sender: "Supervisor B", information: "forwarded"},
//     {id: 29, name: "Chloe", workedHours: 31.9, breakTime: 125, totalTime: 160, sender: "not sent", information: "in progress"},
//     {id: 30, name: "David", workedHours: 25.0, breakTime: 115, totalTime: 130, sender: "Supervisor A", information: "incomplete"},
//     {id: 31, name: "Ella", workedHours: 29.6, breakTime: 88, totalTime: 135, sender: "Supervisor B", information: "forwarded"},
//     {id: 32, name: "Finn", workedHours: 36.1, breakTime: 120, totalTime: 165, sender: "not sent", information: "in progress"},
//     {id: 33, name: "Gia", workedHours: 40.0, breakTime: 132, totalTime: 200, sender: "Supervisor A", information: "incomplete"},
//     {id: 34, name: "Holly", workedHours: 32.3, breakTime: 110, totalTime: 145, sender: "Supervisor B", information: "forwarded"},
//     {id: 35, name: "Ian", workedHours: 27.5, breakTime: 105, totalTime: 135, sender: "not sent", information: "in progress"},
//     {id: 36, name: "Jane", workedHours: 24.9, breakTime: 80, totalTime: 115, sender: "Supervisor A", information: "incomplete"},
//     {id: 37, name: "Kyle", workedHours: 31.4, breakTime: 125, totalTime: 150, sender: "Supervisor B", information: "forwarded"},
//     {id: 38, name: "Laura", workedHours: 34.8, breakTime: 140, totalTime: 175, sender: "not sent", information: "in progress"},
//     {id: 39, name: "Mason", workedHours: 23.2, breakTime: 95, totalTime: 130, sender: "Supervisor A", information: "incomplete"},
//     {id: 40, name: "Nora", workedHours: 28.7, breakTime: 100, totalTime: 140, sender: "Supervisor B", information: "forwarded"},
//     {id: 41, name: "Oliver", workedHours: 37.0, breakTime: 108, totalTime: 175, sender: "not sent", information: "in progress"},
//     {id: 42, name: "Penny", workedHours: 30.0, breakTime: 115, totalTime: 150, sender: "Supervisor A", information: "incomplete"},
//     {id: 43, name: "Quincy", workedHours: 26.8, breakTime: 92, totalTime: 120, sender: "Supervisor B", information: "forwarded"},
//     {id: 44, name: "Ruth", workedHours: 39.3, breakTime: 125, totalTime: 190, sender: "not sent", information: "in progress"},
// ];
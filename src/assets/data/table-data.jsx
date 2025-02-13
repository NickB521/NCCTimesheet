import { DateTime } from "luxon";

//this just grabs the starting dates of the current week and last week
let weekOf = DateTime.local().startOf("week");
let cweek = weekOf.toISODate().toString();
let lweek = weekOf.plus({days: -7}).toISODate().toString();

export const businessData = [
    {date: lweek, companies : [
        {name: "Code Differently", employees: [
            {id: 1, name: "Alice", workedHours: 20.0, breakTime: 100, totalTime: 120, sender: "Supervisor A", information: "in progress"},
            {id: 2, name: "Bob", workedHours: 20.5, breakTime: 105, totalTime: 125, sender: "not sent", information: "forwarded"},
            {id: 3, name: "Charlie", workedHours: 21.0, breakTime: 110, totalTime: 130, sender: "Charlie", information: "incomplete"},
            {id: 4, name: "Diane", workedHours: 21.5, breakTime: 115, totalTime: 135, sender: "Supervisor B", information: "in progress"},
            {id: 5, name: "Eve", workedHours: 22.0, breakTime: 120, totalTime: 140, sender: "Eve", information: "forwarded"},
            {id: 6, name: "Frank", workedHours: 22.5, breakTime: 125, totalTime: 145, sender: "Supervisor C", information: "not started"},
            {id: 7, name: "Grace", workedHours: 23.0, breakTime: 130, totalTime: 150, sender: "not sent", information: "incomplete"},
            {id: 8, name: "Hank", workedHours: 23.5, breakTime: 135, totalTime: 155, sender: "Supervisor D", information: "completed"},
            {id: 9, name: "Ivy", workedHours: 23.0, breakTime: 140, totalTime: 160, sender: "Ivy", information: "forwarded"},
            {id: 10, name: "Jack", workedHours: 24.5, breakTime: 145, totalTime: 165, sender: "Jack", information: "in progress"},
            {id: 11, name: "Kelly", workedHours: 25.0, breakTime: 150, totalTime: 170, sender: "not sent", information: "forwarded"},
            {id: 12, name: "Leo", workedHours: 25.5, breakTime: 155, totalTime: 175, sender: "Supervisor E", information: "completed"},
            {id: 13, name: "Mia", workedHours: 26.0, breakTime: 160, totalTime: 180, sender: "Mia", information: "not started"},
            {id: 14, name: "Nathan", workedHours: 26.5, breakTime: 165, totalTime: 185, sender: "Nathan", information: "incomplete"},
            {id: 15, name: "Olivia", workedHours: 27.0, breakTime: 170, totalTime: 190, sender: "Supervisor F", information: "completed"},
            {id: 16, name: "Paul", workedHours: 27.5, breakTime: 175, totalTime: 195, sender: "Paul", information: "forwarded"},
            {id: 17, name: "Quinn", workedHours: 28.0, breakTime: 180, totalTime: 200, sender: "Supervisor G", information: "not started"},
            {id: 18, name: "Rachel", workedHours: 28.5, breakTime: 185, totalTime: 205, sender: "not sent", information: "completed"},
            {id: 19, name: "Sam", workedHours: 29.0, breakTime: 190, totalTime: 210, sender: "Sam", information: "in progress"},
            {id: 20, name: "Tina", workedHours: 29.5, breakTime: 195, totalTime: 215, sender: "Tina", information: "incomplete"}
        ]},
        {name: "JP Morgan", employees: [
            {id: 1, name: "Alice", workedHours: 20.0, breakTime: 100, totalTime: 120, sender: "Supervisor A", information: "in progress"},
            {id: 2, name: "Bob", workedHours: 20.5, breakTime: 105, totalTime: 125, sender: "not sent", information: "forwarded"},
            {id: 3, name: "Charlie", workedHours: 21.0, breakTime: 110, totalTime: 130, sender: "Charlie", information: "incomplete"},
            {id: 4, name: "Diane", workedHours: 21.5, breakTime: 115, totalTime: 135, sender: "Supervisor B", information: "in progress"},
            {id: 5, name: "Eve", workedHours: 22.0, breakTime: 120, totalTime: 140, sender: "Eve", information: "forwarded"},
            {id: 6, name: "Frank", workedHours: 22.5, breakTime: 125, totalTime: 145, sender: "Supervisor C", information: "not started"},
            {id: 7, name: "Grace", workedHours: 23.0, breakTime: 80, totalTime: 150, sender: "not sent", information: "incomplete"},
            {id: 8, name: "Hank", workedHours: 29.5, breakTime: 135, totalTime: 155, sender: "Supervisor D", information: "completed"},
            {id: 9, name: "Ivy", workedHours: 24.0, breakTime: 140, totalTime: 160, sender: "Ivy", information: "forwarded"},
            {id: 10, name: "Jack", workedHours: 24.5, breakTime: 145, totalTime: 165, sender: "Jack", information: "in progress"},
            {id: 11, name: "Kelly", workedHours: 25.0, breakTime: 150, totalTime: 170, sender: "not sent", information: "forwarded"},
            {id: 12, name: "Leo", workedHours: 25.5, breakTime: 155, totalTime: 175, sender: "Supervisor E", information: "completed"},
            {id: 13, name: "Mia", workedHours: 26.0, breakTime: 160, totalTime: 180, sender: "Mia", information: "not started"},
            {id: 14, name: "Nathan", workedHours: 26.5, breakTime: 165, totalTime: 185, sender: "Nathan", information: "incomplete"},
            {id: 15, name: "Olivia", workedHours: 27.0, breakTime: 170, totalTime: 190, sender: "Supervisor F", information: "completed"},
            {id: 16, name: "Paul", workedHours: 27.5, breakTime: 175, totalTime: 195, sender: "Paul", information: "forwarded"},
            {id: 17, name: "Quinn", workedHours: 28.0, breakTime: 180, totalTime: 200, sender: "Supervisor G", information: "not started"},
            {id: 18, name: "Rachel", workedHours: 28.5, breakTime: 185, totalTime: 205, sender: "not sent", information: "completed"},
            {id: 19, name: "Sam", workedHours: 29.0, breakTime: 190, totalTime: 210, sender: "Sam", information: "in progress"},
            {id: 20, name: "Tina", workedHours: 29.5, breakTime: 195, totalTime: 215, sender: "Tina", information: "incomplete"}
        ]},
        {name: "Chase", employees: [
            {id: 1, name: "Alice", workedHours: 20.0, breakTime: 100, totalTime: 120, sender: "Supervisor A", information: "in progress"},
            {id: 2, name: "Bob", workedHours: 20.5, breakTime: 105, totalTime: 125, sender: "not sent", information: "forwarded"},
            {id: 3, name: "Charlie", workedHours: 21.0, breakTime: 110, totalTime: 130, sender: "Charlie", information: "incomplete"},
            {id: 4, name: "Diane", workedHours: 21.5, breakTime: 115, totalTime: 135, sender: "Supervisor B", information: "in progress"},
            {id: 5, name: "Eve", workedHours: 22.0, breakTime: 120, totalTime: 140, sender: "Eve", information: "forwarded"},
            {id: 6, name: "Frank", workedHours: 22.5, breakTime: 125, totalTime: 145, sender: "Supervisor C", information: "not started"},
            {id: 7, name: "Grace", workedHours: 23.0, breakTime: 130, totalTime: 150, sender: "not sent", information: "incomplete"},
            {id: 8, name: "Hank", workedHours: 23.5, breakTime: 135, totalTime: 155, sender: "Supervisor D", information: "completed"},
            {id: 9, name: "Ivy", workedHours: 24.0, breakTime: 140, totalTime: 160, sender: "Ivy", information: "forwarded"},
            {id: 10, name: "Jack", workedHours: 24.5, breakTime: 145, totalTime: 165, sender: "Jack", information: "in progress"},
            {id: 11, name: "Kelly", workedHours: 25.0, breakTime: 150, totalTime: 170, sender: "not sent", information: "forwarded"},
            {id: 12, name: "Leo", workedHours: 25.5, breakTime: 155, totalTime: 175, sender: "Supervisor E", information: "completed"},
            {id: 13, name: "Mia", workedHours: 26.0, breakTime: 160, totalTime: 180, sender: "Mia", information: "not started"},
            {id: 14, name: "Nathan", workedHours: 26.5, breakTime: 165, totalTime: 185, sender: "Nathan", information: "incomplete"},
            {id: 15, name: "Olivia", workedHours: 27.0, breakTime: 170, totalTime: 190, sender: "Supervisor F", information: "completed"},
            {id: 16, name: "Paul", workedHours: 27.5, breakTime: 175, totalTime: 195, sender: "Paul", information: "forwarded"},
            {id: 17, name: "Quinn", workedHours: 28.0, breakTime: 180, totalTime: 200, sender: "Supervisor G", information: "not started"},
            {id: 18, name: "Rachel", workedHours: 28.5, breakTime: 185, totalTime: 265, sender: "not sent", information: "completed"},
            {id: 19, name: "Sam", workedHours: 29.0, breakTime: 190, totalTime: 210, sender: "Sam", information: "in progress"},
            {id: 20, name: "Tina", workedHours: 29.5, breakTime: 195, totalTime: 215, sender: "Tina", information: "incomplete"}
        ]}
    ]},
    {date: cweek, companies : [
        {name: "Code Differently", employees: [ 
            {id: 1, name: "Bob", workedHours: 20.5, breakTime: 105, totalTime: 125, sender: "not sent", information: "forwarded"},
        ]},
        {name: "JP Morgan", employees: [
            {id: 1, name: "Alice", workedHours: 20.0, breakTime: 100, totalTime: 120, sender: "Supervisor A", information: "in progress"},
        ]},
        {name: "Chase", employees: [
            {id: 1, name: "Charlie", workedHours: 21.0, breakTime: 110, totalTime: 130, sender: "Charlie", information: "incomplete"},
        ]}
    ]}
]
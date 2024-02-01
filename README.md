# Periodic Table Reservation System

## Website

[Live Website](restaurantresfinal-kgketwzxr-tyler-laroccas-projects.vercel.app)

## Technology

### _Front-End_

- React
- Bootstrap
- JavaScript
- CSS
- Jest

### _Back-End_

- Node
- Express
- Knex
- PostgreSQL

## Dashboard

On the dashboard, the user will see the date and time, as well as a group of buttons that will move the user to the next day, previous day, or back to the current day. The dashboard will default to the current day and will show the reservations for whichever day is currently selected. The user will also see a list of the tables with information about the tables name, capacity, and status. The top right cog of each table allows the user to edit each table. Table's #1, #2, Bar #1 and Bar #2 are able to be edited, however they are permanent and not allowed to be deleted.

![Dashboard Image](/readme-screenshots/Dashboard.png)

## Reservations

When the user navigates to the New Reservation page, the user will have a form to fill out. All fields are required, and the mobile number should be entered with no dashes, spaces, or parenthesis. The date can be the current date, however the time must be in the future. Also, the user will not be able to create a reservation during the restaurants closed hours or on Tuesdays. The party size must be at minimum 1 person.

![Creating a New Reservation](/readme-screenshots/NewRes.png)

After the reservation has been created, if the user needs to edit the reservation, they can click the edit button on the reservation item on the dashboard. In this screen, the user will also have the option to delete the reservation if it was created in error.

![Editing a Reservation](/readme-screenshots/EditRes.png)

After the reservation has been booked, it will be shown on the dashboard for the day the reservation was made. The user will have 3 options for the reservation at this time: Edit, Seat, Cancel. If the reservation has been cancelled (and not made in error), the user can click cancel and it will show as a cancelled reservation. If the reservation needs to be edited, the user can click on the edit button and the program will redirect the user to the Edit Reservation page. If the party is present and ready to be seated, the user can click on the Seat button and be redirected to the Reservation Seating page.

![Booked reservation on the Dashboard](/readme-screenshots/BookedRes.png)

When the party is ready to be seated and the user has clicked on the Seat button, the Seating page will be called. The user will select a table from a selection menu and choose a table to seat the party at. The table must have a capacity that can fit the entire party.

![Seating a Reservation](/readme-screenshots/SeatingRes.png)

If the user selects a table that is incompatible for the party, the program will have an alert notifying the user to choose a different table.

![Seating a Reservation Error](/readme-screenshots/SeatingError.png)

After the table has been selected, the table on the dashboard will have it's status changed to OCCUPIED and the reservation status will change to SEATED. Once the party has left, the user can click Finish and a prompt will ask to make sure the user wants to clear this table. If confirmed, the reservation will be removed from the reservation list and the table status will return to FREE.

![Reservation Seated on Dashboard](/readme-screenshots/Seated.png)

If the restaurant brings in a new table or needs to create a table to accommodate a larger party, the user can navigate to the New Table section. This form requires a table name and capacity over 1. Once created, the table can be used to seat parties.

![Creating a New Table](/readme-screenshots/NewTable.png)

If a table needs to be removed or needs to increase it's capacity, the user can click the cog on the top right corner of the table component on the dashboard. This will navigate to the update table section, where the user can adjust the name and capacity of the table, or delete the table.

![Editing and deleting a table](/readme-screenshots/EditTable.png)

If a reservation was made for the future or in the past and needs to be found, the user can go to the search page. Reservations are searched by the mobile number. A partial mobile number search will return all reservations with those numbers in the mobile number.

![Searching for a Reservation by mobile number](/readme-screenshots/SearchPage.png)

## API Documentation

| Endpoint                                  | Description                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `GET /reservations`                       | returns reservations                                                   |
| `POST /reservations`                      | creates and returns a reservation                                      |
| `GET /reservations?date='YYYY-MM-DD'`     | returns reservations on specified date                                 |
| `GET /reservations?mobile_number=123`     | returns reservations by searching for phone number                     |
| `GET /reservations/:reservationId`        | returns reservation by reservationId                                   |
| `PUT /reservations/:reservationId`        | updates and returns the reservation matching the reservationId         |
| `DELETE /reservations/:reservationId`     | deletes current reservation if no longer needed                        |
| `PUT /reservations/:reservationId/status` | updates the status of a reservation                                    |
| `GET /tables`                             | returns all Tables                                                     |
| `POST /tables`                            | creates and returns a new table                                        |
| `PUT /tables/:table_id/seat`              | assigns a table with a reservationId and changes status to "occupied"  |
| `DELETE /tables/:table_id/seat`           | updates a table by deleting reservationId and changes status to "free" |
| `GET /tables/:table_id/edit`              | returns table by table Id                                              |
| `PUT /tables/:table_id/edit`              | updated and returns the table matching the table Id                    |
| `DELETE /tables/:table_id/edit`           | removes table so it can no longer be used                              |

## Installation

1. Fork and clone this repository
2. Run `cp ./back-end/.env.sample ./back-end/.env`
3. Update the `./back-end/.env` file with db connections. You can set some up for free with ElephantSQL database instances.
4. Run `cp ./front-end/.env.sample ./front-end/.env`
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`
6. Run `npm install` to install project dependencies
7. run `npm run start:dev` from the back-end directory to start your server in development mode
8. run `npm start` from the front-end directory to start the React app at [http://localhost:3000](http://localhost:3000)
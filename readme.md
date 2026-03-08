# School Management API

This project implements a simple School Management API using **Node.js**, **Express.js**, and **MySQL**.

The API allows users to:
- Add new schools
- Retrieve schools sorted by proximity to a given location

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- Hoppscotch / Postman (API Testing)

---

## Database Schema

Table: `schools`

| Column | Type |
|------|------|
| id | INT (Primary Key) |
| name | VARCHAR |
| address | VARCHAR |
| latitude | FLOAT |
| longitude | FLOAT |


## API Endpoints

POST /addSchool  
Adds a new school to the database.

GET /listSchools  
Returns schools sorted by proximity.

Author: Kurapati Saiteja
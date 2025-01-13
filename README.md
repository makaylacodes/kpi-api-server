# Financial KPI Dashboard Backend

A Node.js server that connects to MongoDB and provides a RESTful API to retrieve financial Key Performance Indicator (KPI) data for years 2020 through 2024. A future front-end dashboard will consume this data, displaying quarterly figures and other key metrics.

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Folder Structure](#folder-structure)  
4. [Installation & Setup](#installation--setup)  
5. [Usage](#usage)  
6. [API Endpoints](#api-endpoints)  
7. [Error Handling](#error-handling)  
8. [Tests](#tests)
9. [Built With](#built-with)  
10. [License](#license)

---

## Overview

This server retrieves KPI data (e.g., revenue, gross profit, utilization rates) stored in a MongoDB database. Each year’s data is placed in its own collection (`financial_data_2020`, `financial_data_2021`, etc.) to keep the data organized and scalable. The application can be extended or integrated with a front-end dashboard for real-time financial insights.

## Features

- **Dynamic Year Collections**: Easily store and query data by year.  
- **Quarterly Filters**: Fetch data for specific quarters (Q1–Q4).  
- **KPI Type Filters**: Retrieve metrics such as `revenue`, `grossProfit`, `netProfit`, etc.  
- **RESTful Endpoints**: Simple and easy-to-use routes.  
- **Express + Mongoose**: Proven Node.js tech stack for building scalable APIs.

## Folder Structure

 ├── index.js # Entry point for the server 

 ├── app.js # Express application setup and middleware 

 ├── controllers 

 │ └── years.js # Route handlers for retrieving financial data by year 

 ├── models 

 │ └── year.js # Mongoose model and dynamic collection logic 

 ├── utils 

 │ ├── config.js # Environment variable handling (PORT, MONGODB_URI) 
 
 │ ├── logger.js # Custom logger with info/error methods 

 │ └── middleware.js # Middleware (morgan logging, error handling, unknown endpoints) 

 ├── package.json 

 ├── package-lock.json 

 └── .env # Environment variables (not tracked by Git)

## Installation & Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/makaylacodes/kpi-api-server.git
   cd <repository-folder>
2. **Install Dependencies**  
   ```bash
   npm install
3. **Create a .env File**  
    The .env file should include:
   ```bash
   PORT=3001
   # Example connection string
   MONGODB_URI=mongodb+srv://${username}:${mongoDBPassword}@kpidata.uhvqv.mongodb.net/financial-kpi-data?retryWrites=true&w=majority  
4. **Start the Server** 

    To run in development mode:
    ```bash
    npm run dev
    ```
    To run in production mode:
    ```bash
    npm run start
    ```

## Usage

Once the server is up and running, you can interact with it using tools like cURL, Postman, or a web browser.
Example request:
```bash
http://localhost:3001/api/2022
http://localhost:3001/api/2022/quarter/q3
```


## API Endpoints

1. **GET /api/:year**  
- Retrieves all KPI documents for the given :year (e.g., 2022).
- **Example:** /api/2022

2. **GET /api/:year/quarter/:quarter**  
- Retrieves data for a specific year and quarter (e.g., q1, q2, q3, q4).
- **Example:** /api/2022/quarter/q1

3. **GET /api/:year/:type**  
- Retrieves data for a specific year and KPI type (e.g., revenue, grossProfit, netProfit, etc.).
- **Example:** /api/2022/revenue

If no data is found for the specified endpoint, a 404 Not Found error is returned with a message.
   
## Error Handling
- **Unknown Endpoint (404)**
If a route does not match any defined endpoints, the server responds with a JSON error message:
    ```bash
    {"error": "unknown endpoint"}
- **Error Handler**
Certain operational errors (e.g., ValidationError, malformed IDs, etc.) return a 400 Bad Request.
Any other server or logic errors return 500 Internal Server Error, along with an appropriate message.


## Built With
- Node.js
- Express.js
- MongoDB & Mongoose
- Morgan for HTTP request logging
- dotenv for environment variable management
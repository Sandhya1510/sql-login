# SQL Login System

A secure and efficient login system built using **Node.js**, **Express**, and **MySQL**. This project demonstrates how to implement a backend-based authentication system, emphasizing secure coding practices such as prepared statements to prevent SQL injection.

---

## Project Overview

The SQL Login System allows users to log in by verifying their credentials against a MySQL database. It serves as a foundational example of integrating SQL databases with a Node.js backend for user authentication. 

---

## Features

- **User Authentication**: Validates user credentials securely using SQL queries.
- **Database Integration**: Connects seamlessly with a MySQL database for data storage and retrieval.
- **Secure Coding Practices**: Uses prepared statements to prevent SQL injection attacks.
- **Modular Design**: Clean separation of concerns with route handling, database connection, and server configuration.

---

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Templating Engine**: HTML and basic CSS for frontend rendering
- **Security**: Environment variables for configuration and prepared statements for SQL queries

---

## Prerequisites

Ensure the following tools are installed on your machine:

1. **Node.js** (v14+): [Download](https://nodejs.org/)
2. **MySQL**: [Download](https://www.mysql.com/)
3. **Git**: [Download](https://git-scm.com/)

---

## Getting Start

### Step 1: Clone the Repository
<!-- ```bash -->
git clone https://github.com/Sandhya1510/sql-login.git
cd sql-log
Install the required Node.js packages:  npm install

### Step 2: Install Dependencies
Install the required Node.js packages: npm install


### Step 3: Configure Environment Variables
Create a .env file in the project root and add the following:
<!-- ```makefile -->
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
PORT=3000

### Step 4: Set Up the Database
Run the following SQL commands to create the database and table:
<!-- ```sql -->
CREATE DATABASE sql_login;

USE sql_login;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


### Step 5: Start the Server
Run the server locally:
<!-- ``bash -->
node server.js
The server will start on http://localhost:3000.



# ECE-Students - Εφαρμογή Υπηρεσιών Φοιτητή
# ECE-Students - Student Services Application 

Project for the ECE course: "Προγραμματισμός Διαδικτύου - 2023-24"

## Table of Contents

- [Installation](#installation)
- [Database](#database)
- [Application](#application)

## Installation

To run this project, you need to have Node.js installed on your machine. You can download and install it from [nodejs.org](https://nodejs.org/).

After installing Node.js, follow these steps:

1. Install nodemon globally:
    ```bash
    npm install nodemon -g 
    ```
2. Install the required dependencies, by running the following command in the _project directory_:
    ```bash
    npm install
    ```

## Database

Instructions for setting up the Database:

1. Create the database by running:
    ```bash
    python3 database.py
    ```

2. Fill the database with initial data by running:
    ```bash
    python3 fill_db.py
    ```

## Application

Finally, you can run the project:

1. Start the server:
    ```bash
    npm start
    ```

2. Visit `http://localhost:3000` in your web browser to access the application.


# Client Lead Management System (Mini CRM)

**Task 2: Client Lead Management System**

## Project Overview
The Client Lead Management System is a simple web application designed to organize and manage potential customers (leads). It allows users to view lead information, update lead statuses, and manage follow-up notes through a user-friendly interface.

This project was developed as part of Task 2 of the Future Interns Full Stack Web Development Internship.

## Project Objectives
- Manage customer leads in one place.
- Track the progress of each lead.
- Update lead statuses as they progress.
- Organize notes and follow-up information.
- Practice frontend and backend web development.

## Technologies Used
- **HTML5** — Structure of the user interface
- **CSS3** — Styling and responsive layout
- **JavaScript** — Frontend interactions
- **Node.js** — Backend runtime
- **Express.js** — Backend web framework
- **JSON** — File-based storage for the starter version

## Features
- View and manage customer leads.
- Track lead statuses, such as New, Contacted, and Converted.
- Add or update follow-up notes.
- Simple dashboard interface.
- Backend API built with Node.js and Express.
- Organized project structure.

## Project Structure
```text
FUTURE_FS_02/
├── data/
│   └── leads.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── package.json
├── server.js
└── README.md
```

## How to Run the Project Locally

### Prerequisites
Install [Node.js](https://nodejs.org/) on your computer.

### Installation
1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open the terminal in the project directory.
4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and visit:

   `http://localhost:3000`

## Data Storage
The starter version uses a JSON file (`data/leads.json`) to store lead information. It does not currently use MongoDB or MySQL.

## What I Learned
- Building a web interface using HTML, CSS, and JavaScript.
- Creating backend routes using Node.js and Express.
- Connecting frontend interactions to backend APIs.
- Managing application data using JSON storage.
- Organizing source code and documenting a project with GitHub.

## Current Limitations
- The starter version uses JSON file storage rather than a production database.
- Secure administrator authentication is not implemented.
- The application should be further tested and secured before production use.

## Author
**Sai Haneesh**  
B.Tech — Computer Science and Engineering (Artificial Intelligence and Machine Learning)

## Internship
**Future Interns — Full Stack Web Development**

## 📄 License
Created for educational and portfolio purposes.

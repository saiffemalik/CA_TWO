# Assignment Cover Sheet
* Student Name: Saif Ur Rehman
* Student Number: 20092818
* Programme: MSc in Information Systems with Computing 
* Lecturer Name: Paul Laird
* Module/Subject Title: Programming for Information Systems (B9IS123)
* Assignment Title: MaazInformatics VFM System - Employee Rewards & Monthly Grocery Allowance Card Management System

**By submitting this assignment, I am confirming that:**
1. **This assignment is all my own work;**
2. **Any sources used have been referenced;**
3. **I have followed the Generative AI instructions/ scale set out in the Assignment Brief (Level 4 - AI Task Completion, Human Evaluation);**
4. **I have read the College rules regarding academic integrity in the QAH Part B Section 3, and the Generative AI Guidelines, and understand that penalties will be applied accordingly if work is found not to be my own.**
5. **I understand that all work submitted may be code-matched report to show any similarities with other work.**


## 1. Project Introduction & Overview
This project delivers a proof-of-concept Information System for **MaazInformatics** to manage its corporate employee benefits program. Within this organisation, each employee is issued a unique VFM card that functions similarly to a bank card. Through this card, employees receive a monthly grocery allowance and can earn performance-based reward points.

The core practical focus of this implementation is to manage the **Employee and VFM Card records** via full **CRUD (Create, Read, Update, Delete) operations**, enforced by a decoupled REST API backend and a lightweight web frontend.

## 2. Project Setup & Setup Files
This project uses Node.js and npm to download and run packages. Here is a simple explanation of the setup files in the project:
* `package.json`: This file stores the project metadata (like project name and author) and tracks the list of tools we used (Express, MySQL2, Jest, and Supertest). It also contains short script commands to start or test the project.
* `package-lock.json`: This file locks the exact version of every library installed, ensuring the app runs exactly the same way on the other computer as it does on mine.
* `.gitignore`: This file tells Git to ignore and hide the heavy `node_modules` folder so we do not push huge downloaded files to GitHub.

### Database Connection Setup (`config/db.js`):
* **MySQL2 Driver:** Uses the `mysql2` package to establish a stable connection between the Node.js backend server and the database.
* **Connection Pooling:** Instead of a single connection, it creates a pool of 10 connections. This handles multiple requests at the same time and prevents the server from crashing or hanging.
* **Promise Wrapper:** Exports the connection using `.promise()`. This allows the application to use modern `async/await` syntax for asynchronous database queries, making the code cleaner and avoiding data mismatch.
* **Environment Details:** Configured to connect to `localhost` using the default `root` user for the `maazinformatics_vfm` database.

### Relational Database Schema (`database.sql`):
* **Employees Table:** Stores basic staff profiles including auto-incremented primary keys (`id`), standard character fields (`name`, `department`), and a system-enforced unique constraint for email addresses (`email`).
* **VFM Cards Table:** Stores the financial and reward card details. It links each card to an existing staff profile using a `FOREIGN KEY` reference pointing back to the `employees` table.
* **Data Integrity (ON DELETE CASCADE):** Configured with cascading deletions. If an employee profile is removed from the system, their linked VFM card record is automatically purged to eliminate ghost data.
* **Default Constants:** Automatically initializes new cards with a standard grocery allowance of **€180.00** and **0** initial reward points, utilizing the `DEFAULT` attribute.
* **Automated Seed Data:** Implements `INSERT INTO ... SELECT WHERE NOT EXISTS` clauses to securely inject foundation test data (including 'Saif Ur Rehman') upon initial environment activation, ensuring no duplicate entries occur.

### Core Server Engine & Automation (`server.js`):
* **Express Framework Integration:** Initializes the core HTTP backend application layer, enabling routing mechanisms and RESTful web service capabilities.
* **Built-in Middleware Configuration:** Embeds `express.json()` to globally intercept incoming HTTP requests, safely formatting raw payloads into accessible JavaScript object notation.
* **Asynchronous Database Initialization:** Implements an automated setup module (`setupDatabase`) that triggers concurrently upon server startup, completely eliminating manual deployment steps.
* **File System (`fs`) Integration:** Utilizes native Node.js data streams to dynamically locate and read the root `database.sql` file across any standard execution environment.
* **Query Splitting Engine:** Parses the database script into individual standalone commands using semantic boundaries (`;`), dynamically cleaning whitespaces to avoid script exceptions.
* **Sequential Loop Execution:** Deploys a rigid execution sequence utilizing sequential loops and strict synchronization (`await db.query`), building tables safely before accepting external client requests.

### Core Architecture - Modular MVC Folders:
To maintain high maintainability and prevent code tangling, the system splits core business functions into decoupled layers:
* **`controllers/` (Brain Logic Layer):**
  * `employeeController.js`: Processes client inputs, performs request validation, communicates with the database pool, and handles operational constraints (e.g., duplicate entries) for employee lifecycle operations.
  * `vfmCardController.js`: Manages standard company allowances, point allocations, and transactional balances for employee benefit accounts.
* **`routes/` (URL Routing Layer):**
  * `employeeRoutes.js`: Maps incoming client HTTP requests (such as POST creation streams) seamlessly into specific employee controller hooks.
  * `vfmCardRoutes.js`: Establishes dedicated endpoint boundaries isolated for automated card management services.

### View Employees Features :
I have added controller code and two new routes to read and display employee data from the database:

1. **View All Employees (Get All Profiles):**
   * **URL:** `/api/employees`
   * **Method:** `GET`
   * **What it does:** This endpoint fetches the complete list of all employees saved in the database and shows them together (newly added employees will appear at the top).

2. **View a Single Employee (Get Profile By ID):**
   * **URL:** `/api/employees/:id` (Example: `/api/employees/1`)
   * **Method:** `GET`
   * **What it does:** This endpoint looks for one specific employee using their unique ID. If the ID exists in the database, it shows that employee's profile. If the ID does not exist, it returns a `404 Not Found` error.

## Front-End Integration

Added a dynamic user interface inside the `public/` folder to connect my frontend with the backend APIs as an individual implementation.

### What I Developed

#### 1. `public/index.html` (The Web Page Structure)
* **Simple Layout:** Separates the registration form from the employee data table.
* **Academic Integrity:** Added a note at the top stating that the CSS styling was generated with AI assistance, while the HTML structure is custom-built.
* **Form & Table:** Includes a simple form to register new employees and a clean table to display them.

#### 2. `public/app.js` (The Logic Script)
* **Auto-Load Data:** Automatically fetches and shows existing database records as soon as the page loads.
* **Form Submission (POST):** Stops the default page reload, takes data from the input fields, converts it to JSON, and sends it to the backend to create a new profile.
* **Live Refresh (GET):** Fetches the updated database array and adds new rows to the HTML table dynamically without forcing a manual browser refresh.

### How to Install the Project
When someone download this project, the `node_modules` folder will be missing. Open your terminal in the project folder and run this command to download all required packages automatically:

npm install
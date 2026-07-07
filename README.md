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

### How to Install the Project
When someone download this project, the `node_modules` folder will be missing. Open your terminal in the project folder and run this command to download all required packages automatically:

npm install
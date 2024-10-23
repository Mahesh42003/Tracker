# Installation Commands
mkdir expense-tracker
cd expense-tracker
npm init -y
npm install express mongoose body-parser

# Personal Expense Tracker API

A RESTful API for managing personal financial records using Node.js and MongoDB. Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period.
## Features

- Record income and expenses.
- Retrieve all transactions or a specific transaction by ID.
- Update and delete transactions.
- Get a summary of total income, total expenses, and balance.

## Technologies

- Node.js
- Express.js
- MongoDB (Mongoose for ODM)
- Body-parser (for handling JSON requests)

# API END POINTS 
For Uploading data in transcations using POST Request

POST http://localhost:3009/transcations 
! [POST IMAGE]  https://i.im.ge/2024/10/23/k34gT0.Screenshot-229.png


For Getting data in transcations using GET request 
 
 GET http://localhost:3009/transcations 

 ![GET IMAGE] https://i.im.ge/2024/10/23/k34R3c.Screenshot-230.png

 For Getting data For Particular transcations using GET request 

 GET http://localhost:3009/transcations/:id 

 ![ALT] https://i.im.ge/2024/10/23/k344YF.Screenshot-231.png 


FOR updating data in transcations using PUT request 

PUT http://localhost:3009/transcations/:id 

![ALT2] https://i.im.ge/2024/10/23/k3BMyX.Screenshot-232.png 


For deleting data in transcations using Delete request 

DELETE http://localhost:3009/transcations/:id 

![ALT1]  https://i.im.ge/2024/10/23/k3BuoD.Screenshot-233.png


For Getting data of summary 

GET http://localhost:3009/summary 

![ALT3] https://i.im.ge/2024/10/23/k3BFU4.Screenshot-234.png
 

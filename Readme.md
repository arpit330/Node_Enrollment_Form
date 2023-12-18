# Yoga Enrollment Form
https://frightened-wasp-robe.cyclic.app/enroll

## Steps to Run

- clone this repo

- make .env file with variables URI=<mongodb_url> & PORT=3000 

- docker build -t yoga_form .

- docker container run -d yoga_form

## Database Design (ER Diagram):
Used a MongoDB database to store User Data such as: 

Email (Primary Key)
Name
Mobile No.
Age
Batch

Payment Details
Credit Card Number
CVV
Card Expiry
Payment Date


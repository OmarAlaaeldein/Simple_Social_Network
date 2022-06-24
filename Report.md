---
title: Term Project – Social Network Website - Data Engineering
author: 
    - Yousef Saad (120180002) 
    - Martin Ihab (120180004)
    - Omar Alaaeldien (120180022)
    - Ahmed Elshahat (120180038)
date: \today
geometry: "left=2cm,right=2cm,top=2cm,bottom=2cm"
output:
    pdf_document
---
---

# ER Diagram

![ER Diagram](er.png)

---
# How To Run the Website

1. Clone the following [repository](https://github.com/Dawood0/Simple_Social_Network).
   ```
   git clone https://github.com/Dawood0/Simple_Social_Network
   ```
2. Configure MySQL credentials to match the host settings.
📦Simple_Social_Network
 ┣ 📦databases
 ┃ ┣ 📜db.js
3. Run the schema file to create an instace of the database used in website.
   📦Simple_Social_Network
 ┗ 📜database.sql
4. Run the website
 ```
 node index.js
 ```
5. Access localhost port 8000 from your browser.
 ```
 localhost:8000
 ```

# Test Cases

### Sign up

![A new user is created](signup.png)

### Hashing the user's password

![Upon Sign up password is hashed using SHA-512, when loging in password is hashed and compared to the database hash](account.png)

### Login

![Login with the created user](login.png)

### Wrong Credentials Login


![Wrong user's credentials](wrong1.png)

![Wrong user's credentials response](wrong2.png)



### Logout

![Logout and redirect to sign in page](logout.png)

### User Does Not Exist


---
title: Term Project – Social Network Website - Data Engineering
author: 
    - Yousef Saad (120180002) 
    - Martin Ihab (120180004)
    - Omar Alaaeldien (120180022)
    - Ahmed Elshahat (120180038)
date: \today
output:
    pdf_document
---
---

# ER Diagram

![ER Diagram](er.png)
\

---

# How To Run the Website

1. Clone the following [repository](https://github.com/Dawood0/Simple_Social_Network).
   ```
   git clone https://github.com/Dawood0/Simple_Social_Network
   ```
2. Configure MySQL credentials to match the host settings.
    ```
    Simple_Social_Network
    |- databases
    | |- db.js
    ```
3. Run the schema file to create an instace of the database used in website.
    ``` 
    Simple_Social_Network
    |- database.sql
    ```

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
\

### Hashing the user's password


![Upon Sign up password is hashed using SHA-512, when loging in password is hashed and compared to the database hash](account.png)
\

### Login


![Login with the created user](login.png)
\

### Wrong Credentials Login


![Wrong user's credentials](wrong1.png)
\


![Wrong user's credentials response](wrong2.png)
\


### Logout


![Logout and redirect to sign in page](logout.png)

### Friends

To be friends with someone you have to mutually follow each other.


![Mohammed follows ali](friends1.png)
\


![Mohammed follows omar](friends2.png)
\


![ali follows Mohammed](friends3.png)
\


![omar follows Mohammed](friends4.png)
\


![Mohammed's friends list](friends5.png)
\


### Creating new post


![Mohammed's writes a post](post1.png)
\


![Mohammed's own posts and the users he fellows posts appears in login page](post2.png)
\


### Profile page


![Profile](profile`.png)
\

### Search


![Search for ali](search2.png)
\


![Results](search2.png)
\

### Visit


![Visit alis's profile](visit1.png)
\


![Actions available for ali's profile](visit2.png)
\

### Follow an Already Followed User


![Follow ali who already followed](unfollowrep1.png)
\


![The results](unfollowrep2.png)
\

---
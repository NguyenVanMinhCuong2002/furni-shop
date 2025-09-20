# XSS
XSS usually occurs due to programmer's vulnerability in front-end, so we will audit it in places containing HTML, CSS such as EJS, Jinja, Twig

Hacker can get cookie when http only is false
![alt text](assets/image.png)

When rendering data from database, we should not use <%- %>, we should change to <%= %> which will be safer and will not cause XSS error.
![alt text](assets/image-1.png)

# SQLi
SQLi usually occurs in the communication between the backend and the database, so we will audit the parts that communicate with the database.

Raw SQL is being used, programmers tend to concatenate strings directly into SQL statements, so it is easy to cause SQLi, 
![alt text](assets/image-2.png)


changing 
![alt text](assets/image-3.png)

# IDOR
IDOR usually occurs due to poor authorization, so we have to audit routes, controller and middleware.

We can change logic to get id from session
![alt text](assets/image-4.png)

# Password Hashing

Register
![alt text](assets/image-5.png)

update user
![alt text](assets/image-6.png)

login 
![alt text](assets/image-7.png)

These are user related functions, their common point is that they do not encrypt passwords, so we need to add password encryption function to them.
# Patch 
## The vulnerability was patched
- XSS 
- SQLi 
- IDOR 
- Cryptographic Failures

## The changes

### XSS 
Use <%= ... %> instead of <%- ... %> to avoid directly rendering data retrieved from the database
![alt text](assets/image.png)

Result:
This makes payloads inoperable.

![alt text](assets/image-1.png)

### SQLi
Avoid direct string concatenation in SQL, this will avoid SQLi
![alt text](assets/image-2.png)

Result: Login failed

![alt text](assets/image-3.png)

### IDOR 
instead of getting user id from url we will get url from session
![alt text](assets/image-5.png)

add middleware so only logged in can access

![alt text](assets/image-6.png)

Result:
![alt text](assets/image-4.png)

### Hashing Password

Use Byscripjs Library to Hash Password
![alt text](assets/image-7.png)

Result: 

![alt text](assets/image-8.png)
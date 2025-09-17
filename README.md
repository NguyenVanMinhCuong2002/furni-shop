# Furni shop 
![alt text](image.png)

- Furniture website
- Vulnerability lab
- White Box 
- Vulnerability is reproduced (SQli, XSS, IDOR, Cryptographic Failures)

# Setup
## Docker
### Create .env file (For example)
<pre>
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=mydb
SESSION_SECRET_KEY=47cddd6a-c2ef-4775-981b-1ba10c5cd2e4
</pre>

### Run docker 
<pre>
 $ docker compose up --build
</pre>
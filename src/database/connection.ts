import pgPromise from 'pg-promise';
import dotenv from "dotenv"

dotenv.config()

const host = process.env.DATABASE_HOST
const port = process.env.DATABASE_PORT
const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const db_name = process.env.DATABASE_NAME

const pgp = pgPromise();
const db = pgp(`postgres://${user}:${password}@${host}:${port}/${db_name}`);

export default db;
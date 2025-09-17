import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp('postgres://postgres:postgres@db:5432/chairshop');

export default db;
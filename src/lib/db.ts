import pkg from "pg";
const { Pool } = pkg;

import {
    POSTGRES_DB,
    POSTGRES_USERNAME,
    POSTGRES_HOST,
    POSTGRES_PORT
} from "$env/static/private"

const pool = new Pool({
    database: POSTGRES_DB,
    user: POSTGRES_USERNAME,
    host: POSTGRES_HOST,
    port: (Number(POSTGRES_PORT || 5432)),
});

export const connectToDB = async () => await pool.connect();
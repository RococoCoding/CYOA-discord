import 'dotenv/config';
const config = {
  "production": {
    database: process.env.PG_DB,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    username: process.env.PG_USER,
    dialect: "postgres"
  }
}

export default config;
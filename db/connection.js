import { Sequelize } from 'sequelize';
// Configure the database connection
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.PG_DB,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;

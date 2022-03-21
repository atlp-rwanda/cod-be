const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
    ssl: {"require":false,
    rejectUnauthorized: false,
  }}
  },
  "test": {
    username: 'rbldgkgttnwews',
    password: '7b059e68301070a4c87ae47e12142f7c879f974c15f9977d5c69c793732320fd',
    database: 'da18lmatmcie1a',
    host: 'ec2-52-86-123-180.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: { 
      ssl: {"require":true,
      rejectUnauthorized: false,
    }}
  },
  "production": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {"require":true,
      rejectUnauthorized: false,
    }}
  }
};
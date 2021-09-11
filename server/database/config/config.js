const dotenv =require('dotenv');
dotenv.config()

const config={
development: {
username: process.env.DB_USERNAME,
password:process.env.DB_PASSWORD,
database:process.env.DB_NAME,
host: process.env.DB_HOST,
dialect: "mysql",
loging:false
  },
  production: {
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    loging:false
      },



};

module.exports=config[process.env.NODE_ENV || 'development']


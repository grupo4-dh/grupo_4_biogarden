require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "biogarden",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":"3306"
    
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "biogarden",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":"3306"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "biogarden",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":"3306"
  }
}

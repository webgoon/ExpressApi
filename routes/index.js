const express = require('express')
const router = express.Router();

const todosRoute = require('./todos');
const usersRoute = require('./users');
const employeesRoute = require('./employees')

module.exports = (config) => {

  router.get('/', (req, res) => {
    res.send('Home Page');
  });

  router.use('/todo', todosRoute(config));
  router.use('/user', usersRoute(config));
  router.use('/employee', employeesRoute(config));

  return router;
};
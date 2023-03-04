const express = require('express')
const router = express.Router()

const todosRoute = require('./todos')
const usersRoute = require('./users')
const employeesRoute = require('./employees')
const newsfeedRoute = require('./newsfeed')

module.exports = (config) => {

  router.get('/', (req, res) => {
    res.send('Home Page')
  });

  router.use('/employee', employeesRoute(config))
  router.use('/newsfeed', newsfeedRoute(config))
  router.use('/todo', todosRoute(config))
  router.use('/user', usersRoute(config))

  return router
};
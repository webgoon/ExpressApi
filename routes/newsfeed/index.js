const express = require('express')
const router = express.Router()

const UserService = require('../../services/UserService')
const NewsFeedService = require('../../services/NewsFeedService')

module.exports = (config) => {

  const userService = new UserService(config.postgres.client)
  const newsFeedService = new NewsFeedService(config.postgres.client)

  // router.post('/create', async(req, res) => {
  //   try {
  //     const user = await userService.createUser(req.body)
  //     //res.status(200).send(user)
  //     res.status(200).json({ user: user })
  //   } catch (error) {
  //     return next(err)
  //   }
  // })
  
  router.post('/create', async(req, res, next) => {
    console.log('Hit Post Create newsfeed/create req.body', req.body)
    console.log('Hit Post Create newsfeed/create req.body.UserId', req.body.UserId)
    try {
    console.log('Sub Post newsfeed/create req.body.UserId', req.body.UserId)
      const user = await userService.findOneUser(req.body)
      const newsFeed = await newsFeedService.createNewsFeed( user.id, req.body.title, req.body.description)
      res.send({user, newsFeed})
    } catch (error) {
      return next(error)
    }
  })

  router.post('/deleteNewsFeed', async (req, res, next) => {
    try{
      const newsFeed = await newsFeedService.deleteNewsFeed()
      res.status(200).send(newsFeed)
    }catch(err){
      return next(err)
    }
  })

  return router
}
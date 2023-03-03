const express = require('express')
const router = express.Router()

const UserService = require('../../services/UserService')

module.exports = (config) => {

  const userService = new UserService(config.postgres.client)

  router.post('/create', async(req, res) => {
    try {
      const user = await userService.createUser(req.body)
      res.send(user)
    } catch (error) {
      return next(err)
    }
  })

  router.get('/findOne', async (req, res, next) => {
    try{
      const user = await userService.findOneUser()
      // res.send(user)
      res.send({"getterFunc":user.firstName, 
                "OG": user.getDataValue('firstName')
              })
    }catch(err){
      console.log('err', err)
      return next(err)
    }
  });

  router.get('/findbypk', async (req, res, next) => {
    try{
      const user = await userService.findOneByPk()
      res.send(user)
    }catch(err){
      return next(err)
    }
  });

  router.get('/all', async (req, res) => {
    console.log('hit /all', req.body)
    try{
      const userList = await userService.getAllUsers();
      res.send(userList)
    }catch(err){
      return next(err)
    }
  })

  router.get('/all/attributes', async (req, res) => {
    try{
      const userList = await userService.getAllUsersAttributes();
      res.send(userList)
    }catch(err){
      return next(err)
    }
  })


  router.get('/all/where', async (req, res) => {
    try{
      const userList = await userService.getAllUsersWhere()
      res.send(userList)
    }catch(err){
      return next(err)
    }
  })

  router.post('/update', async (req, res, next) => {
    try{
      const user = await userService.updateUser()
      res.send(user)
    }catch(err){
      return next(err)
    }
  })

  router.post('/delete', async (req, res) => {
    try{
      const user = await userService.deleteUser()
      res.send(user)
    }catch(err){
      return next(err)
    }
  })

  router.post('/deleteContact', async (req, res) => {
    try{
      const contact = await contactService.deleteContact()
      res.send(contact)
    }catch(err){
      return next(err)
    }
  })

  router.post('/follow', async (req, res) => {
    try{
      const followedList = await userService.followUser()
      res.send(followedList)
    }catch(err){
      return next(err)
    }
  })

  return router
}
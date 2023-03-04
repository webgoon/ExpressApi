const express = require('express')
const router = express.Router()

const UserService = require('../../services/UserService')

module.exports = (config) => {

  const userService = new UserService(config.postgres.client)

  router.post('/create', async(req, res) => {
    try {
      const user = await userService.createUser(req.body)
      //res.status(200).send(user)
      res.status(200).json({ user: user })
    } catch (error) {
      return next(err)
    }
  })

  router.get('/findOne', async (req, res, next) => {
    try{
      const user = await userService.findOneUser()
      // res.status(200).send(user)
      res.status(200)
      .send({"getterFunc":user.firstName, 
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
      res.status(200).send(user)
    }catch(err){
      return next(err)
    }
  });

  router.get('/all', async (req, res) => {
    console.log('hit /all', req.body)
    try{
      const userList = await userService.getAllUsers();
      res.status(200).send(userList)
    }catch(err){
      return next(err)
    }
  })

  router.get('/all/attributes', async (req, res) => {
    try{
      const userList = await userService.getAllUsersAttributes();
      res.status(200).send(userList)
    }catch(err){
      return next(err)
    }
  })


  router.get('/all/where', async (req, res) => {
    try{
      const userList = await userService.getAllUsersWhere()
      res.status(200).send(userList)
    }catch(err){
      return next(err)
    }
  })

  router.post('/update', async (req, res, next) => {
    try{
      const user = await userService.updateUser()
      res.status(200).send(user)
    }catch(err){
      return next(err)
    }
  })

  router.post('/delete', async (req, res) => {
    console.log('HIT POST /delete/:id: req.body: ', req.body);
    try{
      console.log('Sub HIT POST /delete/:id: req.body.id: ', req.body.id);
    
      //const user = await userService.deleteUser()
      const user = await userService.deleteUser(req.body)
      // return "deleted User"
      return res.status(200).send({user})
    }catch(err){
      //return next(err)
      //return  res.status(404).next(err)
      return  res.status(404).send(err)
    }
  })

  router.post('/deleteforce', async (req, res) => {
    console.log('HIT POST FORCE /delete/:id: req.body: ', req.body);
    try{
      console.log('Sub HIT POST FORCE  forcing /delete/:id: req.body.id: ', req.body.UserId);
    
      //const user = await userService.deleteUser()
      const user = await userService.deleteUserForce(req.body)
      // return "deleted User"
      return res.status(200).send({user})
    }catch(err){
      //return next(err)
      //return  res.status(404).next(err)
      return  res.status(404).send(err)
    }
  })


  router.get('/delete/:id', async (req, res) => {
    console.log('HIT GET /delete/:id: req.body: ', req.body);
    try{
      console.log('HIT GET /delete/:id: req.params.id: ', req.params.id);

      const user = await userService.deleteUserId(req.params)
      res.status(200).send(user)
    }catch(err){
      return next(err)
    }
  })




  router.post('/deleteContact', async (req, res) => {
    try{
      const contact = await contactService.deleteContact()
      res.status(200).send(contact)
    }catch(err){
      return next(err)
    }
  })

  router.post('/follow', async (req, res) => {
    try{
      const followedList = await userService.followUser()
      res.status(200).send(followedList)
    }catch(err){
      return next(err)
    }
  })

  router.post('/restoredelete', async (req, res) => {
    console.log('HIT POST Restore /restoreing:id: req.body: ', req.body);
    try{
      console.log('Sub HIT POST Restore  restoring /restoredelete/{POST:id}: req.body.id: ', req.body.UserId);
    
      //const user = await userService.deleteUser()
      const user = await userService.restoreDeletedUserId(req.body)
      // return "deleted User"
      return res.status(200).send({user})
    }catch(err){
      //return next(err)
      //return  res.status(404).next(err)
      return  res.status(404).send(err)
    }
  })

  return router
}
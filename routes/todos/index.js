const express = require('express');
const router = express.Router();

const UserService = require('../../services/UserService')
const TodoService = require('../../services/TodoService')

module.exports = (config) => {

  const userService = new UserService(config.postgres.client)
  const todoService = new TodoService(config.postgres.client)

  router.get('/', async (req, res) => {
    try{
      const todo = await todoService.getTodo();
      res.send(todo);
    }catch(err){
      return next(err);
    }
  });

  router.get('/create', async (req, res) => {
    try{
      const user = await userService.findOneUser();
      const todo = await todoService.createTodo(user.id, req.body.title, req.body.description);
      res.send(user, todo);
    }catch(err){
      return next(err);
    }
  });

  return router;
};
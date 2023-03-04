// class TodoService {

//     async getTodo(){
//       return 'TodoService: Getting a Todo from Database';
//     }
  
//   }
  
//   module.exports = TodoService;

const Models = require('../models/sequelize');

class TodoService {

    //Todo
    //todo
  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createTodo(UserId, title, description){
    try{
      const todo = await this.models.Todo.create({
        UserId,
        title,
        description
      })

      return todo
    }catch(err){
      return err
    }
  }

  async deleteTodo({TodoId}){
    console.log(`TodoId`, TodoId)
    try {
      const todo = await this.models.Todo.destroy({where: {"id": TodoId}});
      return "deleted Todo";
    } catch (err) {
      return err
    }
  }

}

module.exports = TodoService;
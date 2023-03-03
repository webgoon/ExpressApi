const Models = require('../models/sequelize');

class UserService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createUser({firstName, lastName, email, password}){
    try{
      const user = await this.models.User.create({
        firstName,
        lastName,
        email,
        password
      });

      return user
    }catch(err){
      return err;
    }
  }

  async getAllUsersAttributes(){
    try {
      const users = await this.models.User.findAll({
        attributes: ['firstName', 'lastName', 'email'],
        attributes: {exclude: ['password']}
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async findOneUser(){
    try {
      const user = await this.models.User.findOne({where: {id: 1}});
      return user;
    } catch (err) {
      console.log('err', err)
      return err;
    }
  
  }

  //Find one by Primary Key
  async findOnebyPk(){
    try {
      const user = await this.models.User.findOne({where: {id: 2}});
      return user;
    } catch (err) {
      return err;
    }
  }
  

  async getAllUsers(){
    try {
      const users = await this.models.User.findAll({
        // include: [
        //   {
        //     model: this.models.ContactInfo,
        //     attributes: {exclude: ['updatedAt', 'createdAt', 'UserId']}
        //   },
        //   {
        //     model: this.models.Tweet,
        //     attributes: {exclude: ['updatedAt', 'UserId']}
        //   }
        // ], 
        // attributes: {exclude: ['updatedAt', 'createdAt']}
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async getAllUsersWhere(){
    try {
      const users = await this.models.User.findAll({where: {firstName: 'Justice'}});
      return users;
    } catch (err) {
      return err;
    }
  }

  async updateUser(){
    try {
      await this.models.User.update(
          {
            lastName: "lastName changed"
          },
          {
            where: {id: 1}
          } 
        );
      return "updated User";
    } catch (err) {
      return err;
    }
  }

  async deleteUser(){
    try {
      const user = await this.models.User.destroy({where: {id: 2}});
      return "deleted User";
    } catch (err) {
      return err;
    }
  }

  async followUser(){
    try {
      const currentUser = await this.findOneUser();
      const toFollowUser = await this.models.User.findOne({where: {firstName: 'tom'}});
      currentUser.addUser(toFollowUser);
      return currentUser.getUser();
    } catch (err) {
      return err;
    }
  }

}

module.exports = UserService;
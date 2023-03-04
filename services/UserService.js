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
       //return {'success': true, 'message': `${user}`}
    }catch(err){
      return err
       //return {'success': false, 'message': `${err}`}
    }
  }

  async getAllUsersAttributes(){
    try {
      const users = await this.models.User.findAll({
        //attributes: ['firstName', 'lastName', 'email'],
        attributes: {exclude: ['password']}
      });
      return users;
       //return {'success': true, 'message': `${users}`}
    } catch (err) {
      return err
       //return {'success': false, 'message': `${err}`}
    }
  }

  async findOneUser(){
    try {
      const user = await this.models.User.findOne({where: {id: 1}});
      return user;
    } catch (err) {
      console.log('err', err)
      return err
       //return {'success': false, 'message': `${err}`}
    }
  
  }

  //Find one by Primary Key
  async findOnebyPk(){
    try {
      const user = await this.models.User.findOne({where: {id: 2}});
      return user
      return {'success': false, 'message': `${err}`}
    } catch (err) {
      return err
       //return {'success': false, 'message': `${err}`}
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
      })
      return users
      //return {'success': true, 'message': `${users}`}
    } catch (err) {
      //return err
      return {'success': false, 'message': `${err}`}
    }
  }

  async getAllUsersWhere(){
    try {
      const users = await this.models.User.findAll({where: {firstName: 'Justice'}})
      return users;
    } catch (err) {
      //return err
      return {'success': false, 'message': `${err}`}
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
      //return err;
      return {'success': false, 'message': `${err}`}
    }
  }

  async deleteUser({id}){
    console.log(`deleteUser`, id)
    // console.log(`id.id`, id.id)
    // console.log(`req.body`, req.body)
    // console.log(`req.body.id:`, req.body.id)
    try {
      //const user = await this.models.User.destroy({where: {id: 46}},{truncate: true, restartIdentity: true })
      const user = await this.models.User.destroy({where: {"id": id}} )
      return {'success': true, 'message': `deleted User`}
      //return res.sendStatus(200).send({'success': true, 'message': 'deleted User'})
      //return res.sendStatus(200).send({'success': true, 'message': 'deleted User'})
    } catch (err) {    
      return {'success': false, 'message': `${err}`}
    }
  }

  async deleteUserId({id}){
    console.log(`deleteUserId`, id)
    try {
      const user = await this.models.User.destroy({where: {id: id}})
      return "deleted User"
    } catch (err) {
      //return err
      return {'success': false, 'message': `${err}`}
    }
  }

  async restoreDeletedUserId({UserId}){
    console.log(`restoreDeletedUserId`, UserId)
    try {
      const user = await this.models.User.restore({where: {id: UserId}})
      return "restored deleted User"
    } catch (err) {
      //return err
      return {'success': false, 'message': `${err}`}
    }
  }

  async deleteUserForce({UserId}){
    console.log(`deleteUser`, UserId)    
    try {
      
      const user = await this.models.User.destroy({where: {"id": UserId}, force:true} )
      return {'success': true, 'message': `deleted User`}
    } catch (err) {
      //return err;    
      return {'success': false, 'message': `${err}`}
    }
  }

  async followUser(){
    try {
      const currentUser = await this.findOneUser();
      const toFollowUser = await this.models.User.findOne({where: {firstName: 'tom'}})
      currentUser.addUser(toFollowUser);
      return currentUser.getUser()
    } catch (err) {
      //return err;
      return {'success': false, 'message': `${err}`}
    }
  }

}

module.exports = UserService
const Models = require('../models/sequelize');

class UserContactService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createUserContactInfo(phone, email, UserId){
    try{
      const userContactInfo = await this.models.UserContactInfo.create({
        phone,
        email,
        UserId
      })

      return userContactInfo
    }catch(err){
      return err
    }
  }

  async deleteUserContactInfo(){
    try {
      const userContactInfo = await this.models.UserContactInfo.destroy({where: {phone: '6586985632'}});
      return "deleted Contact";
    } catch (err) {
      return err
    }
  }

}

module.exports = UserContactService;
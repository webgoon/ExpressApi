const Models = require('../models/sequelize');

class EmployeeContactInfoService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createContactInfo(phone, UserId){
    try{
      const employeeContactInfo = await this.models.EmployeeContactInfo.create({
        phone,
        UserId
      });

      return employeeContactInfo
    }catch(err){
      return err;
    }
  }

  async deleteContact(){
    try {
      const employeeContactInfo = await this.models.EmployeeContactInfo.destroy({where: {phone: '6586985632'}});
      return "deleted Contact";
    } catch (err) {
      return err;
    }
  }

}

module.exports = EmployeeContactInfoService;
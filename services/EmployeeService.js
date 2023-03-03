const Models = require('../models/sequelize');

class EmployeeService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createEmployee({firstName, lastName, email, password}){
    try{
      const employee = await this.models.Employee.create({
        firstName,
        lastName,
        email,
        password
      });

      return employee
    }catch(err){
      return err;
    }
  }

  async getAllEmployeesAttributes(){
    try {
      const employee = await this.models.Employee.findAll({
        // attributes: ['firstName', 'lastName', 'email']
        attributes: {exclude: ['id']}
      });
      return employee;
    } catch (err) {
      return err;
    }
  }

  async findOneEmployee(){
    try {
      const employee = await this.models.Employee.findOne({where: {firstName: 'wdj'}});
      return employee;
    } catch (err) {
      return err;
    }
  }

  async getAllEmployees(){
    console.log('Hit Get All employees')
    try {
      const employee = await this.models.Employee.findAll({
        // include: [
        //   {
        //     model: this.models.ContactInfo,
        //     attributes: {exclude: ['updatedAt', 'createdAt', 'EmployeeId']}
        //   },
        //   {
        //     model: this.models.Tweet,
        //     attributes: {exclude: ['updatedAt', 'EmployeeId']}
        //   }
        // ], 
        // attributes: {exclude: ['updatedAt', 'createdAt']}
      });
      return employee;
    } catch (err) {
      console.log('error', err)
      return err;
    }
  }

  async getAllEmployeesWhere(){
    try {
      const employee = await this.models.Employee.findAll({where: {firstName: 'wdj'}});
      return employee;
    } catch (err) {
      return err;
    }
  }

  async updateEmployee(){
    try {
      await this.models.Employee.update({lastName: "lastName changed"},{where: {firstName: 'wdj'}} );
      return "updated  Employee";
    } catch (err) {
      return err;
    }
  }

  async deleteEmployee(){
    try {
      const employee = await this.models.Employee.destroy({where: {firstName: 'wdj'}});
      return "deleted Employee";
    } catch (err) {
      return err;
    }
  }

  async followEmployee(){
    try {
      const currentEmployee = await this.findOneEmployee();
      const toFollowEmployee = await this.models.Employee.findOne({where: {firstName: 'tom'}});
      currentEmployee.addEmployee(toFollowEmployee);
      return currentEmployee.getEmployee();
    } catch (err) {
      return err;
    }
  }

}

module.exports = EmployeeService;
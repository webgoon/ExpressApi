const express = require('express')
const router = express.Router()


const EmployeeService = require('../../services/EmployeeService')

module.exports = (config) => {

  const employeeService = new EmployeeService(config.postgres.client)

  router.post('/create', async(req, res) => {
    try {
      const employee = await employeeService.createEmployee(req.body)
      res.send(employee)
    } catch (error) {
      return next(err)
    }
  })

  router.get('/findOne', async (req, res, next) => {
    try{
      const employee = await employeeService.findOneEmployee()
      res.send(employee)
    }catch(err){
      return next(err)
    }
  });

  router.get('/findbypk', async (req, res, next) => {
    try{
      const employee = await employeeService.findOneByPk()
      res.send(employee)
    }catch(err){
      return next(err)
    }
  });

  router.get('/all', async (req, res) => {
    console.log('Employee All Get request', req.body)
    try{
      const employeeList = await employeeService.getAllEmployees();
      res.send(employeeList)
    }catch(err){
      return next(err)
    }
  })

  router.get('/all/attributes', async (req, res) => {
    try{
      const employeeList = await employeeService.getAllEmployeesAttributes();
      res.send(employeeList)
    }catch(err){
      return next(err)
    }
  })


  router.get('/all/where', async (req, res) => {
    try{
      const employeeList = await employeeService.getAllEmployeesWhere()
      res.send(employeeList)
    }catch(err){
      return next(err)
    }
  })

  router.post('/update', async (req, res, next) => {
    try{
      const employee = await employeeService.updateEmployee()
      res.send(employee)
    }catch(err){
      return next(err)
    }
  })

  router.post('/delete', async (req, res) => {
    try{
      const employee = await employeeService.deleteEmployee()
      res.send(employee)
    }catch(err){
      return next(err)
    }
  })

  router.post('/deleteContact', async (req, res) => {
    try{
      const employeecontact = await employeecontactService.deleteContact()
      res.send(employeecontact)
    }catch(err){
      return next(err)
    }
  })

  router.post('/follow', async (req, res) => {
    try{
      const employeefollowedList = await employeeService.followEmployee()
      res.send(employeefollowedList)
    }catch(err){
      return next(err)
    }
  })

  return router
}
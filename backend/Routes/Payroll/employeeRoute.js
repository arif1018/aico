const express = require('express')
const router = express.Router()
const { loginUser, addUser, viewUsers, getEmployeeCount } = require('../../Controllers/Payroll/employeeController')
const { checkAdministrator} = require('../../Middleware/authMiddleware')

router.post('/addNewEmployee',addUser)
router.post('/login', loginUser)
router.get('/getEmployeeExist', getEmployeeCount)
// router.get('/getallusers', checkAdministrator, viewUsers)
router.get('/getallusers', viewUsers)

module.exports = router
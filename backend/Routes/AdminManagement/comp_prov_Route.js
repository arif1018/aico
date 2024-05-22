const express = require('express')
const router = express.Router()
const { addCompany, checkInitialPassword, getCompanyData, addInitialPassword } = require('../../Controllers/AdminManagement/companyController')
// const { checkAdministrator} = require('../../Middleware/authMiddleware')

router.post('/addCmpData', addCompany)
router.get('/getCmpData', getCompanyData)
router.post('/addInitialPassword', addInitialPassword)
router.post('/checkInitialPassword', checkInitialPassword)

module.exports = router
const express = require('express')
const router = express.Router()
const { addCOA } = require('../../Controllers/GeneralManagement/Level1Controller')
const { checkAdministrator} = require('../../Middleware/authMiddleware')

router.post('/createCOA', checkAdministrator, addCOA)

module.exports = router
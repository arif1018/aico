const express = require('express')
const router = express.Router()
const { addHOA } = require('../../Controllers/GeneralManagement/Level3Controller')
const { checkAdministrator} = require('../../Middleware/authMiddleware')

router.post('/createHOA', checkAdministrator, addHOA)

module.exports = router
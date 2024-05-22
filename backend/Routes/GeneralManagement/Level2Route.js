const express = require('express')
const router = express.Router()
const { addSCOA } = require('../../Controllers/GeneralManagement/Level2Controller')
const { checkAdministrator} = require('../../Middleware/authMiddleware')

router.post('/createSCOA', checkAdministrator, addSCOA)

module.exports = router
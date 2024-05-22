const express = require('express')
const router = express.Router()
const { ViewAllParties, ViewCategories, addPartyCategory, deletePartyCategory, addNewParty } = require('../../Controllers/GeneralManagement/partiesInformationController')
const { checkAdministrator} = require('../../Middleware/authMiddleware')

router.get('/viewAllParties', checkAdministrator, ViewAllParties)
router.get('/viewAllCategories', checkAdministrator, ViewCategories)
router.post('/addPartyCategory', checkAdministrator, addPartyCategory)
router.post('/deletePartyCategory', checkAdministrator, deletePartyCategory)
router.post('/addNewParty', checkAdministrator, addNewParty)

module.exports = router
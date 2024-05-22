const express = require('express')
const router = express.Router()
const { dataForCombo, checkComboBoxData, getAllParties, getLastBalance } = require('../../Middleware/allProcedures')

router.get('/dataForCombo', dataForCombo)
router.post('/checkForCombo', checkComboBoxData)
router.get('/getAllParties', getAllParties)
router.post('/getLastBalance', getLastBalance)

module.exports = router
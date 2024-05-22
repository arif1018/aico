const express = require('express')
const router = express.Router()
const { getUser } = require('../../Middleware/authMiddleware')
const { getItemsOpening, addOpeningItemData, getAllDataFromOpening, addAllItemstoLevel4, addItemstoPurchaseDelivery, addItemstoPurchaseInvoice, findNotOpenedItems, addStockValueToGJ } = require('../../Controllers/AdminManagement/openingController')

router.post('/getItemOpeningData', getItemsOpening)
router.post('/addItemOpeningData', getUser, addOpeningItemData)
router.get('/getAllDataFromOpening', getAllDataFromOpening)
router.post('/addAllItemstoLevel4', addAllItemstoLevel4)
router.post('/addItemstoPurchaseDelivery', getUser, addItemstoPurchaseDelivery)
router.post('/addItemstoPurchaseInvoice', getUser, addItemstoPurchaseInvoice)
router.get('/findNotOpenedItems', findNotOpenedItems)
router.get('/addStockValueToGJ', addStockValueToGJ)



module.exports = router
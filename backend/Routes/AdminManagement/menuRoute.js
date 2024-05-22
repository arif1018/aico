const express = require('express')
const router = express.Router()
const { viewMenus, addMenu, getUserRights, addUserRights, getMenusForSetUserRights, deleteUserRights } = require('../../Controllers/AdminManagement/menuController')
const { checkAdministrator } = require('../../Middleware/authMiddleware')

router.post('/createmenu', checkAdministrator, addMenu)
router.post('/createmenuUserRights', checkAdministrator, addUserRights)
router.post('/deletemenuUserRights', checkAdministrator, deleteUserRights)
router.get('/getallmenus', viewMenus)
router.get('/getUserRights', getUserRights)
router.get('/getMenuForSetUserRights', checkAdministrator, getMenusForSetUserRights)

module.exports = router
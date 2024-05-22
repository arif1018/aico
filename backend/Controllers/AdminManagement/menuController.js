const asyncHandler = require('express-async-handler')
const Menus = require('../../Models/AdminManagement/menuModel')
const userRights = require('../../Models/AdminManagement/userRights')
const { getNewID, toProperCase } = require('../../Middleware/allProcedures')


const viewMenus = asyncHandler(async (req, res) => {

    const allMenus = await Menus.find({}, { _id: 0, 'subMenus._id': 0, createdAt: 0, updatedAt: 0, __v: 0 }).sort('menuID')

    res.status(200).json(allMenus)

})

const addMenu = asyncHandler(async (req, res) => {

    let menuID = await getNewID('menuID', 1, Menus)

    const { menuName, subMenus } = req.body

    const newSubMenus = []

    const alreadyExist = await Menus.find({ menuName: menuName })

    if (alreadyExist.length > 0) {
        for (i = 0; i < subMenus.length; i++) {
            const existSubMenus = await Menus.find({ _id: alreadyExist[0]._id, 'subMenus.menuName': subMenus[i].menuName })
            if (existSubMenus.length < 1) {
                const properMenuName = toProperCase(subMenus[i].menuName)
                await Menus.updateOne({ _id: alreadyExist[0]._id }, { $push: { subMenus: { menuName: toProperCase(subMenus[i].menuName), menuURL: subMenus[i].menuURL } } })
                newSubMenus.push({ menuName: toProperCase(subMenus[i].menuName), menuURL: subMenus[i].menuURL })
            }
        }

        res.status(200).json({
            alreadyExist,
            message: 'Already Added Please Try New',
        })
    } else {
        const addedMenu = await Menus.create({ menuID, menuName, subMenus })
        res.status(200).json(addedMenu)
    }

})

const getUserRights = asyncHandler(async (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            req.userID = token
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!...')
        }

    }

    const parentMenu = await userRights.find({ userID: req.userID }).sort('menuID')
    res.status(200).json(parentMenu)
})

const addUserRights = asyncHandler(async (req, res) => {

    let menuID = await getNewID('menuID', 1, userRights)

    const { menuName, subMenus } = req.body

    const newSubMenus = []

    const alreadyExist = await userRights.find({ menuName: menuName, userID: req.user })

    if (alreadyExist.length > 0) {
        for (i = 0; i < subMenus.length; i++) {
            const existSubMenus = await userRights.find({ _id: alreadyExist[0]._id, 'subMenus.menuName': subMenus[i].menuName })
            if (existSubMenus.length < 1) {
                await userRights.updateOne({ _id: alreadyExist[0]._id }, { $push: { subMenus: { menuName: subMenus[i].menuName, menuURL: subMenus[i].menuURL } } })
                newSubMenus.push({ menuName: subMenus[i].menuName, menuURL: subMenus[i].menuURL })
            }
        }
        res.status(200).json({
            alreadyExist,
            message: 'Already Added Please Try New',
        })
    } else {
        const addedMenu = await userRights.create({ userID:req.user, menuID, menuName, subMenus })
        res.status(200).json(addedMenu)
    }

})

const getMenusForSetUserRights = asyncHandler(async (req, res) => {

    let menuList = []

    const menus = await Menus.find().sort('menuID')


    for(let i = 0; i < menus.length; i++){
        const subMenus = menus[i].subMenus
        let subMenusList = []
        for(let a = 0; a < subMenus.length; a++){
            const foundSubMenu = await userRights.find({'subMenus.menuName':subMenus[a].menuName, userID: req.user})
            if(foundSubMenu.length < 1){
                const myObj = {menuName: subMenus[a].menuName, menuURL:subMenus[a].menuURL, menuStatus:false}
                subMenusList.push(myObj)
            }else{
                const myObj = {_id:foundSubMenu[0].subMenus[0]._id, menuName: subMenus[a].menuName, menuURL:subMenus[a].menuURL, menuStatus:true}
                subMenusList.push(myObj)
            }
        }
        menuList.push({menuID:menus[i].menuID, menuName:menus[i].menuName, subMenus:subMenusList})
}

    res.status(200).json(menuList)

})

const deleteUserRights = asyncHandler ( async (req, res) => {
    
    const { menuName, subMenuName } = req.body

    // const findmenu = await userRights.find({'subMenus._id':menuid})
    const deletedmenu = await userRights.updateOne({userID:req.user, menuName:`${menuName}`},{$pull:{subMenus:{menuName: `${subMenuName}`}}})

    res.status(200).json(deletedmenu)
})

module.exports = { viewMenus, addMenu, getUserRights, addUserRights, getMenusForSetUserRights, deleteUserRights }
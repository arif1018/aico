const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Employee = require('../../Models/Payroll/employeeModel')
const Level4 = require('../../Models/GeenralManagement/Level4Model')
const Level3 = require('../../Models/GeenralManagement/Level3Model')
const Menus = require('../../Models/AdminManagement/menuModel')
const userRights = require('../../Models/AdminManagement/userRights')
const { getNewID, checkLevel3_4, toProperCase } = require('../../Middleware/allProcedures')

const getEmployeeCount = asyncHandler(async (req, res) => {

    let employeeData = await Employee.find().count()

    res.status(200).json(employeeData)

})

const viewUsers = asyncHandler(async (req, res) => {

    const users = await Employee.find()
    res.status(200).json(users)

    // if(req.userRole === "Administrator"){
    //     const users = await Employee.find()
    //     res.status(200).json(users)
    // }else{
    //     res.status(200).json({message:"You are not authorized!..."})
    // }
})

const addUser = asyncHandler(async (req, res) => {
    
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            req.user = token
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!...')
        }
                
    }

    let EmpID = await getNewID('lvl4Code', 6, Level4)

    const { EntDate, EmpName, EmpDepartment, EmpDesignation, EmpSalary, EmpCNIC, EmpContact, EmpNOK,
        EmpNOKContact, userimage, Arrival, CheckOut, EmpStatus, YearlySalary, TaxAmount, TaxPer, Extra,
        YearlyTax, userStatus, user: { userID, branch, role, password } } = req.body

    const checkuserID = await Employee.findOne({ EmpName: EmpName })

    if (checkuserID) {
        res.status(400)
        throw new Error('User already Registered')
    }

    const checkLevel4item = await Level4.find({lvl4Description: EmpName})

    if(checkLevel4item.length > 0){
        EmpID = checkLevel4item[0].lvl4Code
    }else{
        checkLevel3_4('SHORT TERM LIABILITY', 'EMPLOYEES', EmpName.toUpperCase(), Level3, Level4)
    }

    const hashedPassword = userStatus === true ? bcrypt.hashSync(password, 10) : ''
    const user = await Employee.create({
        EntDate, EmpID, EmpName:EmpName.toUpperCase(), EmpDepartment:toProperCase(EmpDepartment), 
        EmpDesignation:toProperCase(EmpDesignation), EmpSalary, EmpCNIC, EmpContact, EmpNOK,
        EmpNOKContact, userimage, Arrival, CheckOut, EmpStatus, YearlySalary, TaxAmount, TaxPer, Extra,
        YearlyTax, userStatus, 
        user: { 
            userID: userStatus === true ? userID : '', 
            branch: userStatus === true ? branch : '', 
            role: userStatus === true ? role : '', 
            password: hashedPassword }
    })

    if(userStatus === true){
        const menus = await Menus.find().sort('menuID')
        for(let i = 0; i < menus.length; i++){
            await userRights.create({userID, menuID:menus[i].menuID, menuName:menus[i].menuName})
        }
    }
    res.status(200).json(user)
})

const loginUser = asyncHandler(async (req, res) => {

    const { userID, Password } = req.body
        const user = await Employee.findOne({ 'user.userID': userID })
    
        if (!user) {
            throw new Error('User Not Found')
        }
        if (user && bcrypt.compareSync(Password, user.user.password)) {
            res.status(200).json(user)
        } else {
            throw new Error('User Not Found')
        }    
})

const updateUser = asyncHandler(async (req, res) => {

    const user = await Users.findById(req.params.id)

    if (!user) {
        throw new Error('User Not Found')
    }

    const updateduser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updateduser)
})

const deleteUser = asyncHandler(async (req, res) => {

    const user = await Users.findById(req.params.id)

    if (!user) {
        throw new Error('Ads Not Found')
    }

    res.status(200).json({ message: `User Deleted with Name : ${user.name}` })

    await Users.deleteOne({ _id: req.params.id })

})

const profileUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = { viewUsers, addUser, loginUser, getEmployeeCount, updateUser, deleteUser, profileUser }
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const CompanyInformation = require('../../Models/AdminManagement/cmpInfModel')
const InitialPassword = require('../../Models/AdminManagement/initialPassword')

const addCompany = asyncHandler( async (req, res)=>{

    const companyData = await CompanyInformation.find().count()
    if(companyData === 0 ){
        const addedCompanyData = await CompanyInformation.create(req.body)
        res.status(200).json(addedCompanyData)
    }else{
        res.status(400).json({
            message:"Company data already added, If you want to change please contact software provider!..."
        })
    }
})
const addInitialPassword = asyncHandler( async(req, res)=>{

    const existInitialPassword = InitialPassword.find()

    if(existInitialPassword.length > 0){
        res.status(400).json({message:'Initial Credential ALready Exist'})
    }else{
        const { initialID, initialPassword } = req.body

        const hashedPassword = bcrypt.hashSync(initialPassword, 10)
    
        const initialCredential = await InitialPassword.create({initialID, initialPassword: hashedPassword})

        res.status(200).json(initialCredential)
    }
})

const checkInitialPassword = asyncHandler( async (req, res)=>{

    const { initialID, initialPassword } = req.body

    const initialCredential = await InitialPassword.find({initialID})
    if(!initialCredential.length > 0){
        throw new Error('Invailid UserID / Password')
    }

    if(initialCredential && bcrypt.compareSync(initialPassword, initialCredential[0].initialPassword)){
        res.status(200).json({authenticate:true})
    }else{
        res.status(200).json({message:'Invailid UserID / Password', authenticate:false})
    }

})

const getCompanyData = asyncHandler( async (req, res)=>{

    let companyData = await CompanyInformation.find().count()
    
    if( companyData > 0 ){
        companyData = await CompanyInformation.find()
        res.status(200).json(companyData)
    }else{
        res.status(200).json({message:'Company Data Not Found'})
    }
})

module.exports = { addCompany, checkInitialPassword, getCompanyData, addInitialPassword }
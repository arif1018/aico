const asyncHandler = require('express-async-handler')
const PartiesInformation = require('../../Models/GeenralManagement/PartiesInformationModel')
const PartyCategories = require('../../Models/AdminManagement/PartiesCategoryModel')
const Level3 = require('../../Models/GeenralManagement/Level3Model')
const Level4 = require('../../Models/GeenralManagement/Level4Model')
const { getNewID, checkJustLevel4, toProperCase, SavingGJ } = require('../../Middleware/allProcedures')

const ViewCategories = asyncHandler(async (req, res) => {

    const partyCategories = await PartyCategories.find()

    res.status(200).json(partyCategories)

})

const addPartyCategory = asyncHandler(async (req, res) => {

    let partyCateCode = await getNewID('lvl3Code', 4, Level3)

    const { headofAccount, partyCateDesc } = req.body

    const axistPartyCategories = await Level3.findOne({ lvl3Description: partyCateDesc })

    if (axistPartyCategories) {
        res.status(400)
        throw new Error('User already Registered')
    }

    const lvl3Code = await getNewID('lvl3Code', 4, Level3)

    const resultLevel3 = await Level3.find({ lvl3Description: partyCateDesc })
    if (resultLevel3.length === 0) {
        const dataAdded = await Level3.create({ lvl3Code, lvl2Description: headofAccount, lvl3Description: partyCateDesc, lvl3Status: true })
    }

    const partyCategory = await PartyCategories.create({ partyCateCode: partyCateCode, partyCateHOA: headofAccount, partyCateDesc, partyCateStatus: true })

    res.status(200).json(partyCategory)

})

const deletePartyCategory = asyncHandler(async (req, res) => {

    const { deleteID } = req.body

    const deletePC = await PartyCategories.deleteOne({ partyCateCode: deleteID })

    const deletelvl3 = await Level3.deleteOne({ lvl3Code: deleteID })

    res.status(200).json({
        pc: deletePC, lvl3: deletelvl3
    })
})

const ViewAllParties = asyncHandler(async (req, res) => {

    const parties = await PartiesInformation.find()

    res.status(200).json(parties)

})


const addNewParty = asyncHandler(async (req, res) => {

    let PartyCode = await getNewID('lvl4Code', 6, Level4)

    const { PartyCategory, PartyName, PartyUrduName, email, ContactNo, AltContactNo, PartyAddress,
        PartyUrduAddress, Debit, Credit, PartyStatus, OpenStatus, ContactPerson, NTN, GST } = req.body
    const checkuserID = await PartiesInformation.findOne({ PartyName: PartyName.toUpperCase() })
    if (checkuserID) {
        res.status(200).json({ message: 'Party Already Exist Please tyr another' })
    } else {
        const checkLevel4item = await Level4.find({ lvl4Description: PartyName })

        if (checkLevel4item.length > 0) {
            PartyCode = checkLevel4item[0].lvl4Code
        } else {
            checkJustLevel4(PartyCategory, PartyName.toUpperCase(), Level4)
        }
        if (OpenStatus) {
            SavingGJ(Date.now(), `Opening Balance - ${PartyCode}`, PartyName.toUpperCase(), Debit, Credit)
        }
        const party = await PartiesInformation.create({
            PartyCode, PartyCategory, PartyName: PartyName.toUpperCase(), PartyUrduName, email, ContactNo,
            AltContactNo, PartyAddress: toProperCase(PartyAddress), PartyUrduAddress,
            Debit: OpenStatus ? Debit : '0', Credit: OpenStatus ? Credit : '0', PartyStatus,
            ContactPerson, NTN, GST
        })
        res.status(200).json(party)
    }


})

module.exports = { ViewAllParties, addNewParty, ViewCategories, addPartyCategory, deletePartyCategory }
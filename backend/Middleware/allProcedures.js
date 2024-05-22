const asyncHandler = require('express-async-handler')
const GeneralJournal = require('../Models/AdminManagement/GeneralJournalModel')
const PartiesInformation = require('../Models/GeenralManagement/PartiesInformationModel')
const zeroPad = (num, places) => String(num).padStart(places, '0')


const checkComboBoxData = asyncHandler(async (req, res) => {

    const { fieldData } = req.body
    let ModelPath
    let FieldName

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            ModelPath = token.split('-')[0]
            FieldName = token.split('-')[1]
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!...')
        }

    }
    if (!token) {
        res.status(401)
        throw new Error('No Token, Not Authorized!...')
    }

    const TableName = require(`../Models/${ModelPath}`)

    const fieldForCombo = await TableName.find({ [FieldName]: fieldData })
    if (fieldForCombo.length > 0) {
        res.status(200).json(fieldForCombo)
    } else {
        res.status(200).json([{ message: 'Data Not Found' }])
    }

})

const dataForCombo = asyncHandler(async (req, res) => {

    let ModelPath

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            ModelPath = token
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized!...')
        }

    }
    if (!token) {
        res.status(401)
        throw new Error('No Token, Not Authorized!...')
    }

    const TableName = require(`../Models/${ModelPath}`)

    const fieldForCombo = await TableName.find()

    res.status(200).json(fieldForCombo)
})

const getNewIDwithUserID = asyncHandler(async (FeildName, zeroForAdd, TableName, userID) => {
    let newCode
    const tableData = await TableName.find({ UserID: userID }).sort(FeildName)
    if (tableData.length > 0) {
        newCode = tableData[tableData.length - 1][FeildName]
        newCode = zeroPad(+[newCode] + 1, zeroForAdd)
    } else {
        newCode = "1"
        newCode = zeroPad(newCode, zeroForAdd)
    }
    return newCode
})

const getNewID = asyncHandler(async (FeildName, zeroForAdd, TableName) => {
    let newCode
    const tableData = await TableName.find().sort(FeildName)
    if (tableData.length > 0) {
        newCode = tableData[tableData.length - 1][FeildName]
        newCode = zeroPad(+[newCode] + 1, zeroForAdd)
    } else {
        newCode = "1"
        newCode = zeroPad(newCode, zeroForAdd)
    }
    return newCode
})

const getNewRONO = asyncHandler(async (FindCondition, MasterFeild, subArray, zeroForAdd, TableName) => {
    let newCode
    const tableData = await TableName.find({ [MasterFeild]: FindCondition.split('-')[0], UserID: FindCondition.split('-')[1] }).sort(MasterFeild).sort(`${subArray}.RONO`)
    if (tableData.length > 0) {
        const DetailData = tableData[0][subArray]
        if (DetailData.length > 0) {
            newCode = DetailData[DetailData.length - 1].RONO
            newCode = zeroPad(+[newCode] + 1, zeroForAdd)
        } else {
            newCode = "1"
            newCode = zeroPad(newCode, zeroForAdd)
        }
    } else {
        newCode = "1"
        newCode = zeroPad(newCode, zeroForAdd)
    }
    return newCode
})

const checkLevel3_4 = asyncHandler(async (lvl2desc, lvl3desc, lvl4desc, tbLVL3, tbLVL4) => {
    // Adding Level4 Data
    const lvl4Code = await getNewID('lvl4Code', 6, tbLVL4)
    const resultLevel4 = await tbLVL4.find({ lvl4Description: lvl4desc })
    if (resultLevel4.length === 0) {
        const dataAdded = await tbLVL4.create({ lvl4Code, lvl3Description: lvl3desc, lvl4Description: lvl4desc, lvl4Status: true })
    }
    // Adding Level3 Data
    const lvl3Code = await getNewID('lvl3Code', 4, tbLVL3)
    const resultLevel3 = await tbLVL3.find({ lvl3Description: lvl3desc })
    if (resultLevel3.length === 0) {
        const dataAdded = await tbLVL3.create({ lvl3Code, lvl2Description: lvl2desc, lvl3Description: lvl3desc, lvl3Status: true })
    }
})

const checkJustLevel4 = asyncHandler(async (lvl3desc, lvl4desc, tbLVL4) => {
    // Adding Level4 Data
    const lvl4Code = await getNewID('lvl4Code', 6, tbLVL4)
    const resultLevel4 = await tbLVL4.find({ lvl4Description: lvl4desc })
    if (resultLevel4.length === 0) {
        const dataAdded = await tbLVL4.create({ lvl4Code, lvl3Description: lvl3desc, lvl4Description: lvl4desc, lvl4Status: true })
    }
})

const SavingGJ = asyncHandler(async (EntDate, RefNo, Remarks, Dr, Cr) => {
    const alreadyExist = await GeneralJournal.find({ RefNo: RefNo, Remarks: Remarks })

    if (alreadyExist.length > 0) {
        const deletedRecord = await GeneralJournal.deleteOne({ RefNo: RefNo, Remarks: Remarks })

        const addedRecord = await GeneralJournal.create({
            EntDate: EntDate, Currency: 'PKR', RefNo: RefNo, Remarks: Remarks, Dr: Dr, Cr: Cr
        })
    } else {
        const addedRecord = await GeneralJournal.create({
            EntDate: EntDate, Currency: 'PKR', RefNo: RefNo, Remarks: Remarks, Dr: Dr, Cr: Cr
        })
    }
})

const SavingGJOPening = asyncHandler(async (EntDate, RefNo, Remarks, Dr, Cr) => {
    const alreadyExist = await GeneralJournal.find({ RefNo: RefNo, Remarks: Remarks })

    if (alreadyExist.length > 0) {

        let oldDr = alreadyExist[0].Dr

        let oldCr = alreadyExist[0].Cr

        const deletedRecord = await GeneralJournal.deleteOne({ RefNo: RefNo, Remarks: Remarks })

        const addedRecord = await GeneralJournal.create({
            EntDate: EntDate, Currency: 'PKR', RefNo: RefNo, Remarks: Remarks,
            Dr: parseInt(Dr) + parseInt(oldDr), Cr: parseInt(Cr) + parseInt(oldCr)
        })
    } else {
        const addedRecord = await GeneralJournal.create({
            EntDate: EntDate, Currency: 'PKR', RefNo: RefNo, Remarks: Remarks, Dr: Dr, Cr: Cr
        })
    }
})

const toProperCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const getAllParties = asyncHandler(async (req, res) => {

    const { partyCategory } = req.body

    const parties = await PartiesInformation.find()

    res.status(200).json(parties)
})

const getLastBalance = asyncHandler(async (req, res) => {

    const { controlAccount } = req.body

    const caBalance = await GeneralJournal.aggregate([
        {
            $match: {
                Remarks: controlAccount
            }
        },
        {
            $group: {
                _id: null,
                balance: { $sum: { $subtract: ['$Dr', '$Cr'] } }
            }
        }
    ])
    res.status(200).json(caBalance)
})

module.exports = {
    getNewID, checkLevel3_4, getNewRONO, dataForCombo, checkComboBoxData, checkJustLevel4, toProperCase,
    SavingGJ, SavingGJOPening, getNewIDwithUserID, getAllParties, getLastBalance
}
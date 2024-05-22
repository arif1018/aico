const asyncHandler = require('express-async-handler')
const Level1 = require('../../Models/GeenralManagement/Level1Model')
const { getNewID } = require('../../Middleware/allProcedures')

const addCOA = asyncHandler( async (req, res)=>{

    const lvl1Code = await getNewID('lvl1Code', 1, Level1)

    const { lvl1Description , lvl1Status } = req.body

    const level1 = await Level1.create({ lvl1Code, lvl1Description:lvl1Description.toUpperCase() , lvl1Status })

    res.status(200).json(level1)
})

module.exports = { addCOA }
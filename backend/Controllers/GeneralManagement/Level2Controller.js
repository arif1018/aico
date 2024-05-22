const asyncHandler = require('express-async-handler')
const Level2 = require('../../Models/GeenralManagement/Level2Model')
const { getNewID } = require('../../Middleware/allProcedures')

const addSCOA = asyncHandler( async (req, res)=>{


    const lvl2Code = await getNewID('lvl2Code', 2, Level2)

    const { lvl1Description , lvl2Description, lvl2Status } = req.body
    
    const level2 = await Level2.create({ lvl2Code, lvl1Description , 
                    lvl2Description:lvl2Description.toUpperCase(), lvl2Status })

    res.status(200).json(level2)
})

module.exports = { addSCOA }
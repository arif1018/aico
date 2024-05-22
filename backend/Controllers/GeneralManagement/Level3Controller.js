const asyncHandler = require('express-async-handler')
const Level3 = require('../../Models/GeenralManagement/Level3Model')
const { getNewID } = require('../../Middleware/allProcedures')

const addHOA = asyncHandler( async (req, res)=>{


    const lvl3Code = await getNewID('lvl3Code', 4, Level3)

    const { lvl2Description , lvl3Description, lvl3Status } = req.body
    
    const level2 = await Level3.create({ lvl3Code, lvl2Description , 
                        lvl3Description:lvl3Description.toUpperCase(), lvl3Status })

    res.status(200).json(level2)
})

module.exports = { addHOA }
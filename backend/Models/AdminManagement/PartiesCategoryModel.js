const mongoose = require('mongoose')

const partyCategorySchema = mongoose.Schema({

    partyCateCode:{type:String, required:true},
    partyCateHOA:{type:String, required:true},
    partyCateDesc:{type:String, required:true},
    partyCateStatus:{type:Boolean, required:true},

})

module.exports = mongoose.model('PartyCategories', partyCategorySchema)
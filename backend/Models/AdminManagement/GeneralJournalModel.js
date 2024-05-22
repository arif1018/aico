const mongoose = require('mongoose')
mongoose.pluralize(null)
const generalJournalSchema = mongoose.Schema({
    EntDate:{type:Date, Required:true},
    Currency:{type:String, Required:true},
    RefNo:{type:String, Required:true},
    Remarks:{type:String, Required:true},
    Dr:{type:Number, Required:true},
    Cr:{type:Number, Required:true},

})

module.exports = mongoose.model('GeneralJournal', generalJournalSchema)
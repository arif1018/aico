const mongoose = require('mongoose')

const PartiesSchema = mongoose.Schema({
    PartyCode:{type:String, Required:true},
    PartyCategory:{type:String, Required:true},
    PartyName:{type:String, Required:true},
    PartyUrduName:{type:String, Required:true},
    email:{type:String, Required:true},
    ContactNo:{type:String, Required:true},
    AltContactNo:{type:String, Required:true},
    PartyAddress:{type:String, Required:true},
    PartyUrduAddress:{type:String, Required:true},
    Debit:{type:String, Required:true},
    Credit:{type:String, Required:true},
    PartyStatus:{type:Boolean, Required:true},
    ContactPerson:{type:String, Required:true},
    NTN:{type:String, Required:true},
    GST:{type:String, Required:true}
})

module.exports = mongoose.model('PartiesInformation', PartiesSchema)
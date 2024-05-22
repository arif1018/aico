const mongoose = require('mongoose')

const providerSchema = mongoose.Schema({

    companyName:{type:String, required:true},
	companyAddress:{type:String, required:true},
	companyPhone:{type:String, required:true},
	companyLogo:{type:String, required:true}
},
{
    timestamps: true,
})

module.exports = mongoose.model('Provider',providerSchema)
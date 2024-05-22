const mongoose = require('mongoose')
mongoose.pluralize(null)
const companySchema = mongoose.Schema({

    companyName:{type:String, required:true},
	companyAddress:{type:String, required:true},
	companyPhone:{type:String, required:true},
	companyLogo:{type:String, required:true}
},
{
    timestamps: true,
})

module.exports = mongoose.model('CompanyInformation',companySchema)
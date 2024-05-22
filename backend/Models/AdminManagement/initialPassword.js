const mongoose = require('mongoose')

const initialCredentialSchema = mongoose.Schema({

    initialID:{type:String, required:true},
	initialPassword:{type:String, required:true}
},
{
    timestamps: true,
})

module.exports = mongoose.model('InitialCredential', initialCredentialSchema)
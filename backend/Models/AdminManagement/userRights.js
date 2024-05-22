const mongoose = require('mongoose')

const userRightsSchema = mongoose.Schema({
    userID:{type:String, required:true},
    menuID:{type:String, required:true},
    menuName:{type:String, required:true},
    subMenus:[
        {
            menuName:{type:String},
            menuURL:{type:String},
        }
    ]
},
{
    timestamps: true,
})

module.exports = mongoose.model('userRights',userRightsSchema)
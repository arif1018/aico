const mongoose = require('mongoose')

const menuSchema = mongoose.Schema({

    menuID:{type:String, required:true},
    menuName:{type:String, required:true},
    subMenus:[
        {
            menuName:{type:String, required:true},
            menuURL:{type:String, required:true},
        }
    ]
},
{
    timestamps: true,
})

module.exports = mongoose.model('Menus',menuSchema)
const mongoose = require('mongoose')

const Level3Schema = mongoose.Schema({

    lvl3Code:{type:String, required:true},
	lvl2Description:{type:String, required:true},
	lvl3Description:{type:String, required:true},
	lvl3Status:{type:Boolean, required:true},
},
)

module.exports = mongoose.model('Level3',Level3Schema)
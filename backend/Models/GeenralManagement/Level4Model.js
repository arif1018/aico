const mongoose = require('mongoose')

const Level4Schema = mongoose.Schema({

    lvl4Code:{type:String, required:true},
	lvl3Description:{type:String, required:true},
	lvl4Description:{type:String, required:true},
	lvl4Status:{type:Boolean, required:true},
},
)

module.exports = mongoose.model('Level4',Level4Schema)
const mongoose = require('mongoose')

const Level2Schema = mongoose.Schema({

    lvl2Code:{type:String, required:true},
	lvl1Description:{type:String, required:true},
	lvl2Description:{type:String, required:true},
	lvl2Status:{type:Boolean, required:true},
},
)

module.exports = mongoose.model('Level2',Level2Schema)
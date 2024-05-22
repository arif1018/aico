const mongoose = require('mongoose')

const Level1Schema = mongoose.Schema({

    lvl1Code:{type:String, required:true},
	lvl1Description:{type:String, required:true},
	lvl1Status:{type:Boolean, required:true},
},
)

module.exports = mongoose.model('Level1',Level1Schema)
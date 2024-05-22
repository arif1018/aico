const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    EntDate:{type:Date, required:true},
	EmpID:{type:String, required:true},
	EmpName:{type:String, required:true},
	EmpDepartment:{type:String, required:true},
	EmpDesignation:{type:String, required:true},
	EmpSalary:{type:Number, required:true},
	EmpCNIC:{type:String, required:true},
	EmpContact:{type:String, required:true},
	EmpNOK:{type:String, required:true},
	EmpNOKContact:{type:String, required:true},
    userimage:{type:String, required:true},
	Arrival:{type:Date, required:true},
	CheckOut:{type:Date, required:true},
	EmpStatus:{type:Boolean, required:true},
    userStatus:{type:Boolean, required:true},
    user:{
        userID:{type:String},
        branch:{type:String},
        role:{type:String},
        password:{type:String},
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Employees',userSchema)
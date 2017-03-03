var mongoose = require('mongoose');
var student = require('../models/student');
// var student = mongoose.model('student');
// var student = require('student');

var projectSchema = mongoose.Schema({
	student:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'student'
	},
	// student:student.schema,
	title:{
		type:String,
		required:true
	},
    URL:{
			type:String
		},
    img:String
});

var project = mongoose.model("project", projectSchema);

module.exports = project;




























//

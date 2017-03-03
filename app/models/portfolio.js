var mongoose = require('mongoose');
// var student = mongoose.model('student'),
		// project = mongoose.model('project');

var student = require('../models/student');
var project = require('../models/project');

var portfolioSchema = mongoose.Schema({
	name:String, //student name
	student:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'student'
	},
	description:String,
	//profile pic
	// profilePic: {data: Buffer, contentType: String},
	profilePic:{
		type:String,
		default:"default"
	},
	works : [{type: mongoose.Schema.Types.ObjectId, ref: 'project'}]
	// titles : [{type: mongoose.Schema.Types.String, ref: 'project'}]
})

var portfolio = mongoose.model("portfolio", portfolioSchema);

module.exports = portfolio;

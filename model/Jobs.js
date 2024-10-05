var mongoose = require('mongoose')
//schema creation
var schema = mongoose.Schema({
    JobTitle: String,
    CompanyName: String,
    Location: String,
    Sal:Number,
    Skills:String,
    Description:String
})
//model creation

var JobsModel = mongoose.model('Jobs', schema)
module.exports = JobsModel;





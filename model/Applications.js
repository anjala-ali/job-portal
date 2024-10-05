var mongoose = require('mongoose')

var applicationSchema = mongoose.Schema({
        Name : String,
        email : String,
        contact : Number,
        Cv : String,
        Jobtitle : String,
        Companyname: String,
        location: String,
        Date : Date,
    })
    var ApplicationModel = mongoose.model('Applications',applicationSchema)
    module.exports = ApplicationModel
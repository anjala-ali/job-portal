var mongoose = require('mongoose')
mongoose.connect("mongodb+srv://adhilajamalajk:adhilamongo@cluster0.gd9ihr1.mongodb.net/JobElevate?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
    console.group('database connected')
    })
    .catch((err)=> {
    console.log(err)
})

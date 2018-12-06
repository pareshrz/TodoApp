const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let url = "mongodb+srv://Watson:KZsSECt4123@cluster0-d3zkk.mongodb.net/test?retryWrites=true";
mongoose.connect(url, {useNewUrlParser:true});


module.exports = {
    mongoose
};


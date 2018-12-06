const mongoose = require('mongoose');

const app = require('express')();

mongoose.Promise = global.Promise;

if(app.settings.env == 'development') {
    let url = "mongodb://localhost:27017/TodoApp";
} else {
    let url = "mongodb+srv://Watson:KZsSECt4123@cluster0-d3zkk.mongodb.net/test?retryWrites=true";
}


mongoose.connect(url, {useNewUrlParser:true}).then(()=>{

}, (e)=>{
    console.log(e);
});


module.exports = {
    mongoose
};


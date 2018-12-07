const mongoose = require('mongoose');

const app = require('express')();

mongoose.Promise = global.Promise;

let url = "mongodb+srv://Watson:KZsSECt4123@cluster0-d3zkk.mongodb.net/test?retryWrites=true";

if(app.settings.env == 'development') {
    url = "mongodb://localhost:27017/TodoApp";
} 

mongoose.connect(url, {useNewUrlParser:true}).then(()=>{

}, (e)=>{
    console.log(e);
});

mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};


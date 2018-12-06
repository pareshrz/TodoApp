const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let url = "mongodb://localhost:27017/TodoApp";

mongoose.connect(url, {useNewUrlParser:true}).then(()=>{

}, (e)=>{
    console.log(e);
});


module.exports = {
    mongoose
};


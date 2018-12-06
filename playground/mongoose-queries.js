const {mongoose} = require("../server/db/mongoose");
const {Todo} = require("../server/models/todo");
const ObjectID = require('mongodb').ObjectID;


let id = "5c0632e617562e2724dd1b87";

if(!ObjectID.isValid(id)) {
    console.log("Id not valid");
}


// Todo.find({
//     _id : id
// }).then((doc)=>{
//   console.log(doc);  
// }, (e)=>{
//     console.log(e);
// });


// Todo.findOne({
//     completed : false
// }).then((todo)=>{
//     console.log(todo);
// });


Todo.deleteOne({_id : id})

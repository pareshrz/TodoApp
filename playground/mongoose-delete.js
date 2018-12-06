const {mongoose} = require("../server/db/mongoose");
const {Todo} = require("../server/models/todo");
const ObjectID = require('mongodb').ObjectID;


let id = "5c05f20d9ea2091f3c4da2b0";

if(!ObjectID.isValid(id)) {
    return console.log("Id not valid");
}

// Remove all documents or filter by query
// Return result of no. of docs removed
// Todo.remove({}).then((result)=>{
    //  console.log(result);
// })

// Todo.findOneAndRemove();

Todo.findByIdAndDelete(id).then((todo)=>{
    console.log("Deleted Todo:", todo.text);
}).catch((reason)=>{
    console.log("Hello This Reason:", reason);
});
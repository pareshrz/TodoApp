const {mongoose} = require("./db/mongoose");
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const express = require('express');

const app = express();






// let newTodo = new Todo({
//     text : "  Create youtube channel    "
// });

// newTodo.save().then((doc)=>{
//     console.log("Saved Todo:", doc);
// }, (e)=>{
//     console.log(JSON.stringify(e, undefined, 2));
// });

// Todo.find((e, res)=>{
//     if (e) {
//         return console.log(e);
//     }
//     console.log(JSON.stringify(res, undefined, 2));
// });



// let user = new User({
//     email : "   pareshb@live.in   "
// });

// user.save().then((user)=>{
//     console.log("Saved user: ", user);
// }, (e)=>{
//     console.log(e);
// })

User.find((e, res)=>{
    if (e) {
        return console.log(e);
    }
    console.log(res);
});
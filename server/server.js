const {mongoose} = require("./db/mongoose");
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get("/", (req, res)=> {
    res.send({greeting:"Hello World!"});
});



// Post
app.post("/todos", (req, res)=>{
    let todo = new Todo({
        text : req.body.text,
    });
    todo.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400);
       res.send(e);
    });
});

app.listen(port, ()=> {
    console.log("listening on port:", port);
});
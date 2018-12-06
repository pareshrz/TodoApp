const {mongoose} = require("./db/mongoose");
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get("/", (req, res)=> {
    res.send({greeting:"Hello World!"});
});


// POST /todos
app.post("/todos", (req, res)=>{
    let todo = new Todo({
        text : req.body.text,
    });
    todo.save().then((doc)=>{
        res.send(doc); 
    }, (e)=>{
        res.status(400).send(e);
    });
});


// GET /todos
app.get("/todos", (req, res) => {
    Todo.find().then((todos)=>{
        res.send({
            todos,
            code : "asdf"
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/1234
app.get("/todos/:id", (req, res) =>{
    let id = req.params.id;
    if (ObjectID.isValid(id)) {
        Todo.findById(id).then((doc)=>{
            if (doc) {
                res.send(doc);                
            } else {
                res.status(404).send("Error 404");
            }
        }, (e)=> {
            console.log(e);
        });
    } else {
        res.status(404).send("Error 404");
    }
});

// DELETE /todos/123
app.delete("/todos/:id", (req, res)=>{
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }
    Todo.findByIdAndDelete(id).then((todo)=>{
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e)=>{
        res.status(400).send();
    });
});

// GET /users

app.get("/users", (req, res) => {
    User.find().then((users)=>{
        res.send({
            users
        });
    }, (e) =>{
        console.log(e);
    });
});

// GET /users/123
app.get('/users/:id', (req, res)=>{
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send("404 Not found");
    }
    User.findById(id).then((user)=>{
        if (user) {
            res.send({user});
        } else {
            res.send(404).send();
        }
    }, (e)=>{
        res.status(404).send();
    });
});

// POST /users

app.post("/users", (req, res)=>{
    let user = new User({
        email : req.body.email
    });
    user.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    });
});


app.listen(port, ()=> {
    console.log("listening on port:", port);
});

module.exports = {app}
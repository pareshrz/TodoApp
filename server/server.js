const express = require('express');
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');


// Load database connections
const {mongoose} = require('./db/mongoose');


// Load models
const Todo = require('./models/todo');
const User = require('./models/user');

// Setup middlewares
app.use(bodyParser.json());

// Todos route
// GET /todos
app.get("/todos", (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e);
    })
});

// POST /todos
app.post("/todos", (req, res)=>{
    var body = _.pick(req.body, ['text']);
    Todo.create({
        text : body.text
    }).then((todo)=>{
        res.send(todo);
    }, (e)=>{
        res.status(400).send(e);
    });
});

// GET /todos/:id
app.get("/todos/:id", (req, res)=>{
    var id = req.params.id;
   
    Todo.findById(id).then((todo)=>{
        if(!todo) {
            return res.sendStatus(404);
        }
        res.send(todo);
    }, (e)=>{
        res.sendStatus(401);
    })
});

// DELETE todos/:id
app.delete("/todos/:id", (req, res)=>{
    var id = req.params.id;
    Todo.findByIdAndDelete(id).then((todo)=>{
        if (!todo) {
            return res.sendStatus(404);
        }
        res.send(todo);
    }, (e)=>{
        res.sendStatus(401);
    });
});

// PATCH /todos/:id
app.patch("/todos/:id", (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(typeof body.completed === 'boolean' && body.completed) {
        body.completedAt = new Date().getTime();
    }
    Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo)=>{
        if(!todo) return res.sendStatus(404);
        res.send(todo);
    }).catch((e)=>res.sendStatus(401));
});


// User routes
// GET /users
app.get("/users", (req, res)=>{
    User.find().then((users)=>{
        res.send(users);
    }).catch((e)=>res.sendStatus(401));
});



app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});

module.exports = {app};
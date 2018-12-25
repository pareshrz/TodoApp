require('./config/config.js');

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

// Setup port for heroku
const port = process.env.PORT || 3000;

// Setup middlewares
app.use(bodyParser.json());

// Load middlewares
const {authenticate} = require('./middleware/authenticate');

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
    if (!ObjectID.isValid(id)) {
        return res.status(400).send("Invalid id provided");
    }
    Todo.findById(id).then((todo)=>{
        if(!todo) {
            return res.status(404).send("Todo do not exists");
        }
        res.send(todo);
    }, (e)=>{
        res.status(400).send("Invalid request");
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
        res.sendStatus(400);
    });
});

// PATCH /todos/:id
app.patch("/todos/:id", (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
   
    if(_.isBoolean(body.completed)) {
        if(body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completedAt = null;
        }
    }
    Todo.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo)=>{
        if(!todo) return res.sendStatus(404);
        res.send(todo);
    }).catch((e)=>res.sendStatus(401));
});


// User routes


app.get('/users/me', authenticate, (req, res)=>{
    res.send(req.user);
});
// GET /users
app.get("/users", (req, res)=>{
    User.find().then((users)=>{
        res.send(users);
    }).catch((e)=>res.sendStatus(401));
});

// GET /users/:id

app.get('/users/:id', (req, res)=>{
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.sendStatus(400);
    }
    User.findById(id).then((user)=>{
        if(!user) return res.sendStatus(404);
        res.send(user);
    }, (e)=>{
        res.sendStatus(400);
    });
});

// POST /users
app.post("/users", (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    User.create(body).then((user)=>{
        let token_array = user.tokens.filter(token=>token.access == 'auth');
        res.header('x-auth', token_array[0].token).send(user);
    }, (e)=>{
        res.status(400).send(e);
    });
}); 

// DELETE /users/:id
app.delete("/users/:id", (req, res)=>{
    var id = req.params.id;
    User.findByIdAndDelete(id).then((user)=>{
        if(!user) {
            res.sendStatus(404);
        }
        res.send(user);
    }, (e)=>{
        res.sendStatus(400);
    }) 
});



app.listen(port, ()=>{
    console.log("Server running on port", port);
});

module.exports = {app};
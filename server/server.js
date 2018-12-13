const {mongoose} = require("./db/mongoose");
const {Todo} = require('./models/todo');
const User = require('./models/user');
const {authenticate} = require('./middleware/authenticate'); 

const bcrypt = require('bcrypt');

const {ObjectID} = require('mongodb');
const _ = require("lodash");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get("/", (req, res)=> {
    res.send({greeting:"Hello World!"});
});



app.get("/users/me", authenticate, (req ,res)=>{
    res.send(req.user);
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



// UPDATE /todos/123
app.patch("/todos/:id", (req, res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo)=>{
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

// DELETE /users:id

app.delete("/users/:id", (req, res)=>{
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    User.findByIdAndDelete(id).then((user)=>{
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch(()=>{
        res.status(400).send();
    });

});


// POST /users

app.post('/users', (req, res)=>{
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    user.save()
    .then((user)=>{
        let token_array = user.tokens.filter(token=>token.access == 'auth');
        res.header('x-auth', token_array[0].token).send(user);
    })
    .catch((e)=>{
        res.send(e);
    });
});

// UPDATE /user:id
app.patch("/users:id", (req, res)=>{
    let id = req.params.id;
    if (!OBjectID.isValid(id)) {
        return res.status(400).send();
    }
    let body = _.pick(req.body, ['email', 'password']);
    User.findByIdAndUpdate(id, {$set:body}, {new:true}).then((user)=>{
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch(()=>{
        res.sendStatus(400).send();
    });
});

// GET /users/verify:id


app.listen(port, ()=> {
    console.log("listening on port:", port);
});

module.exports = {app}
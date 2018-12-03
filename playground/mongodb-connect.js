// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Connection url
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("Unable to connect mongodb server");
    }
    console.log("Connected to mongodb server");
    const db = client.db('TodoApp');
    const collection = db.collection("Users");

    let users = collection.find({});

    users.forEach((user)=>{
        console.log(user.name);
        console.log(user._id);
    });


    // db.collection('Todos').insertOne({
    //     text : "Something to do",
    //     completed : false
    // }, (err, res) => {
    //     if (err) {
    //         return console.log("Unable to insert todo", err);
    //     }
    //     console.log(JSON.stringify(res.ops,  undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name : "Paresh Bharambe",
    //     age : 30,
    //     location : "Jalgaon"
    // }, (err, res) => {
    //     if (err) {
    //         return console.log("Unable to insert user: ", err);
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    // });

    

    client.close();
});
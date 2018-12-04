const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

MongoClient.connect(url, {useNewUrlParser:true}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    console.log("Connected to mongodb");

    const db = client.db('TodoApp');

    const collection = db.collection("Todos");

    collection.findOneAndUpdate({
        completed : true
    }, {$set: {
        completed : false
    }}, {returnOriginal : false}).then((result)=>{
        console.log(result); 
    });


});
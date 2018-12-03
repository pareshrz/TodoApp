const {MongoClient, ObjectID} = require('mongodb');

// Connection url
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client)=>{
    if (err) {
        return console.log("Error connecting to database");
    }
    let db = client.db('TodoApp');
    
    let collection = db.collection("Users");

   
}); 
   
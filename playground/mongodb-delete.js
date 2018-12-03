const {MongoClient, ObjectID} = require('mongodb');

// Connection url
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useNewUrlParser:true}, (err, client)=>{
    if (err) {
        return console.log("Error connection database", err);
    }
    let db = client.db('TodoApp');

    let collection = db.collection('Todos');

    // collection.deleteOne({name: "Delete me"}).then((result)=>{
    //     console.log(result.deletedCount);
    // });

    collection.findOneAndDelete({completed:false}).then((result)=>{
        console.log(result.value);
    });
    
});
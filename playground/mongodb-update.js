//const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5cd2d8e4aef6232860f02747")
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result)
    // });

    db.collection('Users').findOneAndUpdate({
            _id: new ObjectID("5cd2da164930f1567c3aabcb")
        }, {
            $set: {
                name: 'Sanpreet Matharu'
            },
            $inc:{
                age:3
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result)
        });

    //client.close();
});
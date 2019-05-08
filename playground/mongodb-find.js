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

    // db.collection('Todos').find({_id:new ObjectID('5cd2de6e255fc240d01c8f20')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err)=>{
    //     console.log('unable to fetch ', err);
    // });

    
    // db.collection('Todos').find().count().then((count)=>{
    //     console.log('Todos : ', count);
         
    // }, (err)=>{
    //     console.log('unable to fetch ', err);
    // });

    
    db.collection('Users').find({name:'Abhishek'}).toArray().then((docs)=>{
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=>{
        console.log('unable to fetch ', err);
    });

    //client.close();
});
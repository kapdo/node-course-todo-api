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

    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log('unable to delete ', err);
    // });

    // db.collection('Todos').deleteOne({
    //     text: 'Eat Lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log('unable to delete ', err);
    // })

    db.collection('Todos').findOneAndDelete({
        completed: true
    }).then((result) => {
        console.log(result);
    });

    //client.close();
});
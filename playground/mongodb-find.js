// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

// //toArray() returns a promise so can use .then
//   db.collection('Todos').find({
//     _id: new ObjectID('5b59b13518c4b9a4b37c208e')
//   }).toArray().then((docs) => {
//     console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
//   }, (err) => {
//     console.log('unable to find todos', err);
//   })

  //toArray() returns a promise so can use .then
    // db.collection('Todos').find().count().then((count) => {
    //   console.log(`Todos count ${count}`);
    //
    // }, (err) => {
    //   console.log('unable to find todos', err);
    // })

    db.collection('Users').find({name: 'Penny'}).toArray().then((docs) => {
      console.log(`Users called Penny`);
      console.log(JSON.stringify(docs, undefined, 2));

    }, (err) => {
      console.log('no users found', err);
    });



  // db.close();
});

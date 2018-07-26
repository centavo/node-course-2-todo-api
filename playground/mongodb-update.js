const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };
  console.log('Connected to MongoDB server');

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('5b59dc3118c4b9a4b37c2854')
// },{
//     $set: {
//       completed: true
//     }
// }, {
//   returnOriginal: false
// }).then((result) =>{
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({
  name: 'Ben'
},{
    $inc: {age: 1},
    $set: {name: 'Penny'}
}, {
  returnOriginal: false
}).then((result) =>{
  console.log(result);
});

  // db.close();
});

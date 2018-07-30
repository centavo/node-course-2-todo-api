const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//
// Todo.findByIdAndRemove('5b5ec60c233d965c260ce1a0').then((todo) => {
//   console.log(todo);
// });

Todo.findOneAndRemove({
  text: 'Something todo from postman2'
}).then((todo) => {
  console.log(todo);
});


// var id = '5b59f1b86c0e974c38a4778b';

// if(!ObjectID.isValid(id)) {
//   console.log('Invalid Id', id);
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));
//
// User.findById('5b59f1b86c0e974c38a4778b').then((user) => {
//   if(!user) {
//     return console.log('User not found');
//   }
//   console.log('User by id', user);
// }).catch((e) => console.log(e));

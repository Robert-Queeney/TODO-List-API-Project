// this is the mongoose connection file
var mongoose = require('mongoose');
// setting debug to true allows us to see whats happenign at any point when they fail
mongoose.set('debug', true)
// connects to mongo and the specific database we'll be using (todo-api - not created yet)
mongoose.connect("mongodb://localhost:27017/todo-api", { useNewUrlParser: true });
// this allows us to use the promise syntax
mongoose.Promise = Promise;

// When someone required the models folder it will default to this index.js file -> so we require the todo.js file as well by the syntax below
module.exports.Todo = require('./todo');
// This is the Todo schema
var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank'
    },
    completed: {
        type: Boolean, 
        default: false
    },
    created_date: {
        type: Date, 
        default: Date.now
    },
});

var Todo = mongoose.model('Todo', todoSchema);

// When people require this file, they are actually just getting the Todo variable because of how we export it below
module.exports = Todo; 
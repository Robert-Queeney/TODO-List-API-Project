//This will help clean up all the code on the main file
const db = require('../models'); //so we can access the 'db' below

exports.getTodos = function(req, res){
    // below will find all of the todo items
    db.Todo.find()
    // using a promise to send the todos information in a res.send
    .then(function(todos){
        res.json(todos)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.createTodo = function(req, res){
    // this creates the new data in the db and does a callback function with variable newTodo(just made that up)
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.getTodo = function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.updateTodo = function(req, res){
    // findoneandupdate is a mongo method that does both 
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo)
    })
    .catch(function(err){
        res.send(err)
    })
}

exports.deleteTodo = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'We deleted it!'})
    })
    .catch(function(err){
        res.send(err)
    })
}

module.exports = exports;
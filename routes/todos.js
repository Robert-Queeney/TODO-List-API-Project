var express = require('express');
var router = express.Router();
const db = require('../models') //this allows us to access the database info (eventually)

router.get('/', function(req, res){
    // below will find all of the todo items
    db.Todo.find()
    // using a promise to send the todos information in a res.send
    .then(function(todos){
        res.json(todos)
    })
    .catch(function(err){
        res.send(err)
    })
});

router.post('/', function(req, res){
    // this creates the new data in the db and does a callback function with variable newTodo(just made that up)
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.get('/:todoId', function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo)
    })
    .catch(function(err){
        res.send(err)
    })
})

router.put('/:todoId', function(req, res){
    // findoneandupdate is a mongo method that does both 
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo)
    })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = router; 
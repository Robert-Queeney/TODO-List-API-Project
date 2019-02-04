// import { updateTodo } from "../helpers/todos";

// import { createTodo } from "../helpers/todos";

$(document).ready(() => {
    // this will get al of the existing tasks we have
    $.getJSON("api/todos")
    .then(addTodos)
    .catch((err) => {
        console.log(err)
    });

    $('#todoInput').keypress((event) => {
        // this listens for keypress '13' which is 'enter'
        event.which === 13 ? createTodo() : ''; 
    });

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    })

    // we are making this listener on the UL 'list' becasue the span itself isnt loaded when the page loads, but the UL is.  this is b/c the span is added dynamically and the UL is hard coded in
    $('.list').on('click', 'span', function(e) { 
        // need to use this code to get it to stop bubbling up - there is another click on the li that needs to happen independently from this one
        e.stopPropagation();
        removeTodo($(this).parent())
    })
})

addTodos = (todos) => {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

// this is what makes the list
addTodo = (todo) => {
    const newTodo = $('<li class="task">' + todo.name + '<span>x</span></li>')
    // this gives all created li's a data id of todo._id (dynamically creayed when we create new li's), which will allow us to delete them later
    newTodo.data('id', todo._id)
    // this is so we can reference the 'completed' data in order to make the list item appear done
    newTodo.data('completed', todo.completed)
    // this adds the class 'done' to the <li> and gives it the strikethrough effect
    todo.completed == true ? newTodo.addClass('done') : '';
    $('.list').append(newTodo)
}

createTodo = () =>{
    // send req to create new todo
    // below gets the value from the input
    const userInput = $('#todoInput').val();
    // console.log(userInput);
    $.post('/api/todos', {name: userInput})
    .then((newTodo) => {
        // directly below clears form
        $('#todoInput').val('');
        // this calls 'addTodo' and adds the newToto (user input)
        addTodo(newTodo);
    })
    .catch((err) => {
        console.log(err)
    })
}

removeTodo = (todo) => {
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId; 
    $.ajax({
        method: 'DELETE', 
        url: deleteUrl,
    })
    .then((data) => {
        todo.remove();
    })
}

function updateTodo(todo){
    let updateUrl = '/api/todos/' + todo.data('id'); 
    // need to get the true/false data ('isDone') then use that in updateData to change the data
    let isDone = !todo.data('completed');
    let updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then((updatedTodo) => {
        // this will change completed from true to false in the view
        todo.toggleClass('done');
        // this allows for it to change the data
        todo.data('completed', isDone)
    })
}
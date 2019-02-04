var express = require('express'),
// below makes the app variable equal to the express route
    app = express();
    port = process.env.PORT || 3000
    bodyParser = require('body-parser');

//These are for our routes in /routes/todos
const todoRoutes = require('./routes/todos')

// these allow us to access the bod that comes in a PUT or POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// this is how you get express to serve a static HTML page '__dirname" allows a  to find this from anywhere 
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'));

// ROUTES
// when someone makes a call to '/' (nothing), there is a callback function - res(ponse) will be what happens
app.get('/', function(req, res){
    // this is where we get the server to render an HTML page
    res.sendFile('index.html');
})

// Below is HOW WE USE THE ROUTES in routes/todos -> '/api/todos' is a prefix since all routes start with that
app.use('/api/todos', todoRoutes)

app.listen(port, function(){
    console.log('APP is RUNNING ON PORT 3000')
})
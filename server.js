var express = require('express')
var todo = require('./todo.js')

var app = express()
var port = process.env.PORT || 8080

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/todo', function (request, response) {
  response.json(todo)
})

app.get('/todo/:id', function (request, response) {
  if (!todo[request.params.id]){
    response.status(404).end('sorry, could not find the todo ' + request.params.id)
    return
  } 
  response.json(todo[request.params.id])
})

app.post('/todo', function(request, response) {
  var input = request.body
  var slug = request.body.text.trim().toLowerCase().split(' ').join('-')
  todo[slug] = request.body
  response.redirect("/todo");
})

app.put('/todo/:id', function (request, response) {
  var selectedTodo = products[request.params.slug] || {}
  if (request.body.text !== undefined) {
     selectedTodo.text = request.body.text.trim()
  }
  if (request.body.completed !== undefined) {
    selectedTodo.completed = request.body.completed ? true : false
  }
  response.redirect('/todo')
})

app.delete('/todo/:id', function (request, response) {
  delete todo[request.params.id]
  response.redirect('/todo')
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)

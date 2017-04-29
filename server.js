var express = require('express')
var todo = require('./todo.js')

var app = express()
var port = process.env.PORT || 8080

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/todos', function (request, response) {
  response.json(todo)
})

app.get('/todos/:id', function (request, response) {
  if (!todo[request.params.id]) {
    response.status(404).end('sorry, could not find the todo ' + request.params.id)
    return
  }
  response.json(todo[request.params.id])
})

app.post('/todos', function (request, response) {
  var slug = request.body.text.trim().toLowerCase().split(' ').join('-')
  todo[slug] = request.body
  response.redirect('/todos')
})

app.put('/todos/:id', function (request, response) {
  var selectedTodo = todo[request.params.id] || {}
  if (request.body.text !== undefined) {
    selectedTodo.text = request.body.text.trim()
  }
  if (request.body.completed !== undefined) {
    selectedTodo.completed = request.body.completed
  }
  response.redirect('/todos')
})

app.delete('/todos/:id', function (request, response) {
  delete todo[request.params.id]
  response.redirect('/todos')
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)

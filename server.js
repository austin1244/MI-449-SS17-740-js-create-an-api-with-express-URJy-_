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


app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)

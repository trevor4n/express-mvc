const express = require('express')
const router = express.Router()

const Todo = require('../models/todo-model')

router.get('/', (req, res) => {
    Todo.find({}) // Retrieves all todos in the database
       .then((todos) => { //all the Todos pulled from the database
           res.render('todos/index', {todos}) //rendering our index view and passing in our todos from the database
       }).catch(console.err)
})

router.get('/new', (req, res) => {
    res.render('todos/new')
})

router.post('/', (req, res) => {
    //console.log('here ' + req.body) //SOLVED - ValidatorError: Path `title` is required
    Todo.create(req.body)
        .then((todo) => {
            res.redirect('/todos')
        }).catch(console.error)
})

router.get('/:id', (req, res) => { //:id is a parameter
    Todo.findById(req.params.id) //.findById() method expects us to pass it an id as an argument instead of a query object
        .then((todo) => {
            res.render('todos/show', todo) //create at views/show.hbs
        }).catch(console.error)
 })

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Todo.findById(id)
        .then((todo) => {
            res.render('todos/edit', todo)
        }).catch(console.error)
})

router.put('/:id', (req, res) => {
const id = req.params.id
Todo.findOneAndUpdate(
    { _id: id }, {
        title: req.body.title,
        complete: req.body.complete === 'on',
    }, { new: true }
)
    .then((todo) => {
        res.render('todos/show', todo)
    }).catch(console.error)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Todo.findOneAndRemove({ _id: id })
        .then(() => {
            res.redirect('/todos')
        }).catch(console.error)
})
  
module.exports = router
const mongoose  = require('../db/connection') //Object Document Mapper (ODM)

const ToDoSchema = new mongoose.Schema({ //object schematic - representative data MODEL
    title: {type: String, required: true},
    complete: {type: Boolean, default: false}
}, {timestamps: true})

const Todo = mongoose.model('Todo', ToDoSchema)

module.exports = Todo
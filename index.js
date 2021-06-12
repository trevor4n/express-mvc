const express = require('express')
const todoController = require('./controllers/todos')
const methodOverride = require('method-override') //npm i method-override

const app = express()
app.set('view engine', 'hbs')

//Middleware
app.use(express.json()) //parses application/json request data and adds it to the request object as request.body
app.use(express.urlencoded({ extended: true })) //parses x-ww-form-urlencoded request data and adds it to the request object as request.body
app.use(methodOverride('_method'))
//STRETCH - https://stormpath.com/blog/how-to-write-middleware-for-express-apps
app.set("port", process.env.PORT || 4000)

//Route Controllers
app.use('/todos', todoController)

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send(message);
})

//const port = process.env.PORT || 4000
//app.listen(port, () => {
app.listen(app.get('port'), () => {
    console.log(`🌟Express MVC app is running on port ${app.get('port')}✅`)
})

//STRETCH - redirect?
app.get('/', (req, res) => {res.send(`You've reached the express-mvc index. </br> Navigate to the '/todos' path for routing`)})
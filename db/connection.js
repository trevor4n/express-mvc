const mongoose = require('mongoose') //require node module

const mongoURI = 
    process.env.NODE_EV === 'production'
        ? process.env.DB_URL
        : 'mongodb://localhost/express-mvc'

mongoose //boilerplate connection
    .connect(mongoURI, {  //link express-mvc mongoose instance to database
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then((instance) => 
        console.log(`Connected to db: ${instance.connections[0].name}`)
    ).catch((err) => console.log(`Connection to db failed due to: `, err))

module.exports = mongoose

//STRETCH - using ES6 Promises instead of callbacks for monngoose queries 
// https://stackoverflow.com/a/54995263/3911210
// https://rossbulat.medium.com/using-promises-async-await-with-mongodb-613ed8243900
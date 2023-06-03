if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//set router location for server to use defined in index.js
const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname + '/views/')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//prep mongoDB
const mongoose = require('mongoose')
//to make db url dynamic, not dependent on env
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
//test connection
const db = mongoose.connection
//show error
db.on('error',error => console.error(error))
//log success connect
db.once('open',() => console.log('Connected to Mongoose'))

//actually use router
app.use('/',indexRouter)

//set to 3000 for localhost dev testing
app.listen(process.env.PORT || 3000)

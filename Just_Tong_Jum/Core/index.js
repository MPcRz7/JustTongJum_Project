const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const vocab = require('./controller/vocab')
const profile = require('./controller/profile')
const groupVocabs = require('./controller/groupVocabs')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://127.0.0.1/vocab_app', {useNewUrlParser: true})
    .then(() => {
        console.log('Connect mongodb successfully')
    })
    .catch((err) => {
        console.log(err)
    })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//     res.send('hello world Mos')
// }) 

// app.get('/group_vocab',function (req, res) {
//     const { query } = req
//     // res.send('get vocab group id ' + query.id)
//     res.send('get vocab group sort ' + query.sort)
// })

// app.get('/group_vocab/:id/vocab/:vocab_id', function(req, res) {
//     console.log(req.params)
//     res.send('groupod')
// })

app.post('/user/login', function(req, res) {
    const { username, password } = req.body
    if(username === 'mos' && password === 'password') {
        res.status(200).send({message: 'Login Success'})
    } else {
        res.status(401).send({message: 'wrong username or password'})
    }
})

vocab(app)
profile(app)
groupVocabs(app)

app.listen(3000)
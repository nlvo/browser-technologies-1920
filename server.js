const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 4000;

app
    .use(express.urlencoded({
        extended: true
    }))
    .use(express.static('public'))
    .set('view engine', 'ejs')
    .get('/', function(req,res){
        res.render('form', { data: req.query })
    })
    .get('/form', function(req, res){
        res.render('index', { data: req.query })
    })
    // .post('/form', function(req, res){
    //     res.render('index', { data: req.body })
    // })
    .listen(port);
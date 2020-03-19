const express = require('express');
const mongo = require('mongodb');
const generateUniqueId = require('generate-unique-id');
require('dotenv').config();

const app = express();
const port = 4000;
let db = null;
const dbName = process.env.DB_NAME;
const url = process.env.DB_URL;

mongo.MongoClient.connect(url , (err, database) => {
    if (err) {
		throw err
	} else {
		db = database.db(dbName);
    }
});

app
    .use(express.urlencoded({
        extended: true
    }))
    .use(express.static('public'))
    .set('view engine', 'ejs')
    .get('/', function(req, res){
        res.render('form', { data: results })
    })
    .get('/design/:id', function(req, res){
        const id = req.params.id;
        db.collection('designs').findOne({
            pin: id
        }, done);
        function done (error, result) {
            if (error) return console.log(error);
            res.render('index', { data: result })
        }
    })
    .post('/form', function(req, res){
        const pinNumber = generateUniqueId({
            length: 6,
            useLetters: false
        });
        
        db.collection('designs').insertOne({
            pin: Number(pinNumber),
            type: req.body.type,
            size: req.body.size,
            color: req.body.color,
            textColor: req.body.textColor,
            firstLanguage: req.body.firstLanguage,
            secondLanguage: req.body.secondLanguage,
            thirdLanguage: req.body.thirdLanguage,
            fourthLanguage: req.body.fourthLanguage
        }, done)

        function done (error, result) {
            console.log(result)
            if (error) return console.log(error);
            res.redirect('/design/' + result.pin)
        }
    })
    .listen(port);

    // req.body, (error, result) => {
    //     result.pin = Number(id);
    //     if (error) return console.log(error);
    //     res.redirect('/design/' + result.pin)
    // }
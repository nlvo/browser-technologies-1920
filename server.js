const express = require('express');
const mongo = require('mongodb');
const generateUniqueId = require('generate-unique-id');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
let db = null;
const dbName = process.env.DB_NAME;
const url = process.env.DB_URL;

mongo.MongoClient.connect(url , {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
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
    .get('/search', function(req, res){
        res.render('search');
    })
    .get('/pin', function(req, res){
        const pinValue = Number(req.query.pinNumber);
        
        db.collection('designs').findOne({
            pin: pinValue
        }, done);

        function done (error, result) {
            if (error) return console.log(error);
            res.redirect('/design/' + result._id)
        }
    })
    .get('/design/:id', function(req, res){
        const id = req.params.id;
        db.collection('designs').findOne({
			_id: mongo.ObjectID(id)
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
            if (error) return console.log(error);
            res.redirect('/design/' + result.insertedId)
            // res.render('index', { data: req.query })
        }
    })
    .post('/form/:id', function (req, res){
        const id = req.params.id;
		db.collection('designs').update({
            _id: mongo.ObjectID(id)},
                { $set: {
                    type: req.body.type,
                    size: req.body.size,
                    color: req.body.color,
                    textColor: req.body.textColor,
                    firstLanguage: req.body.firstLanguage,
                    secondLanguage: req.body.secondLanguage,
                    thirdLanguage: req.body.thirdLanguage,
                    fourthLanguage: req.body.fourthLanguage
                }},    
                { upsert: true },
            done);

        function done (error, result) {
            if (error) return console.log(error);
            res.redirect('/design/' + id)
        }
    })
    .get('/form/:id', function(req, res){
        const id = req.params.id;

        db.collection('designs').findOne({
			_id: mongo.ObjectID(id)
        }, done);

        function done (error, result) {
            if (error) return console.log(error);
            res.render('form', { data: result })
        }
    })
    .listen(port);
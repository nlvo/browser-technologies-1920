const express = require('express');
const mongo = require('mongodb');
const generateUniqueId = require('generate-unique-id');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
let db = null;
const dbName = process.env.DB_NAME;
const url = process.env.DB_URL;
const hexColors = [{
        name: "witte",
        hex: '#ffffff'
    },
    {
        name: "404 rode",
        hex: '#F56565'
    },
    {
        name: "html oranje",
        hex: '#ED8936'
    },
    {
        name: "javascript gele",
        hex: '#ECC94B'
    },
    {
        name: "nodejs groene",
        hex: '#48BB78'
    },
    {
        name: "css blauwe",
        hex: '#4299E1'
    },
    {
        name: "donker grijze",
        hex: '#2D3748'
    }
]

mongo.MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, database) => {
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
    .get('/', function (req, res) {
        res.render('index')
    })
    .get('/search', function (req, res) {
        res.render('search');
    })
    .get('/design', function (req, res) {
        db.collection('designs').findOne({
            _id: mongo.ObjectId('5e7b8463c88f83844c9bf891')
        }, done);

        function done(error, result) {
            if (error) return console.log(error);
            res.render('form', {
                formValues: result
            });
        }
    })
    .get('/pin', function (req, res) {
        const pinValue = Number(req.query.pinNumber);

        db.collection('shirts').findOne({
            pin: pinValue
        }, done);

        function done(error, result) {
            if (error) return console.log(error);
            res.redirect('/design/' + result._id)
        }
    })
    .get('/design/:id', function (req, res) {
        const id = req.params.id;
        // db.collection('shirts').findOne({
        //     _id: mongo.ObjectID(id)
        // }, done);

        db.collection('shirts').aggregate([
            {
                '$match': {
                    '_id': mongo.ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'designs',
                    'localField': 'design',
                    'foreignField': '_id',
                    'as': 'design'
                }
            }
        ]).next(done);

        function done(error, result) {
            console.log(result)
            if (error) return console.log(error);
            res.render('design', {
                data: result
            })
        }
    })
    .post('/form', function (req, res) {
        const pinNumber = generateUniqueId({
            length: 6,
            useLetters: false
        });

        db.collection('shirts').insertOne({
            pin: Number(pinNumber),
            design: mongo.ObjectId('5e7b8463c88f83844c9bf891'),
            type: req.body.type ? req.body.type : '',
            size: req.body.size ? req.body.size : '',
            color: req.body.color ? hexColors.find((colors) => colors.hex == req.body.color ? colors : '') : '',
            textColor: req.body.textColor ? hexColors.find((colors) => colors.name == req.body.textColor ? colors : '') : '',
            firstLanguage: req.body.firstLanguage,
            secondLanguage: req.body.secondLanguage,
            thirdLanguage: req.body.thirdLanguage,
            fourthLanguage: req.body.fourthLanguage
        }, done)

        function done(error, result) {
            if (error) return console.log(error);
            res.redirect('/design/' + result.insertedId)
            // res.render('index', { data: req.query })
        }
    })
    .post('/form/:id', function (req, res) {
        const id = req.params.id;
        const pinNumber = generateUniqueId({
            length: 6,
            useLetters: false
        });
        db.collection('shirts').updateOne({
            _id: mongo.ObjectId(id)
        }, {
            $set: {
                pin: req.body.pin || Number(pinNumber),
                type: req.body.type ? req.body.type : '',
                size: req.body.size ? req.body.size : '',
                color: req.body.color ? hexColors.find((colors) => colors.name == req.body.color ? colors.hex : '') : '',
                textColor: req.body.textColor ? hexColors.find((colors) => colors.name == req.body.textColor ? colors.hex : '') : '',
                firstLanguage: req.body.firstLanguage,
                secondLanguage: req.body.secondLanguage,
                thirdLanguage: req.body.thirdLanguage,
                fourthLanguage: req.body.fourthLanguage
            }
        }, {
            upsert: true
        }, done);

        function done(error, result) {
            console.log(result.type)
            if (error) return console.log(error);
            res.redirect('/design/' + id)
        }
    })
    .get('/form/:id', function (req, res) {
        const id = req.params.id;
        // db.collection('shirts').findOne({
        // 	_id: mongo.ObjectID(id)
        // }, done);
        db.collection('shirts').aggregate([
            {
                '$match': {
                    '_id': mongo.ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'designs',
                    'localField': 'design',
                    'foreignField': '_id',
                    'as': 'design'
                }
            }
        ]).next(done);

        function done(error, result) {
            // console.log(result)
            if (error) return console.log(error);
            res.render('form', {
                data: result
            })
        }
    })
    .listen(port);
const express = require('express');
const mongo = require('mongodb');
const generateUniqueId = require('generate-unique-id');
const multer = require('multer');
const upload = multer();
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

const design = {
    "type": "I speak",
    "shirtColors": [{
        "name": "white-shirt",
        "nerdy": "witte",
        "hex": "#ffffff"
    }, {
        "name": "red-shirt",
        "nerdy": "404 rode",
        "hex": "#F56565"
    }, {
        "name": "orange-shirt",
        "nerdy": "html oranje",
        "hex": "#ED8936"
    }, {
        "name": "yellow-shirt",
        "nerdy": "javascript gele",
        "hex": "#ECC94B"
    }, {
        "name": "green-shirt",
        "nerdy": "nodejs groene",
        "hex": "#48BB78"
    }, {
        "name": "blue-shirt",
        "nerdy": "css blauwe",
        "hex": "#4299E1"
    }, {
        "name": "dark-grey-shirt",
        "nerdy": "donker grijze",
        "hex": "#2D3748"
    }],
    "textColors": [{
        "name": "white",
        "nerdy": "witte",
        "hex": "#ffffff"
    }, {
        "name": "red",
        "nerdy": "html oranje",
        "hex": "#F56565"
    }, {
        "name": "orange",
        "nerdy": "html oranje",
        "hex": "#ED8936"
    }, {
        "name": "yellow",
        "nerdy": "javascript gele",
        "hex": "#ECC94B"
    }, {
        "name": "green",
        "nerdy": "nodejs groene",
        "hex": "#48BB78"
    }, {
        "name": "blue",
        "nerdy": "css blauwe",
        "hex": "#4299E1"
    }, {
        "name": "dark-grey",
        "nerdy": "donker grijze",
        "hex": "2D3748"
    }],
    "sizes": ["xs", "s", "m", "l", "xl"],
    "gender": ["mannen", "vrouwen"],
    "firstLanguage": "",
    "secondLanguage": "",
    "thirdLanguage": "",
    "fourthLanguage": ""
}

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
    .use(express.json())
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
    .post('/design', upload.none(), function (req, res) {
        // console.log('postdesign:', req.body);
        
        const pinNumber = generateUniqueId({
            length: 6,
            useLetters: false
        });

        db.collection('shirts').insertOne({
            pin: Number(pinNumber),
            design: design,
            type: req.body.type ? req.body.type : '',
            size: req.body.size ? req.body.size : '',
            color: req.body.color ? design.shirtColors.find((colors) => colors.name == req.body.color ? colors.hex : '') : '',
            textColor: req.body.textColor ? design.textColors.find((colors) => colors.name == req.body.textColor ? colors.hex : '') : '',
            firstLanguage: req.body.firstLanguage,
            secondLanguage: req.body.secondLanguage,
            thirdLanguage: req.body.thirdLanguage,
            fourthLanguage: req.body.fourthLanguage
        }, done)

        function done(error, result) {
            if (error) return console.log(error);
            res.redirect('/form/' + result.insertedId)
            // res.redirect('/design/' + result.insertedId)
            // res.send(result.ops[0])
        }
    })
    
    .get('/design/:id', function (req, res) {
        const id = req.params.id;
        db.collection('shirts').findOne({
            _id: mongo.ObjectID(id)
        }, done);

        function done(error, result) {
            // console.log(result)
            if (error) return console.log(error);
            res.render('order', {
                data: result
            })
        }
    })

    .post('/design/:id', upload.none(), function (req, res) {
        // console.log('paramsy:', req.body)
        // const id = req.body.hidden_id;
        const id = req.params.id;

        db.collection('shirts').findOneAndUpdate({
            _id: mongo.ObjectId(id)
        }, {
            $set: {
                type: req.body.type ? req.body.type : '',
                size: req.body.size ? req.body.size : '',
                color: req.body.color ? design.shirtColors.find((colors) => colors.name == req.body.color ? colors.hex : '') : '',
                textColor: req.body.textColor ? design.textColors.find((colors) => colors.name == req.body.textColor ? colors.hex : '') : '',
                firstLanguage: req.body.firstLanguage,
                secondLanguage: req.body.secondLanguage,
                thirdLanguage: req.body.thirdLanguage,
                fourthLanguage: req.body.fourthLanguage
            }
        }, {
            upsert: true
        }, done);

        function done(error, data) {
            console.log('dataaaa:')
            if (error) return console.log(error);
            // res.render('form', {
            //     data: data.value
            // })
            // res.json(data.value)
            res.send(data.value)
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

    .post('/form', function (req, res) {
        const pinNumber = generateUniqueId({
            length: 6,
            useLetters: false
        });

        db.collection('shirts').insertOne({
            pin: Number(pinNumber),
            design: design,
            type: req.body.type ? req.body.type : '',
            size: req.body.size ? req.body.size : '',
            color: req.body.color ? design.shirtColors.find((colors) => colors.name == req.body.color ? colors.hex : '') : '',
            textColor: req.body.textColor ? design.textColors.find((colors) => colors.name == req.body.textColor ? colors.hex : '') : '',
            firstLanguage: req.body.firstLanguage,
            secondLanguage: req.body.secondLanguage,
            thirdLanguage: req.body.thirdLanguage,
            fourthLanguage: req.body.fourthLanguage
        }, done)

        function done(error, result) {
            if (error) return console.log(error);
            res.redirect('/form/' + result.insertedId)
            // res.render('index', { data: req.query })
            // res.send({
            //     result
            // })
        }
    })

    .post('/form/:id', upload.none(), function (req, res) {
        const id = req.params.id;
        db.collection('shirts').updateOne({
            _id: mongo.ObjectId(id)
        }, {
            $set: {
                design: design,
                type: req.body.type ? req.body.type : '',
                size: req.body.size ? req.body.size : '',
                color: req.body.color ? design.shirtColors.find((colors) => colors.name == req.body.color ? colors.hex : '') : '',
                textColor: req.body.textColor ? design.textColors.find((colors) => colors.name == req.body.textColor ? colors.hex : '') : '',
                firstLanguage: req.body.firstLanguage,
                secondLanguage: req.body.secondLanguage,
                thirdLanguage: req.body.thirdLanguage,
                fourthLanguage: req.body.fourthLanguage
            }
        }, {
            upsert: true
        }, done);

        function done(error, result) {
            // console.log(result.type)
            if (error) return console.log(error);
            res.redirect('/form/' + id)
            // res.render('form', {
            //     data: result
            // })
        }
    })
    
    .get('/form/:id', function (req, res) {
        const id = req.params.id;
        db.collection('shirts').findOne({
            _id: mongo.ObjectID(id)
        }, done);

        function done(error, result) {
            // console.log(result)
            if (error) return console.log(error);
            res.render('form', {
                formdata: result
            })
        }
    })
    
    .get('/form/edit/:id', upload.none(), function (req, res) {
        const id = req.params.id;
        db.collection('shirts').findOne({
            _id: mongo.ObjectID(id)
        }, done);

        function done(error, result) {
            // console.log(result)
            if (error) return console.log(error);
            res.render('form', {
                formdata: result
            })
        }
    })

    .get('/order/:id', function (req, res) {
        const id = req.params.id;
        db.collection('shirts').findOne({
            _id: mongo.ObjectID(id)
        }, done);

        function done(error, result) {
            // console.log(result)
            if (error) return console.log(error);
            res.render('order', {
                data: result
            })
        }
    })
    .get('/order/:id/completed', function (req, res) {
        const id = req.params.id;
        db.collection('shirts').findOne({
            _id: mongo.ObjectID(id)
        }, done);

        function done(error, result) {
            // console.log(result)
            if (error) return console.log(error);
            res.render('completed', {
                data: result
            })
        }
    })

    .listen(port);
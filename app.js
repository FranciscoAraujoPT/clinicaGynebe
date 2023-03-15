const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "529448807183 - tctbbs5l01n3i1da262d1c5m52vjmlbp.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/ejs');

// Connect to MySQL database
const connection = mysql.createConnection({
    host: 'database-1.cb8p8kuhqckt.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'quico3105',
    database: 'gynebe'
});

connection.connect();

// Use helmet middleware for adding security headers
app.use(helmet());

// Use body-parser middleware for handling HTTP request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

// Use rate-limit middleware for limiting API requests
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

// Serve the appointment booking form
app.get('/', (req, res) => {
    res.redirect("/pt/");
});

app.get('/:lang/*', function (req, res, next) {
    var lang = req.params.lang;
    if (lang === 'en' || lang === 'pt' || lang === 'es') {
        next();
    } else {
        res.status(404).send('Page not found');
    }
});

// Serve the home page for each language
app.get('/:lang/', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('index', language);
});

app.get('/:lang/index', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('index', language);
});

app.get('/:lang/ac', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('ac', language);
});

app.get('/:lang/agreements', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('agreements', language);
});

app.get('/:lang/contactsST', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('contact_santo_tirso', language);
});

app.get('/:lang/contacts', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('contacts', language);
});

app.get('/:lang/ds', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('ds', language);
});

app.get('/:lang/gallery', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('gallery', language);
});

app.get('/:lang/galleryST', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('galleryST', language);
});

app.get('/:lang/gv', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('gv', language);
});

app.get('/:lang/lc', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('lc', language);
});

app.get('/:lang/mb', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('mb', language);
});

app.get('/:lang/mca', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('mca', language);
});

app.get('/:lang/privacy', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('privacy', language);
});

app.get('/:lang/specialties', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('specialties', language);
});

app.post('/google-login', async (req, res) => {
    const { id_token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { name, email } = payload;

        console.log(name);
        // You can use this information to authenticate the user on your server and create a session
        // ...

        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(400).send('Bad Request');
    }
});

// Define error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong on the server.' });
});

//Start the Server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});


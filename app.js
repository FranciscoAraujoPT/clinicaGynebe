const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "529448807183-tctbbs5l01n3i1da262d1c5m52vjmlbp.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/ejs');

// Connect to MySQL database
/* const connection = mysql.createConnection({
    host: 'database-1.cb8p8kuhqckt.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'quico3105',
    database: 'gynebe'
}) */;

/* const connection = mysql.createConnection({
    host: 'FranciscoAraujo',
    user: 'quico',
    password: 'quico',
    database: 'gynebe'
}) */

/* connection.connect((err) => {
    if (err) {
        console.log("Error occurred", err);
    } else {
        console.log("Connected to MySQL Server");
    }
}); */

const pool = mysql.createPool({
    host: 'localhost',
    user: 'quico',
    password: 'quico',
    database: 'gynebe',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// Use rate-limit middleware for limiting API requests
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);


// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
    })
);

// Set the Cross-Origin-Opener-Policy header
app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin-allow-popups' }));

app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));

// Disable the X-Powered-By header to hide Express.js
app.disable('x-powered-by');

// Content Security Policy (CSP) header to prevent XSS attacks
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-cdn.com', "https://api.mapbox.com", "https://accounts.google.com/gsi/client"],
        styleSrc: ["'self'", 'trusted-cdn.com', "https://api.mapbox.com", "https://fonts.googleapis.com", "'unsafe-inline'", "https://accounts.google.com/gsi/style"],
        fontSrc: ["'self'", 'trusted-cdn.com', 'https://fonts.gstatic.com', "https://api.mapbox.com"],
        imgSrc: ["'self'", 'trusted-cdn.com', "data:", "blob:", "https://*.tiles.mapbox.com", "https://api.mapbox.com"],
        connectSrc: ["'self'", "https://*.tiles.mapbox.com", "https://api.mapbox.com", "https://events.mapbox.com", "https://accounts.google.com/gsi/"],
        frameSrc: ["'self'", "https://accounts.google.com/gsi/"],
        objectSrc: ["'none'"],
        mediaSrc: ["'none'"],
        manifestSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        workerSrc: ["'self'", "blob:"],
        childSrc: ["'self'", "blob:"],
        upgradeInsecureRequests: []
    },
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: false,
    browserSniff: true,
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
}));

// HTTP Strict Transport Security (HSTS) header to enforce HTTPS
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}));

// Cross-site scripting (XSS) protection header
app.use(helmet.xssFilter());

// Referrer Policy header to control the amount of information sent with requests
app.use(helmet.referrerPolicy({
    policy: 'same-origin'
}));

// Prevent clickjacking attacks with the X-Frame-Options header
app.use(helmet.frameguard({
    action: 'sameorigin'
}));

// Prevent MIME sniffing with the X-Content-Type-Options header
app.use(helmet.noSniff());

// Set up CORS middleware
app.use(cors());

// Use body-parser middleware for handling HTTP request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session middleware with security options
app.use(session({
    secret: 'quico',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    }
}));

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

app.get('/:lang/contacts_santo_tirso', function (req, res) {
    var lang = req.params.lang;
    var language = require('./languages/' + lang + '.json');
    res.render('contacts_santo_tirso', language);
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

app.post('/google-login', async (req, res, next) => {
    const { id_token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];
        const email = payload['email'];
        const name = payload['name'];
        const picture = payload['picture'];

        const loginConnection = await pool.getConnection();
        loginConnection
            .execute('SELECT * FROM users WHERE google_id = ? OR email = ?', [
                userId,
                email,
            ])
            .then(async ([rows, fields]) => {
                if (rows.length > 0) {
                    req.session.userIdentification = rows[0].id;
                    res.status(200).send('Login Successful');
                } else {
                    const insertConnection = await pool.getConnection();
                    const id = parseInt(Date.now() + Math.random());
                    insertConnection
                        .execute(
                            'INSERT INTO users (id, google_id, email, name, picture) VALUES (?, ?, ?, ?, ?)',
                            [id, userId, email, name, picture]
                        )
                        .then(([rows, fields]) => {
                            req.session.userIdentification = rows.id;
                            res.status(200).send('Account creation successful');
                        })
                        .catch((err) => {
                            console.error(err);
                            next(new Error("Couldn't create an account."));
                        })
                        .finally(() => {
                            insertConnection.release();
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                next(new Error("Couldn't log in."));
            })
            .finally(() => {
                loginConnection.release();
            });
    } catch (err) {
        console.error(err);
        next(new Error("Incorrect information received."));
    }
});

// Define error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Internal server error');
});

//Start the Server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
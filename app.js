const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');
const OIDCStrategy = require('passport-openidconnect').Strategy;
const MySQLStore = require('express-mysql-session')(session);
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "529448807183 - tctbbs5l01n3i1da262d1c5m52vjmlbp.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/ejs');

// Connect to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fcaraujo',
    password: 'quico',
    database: 'gynebe'
});

// Configure session middleware
const sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'fcaraujo',
    password: 'quico',
    database: 'gynebe'
});

connection.connect();

// Use helmet middleware for adding security headers
app.use(helmet());

//RETIRAR ISTO DEPOIS!!!
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://apis.google.com", "https://kit.fontawesome.com", "https://accounts.google.com"],
    },
}));

// Use body-parser middleware for handling HTTP request data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure sessions
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

// Configure passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' directory
app.use(express.static("public"));


// Configure Autenticação.gov OpenID Connect endpoints
passport.use(new OIDCStrategy({
    issuer: 'https://am.biscuit.pt/auth/realms/autenticacaogov',
    authorizationURL: 'https://am.biscuit.pt/auth/realms/autenticacaogov/protocol/openid-connect/auth',
    tokenURL: 'https://am.biscuit.pt/auth/realms/autenticacaogov/protocol/openid-connect/token',
    userInfoURL: 'https://am.biscuit.pt/auth/realms/autenticacaogov/protocol/openid-connect/userinfo',
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL: 'http://localhost:3000/auth/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save the user profile to the session
    req.session.user = profile;
    done(null, profile);
}));

// Configure passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

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

app.get('/auth/callback', passport.authenticate('openidconnect', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

// Handle form submissions
app.post('/appointments', (req, res) => {
    const { name, email, phone, date, time, notes } = req.body;
    const appointment = { name, email, phone, date, time, notes };
    connection.query('INSERT INTO appointments SET ?', appointment, (error, results, fields) => {
        if (error) {
            console.error('Error booking appointment:', error);
            res.sendStatus(500);
            return;
        }
        console.log('Appointment booked successfully:', appointment);
        res.sendStatus(200);
    });
});

// Add login route
app.post('/auth/login', function (req, res) {
    const { code } = req.body;

    // Make a POST request to authentication.gov
    request.post({
        url: 'https://auth.gov.pt/oauth/access_token',
        form: {
            grant_type: 'authorization_code',
            code,
            client_id: 'your_client_id',
            client_secret: 'your_client_secret',
            redirect_uri: 'http://localhost:3000/auth/callback'
        }
    }, function (err, response, body) {
        if (err) {
            // Handle error
            res.status(500).send('Error authenticating user');
            return;
        }

        // Parse access token from response
        const { access_token } = JSON.parse(body);

        // Make a GET request to authentication.gov to retrieve user info
        request.get({
            url: 'https://auth.gov.pt/oauth/userinfo',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }, function (err, response, body) {
            if (err) {
                // Handle error
                res.status(500).send('Error retrieving user info');
                return;
            }

            // Parse user info from response
            const { sub, given_name, family_name, email } = JSON.parse(body);

            // Store user info in session
            req.session.user = { id: sub, firstName: given_name, lastName: family_name, email };

            // Redirect to dashboard page
            res.redirect('/dashboard');
        });
    });
});

// Add dashboard route
app.get('/dashboard', function (req, res) {
    // Check if user is logged in
    if (!req.session.user) {
        // Redirect to login page
        res.redirect('/login');
        return;
    }

    // Render dashboard page with user info
    res.send(`Welcome, ${req.session.user.firstName} ${req.session.user.lastName}!`);
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

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

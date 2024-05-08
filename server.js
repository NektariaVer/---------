/*const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

// Set Handlebars as the template engine
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    // Render the 'home' Handlebars template
    res.render('home', { title: 'Home' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/


const express = require('express');
const app = express();
const session = require('express-session');

const expbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const sqliteStore = require('connect-sqlite3')(session); //store for session

// Either use the port number from the environment or use 3000
const port = process.env.PORT || 3000;

// handle urls
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// using css, javascript, images, and other public files
app.use(express.static(path.join(__dirname, 'public')));

// app use model
//app.use('/model', express.static(`${__dirname}/model/`));

app.use(session({
    secret: process.env.secret || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        maxAge: 2 * 60 * 60 * 1000
    },
    store: new sqliteStore({ db: 'student_services.db', dir: './database' })
}));

// helpers
const hbs = expbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs'
});

// using the engine of handlebars
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Define a route to handle requests to the root URL and render the homepage view
app.get('/', (req, res) => {
    res.render('home_page.hbs', {
        pageTitle: 'ECE students'
    });
});

app.get('/user_info', (req, res) => {
    res.render('user_info.hbs', {
        pageTitle: 'User Information'
    });
});

app.get('/edit_user_info', (req, res) => {
    res.render('edit_user_info.hbs', {
        pageTitle: "Edit Information"
    });
});

app.get('/semester', (req, res) => {
    res.render('semester.hbs', {
        pageTitle: 'Semester'
    });
});

app.get('/courses', (req, res) => {
    res.render('courses.hbs', {
        pageTitle: 'Courses'
    });
});

app.get('/student_progress', (req, res) => {
    res.render('student_progress.hbs', {
        pageTitle: "Academic progress"
    });
});

app.get('/certificates', (req, res) => {
    res.render('certificates.hbs', {
        pageTitle: "Certificates"
    });
});


// specifying the routes that the user can access
// Use the routes from the menu
//app.use(require('./routes/route_user_info.js'));
//app.use(require('./routes/route_semester.js'));
//app.use(require('./routes/route_courses.js'));
//app.use(require('./routes/route_student_progress.js'));
//app.use(require('./routes/route_certificates.js'));

// final command to have the server running
app.listen(port, '0.0.0.0', () => {
    console.log('Server listening on port ' + port + '  visit: ' + `http://127.0.0.1:${port}`);
});

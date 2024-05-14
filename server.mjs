import express from "express";
import session from "express-session";
import expbs from "express-handlebars";
import path from "path";
//const cookieParser = require('cookie-parser');
//const sqliteStore = require('connect-sqlite3')(session); //store for session

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//import * as model from './model/student_services_model.mjs';
import * as model from './model/student_services_lite.mjs';

import fs from 'fs';
import bcrypt from 'bcrypt';
const users = JSON.parse(fs.readFileSync('public/js/users.json', 'utf-8'));

import PDFDocument from "pdfkit";

// Either use the port number from the environment or use 8000
const port = process.env.PORT || 8000;

const app = express();
// handle urls
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(cookieParser());

// using css, javascript, images, and other public files
app.use(express.static(path.join(__dirname, 'public')));

// app use model
app.use('/model', express.static(`${__dirname}/model/`));
app.use('/controller', express.static(`${__dirname}/controller/`));

app.use(session({
    secret: process.env.secret || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        maxAge: 2 * 60 * 60 * 1000
    },
    //store: new sqliteStore({ db: 'student_services.db', dir: './database' })
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

app.get('/login', (req, res) => {
    res.render('login.hbs', {
        pageTitle: 'ECE students - login'
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    } 
    else {
        req.session.user = user;
        res.redirect('/');
    }
});

app.get('/user_info', async(req, res) => {
    let userID = "S10800";
    try {
        const userInfo = await model.getUserInfo(userID);
        const studentInfo = await model.getStudentInfo(userID);
        if (userInfo.length > 0) {
            res.render('user_info.hbs', {
                pageTitle: 'User Information',
                ID: userInfo[0].academic_id,
                name: userInfo[0].firstname,
                surname: userInfo[0].lastname,
                birthday: userInfo[0].birthday,
                gender: userInfo[0].gender,
                ID_num: userInfo[0].id_num,
                address: userInfo[0].address,
                email: userInfo[0].email,
                phone: userInfo[0].phone,
                semester: studentInfo[0].semester,
                registrationDate: studentInfo[0].registration
            });
        } else
            res.render('user_info.hbs', {
                pageTitle: 'User Information',
                ID: 'User not found' 
            });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Error retrieving user information');
    }
});

app.get('/edit_user_info', async(req, res) => {
    let userID = "S10800";
    try {
        const userInfo = await model.getUserInfo(userID);
        if (userInfo.length > 0) {
            const address = userInfo[0].address;
            const addressParts = address.split(', ');
            const streetAndNumber = addressParts[0].match(/Οδός\s+(\S+)\s+(\d+)$/);
            const street = streetAndNumber[1].trim();
            const number = streetAndNumber[2].trim();
            const city = addressParts[1].trim();
            res.render('edit_user_info.hbs', {
                pageTitle: 'Edit Information',
                street: street,
                number: number,
                city: city,
                email: userInfo[0].email,
                tel: userInfo[0].phone,
                postcode: userInfo[0].postcode
            });
        } else
            res.render('edit_user_info.hbs', {
                pageTitle: 'Edit Information',
                ID: 'User not found' 
            });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Error editing user information');
    }
});

app.post('/edit_user_info', async (req, res) => {
    const { academic_id, street, number, postcode, city, phone, email } = req.body;
    const address = `Οδός ${street} ${number}, ${city}`;
    console.log("Received data:", req.body);
    try {
        await model.updateUserInfo(academic_id, address, phone, email, postcode);
        res.redirect('/edit_user_info');
    } catch (error) {
        console.error(`Failed to update user information: ${error.message}`);
        res.status(500).send('Error updating user information');
    }
});

/*
app.get('/semester', (req, res) => {
    res.render('semester.hbs', {
        pageTitle: 'Semester'
    });
});
*/

app.get('/semester', async (req, res) => {
    let userID = "S10800";
    try {
        const studentInfo = await model.getStudentInfo(userID);
        if (studentInfo.length > 0) {
            const semesterDate = studentInfo[0].semester_date;
            res.render('semester.hbs', {
                pageTitle: 'Semester',
                semesterDate: semesterDate
            });
        } else {
            res.render('semester.hbs', {
                pageTitle: 'Semester',
                ID: 'Cannot Retrieve Semester Information' 
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error retrieving semester information');
    }
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get('/generate-pdf/:title', (req, res) => {
    const title = req.params.title;
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${title}.pdf"`);

    doc.pipe(res);
    doc.fontSize(15).text(title, 100, 100);

    doc.end();
});

app.post('/update-status', (req, res) => {
    const { certificateType, status } = req.body;
    // Response indicating success
    res.sendStatus(200);
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
    console.log('Server listening on port ' + port + ',  visit: ' + `http://127.0.0.1:${port}`);
});

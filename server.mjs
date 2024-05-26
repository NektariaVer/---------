import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import userSession from './app-setup/session.mjs';
import routes from './routes/routes.mjs';
import PDFDocument from 'pdfkit';

const app = express();

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

app.use(express.urlencoded({ extended: false }));

const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',
    helpers: {
        isOddSemester: (semester) => semester % 2 === 1,
        status: (grade, courseSemester, studentsSemester) => {
            if (grade === "-") {
                return '-';
            } else if (grade >= 5) {
                return 'Επιτυχία';
            } else if (grade < 5 || grade === "") {
                if (studentsSemester !== courseSemester) {
                    return 'Αποτυχία';
                } else {
                    return '';
                }
            }
        },
        displayGrade: (grade, courseSemester, studentsSemester) =>{
            if (grade === "") {
                return 'NS';
            } else {
                return grade;
            }
        },
        isNS: (grade, courseSemester, studentsSemester) => {
            return grade === '';
        },
        json: function (context) {
            return JSON.stringify(context);
        },
        translateCertificate: function (name) {
            const certificateTranslations = {
                "Βεβαίωση Ενεργού Φοιτητή": "Active Student Certificate",
                "Βεβαίωση Φοιτητικής Κατάστασης": "Student Status Certificate",
                "Βεβαίωση Ειδίκευσης/Κατεύθυνσης": "Qualification-Field Certificate",
                "Βεβαίωση Πτυχιακής/Διπλωματικής Εργασίας": "Thesis Certificate",
                "Βεβαίωση Φοιτητικής Κατάστασης - Όλες οι προσπάθειες": "Student Status Certificate - All tries",
                "Βεβαίωση Φοιτητικής Κατάστασης - Επιτυχημένες προσπάθειες": "Student Status Certificate - Successful tries",
                "Βεβαίωση Φοιτητικής Κατάστασης - Τελευταία προσπάθεια": "Student Status Certificate - Last try"
            };

            const translatedName = certificateTranslations[name] || name;
            return `${translatedName}`; 
        }
    }
});

//Ενεργοποίηση συνεδρίας
app.use(userSession)

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/model', express.static(`${__dirname}/model/`));
app.use('/controller', express.static(`${__dirname}/controller/`));

app.use((req, res, next) => {
   if (req.session) {
      res.locals.ID = req.session.loggedUserId;
      //console.log("res.locals.ID :",res.locals.ID);
   } else {
      res.locals.ID = 'επισκέπτης';
   }
   next();
});

app.use('/', routes);


app.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send('Try again!')
 })

 app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    console.log('Request body:', req.body);
    next();
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

export { app as user };

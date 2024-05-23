import express from 'express';
import * as controller from '../controller/app-controller.mjs';
import * as logInController from '../controller/login-controller.mjs';

const router = express.Router();

router.route('/').get((req, res) => {
    res.redirect('/home_page');
});
const isAuthenticated = logInController.checkAuthenticated;

router.route('/login').get(logInController.showLogInForm);
router.route('/login').post(logInController.doLogin);
router.route('/logout').get(logInController.doLogout);

router.get('/home_page', isAuthenticated, controller.homePage);
router.get('/user_info', isAuthenticated, controller.getUserInfoPage);
router.get('/edit_user_info', isAuthenticated, controller.editUserInfoPage);
router.post('/edit_user_info', isAuthenticated, controller.editUserInfo);
router.get('/semester', isAuthenticated, controller.getSemesterPage);
router.post('/update_semester', isAuthenticated, controller.updateSemester);
router.get('/courses', isAuthenticated, controller.getCoursesPage);
router.post('/submit_course_declaration', isAuthenticated, controller.submitCourseDeclaration);
router.get('/student_progress', isAuthenticated, controller.getStudentProgressPage);
router.get('/certificates', isAuthenticated, controller.getCertificatesPage);
router.post('/submit-certificate',  isAuthenticated, controller.submitCertificate);
router.get('/generate_pdf/:title', isAuthenticated, controller.generatePDF);
router.post('/update_status', isAuthenticated, controller.updateStatus);


export default router;


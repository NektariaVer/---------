import * as model from '../model/student_services_lite.mjs';
import PDFDocument from "pdfkit";

export async function homePage (req, res, next) {
   res.render('home_page.hbs', {
       pageTitle: 'ECE students'
   });
};

export async function getUserInfoPage (req, res, next) {
    const userID = req.session.loggedUserId;
    try {
        await model.getAndUpdateStudentSemester(userID);
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
                postcode: userInfo[0].postcode,
                email: userInfo[0].email,
                phone: userInfo[0].phone,
                semester: studentInfo[0].semester,
                registrationDate: studentInfo[0].registration
            });
        } else {
            res.render('user_info.hbs', {
                pageTitle: 'User Information',
                ID: 'User not found'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error retrieving user information');
    }
};

export async function editUserInfoPage (req, res, next) {
    const userID = req.session.loggedUserId;
    try {
        const userInfo = await model.getUserInfo(userID);
        const studentInfo = await model.getStudentInfo(userID);
        if (userInfo.length > 0) {
            const address = userInfo[0].address;
            const addressParts = address.split(', ');
            const streetAndNumber = addressParts[0].match(/^([^\d,]+)\s+(\d+)$/i);
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
        } else {
            res.render('edit_user_info.hbs', {
                pageTitle: 'Edit Information',
                ID: 'User not found'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error editing user information');
    }
};

export async function editUserInfo (req, res, next){
    const academic_id = req.session.loggedUserId;
    const { street, number, postcode, city, phone, email } = req.body;
    let existingUserInfo;
    try {
        existingUserInfo = await model.getUserInfo(academic_id);
        if (existingUserInfo.length === 0) {
            return res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(`Failed to retrieve user information: ${err.message}`);
        return res.status(500).send('Error retrieving user information');
    }

    const existingAddress = existingUserInfo[0].address;
    const addressParts = existingAddress.split(', ');
    const streetAndNumberMatch = addressParts[0].match(/^([^\d,]+)\s+(\d+)$/i);

    let currentStreet = streetAndNumberMatch[1].trim();
    let currentNumber = streetAndNumberMatch[2].trim();
    let currentCity = addressParts[1].trim();

    const newStreet = street || currentStreet;
    const newNumber = number || currentNumber;
    const newCity = city || currentCity;
    const newAddress = `${newStreet} ${newNumber}, ${newCity}`;

    const updates = {};
    if (newAddress) updates.address = newAddress;
    if (phone) updates.phone = phone;
    if (email) updates.email = email;
    if (postcode) updates.postcode = postcode;
    try {
        await model.updateUserInfo(academic_id, updates);
        res.redirect('/user_info');
    } catch (error) {
        console.error(`Failed to update user information: ${error.message}`);
        res.status(500).send('Error updating user information');
    }
};

export async function getSemesterPage (req, res, next) {
    const userID = req.session.loggedUserId;
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
};

export async function updateSemester (req, res, next) {
    const userID = req.session.loggedUserId;
    try {
        await model.updateSemester(userID);
        res.redirect('/semester');
    } catch (error) {
        console.error('Failed to update semester', error);
        res.status(500).send('Error updating semester');
    }
};

export async function getCoursesPage(req, res, next) {
    const academic_id = req.session.loggedUserId;
    await model.getAndUpdateStudentSemester(academic_id);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    let academicYear;

    if (currentMonth >= 9) {
        // if autumn semester
        academicYear = `${today.getFullYear()}-${today.getFullYear() + 1}`;
    } else {
        // else spring semester
        academicYear = `${today.getFullYear() - 1}-${today.getFullYear()}`;
    }

    try {
        const studentInfo = await model.getStudentInfo(academic_id);
        const currentSemester = studentInfo[0].semester;
        const currentSemesterCourses = await model.getCoursesBySemester(currentSemester);
        const notPassedCourses = await model.getNotPassedCourses(academic_id, currentSemester, academicYear);
        const declaredCourses = await model.getDeclaredCourses(academic_id, currentSemester);
        const hasDeclaredCourses = declaredCourses.length > 0;

        const declaredCourseIds = new Set(declaredCourses.map(course => course.id));
        const filteredCurrentSemesterCourses = currentSemesterCourses.filter(course => !declaredCourseIds.has(course.id));

        res.render('courses.hbs', {
            pageTitle: 'Νέα Δήλωση Μαθημάτων',
            currentSemesterCourses: filteredCurrentSemesterCourses,
            notPassedCourses: notPassedCourses,
            hasDeclaredCourses: hasDeclaredCourses,
            currentSemester: currentSemester
        });
    } catch (err) {
        console.error(`Failed to retrieve courses: ${err.message}`);
        res.status(500).send('Error retrieving courses');
    }
};


export async function submitCourseDeclaration(req, res, next) {
    const academic_id = req.session.loggedUserId;
    const selectedCourses = req.body['courses[]'];
    const coursesArray = Array.isArray(selectedCourses) ? selectedCourses : [selectedCourses];

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    let academicYear;

    if (currentMonth >= 9) {
        // if autumn semester
        academicYear = `${today.getFullYear()}-${today.getFullYear() + 1}`;
    } else {
        // else spring semester
        academicYear = `${today.getFullYear() - 1}-${today.getFullYear()}`;
    }

    try {
        const studentCourses = await model.getStudentCourses(academic_id);
        const previousSemesterCourses = studentCourses.filter(course => course.academic_year !== academicYear);
        
        for (const courseId of coursesArray) {
            const courseExists = previousSemesterCourses.find(course => course.id === courseId);
            if (courseExists) {
                await model.addStudentCourse(academic_id, courseId, '-', academicYear);
            } else {
                await model.addStudentCourse(academic_id, courseId, '-', academicYear);
            }
        }
        res.redirect('/courses');
    } catch (err) {
        console.error(`Failed to submit course declaration: ${err.message}`);
        res.status(500).send('Error submitting course declaration');
    }
};

export async function getStudentProgressPage(req, res, next) {
    const academic_id = req.session.loggedUserId;
    await model.getAndUpdateStudentSemester(academic_id);

    try {
        const studentCourses = await model.getStudentCourses(academic_id);
        const studentInfo = await model.getStudentInfo(academic_id);

        // "-" grades first
        studentCourses.sort((a, b) => {
            if (a.grade === "-" && b.grade !== "-") {
                return -1;
            } else if (a.grade !== "-" && b.grade === "-") {
                return 1;
            } else {
                return 0;
            }
        });

        res.render('student_progress.hbs', {
            pageTitle: 'Ακαδημαϊκή Πρόοδος',
            courses: studentCourses,
            studentsSemester: studentInfo[0].semester
        });

    } catch (err) {
        console.error(`Failed to retrieve student progress: ${err.message}`);
        res.status(500).send('Error retrieving student progress');
    }
};


export async function getCertificatesPage (req, res, next) {
    const academic_id = req.session.loggedUserId;
    try {
        const studentCertificates = await model.getStudentCertificates(academic_id);
        const certificates = await model.certificates();
        res.render('certificates.hbs', {
            pageTitle: "Certificates",
            studentsCertificates: studentCertificates,
            certificates: certificates,
            hasCertificates:  studentCertificates.length > 0
        });
    } catch (err) {
        console.error(`Failed to retrieve student progress: ${err.message}`);
        res.status(500).send('Error retrieving certificates');
    }
};

export async function submitCertificate (req, res, next) {
    const academic_id = req.session.loggedUserId;
    const cert_id = req.body['certificateType'];
    try {
        await model.submitCertificate(academic_id, cert_id);
        res.sendStatus(200);
    } catch (err) {
        console.error(`Failed to submit certificate: ${err.message}`);
        res.status(500).send('Error submitting certificate');
    }
};

export async function generatePDF (req, res, next) {
    const title = req.params.title;
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${title}.pdf"`);

    doc.pipe(res);
    doc.fontSize(15).text(title, 100, 100);

    doc.end();
};

export async function updateStatus(req, res, next)  {
    const { certificateType, status } = req.body;
    res.sendStatus(200);
};


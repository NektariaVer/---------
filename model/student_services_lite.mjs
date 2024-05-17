import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_name = path.join(__dirname, "../model/database", "student_services.db");

const getUserInfo = (academic_id) => {
    const sql = "SELECT * FROM user WHERE academic_id = ?";
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(db_name);
        db.all(sql, [academic_id], (err, rows) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const getStudentInfo = (academic_id) => {
    const sql = "SELECT * FROM student WHERE student_id = ?";
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(db_name);
        db.all(sql, [academic_id], (err, rows) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const updateUserInfo = (academic_id, updates) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE user SET ';
        const params = [];

        if (updates.address) {
            sql += 'address = ?, ';
            params.push(updates.address);
        }
        if (updates.phone) {
            sql += 'phone = ?, ';
            params.push(updates.phone);
        }
        if (updates.email) {
            sql += 'email = ?, ';
            params.push(updates.email);
        }
        if (updates.postcode) {
            sql += 'postcode = ?, ';
            params.push(updates.postcode);
        }

        // Remove the last comma and space
        sql = sql.slice(0, -2);

        sql += ' WHERE academic_id = ?';
        params.push(academic_id);

        const db = new sqlite3.Database(db_name);
        db.run(sql, params, function (err) {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};


const updateSemester = (academic_id) => {
    return new Promise((resolve, reject) => {
        const today = new Date();
        
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        
        const formattedDate = `${day}-${month}-${year}`;

        let sql = "UPDATE student SET semester_date = ? WHERE student_id = ?";

        const db = new sqlite3.Database(db_name);
        db.run(sql, formattedDate, academic_id, function(err) { 
            db.close();
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const parseDate = (dateString) => {
    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is zero-indexed
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
};

const calculateSemester = (registrationDate, semesterDate) => {
    const registration = parseDate(registrationDate);
    const semester = parseDate(semesterDate);

    const yearsDifference = semester.getFullYear() - registration.getFullYear();
    const semesterMonth = semester.getMonth(); // 0-11

    let semestersPassed = yearsDifference * 2 ;

    if (semesterMonth >= 8) {
        semestersPassed += 1;
    }

    return semestersPassed;
};

const updateStudentSemester = (academic_id, semester) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE student SET semester = ? WHERE student_id = ?';
        const db = new sqlite3.Database(db_name);
        db.run(sql, [semester, academic_id], function (err) {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

const getAndUpdateStudentSemester = (academic_id) => {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(db_name);
        db.get('SELECT registration, semester_date FROM student WHERE student_id = ?', [academic_id], async (err, row) => {
            db.close();
            if (err) {
                return reject(err);
            }
            if (row) {
                const currentSemester = calculateSemester(row.registration, row.semester_date);
                try {
                    await updateStudentSemester(academic_id, currentSemester);
                    resolve(currentSemester);
                } catch (updateError) {
                    reject(updateError);
                }
            } else {
                reject(new Error("Student not found"));
            }
        });
    });
};

export { getUserInfo, getStudentInfo , updateUserInfo, updateSemester, getAndUpdateStudentSemester};

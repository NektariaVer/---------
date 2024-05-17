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

export { getUserInfo, getStudentInfo , updateUserInfo, updateSemester};

import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_name = path.join(__dirname, "../database", "student_services.db");

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

const updateUserInfo = (academic_id, address, phone, email, postcode) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE user SET address = ?, phone = ?, email = ?, postcode = ? WHERE academic_id = ?`;
        const db = new sqlite3.Database(db_name);
        db.run(sql, [address, phone, email, postcode, academic_id], function (err) {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

export { getUserInfo, getStudentInfo , updateUserInfo};

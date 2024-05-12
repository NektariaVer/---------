'use strict';

import db from 'better-sqlite3';

const sql = new db('model/database/student_services.db', { fileMustExist: true });

// Function to get student data by ID
export let getStudentById = (studentId) => {
    const stmt = sql.prepare('SELECT * FROM student WHERE student_id = S10800');
    let student;
    try {
        student = stmt.get(studentId);
        return student;
    } catch (err) {
        throw err;
    }
};


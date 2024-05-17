//'use strict';

//import db from 'better-sqlite3';

//const sql = new db('model/database/student_services.db', { fileMustExist: true });

// Function to get student data by ID
//export let getStudentById = (studentId) => {
//    const stmt = sql.prepare('SELECT * FROM student WHERE student_id = S10800');
//    let student;
//    try {
//        student = stmt.get(studentId);
//        return student;
//    } catch (err) {
//        throw err;
//   }
//};

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
console.log('database..', process.env.DATABASE_URL)

const pool = new pg.Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    database: 'postgres',
    port: 8080
})

async function connect() {
    try {
        const client = await pool.connect();
        return client
    }
    catch (error) {
        console.error(`Failed to connect ${error}`)
    }
}

async function getUserInfo(academic_id) {
    const sql = `SELECT * FROM "user" WHERE "academic_id" = '${academic_id}';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        return res.rows;
    }
    catch (error) {
        console.error(`Failed to connect ${error}`)
    }
}

async function getStudentInfo(academic_id) {
    const sql = `SELECT * FROM "student" WHERE "student_id" = '${academic_id}';`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        return res.rows;
    }
    catch (error) {
        console.error(`Failed to connect ${error}`)
    }
}


export { getUserInfo, getStudentInfo };

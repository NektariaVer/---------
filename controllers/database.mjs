import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
   dotenv.config();
}

const model = await import(`../model/student_services_model.mjs`);

export async function getStudentInfo(req, res) {
   try {
      const student_id = req.params.student_id; // Assuming the student ID is provided in the request parameters
      const studentInfo = await model.getStudentById(student_id);
      res.render('studentInfo', { studentInfo: studentInfo, model: better-sqlite });
   } catch (error) {
      res.send(error);
   }
}


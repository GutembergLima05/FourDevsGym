import { Router } from "express";
import { validateEntry, validateTokenAndRole, uniqueField } from "../../middleware/middlewares.js";
import { s_idCheck, s_student } from "../../schemas/schema.js";
import * as student from "../../controller/student/studentController.js"

export const routeStudent = Router();

routeStudent.route('/student')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_student, 'body'), uniqueField('aluno', ['email'], 'body'), student.register)
.get(student.getAllStudent)

routeStudent.route('/student/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_student, 'body'),uniqueField('aluno', ['email'], 'body'), student.update)
.get(student.getStudentById)
.delete(student.deleteStudent)
const { Router } = require("express")
const { validateEntry, validateTokenAndRole, uniqueField } = require("../../middleware/middlewares.js")
const { s_idCheck, s_student } = require("../../schemas/schema.js")
const student = require("../../controller/student/studentController.js")

const routeStudent = Router();

routeStudent.route('/student')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_student, 'body'), uniqueField('aluno', ['email'], 'body'), student.register)
.get(student.getAllStudent)

routeStudent.route('/student/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.put(validateEntry(s_student, 'body'),uniqueField('aluno', ['email'], 'body'), student.update)
.get(student.getStudentById)
.delete(student.deleteStudent)

module.exports = {
    routeStudent
}
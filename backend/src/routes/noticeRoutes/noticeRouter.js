const { Router } = require( "express")
const { validateEntry, validateTokenAndRole } = require( "../../middleware/middlewares.js")
const { s_notice, s_idCheck  } = require( "../../schemas/schema.js")
const notice = require( "../../controller/notice/noticeController.js");
const { route } = require("../admRoutes/admRouter");

const routeNotice = Router();

routeNotice.route('/notice')
.all(validateTokenAndRole('administrador','id_adm'))
.post(validateEntry(s_notice, 'body'), notice.register)
.get(notice.getAllNotice)


routeNotice.route('/notice/:id')
.all(validateEntry(s_idCheck, 'params'), validateTokenAndRole('administrador','id_adm'))
.get(notice.getNoticeById)
.put(validateEntry(s_notice, 'body'), notice.update)
.delete(notice.deleteNotice)

module.exports = {
    routeNotice
}

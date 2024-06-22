import { Router } from "express";
import { validateEntry } from "../../middleware/middlewares.js";
import { s_notice, s_idCheck  } from "../../schemas/schema.js";
import * as notice from "../../controller/notice/noticeController.js"

export const routeNotice = Router();

routeNotice.route('/notice')
.post(validateEntry(s_notice, 'body'), notice.register)
.get(notice.getAllNotice)

routeNotice.route('/notice/:id')
.all(validateEntry(s_idCheck, 'params'))
.get(notice.getNoticeById)
.put(validateEntry(s_notice, 'body'), notice.update)
.delete(notice.deleteNotice)
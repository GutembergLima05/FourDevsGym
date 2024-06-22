import { Router } from "express";
import { validateEntry } from "../../middleware/middlewares.js";
import { s_notice,  } from "../../schemas/schema.js";
import * as notice from "../../controller/notice/noticeController.js"

export const routeNotice = Router();

routeNotice.route('/notice').post(validateEntry(s_notice, 'body'), notice.register)
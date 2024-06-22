import { routeAdm } from "./admRoutes/admRouter.js";
import { routeGym } from "./gymRoutes/gymRouter.js";
import { routeNotice } from "./noticeRoutes/noticeRouter.js";

export const allRoutes = [
    routeAdm,
    routeGym,
    routeNotice
];
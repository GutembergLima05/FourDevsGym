import { routeAdm } from "./admRoutes/admRouter.js";
import { routeExercise } from "./exerciseRoutes/exerciseRouter.js";
import { routeGym } from "./gymRoutes/gymRouter.js";
import { routeNotice } from "./noticeRoutes/noticeRouter.js";
import { routePlan } from "./planRoutes/planRouter.js";
import { routeProduct } from "./productRoutes/productRouter.js";

export const allRoutes = [
    routeAdm,
    routeGym,
    routeNotice,
    routeExercise,
    routePlan,
    routeProduct
];
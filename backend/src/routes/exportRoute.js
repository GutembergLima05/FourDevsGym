const routeDashboard = require("./dashboardRoutes/dashboardRouter.js").routeDashboard;
const routeAdm = require("./admRoutes/admRouter.js").routeAdm;
const routeEvaluation = require("./evaluationRoutes/evaluationRouter.js").routeEvaluation;
const routeExercise = require("./exerciseRoutes/exerciseRouter.js").routeExercise;
const routeGym = require("./gymRoutes/gymRouter.js").routeGym;
const routeNotice = require("./noticeRoutes/noticeRouter.js").routeNotice;
const routePlan = require("./planRoutes/planRouter.js").routePlan;
const routeProduct = require("./productRoutes/productRouter.js").routeProduct;
const routeStudent = require("./studentRoutes/studentRouter.js").routeStudent;
const routeTraining = require("./trainingRoutes/trainingRouter.js").routeTraining;

const allRoutes = [
    routeAdm,
    routeEvaluation,
    routeExercise,
    routeGym,
    routeNotice,
    routePlan,
    routeProduct,
    routeStudent,
    routeTraining,
    routeDashboard,
];

module.exports = { allRoutes };

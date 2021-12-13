const express = require('express')
const router = express.Router()
const userController =  require("../controllers/UserController")
const workersController = require("../controllers/WorkersController")
const reportController = require("../controllers/ReportController")
const  {authJwt}  = require("../middleware"); 

router.post("/signup",userController.signup)
router.post("/signin",userController.signin)

router.get("/getworkers",[authJwt.verifyToken,authJwt.isAdmin],workersController.getWorkers)
router.get("/getworker/:id",[authJwt.verifyToken,authJwt.isAdmin],workersController.getWorker) 
router.post("/addworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.addWorker) 
router.post("/updateworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.updateWorker) 
router.post("/removeworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.removeWorker) 
router.post("/reportdata",[authJwt.verifyToken,authJwt.isAdmin],reportController.getReportData) 
router.get("/report", reportController.getReport) 
module.exports = router
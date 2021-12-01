const express = require('express')
const router = express.Router()
const userController =  require("../controllers/UserController")
const workersController = require("../controllers/WorkersController")
const  {authJwt}  = require("../middleware"); 

router.post("/signup",userController.signup)
router.post("/signin",userController.signin)

router.get("/getworkers",[authJwt.verifyToken,authJwt.isAdmin],workersController.getWorkers)
router.get("/getworker/:id",[authJwt.verifyToken,authJwt.isAdmin],workersController.getWorker) 
router.post("/addworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.addWorker) 
router.post("/updateworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.updateWorker) 
router.post("/removeworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.removeWorker) 
module.exports = router
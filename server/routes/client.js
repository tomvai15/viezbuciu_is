const express = require('express')
const router = express.Router()
const userController =  require("../controllers/UserController")
const reservationController = require("../controllers/ReservationController")
const foodOrderController = require("../controllers/FoodOrderController")
const  {authJwt}  = require("../middleware"); 

router.post("/signup",userController.signup)
router.post("/signin",userController.signin)

router.get("/getreservations/:id",[authJwt.verifyToken,authJwt.isClient],reservationController.getReservations)
router.get("/getfoodorders/:id",[authJwt.verifyToken,authJwt.isClient],foodOrderController.getFoodOrders)
router.get("/meniuitems",[authJwt.verifyToken,authJwt.isClient],foodOrderController.getItems)
router.get("/foodordertypes",[authJwt.verifyToken,authJwt.isClient],foodOrderController.getTypes)
router.get("/getfoodorderdates/:id",[authJwt.verifyToken,authJwt.isClient],foodOrderController.getOrderDates)
router.post("/addFoodOrder",[authJwt.verifyToken,authJwt.isClient],foodOrderController.addFoodOrder) 
// router.get("/getworker/:id",[authJwt.verifyToken,authJwt.isAdmin],workersController.getWorker) 
// router.post("/updateworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.updateWorker) 
// router.post("/removeworker",[authJwt.verifyToken,authJwt.isAdmin],workersController.removeWorker) 
module.exports = router
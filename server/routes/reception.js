const express = require('express')
const router = express.Router()
const userController =  require("../controllers/UserController")
const roomsController = require("../controllers/RoomsController")
const  {authJwt}  = require("../middleware"); 

router.get("/getrooms",[authJwt.verifyToken,authJwt.isReception],roomsController.getRooms)
router.post("/removeroom",[authJwt.verifyToken,authJwt.isReception],roomsController.removeRoom) 
router.get("/getroom/:id",[authJwt.verifyToken,authJwt.isReception],roomsController.getRoom) 
router.post("/addroom",[authJwt.verifyToken,authJwt.isReception],roomsController.addRoom) 
router.post("/updateroom",[authJwt.verifyToken,authJwt.isReception],roomsController.updateRoom) 

router.get("/usedrooms",[authJwt.verifyToken,authJwt.isReception],roomsController.usedRooms) 
router.get("/waitingrooms",[authJwt.verifyToken,authJwt.isReception],roomsController.waitingRooms) 
router.get("/departure",[authJwt.verifyToken,authJwt.isReception],roomsController.departure) 
router.get("/numofrooms",[authJwt.verifyToken,authJwt.isReception],roomsController.numOfRooms) 
router.post("/assignroom",[authJwt.verifyToken,authJwt.isReception],roomsController.assignRoom) 

router.get("/roomswithreservation",[authJwt.verifyToken,authJwt.isReception],roomsController.getRoomsWithReservation) 
router.get("/getreservations",[authJwt.verifyToken,authJwt.isReception],roomsController.getReservations) 
router.get("/getroomsforassign/:type/:beds",[authJwt.verifyToken,authJwt.isReception],roomsController.getRoomsForAssign) 



module.exports = router
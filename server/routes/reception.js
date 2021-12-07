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

module.exports = router
const express = require('express')
const router = express.Router()
const kitchenController = require("../controllers/KitchenController")
const  {authJwt}  = require("../middleware"); 

router.get("/getMenu",[authJwt.verifyToken,authJwt.isKitchen],kitchenController.getMenu)
router.get("/getMenuItem/:id",[authJwt.verifyToken,authJwt.isKitchen],kitchenController.getMenuItem)
router.post("/addMenuItem",[authJwt.verifyToken,authJwt.isKitchen],kitchenController.addMenuItem) 
router.post("/updateMenuItem",[authJwt.verifyToken,authJwt.isKitchen],kitchenController.updateMenuItem) 
router.post("/removeMenuItem",[authJwt.verifyToken,authJwt.isKitchen],kitchenController.removeMenuItem)
router.get("/getReport",[authJwt.verifyToken,authJwt.isKitchen],kitchenController.getReport)
module.exports = router
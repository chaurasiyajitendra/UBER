const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainModel = require('../modules/caption.module');
const captionController = require("../controllers/captain.controller");
const authMiddleware = require('../middleware/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage("Inavlid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('firstname must be conatine 3 laters'),
    body('fullname.lastname').isLength({min:3}).withMessage("lastname must be conatine 3 laters "),
    body('password').isLength({min:6}).withMessage('Password must be containe 6 laters'),
    body('vehicle.color').isLength({min:3}).withMessage("vehicle color must be containe 3 laters"),
    body('vehicle.plate').isLength({min:10}).withMessage("Vehicle number plate must be containe 10 laters"),
    body("vehicle.capcity").isInt({min:1}).withMessage("Vehicle capcity must be 1"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid Type")
],
captionController.registerCaption
)

router.post("/login",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("password must be contain 6 latter")
],
captionController.loginCaption
)

router.get("/profile",authMiddleware.authCaptain,captionController.getCaptainProfile);

router.get("/logout",authMiddleware.authCaptain,captionController.loggedOutCaptain);

module.exports = router;
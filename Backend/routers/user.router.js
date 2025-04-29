const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controllers');

router.get('/chek',(req,res)=>{
    res.send("haa chal rha hai");
});

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name must be 3 letters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 letters')
  ], userController.registerUser);



module.exports = router;

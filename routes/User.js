const express = require("express");
const router = new express.Router();
const userController = require('../controllers/user')

router.post('/sign-up',userController.signUp)
router.post('/login-user',userController.logInUser)

module.exports = router;


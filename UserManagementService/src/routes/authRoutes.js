const express = require('express');
const router = express.Router();

const { adminRegister, registerStudent, registerInstructor, loginUser,  validateToken} = require('../controllers/authController');

// Admin create account
router.post('/createAdmin', adminRegister);

// Student registering
router.post('/registerStudent',registerStudent);

// Instructor registering
router.post('/registerInstructor',registerInstructor);

// Login a user
router.post('/login',loginUser);

// Google a user
// router.post('/googleLogin',googleLoginUser);

router.post('/validate-token', validateToken);


module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require('../controllers/user.controllers')

// GET Login page.
router.get('/login', controller.showLogin);

// Get Sign-in page
router.get('/sign-in', controller.showSignIn);

module.exports = router
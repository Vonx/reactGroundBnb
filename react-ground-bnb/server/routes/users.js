const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/def');
const User = require('../controllers/user');
const {normalizeErrors} = require('../helpers/mongoose');

router.post('/auth', User.auth);

router.post('/register', User.register);

module.exports = router;
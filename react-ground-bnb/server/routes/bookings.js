const express = require('express');
const router = express.Router();
const Booking = require('../controllers/booking');
const userController = require('../controllers/user');

router.post('', userController.authMiddleware, Booking.createBooking);

router.get('/manage', userController.authMiddleware, Booking.manageBooking);

module.exports = router;
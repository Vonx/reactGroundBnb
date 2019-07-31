const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const userController = require('../controllers/user');
const {normalizeErrors} = require('../helpers/mongoose');

router.get('/secret', userController.authMiddleware, function(req, res) {
    res.json({"secret": true});

});

router.get('', function(req, res){
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {};

        Rental.find(query)
            .select('-bookings')
            .exec(function(err, foundRentals){

                if (err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                if(city && foundRentals.length === 0) {
                    return res.status(422).send({errors: [{title: 'No rentals found', detail: 'Could not find a rental in this location'}]});
                }

                return res.json(foundRentals);
            });

});

router.get('/:id', function(req, res){
    const rentalId = req.params.id;

    Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec((err, foundRental)=>{
            if(err){
                return res.status(422).send({errors: [{title: 'error', detail: 'could not find rental'}]});
            }
               return res.json(foundRental);
        })

});

router.post('', userController.authMiddleware, function(req, res){
    const {title, city, street, category, image, bedrooms, shared, description, dailyRate} = req.body;
    const user = res.locals.user;

    if(!title || !city || !street || !category || !image || !bedrooms || !shared || !description || !dailyRate){
        return res.status(422).send({errors: [{title: 'Missing Data', detail: 'Provide all required fields'}]});
    }

    const rental = new Rental({title, city, street, category, image, bedrooms, shared, description, dailyRate});
    rental.user = user;

    Rental.create(rental, function(err, newRental){
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            User.update({_id: user.id}, {$push: {rentals: newRental}}, ()=>{});
            return res.json(newRental);
    });
});

module.exports = router;
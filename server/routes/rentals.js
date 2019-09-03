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
                    return res.status(422).send({errors: [{title: 'No rentals found', detail: 'No rentals available in this location'}]});
                }

                return res.json(foundRentals);
            });

});


router.get('/manage', userController.authMiddleware, function(req, res){
    const user = res.locals.user;

    Rental.where({user})
        .populate('bookings')
        .exec(function(err, userOwnedRentals){

            if (err){
                console.log('err thrownn');
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json(userOwnedRentals);
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

router.delete('/:id', userController.authMiddleware, function(req, res){
    const rentalId = req.params.id;
    const user = res.locals.user;

    Rental.findById(rentalId)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match: {startAt: {$gt: new Date()}}
        })
        .exec((err, foundRental)=>{
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            if(foundRental.user.id !== user.id){

                return res.status(422).send({errors: [{title: 'error', detail: 'you are not permitted to delete this rental'}]});
            }
            if(foundRental.bookings.length > 0){
                return res.status(422).send({errors: [{title: 'Error: Active bookings', detail: 'cannot delete rental with active bookings'}]});

            }
            foundRental.remove((err)=>{
                console.log('got to delete area');
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
                return res.json({"status": "deleted"})
            })
        })
});

router.post('', userController.authMiddleware, function(req, res){
    const {title, city, street, category, image, bedrooms, squareFootage, shared, description, dailyRate} = req.body;
    const user = res.locals.user;

    const rental = new Rental({title, city, street, category, image, bedrooms, squareFootage, shared, description, dailyRate});
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
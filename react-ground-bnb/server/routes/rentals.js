const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

router.get('', function(req, res){
    Rental.find({}, function(err, foundRentals){
        res.json(foundRentals);
    });
});

router.get('/:id', function(req, res){
    Rental.findById(req.params.id, function(err, foundRental){
        if(err){
            res.status(422).send({errors: [{title: 'error', detail: 'could not find rental'}]});
        }
        else{
            res.json(foundRental);
        }

    });
});

module.exports = router;
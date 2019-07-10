const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/auth', function(req, res){

});

router.post('/register', function(req, res){

    const {username, email, password, passwordConfirmation} = req.body;

    if(!username || !email){
       return res.status(422).send({errors: [{title: 'Missing Data', detail: 'Provide email and password'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Password Error', detail: 'Passwords do not match'}]});
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: [{title: 'mongoose', detail: 'mongoose error'}]});
        }
        if(existingUser){
            return res.status(422).send({errors: [{title: 'exists', detail: 'user with this email already exists'}]});
        }

        const user = new User({username, email, password});
        user.save(function (err){
            if (err) {
               return res.status(422).send({errors: [{title: 'mongoose', detail: 'mongoose error'}]});
            }
            else {
                return res.json({"registered": true})
            }
         })
        });
    //res.json({username, email});
    });

module.exports = router;
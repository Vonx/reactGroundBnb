const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/def');
const {normalizeErrors} = require('../helpers/mongoose');

router.post('/auth', function(req, res){
    const {email, password} = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Missing Data', detail: 'Provide email and password'}]});
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(!existingUser){
            return res.status(422).send({errors: [{title: 'does not exist', detail: 'user does not exist '}]});
        }

        if(existingUser.hasSamePassword(password)){
            const token = jwt.sign({
                userId: existingUser.id,
                username: existingUser.username
            }, config.SECRET, { expiresIn: '1h' });

            return res.json(token);
            }

        else{
            return res.status(422).send({errors: [{title: 'Bad credentials', detail: 'wrong email or password'}]});
        }
        });
    });

router.post('/register', function(req, res){

    const {username, email, password, passwordConfirmation} = req.body;

    if(!password || !email){
       return res.status(422).send({errors: [{title: 'Missing Data', detail: 'Provide username and password'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Password Error', detail: 'Passwords do not match'}]});
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(existingUser){
            return res.status(422).send({errors: [{title: 'exists', detail: 'user with this email already exists'}]});
        }

        const user = new User({username, email, password});
        user.save(function (err){
            if (err) {
               return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            else {
                return res.json({"registered": true})
            }
         })
        });
    //res.json({username, email});
    });

module.exports = router;
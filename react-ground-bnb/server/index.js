const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/def');

// Connection URL

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true });

app.get('/rentals', function(req, res) {

    res.json({'success': true});

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){console.log('i am running')});


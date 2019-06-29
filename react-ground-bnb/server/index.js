const express = require('express');
const mongoose = require('mongoose');
const app = express();
const rentalRoutes = require('./routes/rentals');
const config = require('./config/def');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

// Connection URL

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(()=>{

    const fakeDb = new FakeDb();
    fakeDb.seedDb();
}).catch(err => console.error(err));

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){console.log('i am running')});


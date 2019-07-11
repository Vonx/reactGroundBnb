const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/def');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users');

// Connection URL

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(()=>{
    const fakeDb = new FakeDb();
    //fakeDb.seedDb();
}).catch(err => console.error(err));

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

const PORT = 3001;

app.listen(PORT, function(){console.log('i am running')});

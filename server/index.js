const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');
const path = require('path');

const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings');


// Connection URL

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(()=>{

    if (process.env.NODE_ENV !== 'production'){
        const fakeDb = new FakeDb();
        // fakeDb.seedDb();
    }
}).catch(err => console.error(err));

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

if (process.env.NODE_ENV === 'production'){
    const appPath = path.join(__dirname, '..', 'build');
    app.use(express.static(appPath));

    app.get('*', function(req, res){
        res.sendFile(path.resolve(appPath, 'index.html'));
    });

}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){console.log('i am running on port ' + PORT)});


const Rental = require('./models/rental');
const User = require('./models/user');
const fakeData = require('./data');
const Booking = require('./models/booking');

class FakeDb {

    constructor(){
        this.rentals = fakeData.rentals;

        this.users = fakeData.users;
    };
     pushDatatoDb() {
         const user = new User(this.users[0]);
         const user1 = new User(this.users[1]);

        this.rentals.forEach((rental) =>{
        const newRental = new Rental(rental);
        newRental.user = user;

        user.rentals.push(newRental);
            newRental.save();
        });

        user.save();
        user1.save();
    }
    async cleanDb(){
        await User.deleteMany({});
        await Rental.deleteMany({});
        await Booking.deleteMany({});
    }
    async seedDb() {

        await this.cleanDb();
        this.pushDatatoDb();
    }
}

module.exports = FakeDb;
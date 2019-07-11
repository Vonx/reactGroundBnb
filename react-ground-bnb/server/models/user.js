const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({

    username: {type: String,
        max: [32, 'Too long, max is 32 characters'],
        min: [4, 'Too short, min is 4 characters']},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        max: [32],
        min: [4],
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {type: String, required: 'Password is required', max: [32, 'Too long, max is 32 characters'], min: [4, 'Too short, min is 4 characters']},
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
});


userSchema.methods.hasSamePassword = function(reqPassword){
    return bcrypt.compareSync(reqPassword, this.password);
};

userSchema.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();// Store hash in your password DB.
        });
    });
});

module.exports = mongoose.model('User', userSchema);
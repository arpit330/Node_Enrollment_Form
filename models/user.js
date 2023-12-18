const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    batch: {
        type: String,
        required: true
    },
    creditCardNumber: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    cardExpiry: {
        type: String,
        required: true
    },
    feePaid: {
        type: Boolean,
        required: true
    },
    paymentDate: {
        type: Date
    }
});

// yourSchema.pre('save', function (next) {
//     // Update paymentDate to the current date and time
//     this.paymentDate = new Date();
//     next();
// });

const User = mongoose.model('Users', UserSchema);

module.exports = User;
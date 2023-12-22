const mongoose = require('mongoose');
const User = require('./user');



const paymentDetailsSchema = new mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creditCardNumber: {
        type: String,
        required: true
    },
    cvv:
    {
        type: String,
        required: true
    },
    cardExpiry:
    {
        type: String,
        required: true
    },
    paymentDate:
    {
        type: Date,
        default: Date.now
    },
});

const Payment = mongoose.model('Payments', paymentDetailsSchema);

module.exports = Payment;
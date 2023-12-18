const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', async (req, res) => {
    // res.send("hello");
    res.sendFile(path.join(__dirname, '../public', 'form.html'));
});

async function CompletePayment(userData) {
    console.log('Mock payment function called with data:', userData);
    return { success: true, transactionId: 'mock-transaction-id' };
};

router.post('/', async (req, res) => {
    // console.log(req.body);

    try {
        var user = await User.findOne({ email: req.body.email })

        const paymentStatus = await CompletePayment(req.body);
        if (!paymentStatus) {
            res.status(400).send("Payment Failed");
        }


        if (!user) {
            user = {
                email: req.body.email,
                username: req.body.username,
                mobile: req.body.mobile,
                age: req.body.age,
                batch: req.body.batch,
                creditCardNumber: req.body.creditCardNumber,
                cvv: req.body.cvv,
                cardExpiry: req.body.cardExpiry,
                paymentDate: new Date(),
                feePaid: true,
            }

            const newUser = new User(user);

            await newUser.save();

        }
        else {
            const update = {
                $set: {
                    age: req.body.age,
                    batch: req.body.batch,
                    creditCardNumber: req.body.creditCardNumber,
                    cvv: req.body.cvv,
                    cardExpiry: req.body.cardExpiry,
                    feePaid: true,
                    paymentDate: new Date(),
                }
            };
            await User.updateOne({ email: req.body.email }, update);
        }
        res.status(200).send("User Enrolled Successfully")
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/user');
const Payment = require('../models/payment');
const { log } = require('console');

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
            res.status(500).render(path.join(__dirname, '../public', 'error.ejs'), { errorMessage: err.message });
        }


        if (!user) {
            user = {
                email: req.body.email,
                username: req.body.username,
                mobile: req.body.mobile,
                age: req.body.age,
                batch: req.body.batch,
                feePaid: true,
            }



            const newUser = new User(user);

            const savedUser = await newUser.save()

            const newPayment = new Payment({
                user_id: savedUser._id,
                creditCardNumber: req.body.creditCardNumber,
                cvv: req.body.cvv,
                cardExpiry: req.body.cardExpiry,
                paymentDate: new Date(),
            });

            await newPayment.save();


        }
        else {
            const updateUser = {
                $set: {
                    age: req.body.age,
                    batch: req.body.batch,
                }
            };

            const updatePayment = {
                $set: {
                    creditCardNumber: req.body.creditCardNumber,
                    cvv: req.body.cvv,
                    cardExpiry: req.body.cardExpiry,
                    paymentDate: new Date(),
                }
            };

            await User.updateOne({ email: req.body.email }, updateUser);
            await Payment.updateOne({ user_id: user._id }, updatePayment);
            // await newPayment.save();
        }
        console.log('User and Payment data saved successfully:');

        res.status(200).sendFile(path.join(__dirname, '../public', 'success.html'));
    }
    catch (err) {
        console.log("error occured");
        res.status(500).render(path.join(__dirname, '../public', 'error.ejs'), { errorMessage: err.message });
        // res.status(401).json({ message: err.message });
    }
})

module.exports = router;
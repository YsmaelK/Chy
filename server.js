// const express = require('express');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const path = require('path');
// const Stripe = require('stripe')('sk_test_51O8DXGKvrB6fpE6ln8MED2TkIDN7VV4QwhnLJjFrFnyh6SlTa0qizw84hKCJ61oKVjbfeOLCTD4RVOzn0rkD9Jfr00poYRsDfr');
// var cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));
// app.use(cors());

// const port = process.env.PORT || 3000;

// app.listen(port, error => {
//     if(error) throw error;
//     console.log('Server is running on port 3000')
// });

// app.post('/review', async(req,res)=> {
//     let status, error;
//     const{token,amount} = req.body;
//     try {
//         await Stripe.charges.create({
//             source : token.id,
//             amount,
//             currency:'usd',
//         })
//         status= 'success';
//     } catch (error) {
//         console.log(error);
//         status='failure';
//     }
//     res.json({error,status});
// });
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());

// Initialize Nodemailer transporter with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Cloud Function to handle Firestore trigger
exports.sendApprovalEmail = functions.firestore
  .document('product/{productId}')
  .onCreate(async (snapshot, context) => {
    try {
      const productData = snapshot.data();

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'ysmaelkamgaing@gmail.com',
        subject: 'New Product Approval',
        text: `New product added: ${productData.name}. Approve it on the admin dashboard.`,
      };

      await transporter.sendMail(mailOptions);

      console.log('Email sent successfully');
      return null;
    } catch (error) {
      console.error('Error sending email:', error);
      return null;
    }
  });

// Expose Express app as a function
exports.api = functions.https.onRequest(app);

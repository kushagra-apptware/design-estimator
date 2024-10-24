// server/index.js
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // use your email provider's service (e.g., 'hotmail', 'yahoo')
  auth: {
    user: process.env.GMAIL_USER, // Use the environment variable
    pass: process.env.GMAIL_PASS, // Use the environment variable
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Message from ${name}`,
    text: message
  };

  /* transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sent: ' + info.response);
  }); */
});

app.listen(PORT, () => {
  console.log('Server started on port 3001');
});

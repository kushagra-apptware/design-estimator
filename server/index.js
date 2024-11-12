// server/index.js
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

// Set up multer for file handling
const upload = multer({ dest: 'uploads/' });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // use your email provider's service (e.g., 'hotmail', 'yahoo')
  auth: {
    user: process.env.GMAIL_USER, // Use the environment variable
    pass: process.env.GMAIL_PASS // Use the environment variable
  }
});

app.post('/send-email', upload.single('attachment'), async (req, res) => {
  const { name, email, message } = req.body;
  const filePath = req?.file?.path;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Message from ${name}`,
    text: message,
    attachments: [
      {
        filename: req?.file?.originalname,
        path: filePath
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    fs.unlinkSync(filePath); // Delete the file after sending
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email');
  }
});

app.listen(PORT, () => {
  console.log('Server started on port 3001');
});

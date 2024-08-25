const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML and CSS)
app.use(express.static('public'));

// Route to handle the form submission
app.post('/send-email', (req, res) => {
    const { subject, message } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or any other SMTP service like outlook
        auth: {
            user: 'your-email@gmail.com', // your email address
            pass: 'your-email-password' // your email password
        }
    });

    // Email options
    let mailOptions = {
        from: 'your-email@gmail.com', // sender address
        to: 'buehler.joel@gmail.com', // receiver email
        subject: subject,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Fehler beim Senden der E-Mail' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'E-Mail erfolgreich gesendet' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
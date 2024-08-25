const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path'); // Benötigt für den Umgang mit Dateipfaden

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware, um statische Dateien zu bedienen
app.use(express.static(path.join(__dirname, 'public')));

// Standardroute für index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Beispiel für E-Mail-Versand (kann auf deine Bedürfnisse angepasst werden)
app.post('/send-email', (req, res) => {
    const { subject, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'buehler.joel@gmail.com',
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Fehler beim Senden der E-Mail');
        } else {
            console.log('E-Mail gesendet: ' + info.response);
            return res.status(200).send('E-Mail erfolgreich gesendet');
        }
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
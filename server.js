const express = require('express');
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
app.post('/send-email', async (req, res) => {
    const { subject, message } = req.body;

    try {
        const toAddress = new EmailAddress("buehler.joel@gmail.com");
        const emailMessage = new EmailMessage()
            .setSenderAddress("DoNotReply@buehler.work")  // Verwende hier deine Domain
            .setToRecipients(toAddress)
            .setSubject(subject)
            .setBodyPlainText(message);

        const poller = emailClient.beginSend(emailMessage, null);
        const result = await poller.waitForCompletion();

        if (result.error) {
            throw new Error(result.error.message);
        } else {
            console.log("E-Mail erfolgreich gesendet:", result);
            res.status(200).send('E-Mail erfolgreich gesendet');
        }
    } catch (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
        res.status(500).send('Fehler beim Senden der E-Mail');
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
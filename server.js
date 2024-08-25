const express = require('express');
const path = require('path');
const { EmailClient } = require("@azure/communication-email");

const app = express();
const PORT = process.env.PORT || 3002;

// Azure Communication Services Connection String
const connectionString = "endpoint=https://pict-commsvc1-csn.switzerland.communication.azure.com/;accesskey=80Rkf6YqvN37NlxPiSV7PWYigg6ERbi3oHXDvZelRRuADJIqdM6nJQQJ99AHACULyCpw1ebAAAAAAZCSP7Ww";
const client = new EmailClient(connectionString);

// Middleware, um JSON-Daten und URL-kodierte Daten zu verarbeiten
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware, um statische Dateien zu bedienen
app.use(express.static(path.join(__dirname, 'public')));

// Standardroute für index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route für das Kontaktformular
app.post('/send-email', async (req, res) => {
    const { subject, message } = req.body;
    console.log(req.body);  // Protokolliert den Inhalt von req.body

    try {
        const emailMessage = {
            senderAddress: "DoNotReply@buehler.work", // Deine Domain für den Absender
            content: {
                subject: subject,
                plainText: message,
            },
            recipients: {
                to: [{ address: "buehler.joel@gmail.com" }], // Empfänger-E-Mail-Adresse
            },
        };

        const poller = await client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();

        if (result.error) {
            throw new Error(result.error.message);
        } else {
            console.log("E-Mail erfolgreich gesendet:", result);
            res.status(200).send('E-Mail erfolgreich gesendet');
        }
    } catch (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
        res.status(500).send(`Fehler beim Senden der E-Mail: ${error.message}`);
    }
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
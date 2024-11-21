const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Endpoint to handle flyer requests
app.post('/create-flyer', async (req, res) => {
    const userPrompt = req.body.prompt;

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: 1,
                size: "1024x1024"
            })
        });

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            res.json({ imageUrl: data.data[0].url });
        } else {
            res.status(500).json({ error: 'No image generated from DALL·E.' });
        }
    } catch (error) {
        console.error('Error generating flyer:', error);
        res.status(500).json({ error: 'Failed to generate flyer.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

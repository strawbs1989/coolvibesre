async function sendMessage(event) {
            if (event.key === "Enter") {
                const input = document.getElementById('userInput');
                const message = input.value;
                input.value = "";

                // Display user message
                const chatbox = document.getElementById('chatbox');
                chatbox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

                // Detect commands
                if (message.toLowerCase().startsWith("create a flyer")) {
                    const flyerDetails = message.replace('create a flyer', '').trim();
                    const flyerImageUrl = await generateFlyer(flyerDetails);

                    // Display the flyer
                    if (flyerImageUrl) {
                        chatbox.innerHTML += `
                            <div><strong>Laura:</strong> Here's your flyer!</div>
                            <div class="image-container"><img src="${flyerImageUrl}" alt="Generated Flyer"></div>
                        `;
                    } else {
                        chatbox.innerHTML += `<div><strong>Laura:</strong> Sorry, I couldn't create the flyer. Please try again!</div>`;
                    }
                } else if (message.toLowerCase().startsWith("help with coding")) {
                    // Example for coding help
                    chatbox.innerHTML += `
                        <div><strong>Laura:</strong> Sure! Let me know your coding issue or what you're trying to build.</div>
                    `;
                } else {
                    // General chat fallback
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
                        },
                        body: JSON.stringify({
                            model: "gpt-4",
                            messages: [{ role: "user", content: message }]
                        })
                    });
                    const data = await response.json();
                    const botMessage = data.choices[0].message.content;

                    // Display bot response
                    chatbox.innerHTML += `<div><strong>Laura:</strong> ${botMessage}</div>`;
                }

                // Scroll to bottom
                chatbox.scrollTop = chatbox.scrollHeight;
            }
        }

        // Function to generate the flyer using DALL·E API
        async function generateFlyer(details) {
            try {
                const response = await fetch('http://localhost:3000/create-flyer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: `Create a flyer with the following details: ${details}`
                    })
                });

                const data = await response.json();

                if (data.imageUrl) {
                    return data.imageUrl;
                }
            } catch (error) {
                console.error('Error generating flyer:', error);
                return null;
            }
        }
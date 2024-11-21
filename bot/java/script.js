async function sendMessage(event) {
            if (event.key === "Enter") {
                const input = document.getElementById('userInput');
                const message = input.value;
                input.value = "";

                // Display user message
                const chatbox = document.getElementById('chatbox');
                chatbox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

                // Check if the user wants to create a flyer
                if (message.toLowerCase().includes('create a flyer')) {
                    const prompt = message.replace('create a flyer', '').trim();
                    const flyerImageUrl = await generateFlyer(prompt);

                    // Display flyer image
                    chatbox.innerHTML += `
                        <div><strong>Laura:</strong> Here is your flyer!</div>
                        <div class="image-container"><img src="${flyerImageUrl}" alt="Generated Flyer"></div>
                    `;
                } else {
                    // Call OpenAI API for general conversation
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

                // Scroll chatbox to the bottom
                chatbox.scrollTop = chatbox.scrollHeight;
            }
        }

        // Function to generate the flyer using DALL·E API
        async function generateFlyer(prompt) {
            const response = await fetch('http://localhost:3000/create-flyer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            });

            const data = await response.json();

            if (data.imageUrl) {
                return data.imageUrl;
            } else {
                return 'https://via.placeholder.com/400'; // Placeholder if flyer generation fails
            }
        }
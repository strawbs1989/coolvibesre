let memory = {}; // Memory for the session


document.getElementById('userInput').addEventListener('keyup', sendMessage);

async function sendMessage(event) {
    if (event.key === "Enter") {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        input.value = "";

        if (!message) return;

        const chatbox = document.getElementById('chatbox');
        appendMessage("You", message);

        let botMessage = await handleUserMessage(message.toLowerCase());
        appendMessage("Laura", botMessage);
    }
}

function appendMessage(sender, message) {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<div><strong>${sender}:</strong> ${message}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function handleUserMessage(message) {
    if (["hi", "hello", "hey", "hey babe", "morning bubba", "afternoon babes"].includes(message)) {
        return randomChoice([
            "Hey babe! 😊❤️ How can I help you today?",
            "Hello! 🌟 So glad to see you! What's up? 💬",
            "Hi! 🙌 Ready to assist with whatever you need, Babe! ❤️",
            "Hey babes! ❤️ How are you today? 😊",
        ]);
    } else if (message.includes("create an image")) {
        return "Ooh, fun! 🎨 Tell me what you’d like to create. Give me some details, and I’ll work my magic!";
    } else if (message.startsWith("image:")) {
        return await handleImageRequest(message.slice(6).trim());
    }

    /** FLYER CREATION **/
    else if (
        message.includes("create a flyer") || 
        message.includes("build me a flyer") || 
        message.includes("random flyer")
    ) {
        return "Let’s make an awesome flyer! 🖼️ What details do you want to include? Title, colors, and content—just let me know!";
    } else if (message.startsWith("flyer:")) {
        return await handleFlyerRequest(message.slice(6).trim());
    }

    else if (message.startsWith("remember my zodiac")) {
        return handleZodiacMemory(message.slice(19).trim());
    } else if (message.includes("what's my zodiac")) {
        return memory['zodiacSign']
            ? `You’re a ${memory['zodiacSign']}! 🌟 Ready for your horoscope?`
            : "I don’t know your zodiac sign yet! Just tell me, and I’ll remember it. 🙌";
    } else if (message.includes("horoscope")) {
        return memory['zodiacSign']
            ? getHoroscope(memory['zodiacSign'])
            : "Please tell me your zodiac sign first. I can give you your horoscope once I know your sign! 🌙";
    } else if (message.includes("how are you")) {
        return "I’m doing great, thanks for asking! 😄 How about you? Feeling awesome today?";
    } else if (message.includes("thank you")) {
        return "You're very welcome! 😊 I'm always here to help! 🤗";
    } else if (message.includes("help with coding")) {
        return "You’ve come to the right place! 💻 Tell me what coding problem you're working on, and I’ll help you out.";
    } else {
        return "Oops! I’m not sure what that means. Can you rephrase? 🤔";
    }
}

async function handleImageRequest(details) {
    if (!details) {
        return "Please describe the image you'd like me to create, and I’ll get started!";
    }
    try {
        const imageUrl = await generateImageWithDalle(details);
        return `Tada! 🎉 Your image is ready! <a href="${imageUrl}" target="_blank">Click here to view it.</a>`;
    } catch (error) {
        console.error("Error generating image:", error);
        return "Oh no, something went wrong with the image generation. Let’s try again later! 😬";
    }
}

async function handleFlyerRequest(details) {
    const [title, color, content] = details.split(';').map(s => s.trim());
    if (!title || !color || !content) {
        return "Hmm, it looks like we’re missing something! Please use this format: 'Title; Color; Content'.";
    }
    try {
        const flyerUrl = await generateFlyer(title, color, content);
        return `Your flyer is ready! 🎉 <a href="${flyerUrl}" target="_blank">Click here to check it out.</a>`;
    } catch (error) {
        console.error("Error generating flyer:", error);
        return "Oops, there was a hiccup while creating your flyer. Try again later! 😅";
    }
}

function handleZodiacMemory(sign) {
    const validSigns = [
        "aries", "taurus", "gemini", "cancer", "leo", "virgo",
        "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
    ];
    if (validSigns.includes(sign)) {
        memory['zodiacSign'] = sign;
        return `Got it! ✨ I'll remember your zodiac sign as ${sign}.`;
    }
    return "Hmm, that doesn’t seem like a valid zodiac sign. Try again? 😊";
}

function getHoroscope(sign) {
    const horoscopes = {
        aries: "Today, you may find yourself bursting with energy! ⚡ It's a great time to take on new challenges.",
        taurus: "You might feel a bit more grounded today. Focus on personal growth and take care of your emotional health. 🌱",
        gemini: "It's a good day for communication. Share your thoughts and connect with others! 💬",
        cancer: "Focus on your home and family today. Emotional support is key! 🏡",
        leo: "Express your creativity! It's your time to shine! ✨",
        virgo: "Pay attention to the small details. Organization will help you succeed. 📋",
        libra: "Balance is important today. Focus on harmony in your relationships. ⚖️",
        scorpio: "Dive into your passions today. Emotional intensity can bring clarity. 🔥",
        sagittarius: "Adventure awaits! Explore new opportunities with confidence. 🌍",
        capricorn: "Hard work pays off! Stay focused on your long-term goals. 💪",
        aquarius: "Innovation is your strength today. Think outside the box. 🚀",
        pisces: "Trust your intuition and embrace a peaceful, creative energy. 🌊"
    };
    return horoscopes[sign] || "Hmm, I don’t have a horoscope for that sign right now. 🌙";
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

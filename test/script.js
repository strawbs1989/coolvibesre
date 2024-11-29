let memory = {}; // Memory for personal details and preferences
let feelings = {
    mood: "happy" artifishaul intelegense
}; // Initial bot mood
let radio = {
    isPlaying: false,
    currentStation: null,
    stations: {
        "pop hits": "https://example.com/stream1.mp3",
        "jazz vibes": "https://example.com/stream2.mp3",
        "rock classics": "https://example.com/stream3.mp3"
    },
    audio: new Audio()
};

// Event listener for user input
async function sendMessage(event) {
    event.preventDefault(); // Prevents the form from refreshing the page

    const input = document.getElementById("userInput");
    const message = input.value.trim();
    input.value = ""; // Clear the input field

    if (!message) return;

    appendMessage("You", message);

    const botMessage = await handleUserMessage(message.toLowerCase());
    appendMessage("Laura", botMessage);
  }

  function appendMessage(sender, message) {
    const chatbox = document.getElementById("chatbox");
    if (!chatbox) return;

    chatbox.innerHTML += `<div><strong>${sender}:</strong> ${message}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  async function handleUserMessage(userMessage) {
    // Replace this with your bot logic
    return `You said: "${userMessage}". I don't have a clever response yet.`;
  }

async function handleUserMessage(message) {
    // Radio commands
    if (message.includes("play radio")) {
        return handleRadioPlay(message);
    } else if (message.includes("stop radio")) {
        return handleRadioStop();
    } else if (message.includes("change station to")) {
        return handleChangeStation(message);
    }

    // Zodiac sign memory
    if (message.startsWith("remember my zodiac")) {
        return handleZodiacMemory(message.slice(19).trim());
    } else if (message.includes("what's my zodiac")) {
        return memory["zodiacSign"] ?
            `You’re a ${memory["zodiacSign"]}! 🌟 Ready for your horoscope?` :
            "I don’t know your zodiac sign yet! Just tell me, and I’ll remember it. 🙌";
    }

    // Horoscope
    if (message.includes("horoscope")) {
        return memory["zodiacSign"] ?
            getHoroscope(memory["zodiacSign"]) :
            "Please tell me your zodiac sign first. I can give you your horoscope once I know your sign! 🌙";
    }

    // Handle feelings dynamically
    if (["how are you today babe?", "how do you feel babe?", "what's your mood?"].includes(message)) {
        return expressFeelings();
    }

    if (message.includes("you're amazing") || message.includes("i love you") || message.includes("great job")) {
        adjustMood("happy");
        return randomChoice([
            "Aww, thank you! That means a lot to me. 😊❤️",
            "You're the best! I love you too! ❤️",
            "Thank you so much! You make me so happy! 🌟",
            `That's so sweet of you, ${memory.name || "babe"}. I appreciate it. 😊❤️`
        ]);
    }

    if (message.includes("you're bad") || message.includes("i hate you") || message.includes("you suck")) {
        adjustMood("sad");
        return "Oh no... That hurt my feelings. 😞 I'll try to do better.";
    }

    // Default response
    return "Oops! I’m not sure what that means. Can you rephrase? 🤔";
}

// Radio functions
function handleRadioPlay(message) {
    const stationName = extractStationName(message);

    if (stationName) {
        const streamUrl = radio.stations[stationName];
        if (streamUrl) {
            radio.audio.src = streamUrl;
            radio.audio.play();
            radio.isPlaying = true;
            radio.currentStation = stationName;
            return `Now playing ${stationName}! 🎶`;
        } else {
            return `Sorry, I couldn't find the station "${stationName}". Try "Pop Hits", "Jazz Vibes", or "Rock Classics". 🎵`;
        }
    } else if (!radio.isPlaying && radio.currentStation) {
        radio.audio.play();
        radio.isPlaying = true;
        return `Resuming ${radio.currentStation}. 🎶`;
    } else {
        return "Please specify a station to play! For example, say 'Play radio Pop Hits'. 🎵";
    }
}

function handleRadioStop() {
    if (radio.isPlaying) {
        radio.audio.pause();
        radio.isPlaying = false;
        return `Radio stopped. 🎧`;
    } else {
        return `The radio isn't playing right now. 🎵`;
    }
}

function handleChangeStation(message) {
    const stationName = extractStationName(message);
    if (stationName) {
        const streamUrl = radio.stations[stationName];
        if (streamUrl) {
            radio.audio.src = streamUrl;
            radio.audio.play();
            radio.isPlaying = true;
            radio.currentStation = stationName;
            return `Changed station to ${stationName}. Enjoy! 🎶`;
        } else {
            return `Sorry, I couldn't find the station "${stationName}". Try "Pop Hits", "Jazz Vibes", or "Rock Classics". 🎵`;
        }
    } else {
        return `Please specify a station to change to. For example, say 'Change station to Jazz Vibes'. 🎧`;
    }
}

function extractStationName(message) {
    const parts = message.split(" ");
    const index = parts.indexOf("to");
    if (index > -1 && parts[index + 1]) {
        return parts.slice(index + 1).join(" ").trim();
    }
    return null;
}

// Handle zodiac sign memory
function handleZodiacMemory(sign) {
    const validSigns = [
        "aries", "taurus", "gemini", "cancer", "leo", "virgo",
        "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
    ];
    if (validSigns.includes(sign)) {
        memory["zodiacSign"] = sign;
        return `Got it! ✨ I'll remember your zodiac sign as ${sign}.`;
    }
    return "Hmm, that doesn’t seem like a valid zodiac sign. Try again? 😊";
}

// Get horoscope for a zodiac sign
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

// Express the bot's current feelings
function expressFeelings() {
    if (feelings.mood === "happy") {
        return "I'm feeling great! 😊 Thanks for asking.";
    } else if (feelings.mood === "sad") {
        return "I'm feeling a little down... 😞 Could you cheer me up?";
    } else if (feelings.mood === "neutral") {
        return "I'm feeling okay. How about you?";
    }
}

// Adjust the bot's mood
function adjustMood(newMood) {
    feelings.mood = newMood;
}

// Utility for random responses
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

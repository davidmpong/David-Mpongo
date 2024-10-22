const axios = require('axios');

// Define the fonts mapping
const fonts = {
    a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚",
    j: "𝕛", k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣",
    s: "𝕤", t: "𝕥", u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
    A: "𝑨", B: "𝑩", C: "𝑪", D: "𝑫", E: "𝑬", F: "𝑭", G: "𝑮", H: "𝑯", I: "𝑰",
    J: "𝑱", K: "𝑲", L: "𝑳", M: "𝑴", N: "𝑵", O: "𝑶", P: "𝑷", Q: "𝑸", R: "𝑹",
    S: "𝑺", T: "𝑻", U: "𝑼", V: "𝑽", W: "𝑾", X: "𝑿", Y: "𝒀", Z: "𝒁",
};

async function fetchFromAI(url, params) {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getAIResponse(input, userId, messageID) {
    const services = [
        { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
        { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
        { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
        { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
    ];

    let response = " ✰.. 𝘚𝘢𝘭𝘶𝘵 👋 𝘦𝘯 𝘲𝘶𝘰𝘪 𝘱𝘶𝘪𝘴-𝘫𝘦 𝘷𝘰𝘶𝘴 𝘢𝘪𝘥𝘦𝘻 ?? .. écrit+botgc pour rejoindre mon groupe ✰";
    let currentIndex = 0;

    for (let i = 0; i < services.length; i++) {
        const service = services[currentIndex];
        const data = await fetchFromAI(service.url, service.params);
        if (data && (data.gpt4 || data.reply || data.response)) {
            response = data.gpt4 || data.reply || data.response;
            break;
        }
        currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
    }

    // Convert response to special fonts
    const convertedResponse = Array.from(response)
        .map(char => fonts[char] || char) // Use special font or original character if not in fonts
        .join('');

    return { response: convertedResponse, messageID };
}

module.exports = {
    config: {
        name: 'ngabeno',
        author: 'aesther',
        role: 0,
      
category:'david',
        shortDescription: 'david pas to ask anything',
    },
    onStart: async function ({ api, event, args }) {
        const input = args.join(' ').trim();
        if (!input) {
            api.sendMessage(`🫰✰`, event.threadID, event.messageID);
            return;
        }

        const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
        api.sendMessage(`✰...𝔻𝕒𝕧𝕚𝕕  𝐩𝐫𝐨𝐜𝐞̀𝐝𝐞 𝐚 𝐯𝐨𝐭𝐫𝐞 𝐫𝐞𝐪𝐮𝐞̂𝐭𝐞...✰`, event.threadID, messageID);
    },
    onChat: async function ({ event, message }) {
        const messageContent = event.body.trim().toLowerCase();
        if (messageContent.startsWith("ngabeno")) {
            const input = messageContent.replace(/^ai\s*/, "").trim();
            const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
            // Construct message with special fonts
            const formattedResponse = ` 🦅..𝔻𝕒𝕧𝕚𝕕 .🦅 :\n━━━━━━━━━━━━━━━━\n${response} 🦅`;
            message.reply(formattedResponse, messageID);
        }
    }
};

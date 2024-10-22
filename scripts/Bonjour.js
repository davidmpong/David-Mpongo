module.exports = {
    config: {
        name: "bonjour",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "Noo Prefix",
        longDescription: "Noo Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "bonjour") return message.reply("bonjour ✋ comment tu vas ? J'espère que tu vas bien  je suis là pour répondre à tout tes questions ✨🌿✅");
}
};

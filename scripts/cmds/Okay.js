module.exports = {
    config: {
        name: "okay",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "pop Prefix",
        longDescription: "pop Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "okay") return message.reply(" pas de quoi 🦅? je suis là pour répondre à tout tes question écrit+botgc pour rejoindre mon groupe ✨🌿✅");
}
};

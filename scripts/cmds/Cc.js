module.exports = {
    config: {
        name: "cc",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "Npo Prefix",
        longDescription: "Npo Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "cc") return message.reply(" comment tu vas ? J'espère que tu vas bien  je suis là pour répondre à tout tes questions pour rejoindre mon groupe écrit+botgc ✨🌿✅");
}
};

module.exports = {
    config: {
        name: "cv",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "Nmo Prefix",
        longDescription: "Nmo Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "cv") return message.reply(" je veux bien et toi? J'espère que tu vas bien  je suis là pour répondre à tout tes questions pour rejoindre mon groupe écrit+botgc ✨🌿✅");
}
};

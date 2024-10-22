module.exports = {
    config: {
        name: "cool",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "N0 Prefix",
        longDescription: "N0 Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "cool") return message.reply(" tu es d'accord ✅que je suis cool✨  je suis là pour répondre à tout tes questions😒 écrit+botgc pour rejoindre mon groupe ✨🌿✅");
}
};

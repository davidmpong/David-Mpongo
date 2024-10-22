dule.exports = {
    config: {
        name: "bonsoir",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "Nopo Prefix",
        longDescription: "Nopo Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "bonsoir") return message.reply("bonsoir ✋ comment tu vas ? J'espère que tu vas bien  je suis là pour répondre à tout tes questions écrit+botgc pour intégrer mon groupe ✨🌿✅");
}
};

module.exports = {
    config: {
        name: "ok",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "N0m Prefix",
        longDescription: "N0m Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "ok") return message.reply(" tu es d'accord que David mpongo✨ est un génie ✨ de la technologie 💉 écrit+botgc pour rejoindre mon groupe ✨🌿✅");
}
};

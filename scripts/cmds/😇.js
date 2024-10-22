module.exports = {
    config: {
        name: "😇",
        version: "1.0",
        author: "David",
        countDown: 5,
        role: 0,
        shortDescription: "commande😵 🦅",
        longDescription: "commande Ok🤕🦅",
        category: "reply",
    },
    onStart: async function(){}, 
    onChat: async function({
        event,
        message,
        getLang
    }) {
        if (event.body && event.body.toLowerCase() == "😇",) return message.reply("🙂🙂");
    }
}

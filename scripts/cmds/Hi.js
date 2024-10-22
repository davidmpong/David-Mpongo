module.exports = {
    config: {
        name: "hi",
        version: "1.0",
        author: "Jaychris Garcia",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "hi") return message.reply("🌹𝐇𝐢 𝐦𝐲 𝐟𝐫𝐢𝐞𝐧𝐝...😊 𝐜𝐨𝐦𝐦𝐞𝐧𝐭 𝐭𝐮 𝐭𝐞 𝐩𝐨𝐫𝐭𝐞𝐬😋 🌹?");
}
};

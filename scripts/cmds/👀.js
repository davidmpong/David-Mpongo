module.exports = {
	config: {
			name: "👀",
			version: "1.0",
			author: "Shizuka",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasmd",
			longDescription: "sarcasmd",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "👀") return message.reply("espèces d'espion ✨ minable écrit ✍️au lieu d'espionner ✅");
}
};

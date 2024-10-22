module.exports = {
	config: {
			name: "☺️",
			version: "1.0",
			author: "Shizuka",
			countDown: 5,
			role: 0,
			shortDescription: "s😭arcasm",
			longDescription: "s😭arcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "☺️") return message.reply("😚");
}
};

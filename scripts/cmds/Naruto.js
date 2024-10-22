+cmd install Itachi.js module.exports = {
	config: {
			name: "Naruto",
			version: "1.0",
			author: "Shibai Otsutsuki",
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
	if (event.body && event.body.toLowerCase() == "Naruto") return message.reply("quoi qu'il arrive🤕 un jour 🤒je deviendrais Hokage ☝️🌼😇");
}
};

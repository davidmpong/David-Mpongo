module.exports = {
  config: {
    name: "ping",
    aliases: ["p"],
    version: "1.0",
    author: "--USER--",
    role: 2,
    shortDescription: {
      en: "Displays the bot's ping and uptime."
    },
    longDescription: {
      en: "Measures the bot's ping and shows how long it has been running."
    },
    category: "System",
    guide: {
      en: "Use {p}ping to display the bot's ping and uptime."
    }
  },
  onStart: async function ({ api, event }) {
    // Send the initial message
    api.sendMessage("⏳ Wait boss, checking Itachi's ping...", event.threadID, async (err, messageInfo) => {
      if (err) return console.error(err);

      // Wait for a moment to simulate ping check
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Calculate the uptime
      const uptime = process.uptime();
      const seconds = Math.floor(uptime % 60);
      const minutes = Math.floor((uptime / 60) % 60);
      const hours = Math.floor((uptime / (60 * 60)) % 24);
      const days = Math.floor(uptime / (60 * 60 * 24));
      const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

      // Get the current time to calculate ping
      const start = Date.now();

      // Send a message to calculate ping time
      api.sendMessage("📡 Calculating ping...", event.threadID, async (err, pingMessageInfo) => {
        if (err) return console.error(err);

        const end = Date.now();
        const ping = end - start;

        // Unsend the initial message
        api.unsendMessage(messageInfo.messageID, (err) => {
          if (err) return console.error(err);

          // Send the final message with ping and uptime
          api.sendMessage(`📶 Ping: ${ping}ms \n⏱️ Uptime: ${uptimeString}`, event.threadID);
        });
      });
    });
  }
};

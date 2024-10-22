module.exports = {
  config: {
    name: "respect",
    aliases: [],
    version: "1.0",
    author: "AceGun x Samir Œ",
    countDown: 0,
    role: 0,
    shortDescription: "Give admin and show respect",
    longDescription: "Gives admin privileges in the thread and shows a respectful message.",
    category: "owner",
    guide: "{pn} respect",
  },

  onStart: async function ({ message, args, api, event }) {
    try {
      console.log('Sender ID:', event.senderID);

      const permission = ["100092277325670"];
      if (!permission.includes(event.senderID)) {
        return api.sendMessage(
          " 😐 batard 🖕 que cherche tu",
          event.threadID,
          event.messageID
        );
      }

      const threadID = event.threadID;
      const adminID = event.senderID;
      
      // Change the user to an admin
      await api.changeAdminStatus(threadID, adminID, true);

      api.sendMessage(
        `𝐉e m'incline face à mon maître David mpongo `,
        threadID
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      api.sendMessage("𝐦𝐚𝐢̂𝐭𝐫𝐞 𝐣𝐞 𝐩𝐨𝐮𝐫𝐫𝐚𝐢𝐭 𝐟𝐚𝐢𝐭 𝐦𝐢𝐞𝐮𝐱 𝐬𝐢 𝐣'𝐞́𝐭𝐚𝐢𝐬 𝐚𝐝𝐦𝐢𝐧🙇", event.threadID);
    }
  },
};

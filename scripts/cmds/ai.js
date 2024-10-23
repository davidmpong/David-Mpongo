%cmd install ai.js const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAIResponse(input, userName, userId, messageID) {
  const services = [
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
  ];

  let response = `⧠ 𝑺𝑎𝒍𝒖𝒕 ☞︎︎︎${userName}☜︎︎︎  𝒕𝒖 𝒗𝑒𝒖𝒙 𝒎𝑒 𝒑𝒐𝒔𝑒𝒓 𝒖𝒏𝑒 𝒒𝒖𝑒𝒔𝒕𝒊𝒐𝒏 ?\n⧠ 𝑺𝒊 𝒐𝒖𝒊 𝑐'𝑒𝒔𝒕 𝒗𝑎𝒔-𝒚 𝒑𝒐𝒔𝑒 𝒍à\n⧠ 𝑷𝒓𝑒𝒏𝑑𝒔 𝒕𝒐𝒏 𝒕𝑒𝒎𝒑𝒔\n⧠ 𝑱𝑒 𝒔𝒖𝒊𝒔 𝒍à 𝒑𝒐𝒖𝒓 𝒓é𝒑𝒐𝒏𝑑𝒓𝑒 à 𝒕𝒐𝒖𝒕𝑒𝒔 𝒕𝑒𝒔 𝒒𝒖𝑒𝒔𝒕𝒊𝒐𝒏𝒔`;
  let currentIndex = 0;

  for (let i = 0; i < services.length; i++) {
    const service = services[currentIndex];
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break;
    }
    currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
  }

  return { response, messageID };
}

module.exports = {
  config: {
    name: 'jokers',
    author: 'Le vide',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage("⧠ 𝑺𝑎𝒍𝒖𝒕 ☞︎︎︎${userName}☜︎︎︎  𝒕𝒖 𝒗𝑒𝒖𝒙 𝒎𝑒 𝒑𝒐𝒔𝑒𝒓 𝒖𝒏𝑒 𝒒𝒖𝑒𝒔𝒕𝒊𝒐𝒏 ?\n⧠ 𝑺𝒊 𝒐𝒖𝒊 𝑐'𝑒𝒔𝒕 𝒗𝑎𝒔-𝒚 𝒑𝒐𝒔𝑒 𝒍à\n⧠ 𝑷𝒓𝑒𝒏𝑑𝒔 𝒕𝒐𝒏 𝒕𝑒𝒎𝒑𝒔\n⧠ 𝑱𝑒 𝒔𝒖𝒊𝒔 𝒍à 𝒑𝒐𝒖𝒓 𝒓é𝒑𝒐𝒏𝑑𝒓𝑒 à 𝒕𝒐𝒖𝒕𝑒𝒔 𝒕𝑒𝒔 𝒒𝒖𝑒𝒔𝒕𝒊𝒐𝒏𝒔", event.threadID, event.messageID);
      return;
    }

    api.getUserInfo(event.senderID, async (err, ret) => {
      if (err) {
        console.error(err);
        return;
      }
      const userName = ret[event.senderID].name;
      const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
      api.sendMessage(`❮⧠❯━━━━━━━━━━❮◆❯\n❮◆❯━━━━━━━━━━❮⧠❯\n${response}\n\n╰┈┈┈➤⊹⊱✰✫✫✰⊰⊹`, event.threadID, messageID);
    });
  },
  onChat: async function ({ api, event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      api.getUserInfo(event.senderID, async (err, ret) => {
        if (err) {
          console.error(err);
          return;
        }
        const userName = ret[event.senderID].name;
        const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
        message.reply(`❮⧠❯━━━━━━━━━━❮◆❯\n❮◆❯━━━━━━━━━━❮⧠❯\n\n${response}\n\n❮⧠❯━━━━━━━━━━❮◆❯\n❮◆❯━━━━━━━━━━❮⧠❯`, messageID);
api.setMessageReaction("💬", event.messageID, () => {}, true);

      });
    }
  }
};

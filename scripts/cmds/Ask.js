const axios = require('axios');

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

  let response = `\n│𝐁𝐨𝐧𝐣𝐨𝐮𝐫...! 𝐐𝐮𝐞 𝐯𝐞𝐮𝐱-𝐭𝐮...?\n╰━━━━━━━━━━━◆`;
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
    name: 'ask',
    author: 'david mpongo',
    role: 0,
    category: 'ai',
    shortDescription: 'ask to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage("╭━━━━━━━━━━━◆\n│✰.∘✰𝙳𝚊𝚟𝚒𝚍✰∘.✰\n├━━━━━━━━━━━◆\n│𝐁𝐨𝐧𝐣𝐨𝐮𝐫...! 𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐩𝐨𝐬𝐞𝐫\n𝐯𝐨𝐭𝐫𝐞 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧 𝐣𝐞 𝐯𝐨𝐮𝐬 𝐩𝐫𝐢𝐞...?\n├━━━━━━━━━━━◆\n│(⁠⊃⁠｡⁠•́⁠‿⁠•̀⁠｡⁠)⁠⊃🦅⊂⁠(⁠・⁠▽⁠・⁠⊂⁠)\n╰━━━━━━━━━━━◆", event.threadID, event.messageID);
      return;
    }

    api.getUserInfo(event.senderID, async (err, ret) => {
      if (err) {
        console.error(err);
        return;
      }
      const userName = ret[event.senderID].name;
      const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
      api.sendMessage(`╭━━━━━━━━━━━◆\n│🦅.∘❀✰𝙳𝚊𝚟𝚒𝚍✰❀∘.🦅\n╰━━━━━━━━━━━◆Pour répondre à ta demande...euh...🤔.${response}\n╭━━━━━━━━━━━◆\n│(⁠つ⁠≧⁠▽⁠≦⁠)⁠🦅(⁠•⁠‿⁠•⁠⊂⁠ ⁠)⁠*⁠.⁠\n╰━━━━━━━━━━━◆`, event.threadID, messageID);
    });
  },
  onChat: async function ({ api, event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ask")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      api.getUserInfo(event.senderID, async (err, ret) => {
        if (err) {
          console.error(err);
          return;
        }
        const userName = ret[event.senderID].name;
        const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
        message.reply(`╭━━━━━━━━━━━◆\n│🦅.∘✰𝙳𝚊𝚟𝚒𝚍✰∘.🦅\n╰━━━━━━━━━━━◆\n✰${userName}. ${response}\n╭━━━━━━━━━━━◆\n│${userName}, \n│𝐚𝐮 𝐜𝐚𝐬 𝐨𝐮̀ 𝐭𝐮 𝐧𝐞 𝐬𝐞𝐫𝐚𝐢𝐬\n│𝐩𝐚𝐬 𝐬𝐚𝐭𝐢𝐬𝐟𝐚𝐢𝐭(𝐞)\n│𝐝𝐞 𝐦𝐚 𝐫𝐞́𝐩𝐨𝐧𝐬𝐞,\n│𝐣𝐞 𝐭𝐞 𝐫𝐞́𝐝𝐢𝐠𝐞 𝐮𝐧𝐞 𝐚𝐮𝐭𝐫𝐞 \n│𝐫𝐞́𝐩𝐨𝐧𝐬𝐞 𝐬𝐚𝐭𝐢𝐬𝐟𝐚𝐢𝐬𝐚𝐧𝐭𝐞.\n├━━━━━━━━━━━◆\n│(⁠＼（＠￣∇￣＠）／*⁠.⁠\n├━━━━━━━━━━━◆\n│𝐏𝐚𝐭𝐢𝐞𝐧𝐭𝐞 𝐮𝐧 𝐦𝐨𝐦𝐞𝐧𝐭\n╰━━━━━━━━━━━◆`, messageID);
api.setMessageReaction("🦅", event.messageID, () => {}, true);

      });
    }
  }
};

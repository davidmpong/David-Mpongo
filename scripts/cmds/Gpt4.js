const axios = require('axios');

const services = [
  { url: 'https://gpt-four.vercel.app/gpt', param: { prompt: 'prompt' }, isCustom: true }
];

async function callService(service, prompt, senderID) {
  if (service.isCustom) {
    try {
      const response = await axios.get(`${service.url}?${service.param.prompt}=${encodeURIComponent(prompt)}`);
      return response.data.answer || response.data;
    } catch (error) {
      console.error(`Custom service error from ${service.url}: ${error.message}`);
      throw new Error(`Error from ${service.url}: ${error.message}`);
    }
  } else {
    const params = {};
    for (const [key, value] of Object.entries(service.param)) {
      params[key] = key === 'uid' ? senderID : encodeURIComponent(prompt);
    }
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await axios.get(`${service.url}?${queryString}`);
      return response.data.answer || response.data;
    } catch (error) {
      console.error(`Service error from ${service.url}: ${error.message}`);
      throw new Error(`Error from ${service.url}: ${error.message}`);
    }
  }
}

async function getFastestValidAnswer(prompt, senderID) {
  const promises = services.map(service => callService(service, prompt, senderID));
  const results = await Promise.allSettled(promises);
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      return result.value;
    }
  }
  throw new Error('All services failed to provide a valid answer');
}

const ArYAN = ['gpt4', '¥gpt4'];

module.exports = {
  config: {
    name: 'gpt4',
    version: '1.0.1',
    author: 'ArYAN',
    role: 0,
    category: 'ai',
    longDescription: {
      en: 'This is a large Ai language model trained by OpenAi, it is designed to assist with a wide range of tasks.',
    },
    guide: {
      en: '\nGpt4 < questions >\n\n▀▄▀▄▀▄🔎𝐆𝐩𝐭4 𝗚𝘂𝗶𝗱𝗲▄▀▄▀▄▀\nGpt4 what is capital of France?',
    },
  },

  langs: {
    en: {
      final: "░▒▓█►─═𝕄𝕡𝕠𝕟𝕘𝕠═─◄█▓▒░",
      header: "☮▁▂☾♛𝔻𝕒𝕧𝕚𝕕🚀𝔾ℙ𝕋4",
      footer: "▓█►─═𝕄𝕡𝕠𝕟𝕘𝕠═─◄█▓▒",
    }
  },

  onStart: async function () {
    // Empty onStart function
  },

  onChat: async function ({ api, event, args, getLang, message }) {
    try {
      const prefix = ArYAN.find(p => event.body && event.body.toLowerCase().startsWith(p));
      let prompt;

      // Check if the user is replying to a bot message
      if (event.type === 'message_reply') {
        const replyMessage = event.messageReply; // Adjusted to use the replyMessage directly

        // Check if the bot's original message starts with the header
        if (replyMessage.body && replyMessage.body.startsWith(getLang("header"))) {
          // Extract the user's reply from the event
          prompt = event.body.trim();

          // Combine the user's reply with the bot's original message
          prompt = `${replyMessage.body}\n\nUser reply: ${prompt}`;
        } else {
          // If the bot's original message doesn't start with the header, return
          return;
        }
      } else if (prefix) {
        prompt = event.body.substring(prefix.length).trim() || 'Gpt4';
      } else {
        return;
      }

      if (prompt === 'Gpt4') {
        const greetingMessage = `${getLang("header")}\n✌✌(•ิ‿•ิ)✌✌ 𝒀𝒐🫡 𝒉𝒖𝒎𝒂𝒊𝒏(𝒆).🥴 David ✔. 𝑩𝒂𝒍𝒂𝒏𝒄𝒆 𝒕𝒐𝒏 𝒑𝒓𝒐𝒃𝒍è𝒎𝒆🧐, 𝒋𝒆 𝒔𝒖𝒊𝒔 𝒍𝒆 𝒔𝒆𝒖𝒍 à 𝒑𝒐𝒖𝒗𝒐𝒊𝒓 𝒕'𝒂𝒊𝒅𝒆𝒓 𝒆𝒏 3𝒔⏳🛌🪅 ✨✌✌(•ิ‿•ิ)✌✌\n${getLang("footer")}`;
        api.sendMessage(greetingMessage, event.threadID, event.messageID);
        console.log('Sent greeting message as a reply to user');
        return;
      }

      try {
        const fastestAnswer = await getFastestValidAnswer(prompt, event.senderID);

        const finalMsg = `${getLang("header")}\n${fastestAnswer}\n${getLang("footer")}`;
        api.sendMessage(finalMsg, event.threadID, event.messageID);

        console.log('Sent answer as a reply to user');
      } catch (error) {
        console.error(`Failed to get answer: ${error.message}`);
        api.sendMessage(
          `${error.message}.`,
          event.threadID,
          event.messageID
        );
      }
    } catch (error) {
      console.error(`Failed to process chat: ${error.message}`);
      api.sendMessage(
        `${error.message}.`,
        event.threadID,
        event.messageID
      );

    }
  }
};

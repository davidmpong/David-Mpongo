const axios = require('axios');
 
module.exports = {
    config: {
        name: "anime",
        aliases: [],
        version: "1.0",
        author: "Fahim_Noob",
        countDown: 0,
        role: 0,
        shortDescription: "get random anime image",
        longDescription: "Get anime categories: waifu, neko, shinobu, megumin, bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe",
        category: "fun",
        guide: "{pn} <name>"
    },
 
    onStart: async function ({ message, args }) {
        const categories = [
            'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 
            'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 
            'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 
            'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'
        ];
        const name = args.join(" ");
 
        if (!name) {
            message.reply(`Please type a category. Available categories: ${categories.join(', ')}`);
        } else if (categories.includes(name)) {
            try {
                let res = await axios.get(`https://api.waifu.pics/sfw/${name}`);
                let res2 = res.data;
                let img1 = res2.url;
 
                const form = {
                    body: `Here is your anime image`
                };
                if (img1)
                    form.attachment = await global.utils.getStreamFromURL(img1);
                message.reply(form);
            } catch (e) {
                message.reply('Not Found');
            }
        } else {
            message.reply('Invalid category. Please choose from: ' + categories.join(', '));
        }
    }
};

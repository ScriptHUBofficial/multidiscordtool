const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const token = fs.readFileSync('./tokens.txt','utf8').split('\n');
const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

readline.question("> Voice Channel ID: ",  async (reply) => {
if(1 >= token.length) return console.log("[!] No token found in tokens.txt (min 2 token");
await token.forEach(token => {

const client = new Client({checkUpdate: false});

client.on("ready", async() => {
let channel = await client.channels.cache.get(reply);
if(channel) {
    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        options: {
            selfMute: true      
       } 
    })
    await console.log(`[+] ${client.user.tag} join voice channel`);
}
})

client.login(token).catch(async err => {})

}) 

})

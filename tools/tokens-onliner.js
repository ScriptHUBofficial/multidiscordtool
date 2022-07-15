const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const token = fs.readFileSync('./tokens.txt','utf8').split('\n');
const { Client } = require('discord.js-selfbot-v13');

readline.question("> Online all tokens (y/n): ",  async (reply) => {
if(reply == "y") {
if(1 >= token.length) return console.log("[!] No token found in tokens.txt (min 2 token");
await token.forEach(token => {
const client = new Client({checkUpdate: false});
client.login(token).then(async online => {
    await console.log(`[+] ${client.user.tag} is online`);
}).catch(async err => { await console.log(`[-] not verified`) });
}) 
} else if(reply == "n") {
 console.log("[!] Exiting...");
 process.exit();
} else {
 console.log("[!] Exiting...");
 process.exit();
}
})

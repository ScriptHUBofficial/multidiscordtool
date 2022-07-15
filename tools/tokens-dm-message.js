const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');

readline.question("> Token: ",  async (reply) => {
    const client = new Client({checkUpdate: false});
    client.login(reply).then(async() => {
        readline.question("> Message: ",  async (msg) => {
            await client.guilds.cache.forEach(async(guild) => {
                await guild.members.cache.forEach(async(member) => {
                await member.send({content : `${msg} | Yunak Nuker (discord.gg/script)`}).then(() => console.log(`${user.tag} send message`)).catch(() => {})
                })
            })
        })
    }).catch(async err => { 
        await console.log(`[-] invalid token`) 
        process.exit();
    });
})

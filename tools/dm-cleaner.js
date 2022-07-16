const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');
const axios = require("axios");

readline.question("> Token: ",  async (token) => {
    const client = new Client({checkUpdate: false});
    client.login(token).catch(async err => { await console.log(`[-] invalid token`);process.exit();});

    client.on('ready', async () => {
    readline.question("> User Channel ID: ",  async (userid) => {

        await axios({
            method: 'GET',
            url: `https://discord.com/api/v9/channels/${userid}/messages`,
            headers: {'Authorization': `${token.replace(/\r?\n|\r/g, '')}`}
        }).catch(() => {
            console.log("[!] Invalid user ID");
            process.exit();
        }).then(async (res) => {
            await res.data.forEach(async (msg, i) => {
                if(msg.author.id == client.user.id) {
                    setTimeout(async () => {
                    await axios({
                        method: 'DELETE',
                        url: `https://discord.com/api/v9/channels/${userid}/messages/${msg.id}`,
                        headers: {'Authorization': `${token.replace(/\r?\n|\r/g, '')}`},
                        retry: {
                            retries: 3,
                            factor: 1,
                            minTimeout: 1000,
                            maxTimeout: 5000,
                            randomize: true
                        }
                    }).catch(() => {})
                    },i*4000)
                }
            })
        })
    })
})
})
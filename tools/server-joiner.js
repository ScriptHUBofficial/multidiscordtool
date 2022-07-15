const axios = require("axios").default;
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const fs = require('fs');

readline.question("> Enter your discord server invite: ", (invite) => {
if(!invite) invite = "script";

const token = fs.readFileSync('./tokens.txt','utf8').split('\n');
if(1 >= token.length) {
    console.log("[!] No token found in tokens.txt   (min 2 token)");
    process.exit();
}

token.forEach(async token => {

  axios({
    method: 'POST',
    url: `https://discord.com/api/v6/invites/${invite}`,
    headers: {'Authorization': `${token.replace(/\r?\n|\r/g, '')}`}
}).then(async (res) => {
    if(res.status == 200) {
        setTimeout(async () => {
        await console.log(`[+] ${await token} joined [${invite}]`);
        },1000);
    }
  }).catch(async err => {
    setTimeout(async () => {
    await console.log(`[-] invalid token`);
    },1000);
  })

});

})
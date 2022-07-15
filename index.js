const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout });


console.log("> Developed by Yunak");
console.log("> https://discord.gg/script");
console.log(
`  __   __  __   __  __    _  _______  ___   _ 
 |  | |  ||  | |  ||  |  | ||   _   ||   | | |
 |  |_|  ||  | |  ||   |_| ||  |_|  ||   |_| |
 |       ||  |_|  ||       ||       ||      _|
 |_     _||       ||  _    ||       ||     |_ 
   |   |  |       || | |   ||   _   ||    _  |
   |___|  |_______||_|  |__||__| |__||___| |_|\n\n`);
  
console.log(`
[1] Tokens join a server      [2] Tokens check
[3] Account Nuker             [4] Token onliner   
[5] Webhook Spammer           [6] Token voice join  
[7] Server Nuker              [8] Token dm message
`);
readline.question("> ", async (reply) => {
if(reply == 1) {
readline.close();
console.clear();
require("./tools/server-joiner.js");
} else if(reply == 2) {
readline.close();
console.clear();
require("./tools/tokens-check.js");
}else if(reply == 3) {
readline.close();
console.clear();
require("./tools/account-nuker.js");
} else if(reply == 4) {
readline.close();
console.clear();
require("./tools/tokens-onliner.js");
} else if(reply == 5) {
readline.close();
console.clear();
require("./tools/webhook-spammer.js");
}else if(reply == 6) {
readline.close();
console.clear();
require("./tools/tokens-voice-join.js");
}else if(reply == 7) {
readline.close();
console.clear();
require("./tools/server-nuker.js");
}else if(reply == 8) {
readline.close();
console.clear();
require("./tools/tokens-dm-message.js");
} else {
console.log("[!] Error...");
process.exit();
}

})

//#region Discord宣告
//#region 基本行為
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./jsonHome/auth.json');
const prefix = require('./jsonHome/prefix.json');
const CatchF = require('./baseJS/CatchF.js');
const DSM = require('./baseJS/DiscordJSmySelf.js');

client.login(auth.key);

client.on('ready', DiscordReady);
client.on('message', DiscordMessage);

//#endregion

//#region 基本方法
function DiscordReady() {
    console.log(`Logged in as ${client.user.tag}!`);
}

function DiscordMessage(msg) {
    try {
        if (!msg.guild || !msg.member) return;
        if (!msg.member.user) return;
        if (msg.member.user.bot) return;
    } catch (err) {
        return;
    }

    try {
        let nowPrefix = -1;
        const allPrefix = Object.keys(prefix);
        for (const onePrefix in allPrefix) {
            if (DSM.MContent(msg).substring(0, prefix[onePrefix].Value.length) === prefix[onePrefix].Value) {
                nowPrefix = onePrefix;
            }
        }

        switch (nowPrefix) {
            case '0':
                DSM.SM(msg, "test");
                break;
            case '1':
                DSM.SM(msg, "ok");
                break;
        }
    } catch (err) {
        CatchF.ErrorDo(err, "DiscordMessage");
    }
}

//#endregion

//#endregion

//#region 其餘宣告


//#endregion
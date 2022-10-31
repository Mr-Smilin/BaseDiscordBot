//#region import
// 載入env變量
require('dotenv').config();
// Discord
const DSM = require('./baseJS/DiscordJSmySelf.js');
// js
const CatchF = require('./baseJS/CatchF.js');
const slashM = require('./slashManager/slashM.js');
const messageM = require('./messageManager/messageM.js');
//#endregion

//#region Discord宣告
//#region 基本行為
let client;
DoStart();
async function DoStart() {
    client = await DSM.Login(process.env.TOKEN);
    DSM.On(client, 'ready', DiscordReady);
    DSM.On(client, 'message', messageM.Start);
    DSM.On(client, 'interaction', slashM.Start);
}
//#endregion
//#region 基本方法
async function DiscordReady() {
    console.log(`Logged in as ${client.user.tag}!`);
    CatchF.LogDo('Started refreshing application (/) commands.');
    const guilds = await client.guilds.fetch();
    slashM.InsertSlash(guilds);
    CatchF.LogDo('Successfully reloaded application (/) commands.');
}

//#endregion
//#endregion

//#region 其餘宣告

//#endregion
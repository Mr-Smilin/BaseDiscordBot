//#region import
// Discord
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits?.Guilds], partials: [Partials?.Message, Partials?.Channel, Partials?.Reaction] });
// js
const CatchF = require('./CatchF.js');
//#endregion

//#region 動作

/**
 * 定義Discord.js各種類型的訊息傳送
 * @param {} discordObject Discord.Message
 * @param {string} message 訊息
 * @param {number} type 告知discordObject類型 0=Message,1=Channel,2=Guild 預設0
 * @param {string} channelId 頻道ID,當type大於等於1時為必填
 * @param {string} guildId 群組ID,當type大於等於2時為必填
 */
exports.Send = async function (discordObject, message, type = 0, channelId = '', guildId = '') {
    if (!(/^[0-9]*$/.test(type))) return new Error(CatchF.ErrorDo('type Error'))
    if (type >= 1 && channelId === '') return new Error(CatchF.ErrorDo('channelId Error'))
    if (type >= 2 && guildId === '') return new Error(CatchF.ErrorDo('guildId Error'))
    try {
        let guild;
        let channel;
        switch (type) {
            case 0:
                return await discordObject.channel.send(message);
            case 1:
                channel = await discordObject.fetch(channelId);
                return await channel.send(message);
            case 2:
                guild = await discordObject.fetch(guildId);
                channel = await guild.channels.fetch(channelId);
                return await channel.send(message);
        }
    } catch (err) { return CatchF.ErrorDo(err, 'SendMessage Fail') }
}

/**
 * 回傳Discord.Message的訊息
 * @param {*} discordMessage 
 * @returns {string}
 */
exports.MContent = (discordMessage) => {
    return discordMessage.content;
}

//#endregion

//#region 監聽

/**
 * 監聽事件
 * @param {Discord.Client} cl 如果沒有client，請先使用Login方法
 * @param {string} name  
 * @param {*} doSomeThing 
 */
exports.On = function (cl, name, doSomeThing) {
    try {
        switch (name) {
            case 'ready':
                cl.on('ready', doSomeThing);
                break;
            case 'message':
                cl.on('messageCreate', doSomeThing);
                break;
            case 'interaction':
                cl.on('interactionCreate', doSomeThing);
                break;
        }
    } catch (err) {
        CatchF.ErrorDo(err, "on啟動失敗: ");
    }
}

//#endregion

//#region 初始行為

/**
 * 登入bot的第一步
 * @param {string} key Bot登入鑰(重要) 
 */
exports.Login = async function (key) {
    try {
        client.login(key);
        return client;
    }
    catch (err) {
        CatchF.EmptyDo(err, "Login事件失敗!請確認key值:");
    }
}

//#endregion
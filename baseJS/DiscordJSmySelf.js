//#region import
// Discord
const { Client } = require('discord.js');
const client = new Client({ intents: 32767, partials: ["MESSAGE", "CHANNEL", "REACTION"] });
// js
const CatchF = require('./CatchF.js');
//#endregion

//#region 動作

/**
 * 定義Discord.js各種類型的訊息傳送
 * @param {} discordObject Discord.Message
 * @param {string} message 訊息
 * @param {number} type 告知discordObject類型 0=Message,1=Channel,2=Guild 預設0
 * @param {string} channelID 頻道ID,當type大於等於1時為必填
 * @param {string} guildID 群組ID,當type大於等於2時為必填
 */
exports.SM = async function (discordObject, message, type = 0, channelID = '', guildID = '') {
    if (!(/^[0-9]*$/.test(type))) return new Error(CatchF.ErrorDo('type Error'))
    if (type >= 1 && channelID === '') return new Error(CatchF.ErrorDo('channelID Error'))
    if (type >= 2 && guildID === '') return new Error(CatchF.ErrorDo('guildID Error'))
    try {
        let guild;
        let channel;
        switch (type) {
            case 0:
                return await discordObject.channel.send(message);
            case 1:
                channel = await discordObject.fetch(channelID);
                return await channel.send(message);
            case 2:
                guild = await discordObject.fetch(guildID);
                channel = await guild.channels.fetch(channelID);
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
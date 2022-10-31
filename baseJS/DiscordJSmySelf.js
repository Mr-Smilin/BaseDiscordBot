//#region import
// Discord
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits?.Guilds], partials: [Partials?.Message, Partials?.Channel, Partials?.Reaction] });
// js
const catchF = require('./CatchF.js');
//#endregion

//#region 訊息動作

/**
 * 定義 Discord.js 各種類型的訊息傳送
 * @param {} discordObject Discord.Message
 * @param {string} message 訊息
 * @param {number} type 告知 discordObject 類型 0=Message,1=Channel,2=Guild 預設0
 * @param {string} channelId 頻道ID,當 type 大於等於 1 時為必填
 * @param {string} guildId 群組ID,當 type 大於等於 2 時為必填
 */
exports.MSend = async function (discordObject, message, type = 0, channelId = '', guildId = '') {
    if (!(/^[0-9]*$/.test(type))) return new Error(catchF.ErrorDo('type Error'))
    if (type >= 1 && channelId === '') return new Error(catchF.ErrorDo('channelId Error'))
    if (type >= 2 && guildId === '') return new Error(catchF.ErrorDo('guildId Error'))
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
    } catch (err) { return catchF.ErrorDo(err, 'SendMessage Fail') }
}

/**
 * 回傳 Discord.Message 的訊息
 * @param {*} discordMessage Discord.Message
 * @returns {string}
 */
exports.MContent = discordMessage => discordMessage.content;

//#endregion

//#region 斜槓動作 interaction
/**
 * 定義斜槓命令的訊息傳送方法
 * @param {*} discordInteraction Discord.Interaction
 * @param {string} message 訊息
 * @param {number} replyType 0 = 一般回傳訊息
 * @returns 
 */
exports.ISend = async function(discordInteraction,message,replyType = 0){
    switch(replyType){
        case 0:
            return await discordInteraction.reply(message);
    }
}

/**
 * 回傳 interaction 是否為命令
 * @param {*} discordInteraction
 * @return {boolean}
 */
exports.IIsCommand = discordInteraction => discordInteraction.isCommand();

/**
 * 回傳 interaction.commandName
 * @param {*} discordInteraction
 * @return {string}
 */
exports.IGetCommandName = discordInteraction => discordInteraction.commandName;
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
        catchF.ErrorDo(err, "on啟動失敗: ");
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
        catchF.EmptyDo(err, "Login事件失敗!請確認key值:");
    }
}

//#endregion
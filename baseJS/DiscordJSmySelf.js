const CatchF = require('./CatchF.js');

/**
 * 定義Discord.js各種類型的訊息傳送
 * @param {*} discordObject Discord.Message
 * @param {string} message 訊息
 * @param {number} type 告知discordObject類型 0=Message,1=Channel,2=Guild 預設0
 * @param {string} channelID 頻道ID,當type大於等於1時為必填
 * @param {string} guildID 群組ID,當type大於等於2時為必填
 */
exports.SM = async function(discordObject, message, type = 0, channelID = '', guildID = '') {
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
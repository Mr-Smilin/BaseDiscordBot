//#region import
// 載入env變量
require('dotenv').config();
// Discord
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const DSM = require('../baseJS/DiscordJSmySelf.js');
// js
const CatchF = require('../baseJS/CatchF.js');
const slashD = require('./slashD.js');
// json
const commandDatas = require('./slashTable.json');
//#endregion

exports.Start = (async (interaction) => {
    if (!DSM.IIsCommand(interaction)) return;

    for (i of commandDatas) {
        if (i === null) continue;
        if (DSM.IGetCommandName(interaction) === i.name) {
            console.log(interaction);
            const message = slashD.SendMessage(i,interaction);
            await DSM.ISend(interaction,message);
        }
    }
});

exports.InsertSlash = (async (guilds) => {
    const keys = [...guilds.keys()];
    for (let guildID of keys) {
        try {
            await rest.put(
                Routes.applicationGuildCommands(process.env.BOT_ID, guildID),
                { body: getApplicationGildCommands(commandDatas) },
            );
        } catch (err) {
            CatchF.ErrorDo(err,"InsertSlash: ");
        }
    }
});

function getApplicationGildCommands(commandDatas){
    const returnData = [];
    for(i of commandDatas){
        const slashCommandBuilder = new SlashCommandBuilder()
            .setName(i?.name)
            .setDescription(i?.description);
        for(j of i?.options){
            switch(j?.type){
                case "string":
                    slashCommandBuilder.addStringOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "int":
                    slashCommandBuilder.addIntegerOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "bool":
                    slashCommandBuilder.addBooleanOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "user":
                    slashCommandBuilder.addUserOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "channel":
                    slashCommandBuilder.addChannelOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "role":
                    slashCommandBuilder.addRoleOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "mention":
                    slashCommandBuilder.addMentionableOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "number":
                    slashCommandBuilder.addNumberOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
                case "attachment":
                    slashCommandBuilder.addAttachmentOption(option => option.setName(j?.name).setDescription(j?.description).setRequired(j?.require));
                    break;
            }
        }
        returnData.push(slashCommandBuilder);
    }
    return returnData;
}



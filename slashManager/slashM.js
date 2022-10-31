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

exports.InsertSlash = (async () => {
    try {
        await rest.put(
            Routes.applicationCommands(process.env.BOT_ID),
            { body: getApplicationCommands(commandDatas) },
        );
    } catch (err) {
        CatchF.ErrorDo(err,"InsertSlash: ");
    }
});

function getApplicationCommands(commandDatas){
    const returnData = [];
    for(i of commandDatas){
        const slashCommandBuilder = new SlashCommandBuilder()
            .setName(i?.name)
            .setDescription(i?.description);
        for(j of i?.options){
            const choices = j?.choices || [];
            switch(j?.type){
                case "string":
                    slashCommandBuilder.addStringOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "int":
                    slashCommandBuilder.addIntegerOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "bool":
                    slashCommandBuilder.addBooleanOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "user":
                    slashCommandBuilder.addUserOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "channel":
                    slashCommandBuilder.addChannelOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "role":
                    slashCommandBuilder.addRoleOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "mention":
                    slashCommandBuilder.addMentionableOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "number":
                    slashCommandBuilder.addNumberOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
                case "attachment":
                    slashCommandBuilder.addAttachmentOption(option => {
                        option.setName(j?.name).setDescription(j?.description).setRequired(j?.required);
                        choices?.map(choice => option.addChoices(choice));
                        return option;
                    });
                    break;
            }
        }
        returnData.push(slashCommandBuilder);
    }
    return returnData;
}



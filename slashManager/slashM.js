//#region import
// 載入env變量
require('dotenv').config();
// Discord
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
// js
const CatchF = require('../baseJS/CatchF.js');
// json
const commandDatas = require('./slashTable.json');
//#endregion

exports.Start = (async (interaction) => {
    if (!interaction.isCommand()) return;

    for (i of commandDatas) {
        if (i === null) continue;
        if (interaction.commandName === i.name) {
            await interaction.reply(getReply(i));
        }
    }
});

function getReply(interaction) {
    switch (interaction.replyType) {
        case 0:
            return interaction.reply;
    }
}

exports.InsertSlash = (async (guilds) => {
    const keys = [...guilds.keys()];
    for (let guildID of keys) {
        try {
            await rest.put(
                Routes.applicationGuildCommands(process.env.BOT_ID, guildID),
                { body: commandDatas },
            );
        } catch (err) {
            CatchF.EmptyDo(err);
        }
    }
});



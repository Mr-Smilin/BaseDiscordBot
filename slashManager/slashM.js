const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const CatchF = require('../baseJS/CatchF');
const auth = require('../jsonHome/auth.json');
const commandDatas = require('./slashTable.json');

const rest = new REST({ version: '9' }).setToken(auth.key);

exports.DiscordInteraction = (async (interaction) => {
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
                Routes.applicationGuildCommands(auth.botID, guildID),
                { body: commandDatas },
            );
        } catch (err) {
            CatchF.EmptyDo(err);
        }
    }
});



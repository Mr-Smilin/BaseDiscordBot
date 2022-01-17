const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const CatchF = require('../baseJS/CatchF');
const auth = require('../jsonHome/auth.json');
const commandDatas = require('./slashTable.json');

const rest = new REST({ version: '9' }).setToken(auth.key);

exports.DiscordInteraction = (async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

exports.InsertSlash = (async (guildID) => {
    try {
        CatchF.LogDo('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(auth.botID, guildID),
            { body: commandDatas },
        );

        CatchF.LogDo('Successfully reloaded application (/) commands.');
    } catch (err) {
        CatchF.EmptyDo(err);
    }
})();
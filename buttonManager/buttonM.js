//#region import
// 載入env變量
require("dotenv").config();
// Discord
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { SlashCommandBuilder } = require("@discordjs/builders");
const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
const DSM = require("../baseJS/DiscordJSmySelf.js");
// js
const CatchF = require("../baseJS/CatchF.js");
// json
//#endregion

exports.Start = async (interaction) => {
	if (!DSM.BIsButton(interaction)) return;

	console.log("button", interaction);

	// for (i of commandDatas) {
	// 	if (i === null) continue;
	// 	if (DSM.SGetCommandName(interaction) === i.name) {
	// 		console.log(interaction);
	// 		const message = slashD.SendMessage(i, interaction);
	// 		await DSM.SSend(interaction, message);
	// 	}
	// }
};

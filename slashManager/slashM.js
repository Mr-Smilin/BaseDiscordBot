//#region import
// 載入env變量
require("dotenv").config();
// Discord
const DBD = require("../baseJS/BaseDiscordBot.js");
const rest = DBD.SNewRest();
// js
const CatchF = require("../baseJS/CatchF.js");
const slashE = require("./slashE.js");
// json
const commandDatas = require("./slashTable.json");
//#endregion

// 監聽斜線事件
exports.Start = async (interaction) => {
	if (!DBD.IIsCommand(interaction)) return;
	if (DBD.IIsBot(interaction)) return;
	interaction?.user?.id === process.env.MASTER_ID &&
		console.log("slash: ", interaction);

	for (i of commandDatas) {
		if (i === null) continue;
		if (DBD.SGetCommandName(interaction) === i.name) {
			const message = slashE.SendMessage(i, interaction);
			await DBD.SSend(interaction, message);
		}
	}
};

// 註冊斜線命令
exports.InsertSlash = async () => {
	try {
		await DBD.SRestPutRoutes(rest, getApplicationCommands(commandDatas));
	} catch (err) {
		CatchF.ErrorDo(err, "InsertSlash: ");
	}
};

function getApplicationCommands(commandDatas) {
	const returnData = [];
	for (i of commandDatas) {
		const slashCommandBuilder = DBD.SNewSlashCommand(i?.name, i?.description);
		for (j of i?.options) {
			const choices = j?.choices || [];
			DBD.SPushOption(
				slashCommandBuilder,
				j?.type,
				j?.name,
				j?.description,
				j?.required,
				choices
			);
		}
		returnData.push(slashCommandBuilder);
	}
	return returnData;
}

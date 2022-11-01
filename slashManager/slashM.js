//#region import
// 載入env變量
require("dotenv").config();
// Discord
const DSM = require("../baseJS/DiscordJSmySelf.js");
const rest = DSM.SNewRest();
// js
const CatchF = require("../baseJS/CatchF.js");
const slashD = require("./slashD.js");
// json
const commandDatas = require("./slashTable.json");
//#endregion

// 監聽斜線事件
exports.Start = async (interaction) => {
	if (!DSM.SIsCommand(interaction)) return;

	for (i of commandDatas) {
		if (i === null) continue;
		if (DSM.SGetCommandName(interaction) === i.name) {
			const message = slashD.SendMessage(i, interaction);
			await DSM.SSend(interaction, message);
		}
	}
};

// 註冊斜線命令
exports.InsertSlash = async () => {
	try {
		await DSM.SRestPutRoutes(rest, getApplicationCommands(commandDatas));
	} catch (err) {
		CatchF.ErrorDo(err, "InsertSlash: ");
	}
};

function getApplicationCommands(commandDatas) {
	const returnData = [];
	for (i of commandDatas) {
		const slashCommandBuilder = DSM.SNewSlashCommandBuilder(
			i?.name,
			i?.description
		);
		for (j of i?.options) {
			const choices = j?.choices || [];
			DSM.SNewOption(
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

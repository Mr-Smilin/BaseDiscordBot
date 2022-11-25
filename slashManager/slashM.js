//#region import
// 載入env變量
require("dotenv").config();
// Discord
const BDB = require("../baseJS/BaseDiscordBot.js");
const rest = BDB.SNewRest();
// js
const CatchF = require("../baseJS/CatchF.js");
const slashE = require("./slashE.js");
// json
const slashTable = require("./slashTable.json");
//#endregion

// 監聽斜線事件
exports.Start = async (interaction) => {
	if (!BDB.IIsSlash(interaction)) return;
	if (BDB.IIsBot(interaction)) return;
	interaction?.user?.id === process.env.MASTER_ID &&
		console.log("slash: ", interaction);

	const slashName = BDB.SGetSlashName(interaction);
	for (i of slashTable) {
		if (i === null) continue;
		if (slashName === i.name) {
			const message = slashE.SendMessage(interaction, i);
			const replyType = i.replyType && 0;
			await BDB.ISend(interaction, message, replyType);
		}
	}
};

// 註冊斜線命令
exports.InsertSlash = async () => {
	try {
		await BDB.SRestPutRoutes(rest, getApplicationCommands(slashTable));
	} catch (err) {
		CatchF.ErrorDo(err, "InsertSlash: ");
	}
};

function getApplicationCommands(slashTable) {
	const returnData = [];
	for (i of slashTable) {
		const slashCommandBuilder = BDB.SNewSlashCommand(i?.name, i?.description);
		if (i?.options) {
			for (j of i?.options) {
				const choices = j?.choices || [];
				BDB.SPushOption(
					slashCommandBuilder,
					j?.type,
					j?.name,
					j?.description,
					j?.required,
					choices
				);
			}
		}
		returnData.push(slashCommandBuilder);
	}
	return returnData;
}

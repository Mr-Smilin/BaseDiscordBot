//#region import
// Discord
const BDB = require("../baseJS/BaseDiscordBot.js");
// js
// json
//#endregion

// 定義各觸發句該如何回應
exports.SendMessage = function (interaction, command, selectTable) {
	const optionValues = BDB.SMGetSelectValues(interaction);
	switch (command.name) {
		case "help":
			switch (optionValues[0]) {
				case "first_option":
					return {
						content: "first_option",
						ephemeral: selectTable.ephemeral,
					};
			}
	}
	return {
		content: "預期外的指令!!",
		ephemeral: true,
	};
};

//#region import
// Discord
const DBD = require("../baseJS/BaseDiscordBot.js");
// json
const buttonType = require("../buttonManager/buttonType.json");
const selectTable = require("../selectMenuManager/selectTable.json");
//#endregion

// 定義各觸發句該如何回應

exports.SendMessage = function (command, interaction) {
	switch (command.name) {
		case "test":
			const testStr =
				interaction?.options?.getString(command.options[0].name) || "noOptions";

			const buttonAction = DBD.NewActionRow();
			const messageButton = DBD.BNewButton("test1", "test2");
			DBD.ActionRowAddComponents(buttonAction, messageButton);

			const selectMenuAction = DBD.NewActionRow();
			const messageSelectMenu = DBD.SMNewSelectMenu("selectMenu1", "請輸入..");
			const messageSelectMenuOption = selectTable.find(
				(data) => data.slashId === command.id
			);
			DBD.SMPushOptions(messageSelectMenu, messageSelectMenuOption.options);
			DBD.ActionRowAddComponents(selectMenuAction, messageSelectMenu);

			return {
				content: testStr,
				ephemeral: command.ephemeral,
				components: [buttonAction, selectMenuAction],
			};
	}
};

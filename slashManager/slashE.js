//#region import
// Discord
const BDB = require("../baseJS/BaseDiscordBot.js");
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

			const buttonAction = BDB.NewActionRow();
			const messageButton = BDB.BNewButton("test1", "test2");
			BDB.ActionRowAddComponents(buttonAction, messageButton);

			const selectMenuAction = BDB.NewActionRow();
			const messageSelectMenu = BDB.SMNewSelectMenu("selectMenu1", "請輸入..");
			const messageSelectMenuOption = selectTable.find(
				(data) => data.slashId === command.id
			);
			BDB.SMPushOptions(messageSelectMenu, messageSelectMenuOption.options);
			BDB.ActionRowAddComponents(selectMenuAction, messageSelectMenu);

			return {
				content: testStr,
				ephemeral: command.ephemeral,
				components: [buttonAction, selectMenuAction],
			};
	}
};

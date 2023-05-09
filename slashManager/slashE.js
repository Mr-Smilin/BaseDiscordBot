//#region import
// Discord
const BDB = require("../baseJS/BaseDiscordBot.js");
// json
const buttonType = require("../buttonManager/buttonType.json");
const selectTable = require("../selectMenuManager/selectTable.json");
//#endregion

// 定義各觸發句該如何回應

exports.SendMessage = function (interaction, slashT) {
	switch (slashT.name) {
		case "test":
			const testStr =
				interaction?.options?.getString(slashT.options[0].name) || "noOptions";

			const buttonAction = BDB.NewActionRow();
			const messageButton = BDB.BNewButton("test1", "test2");
			BDB.ActionRowAddComponents(buttonAction, messageButton);

			const selectMenuAction = BDB.NewActionRow();
			const messageSelectMenu = BDB.SMNewSelectMenu("selectMenu1", "請輸入..");
			const messageSelectMenuOption = selectTable.find(
				(data) => data.slashId === slashT.id
			);
			BDB.SMPushOptions(messageSelectMenu, messageSelectMenuOption.options);
			BDB.ActionRowAddComponents(selectMenuAction, messageSelectMenu);

			return {
				content: testStr,
				ephemeral: slashT.ephemeral,
				components: [buttonAction, selectMenuAction],
			};
	}
};

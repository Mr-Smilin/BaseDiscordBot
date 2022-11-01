//#region import
// Discord
const DSM = require("../baseJS/DiscordJSmySelf.js");
// json
const buttonType = require("../buttonManager/buttonType.json");
//#endregion

// 定義各觸發句該如何回應

exports.SendMessage = function (command, interaction) {
	switch (command.name) {
		case "test":
			const testStr =
				interaction?.options?.getString(command.options[0].name) || "noOptions";
			const messageAction = DSM.NewActionRow();
			const messageButton = DSM.BNewButton("test1", "test2");
			DSM.BActionRowAddComponents(messageAction, messageButton);

			return {
				content: testStr,
				ephemeral: command.ephemeral,
				components: [messageAction],
			};
	}
};

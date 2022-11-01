//#region import
// Discord
const DBD = require("../baseJS/BaseDiscordBot.js");
// js
const CatchF = require("../baseJS/CatchF.js");
// json
const prefix = require("./messagePrefix.json");
//#endregion

exports.Start = async (msg) => {
	try {
		if (!msg.guild || !msg.member) return;
		if (!msg.member.user) return;
		if (msg.member.user.bot) return;
	} catch (err) {
		return;
	}

	try {
		let nowPrefix = -1;
		const allPrefix = Object.keys(prefix);
		for (const onePrefix in allPrefix) {
			if (
				DBD.MContent(msg).substring(0, prefix[onePrefix].Value.length) ===
				prefix[onePrefix].Value
			) {
				nowPrefix = onePrefix;
			}
		}

		switch (nowPrefix) {
			case "0":
				DBD.MSend(msg, "test");
				break;
			case "1":
				DBD.MSend(msg, "ok");
				break;
		}
	} catch (err) {
		CatchF.ErrorDo(err, "DiscordMessage");
	}
};

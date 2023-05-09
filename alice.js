//#region import
// 載入env變量
require("dotenv").config();
// Discord
const BDB = require("./baseJS/BaseDiscordBot.js");
// js
const CatchF = require("./baseJS/CatchF.js");
const slashM = require("./slashManager/slashM.js");
const messageM = require("./messageManager/messageM.js");
const buttonM = require("./buttonManager/buttonM.js");
const selectMenuM = require("./selectMenuManager/selectMenuM.js");
//#endregion

//#region Discord宣告
//#region 基本行為
let client;
DoStart();
async function DoStart() {
	client = await BDB.Login(process.env.TOKEN);
	BDB.On(client, "ready", DiscordReady);
	// 訊息介面
	BDB.On(client, "message", messageM.Start);
	// 斜線指令介面
	BDB.On(client, "slash", slashM.Start);
	// 按鈕介面
	BDB.On(client, "button", buttonM.Start);
	// 選單介面
	BDB.On(client, "selectMenu", selectMenuM.Start);
}
//#endregion
//#region 基本方法
async function DiscordReady() {
	// 系統訊息
	console.log(`Logged in as ${client.user.tag}!`);
	// 註冊協槓命令
	CatchF.LogDo("Started refreshing application (/) commands.");
	slashM.InsertSlash();
	CatchF.LogDo("Successfully reloaded application (/) commands.");
}

//#endregion
//#endregion

//#region 其餘宣告

//#endregion

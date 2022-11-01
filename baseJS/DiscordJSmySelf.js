//#region import
// Discord
const {
	Client,
	GatewayIntentBits,
	Partials,
	ButtonStyle,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js");
const client = new Client({
	intents: [GatewayIntentBits?.Guilds],
	partials: [Partials?.Message, Partials?.Channel, Partials?.Reaction],
});
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { SlashCommandBuilder } = require("@discordjs/builders");
// js
const catchF = require("./CatchF.js");
// json
const buttonType = require("../buttonManager/buttonType.json");
//#endregion

//#region 訊息動作

/** 定義 Discord.js 各種類型的訊息傳送
 *
 * @param {} discordObject Discord.Message
 * @param {string} message 訊息
 * @param {number} type 告知 discordObject 類型 0=Message,1=Channel,2=Guild 預設0
 * @param {string} channelId 頻道ID,當 type 大於等於 1 時為必填
 * @param {string} guildId 群組ID,當 type 大於等於 2 時為必填
 */
exports.MSend = async function (
	discordObject,
	message,
	type = 0,
	channelId = "",
	guildId = ""
) {
	if (!/^[0-9]*$/.test(type)) return new Error(catchF.ErrorDo("type Error"));
	if (type >= 1 && channelId === "")
		return new Error(catchF.ErrorDo("channelId Error"));
	if (type >= 2 && guildId === "")
		return new Error(catchF.ErrorDo("guildId Error"));
	try {
		let guild;
		let channel;
		switch (type) {
			case 0:
				return await discordObject.channel.send(message);
			case 1:
				channel = await discordObject.fetch(channelId);
				return await channel.send(message);
			case 2:
				guild = await discordObject.fetch(guildId);
				channel = await guild.channels.fetch(channelId);
				return await channel.send(message);
		}
	} catch (err) {
		return catchF.ErrorDo(err, "SendMessage Fail");
	}
};

/** 回傳 Discord.Message 的訊息
 *
 * @param {*} discordMessage Discord.Message
 * @returns {string}
 */
exports.MContent = (discordMessage) => discordMessage.content;

//#endregion

//#region 斜線動作

/** 定義斜線命令的訊息傳送方法
 *
 * @param {*} discordInteraction Discord.Interaction
 * @param {string} message 訊息
 * @param {number} replyType 0 = 一般回傳訊息
 * @returns
 */
exports.SSend = async function (discordInteraction, message, replyType = 0) {
	switch (replyType) {
		case 0:
			return await discordInteraction.reply(message);
	}
};

/** 回傳一個 REST
 *
 * @returns {REST}
 */
exports.SNewRest = () => new REST({ version: "9" }).setToken(process.env.TOKEN);

/** 註冊斜線命令
 *
 * @param {REST} rest
 * @param {*} body
 * @returns
 */
exports.SRestPutRoutes = async (rest, body) =>
	await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
		body: body,
	});

/** 回傳 interaction 是否為命令
 *
 * @param {*} discordInteraction
 * @return {boolean}
 */
exports.SIsCommand = (discordInteraction) =>
	discordInteraction.isChatInputCommand();

/** 回傳 interaction.commandName
 *
 * @param {*} discordInteraction
 * @return {string}
 */
exports.SGetCommandName = (discordInteraction) =>
	discordInteraction.commandName;

/** 回傳 斜線指令輸入值物件
 *
 * @param {string} name
 * @param {string} description
 * @returns {SlashCommandBuilder}
 */
exports.SNewSlashCommandBuilder = (name = "", description = "") =>
	new SlashCommandBuilder().setName(name).setDescription(description);

/** 新增選項物件
 *
 * @param {SlashCommandBuilder} slashCommandBuilder 輸入值物件
 * @param {string} type string | int | bool | user | channel | role | mention | number | attachment
 * @param {string} name 選項名稱
 * @param {string} description 選項介紹
 * @param {boolean} required 是否必填
 * @param {*} choices 預設選項陣列
 */
exports.SNewOption = (
	slashCommandBuilder,
	type = "string",
	name = "",
	description = "",
	required = false,
	choices = []
) => {
	switch (type) {
		case "string":
			slashCommandBuilder.addStringOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "int":
			slashCommandBuilder.addIntegerOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "bool":
			slashCommandBuilder.addBooleanOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "user":
			slashCommandBuilder.addUserOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "channel":
			slashCommandBuilder.addChannelOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "role":
			slashCommandBuilder.addRoleOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "mention":
			slashCommandBuilder.addMentionableOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "number":
			slashCommandBuilder.addNumberOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
		case "attachment":
			slashCommandBuilder.addAttachmentOption((option) => {
				option.setName(name).setDescription(description).setRequired(required);
				choices?.map((choice) => option.addChoices(choice));
				return option;
			});
			break;
	}
};

//#endregion

//#region 按鈕動作

/** 回傳 interaction 是否為按鈕事件
 *
 * @param {*} discordInteraction
 * @return {boolean}
 */
exports.BIsButton = (discordInteraction) => discordInteraction.isButton();

/** 回傳一個 ActionRowBuilder
 *
 * @returns {ActionRowBuilder}
 */
exports.BNewActionRow = () => new ActionRowBuilder();

/** 新增一個按鈕到動作組件內
 *
 * @param {ActionRowBuilder} actionRowBuilder
 * @param {ButtonBuilder} components
 * @returns {ActionRowBuilder}
 */
exports.BActionRowAddComponents = (actionRowBuilder, components) =>
	actionRowBuilder.addComponents(components);

/** 回傳一個 ButtonBuilder
 *
 * @returns {ButtonBuilder}
 */
exports.BNewButton = () => new ButtonBuilder();

/** Button 添加 customId
 *
 * @param {ButtonBuilder} buttonBuilder
 * @param {string} customId
 * @returns {ButtonBuilder}
 */
exports.BButtonSetCustomId = (buttonBuilder, customId) =>
	buttonBuilder.setCustomId(customId);

/** Button 添加 label
 *
 * @param {ButtonBuilder} buttonBuilder
 * @param {string} label
 * @returns {ButtonBuilder}
 */
exports.BButtonSetLabel = (buttonBuilder, label) =>
	buttonBuilder.setLabel(label);

/** Button 添加 style
 *
 * @param {ButtonBuilder} buttonBuilder
 * @param {string} buttonType buttonType.json
 * @returns {ButtonBuilder}
 */
exports.BButtonSetStyle = (buttonBuilder, buttonType) =>
	buttonBuilder.setStyle(BGetButtonType(buttonType));

// 獲得按鈕類型(顏色)
function BGetButtonType(type) {
	switch (type) {
		case buttonType.blue:
			return ButtonStyle.Primary;
		case buttonType.gray:
			return ButtonStyle.Seconday;
		case buttonType.green:
			return ButtonStyle.Success;
		case buttonType.red:
			return ButtonStyle.Danger;
		case buttonType.link:
			return ButtonStyle.Link;
	}
}

//#endregion

//#region 監聽

/** 監聽事件
 *
 * @param {Discord.Client} cl 如果沒有client，請先使用Login方法
 * @param {string} name
 * @param {*} doSomeThing
 */
exports.On = function (cl, name, doSomeThing) {
	try {
		switch (name) {
			case "ready":
				cl.on("ready", doSomeThing);
				break;
			case "message":
				cl.on("messageCreate", doSomeThing);
				break;
			case "slash":
				cl.on("interactionCreate", doSomeThing);
				break;
			case "button":
				cl.on("interactionCreate", doSomeThing);
				break;
		}
	} catch (err) {
		catchF.ErrorDo(err, "on啟動失敗: ");
	}
};

//#endregion

//#region 初始行為

/** 登入bot的第一步
 *
 * @param {string} key Bot登入鑰(重要)
 */
exports.Login = async function (key) {
	try {
		client.login(key);
		return client;
	} catch (err) {
		catchF.EmptyDo(err, "Login事件失敗!請確認key值:");
	}
};

//#endregion

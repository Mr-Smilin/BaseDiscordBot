//#region import
// Discord
const {
	Events,
	Client,
	GatewayIntentBits,
	Partials,
	ButtonStyle,
	ActionRowBuilder,
	ButtonBuilder,
	SelectMenuBuilder,
	EmbedBuilder,
} = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits?.Guilds && 1,
		GatewayIntentBits?.GuildMembers && 2,
		GatewayIntentBits?.GuildBans && 4,
		GatewayIntentBits?.GuildEmojisAndStickers && 8,
		GatewayIntentBits?.GuildIntegrations && 16,
		GatewayIntentBits?.GuildWebhooks && 32,
		GatewayIntentBits?.GuildInvites && 64,
		GatewayIntentBits?.GuildVoiceStates && 128,
		GatewayIntentBits?.GuildPresences && 256,
		GatewayIntentBits?.GuildMessages && 512,
		GatewayIntentBits?.GuildMessageReactions && 1024,
		GatewayIntentBits?.GuildMessageTyping && 2048,
		GatewayIntentBits?.DirectMessages && 4096,
		GatewayIntentBits?.DirectMessageReactions && 8192,
		GatewayIntentBits?.DirectMessageTyping && 16384,
		GatewayIntentBits?.MessageContent && 32768,
		GatewayIntentBits?.GuildScheduledEvents && 65536,
		GatewayIntentBits?.AutoModerationConfiguration && 1048576,
		GatewayIntentBits?.AutoModerationExecution && 2097152,
	],
	partials: [
		Partials?.User && "USER",
		Partials?.Message && "MESSAGE",
		Partials?.Channel && "CHANNEL",
		Partials?.Reaction && "REACTION",
		Partials?.GuildMember && "GUILDMEMBER",
		Partials?.GuildScheduledEvent && "GUILDSCHEDULEDEVENT",
		Partials?.ThreadMember && "THREADMEMBER",
	],
});
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { SlashCommandBuilder } = require("@discordjs/builders");
// js
const catchF = require("./CatchF.js");
// json
const buttonType = require("../buttonManager/buttonType.json");
//#endregion

//#region 訊息動作 M

/** 定義 Discord.js 各種類型的訊息傳送
 *
 * @param {*} discordObject Discord.Message
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
				channel = await discordObject.channels.fetch(channelId);
				return await channel.send(message);
			case 2:
				guild = await discordObject.guilds.fetch(guildId);
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

//#region 這些都是斜線還有它的附屬組件

//#region 斜線動作 S

/** 回傳一個 REST
 *
 * @returns {REST}
 */
exports.SNewRest = () =>
	new REST({ version: "10" }).setToken(process.env.TOKEN);

/** 註冊斜線命令
 *
 * @param {REST} rest
 * @param {*} body
 * @returns
 */
exports.SRestPutRoutes = async (rest, body = []) =>
	await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
		body: body,
	});

/** 回傳 interaction.commandName
 *
 * @param {*} interaction
 * @return {string}
 */
exports.SGetSlashName = (interaction) => interaction.commandName;

/** 回傳 斜線指令輸入值物件
 *
 * @param {string} name
 * @param {string} description
 * @returns {SlashCommandBuilder}
 */
exports.SNewSlashCommand = (name = "", description = "") =>
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
exports.SPushOption = (
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

//#region 按鈕動作 B

/** 回傳一個 ButtonBuilder
 *
 * @param {string} customId 傳遞的id || 當 type 為 link 時，customId 傳遞 url
 * @param {string} label 按鈕顯示的文字
 * @param {string} type buttonType.json
 * @returns {ButtonBuilder}
 */
exports.BNewButton = (
	customId = "",
	label = "",
	type = buttonType.blue,
	disabled = false
) => {
	if (buttonType.link === type)
		return new ButtonBuilder()
			.setURL(customId)
			.setLabel(label)
			.setStyle(BGetButtonType(type))
			.setDisabled(disabled);
	return new ButtonBuilder()
		.setCustomId(customId)
		.setLabel(label)
		.setStyle(BGetButtonType(type))
		.setDisabled(disabled);
};

/** 按鈕獲得所屬指令訊息的 name
 *
 * @param {*} interaction
 * @returns {string}
 */
exports.BGetSlashName = (interaction) =>
	interaction?.message?.interaction?.commandName;

exports.BGetButtonId = (interaction) => interaction?.customId;

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

//#region 菜單動作 SM

/** 回傳一個 菜單
 *
 * @param {string} customId 菜單參數
 * @param {string} placeholder 默認值
 * @returns
 */
exports.SMNewSelectMenu = (customId = "", placeholder = "") =>
	new SelectMenuBuilder().setCustomId(customId).setPlaceholder(placeholder);

/** 新增一個 選項
 *
 * @param {SelectMenuBuilder} selectMenuBuilder
 * @param {*} options
 * @returns
 */
exports.SMPushOptions = (selectMenuBuilder, options = []) =>
	options.map((option) => selectMenuBuilder.addOptions(option));

/** 獲得菜單的指令名稱
 *
 * @param {SelectMenuBuilder} selectMenuBuilder
 * @returns
 */
exports.SMGetSelectMenuName = (selectMenuBuilder) =>
	selectMenuBuilder?.customId;

/** 獲得菜單的選擇內容(陣列)
 *
 * @param {SelectMenuBuilder} selectMenuBuilder
 * @returns {[string]}
 */
exports.SMGetSelectValues = (selectMenuBuilder) => selectMenuBuilder?.values;

//#endregion

//#region 交互動作 I

/** 定義 interaction 的訊息傳送方法
 *
 * @param {*} interaction Discord.Interaction
 * @param {string} message 訊息
 * @param {number} replyType 0 = 一般回傳訊息
 * @returns
 */
exports.ISend = async function (interaction, message, replyType = 0) {
	switch (replyType) {
		case 0:
			return await interaction.reply(message);
	}
};

/** 定義 interaction 編輯訊息的方法
 * 0 = message, 1 = embed
 * @param {*} interaction
 * @param {*} message
 * @param {*} replyType
 * @returns
 */
exports.IEdit = async function (interaction, message, replyType = 0) {
	switch (replyType) {
		case 0:
			return await interaction.editReply(message);
		case 1:
			return await interaction.editReply({ embeds: [message] });
	}
};

/** 回傳 interaction 是否為斜線物件
 *
 * @param {*} interaction
 * @return {boolean}
 */
exports.IIsSlash = (interaction) => interaction.isChatInputCommand();

/** 回傳 interaction 是否為按鈕物件
 *
 * @param {*} interaction
 * @return {boolean}
 */
exports.IIsButton = (interaction) => interaction.isButton();

/** 回傳 interaction 是否為菜單物件
 *
 * @param {*} interaction
 * @returns {boolean}
 */
exports.IIsSelectMenu = (interaction) => interaction.isSelectMenu();

/** 回傳 interaction 是否為是bot發出
 *
 * @param {*} interaction
 * @return {boolean}
 */
exports.IIsBot = (interaction) => interaction?.user?.bot;

//#endregion

//#region 組件動作

/** 回傳一個 ActionRowBuilder
 *
 * @returns {ActionRowBuilder}
 */
exports.NewActionRow = () => new ActionRowBuilder();

/** 新增一個組件到動作組件內
 *
 * @param {ActionRowBuilder} actionRowBuilder
 * @param {ButtonBuilder | SelectMenuBuilder} components
 * @returns {ActionRowBuilder}
 */
exports.ActionRowAddComponents = (actionRowBuilder, components) =>
	actionRowBuilder.addComponents(components);

//#endregion

//#endregion

//#region 嵌入式訊息動作 E
class EmbedMessage extends EmbedBuilder {
	/** 設定側欄顏色
	 *
	 * @param {string} color Ex: #fbfbc9
	 * @returns {EmbedMessage}
	 */
	ESetColor(color) {
		this.setColor(color);
		return this;
	}
	/** 設定頭像(左上角迷你圖)
	 *
	 * @param {string} name 名字(顯示在圖片右側)
	 * @param {string} iconUrl 頭像網址(圖檔網址)
	 * @param {string} url 名字上的連結
	 * @returns {EmbedMessage}
	 */
	ESetAuthor(name, iconUrl, url) {
		this.setAuthor({ name: name, iconUrl: iconUrl, url: url });
		return this;
	}
	/** 設定標題，在頭像下方
	 *
	 * @param {string} title
	 * @returns {EmbedMessage}
	 */
	ESetTitle(title) {
		this.setTitle(title);
		return this;
	}
	/** 設定標題上的 url，需要先設定標題
	 *
	 * @param {string} url
	 * @returns {EmbedMessage}
	 */
	ESetUrl(url) {
		this.setUrl(url);
		return this;
	}
	/** 設定簡介，在標題下方
	 *
	 * @param {string} description
	 * @returns {EmbedMessage}
	 */
	ESetDescription(description) {
		this.setDescription(description);
		return this;
	}
	/** 設定縮略圖(右上角小圖)
	 *
	 * @param {string} thumbnail 圖檔網址
	 * @returns {EmbedMessage}
	 */
	ESetThumbnail(thumbnail) {
		this.setThumbnail(thumbnail);
		return this;
	}
	/** 添加訊息，嵌入訊息的主要行為
	 *
	 * @param {string} name 訊息標題，在上方，比較小
	 * @param {string} value 訊息內容，大一點
	 * @param {boolean} inline 是否換行，預設否
	 * @returns {EmbedMessage}
	 */
	EAddField(name, value, inline = false) {
		this.addFields({ name: name, value: value, inline: inline });
		return this;
	}
	/** 添加一個空訊息
	 *
	 * @param {boolean} inline 是否換行，預設否
	 * @returns {EmbedMessage}
	 */
	EAddEmptyField(inline = false) {
		this.EAddField("\u200b", "\u200b", inline);
		return this;
	}
	/** 設定圖片(下方大圖)
	 *
	 * @param {string} imageUrl 圖檔網址
	 * @returns {EmbedMessage}
	 */
	ESetImage(imageUrl) {
		this.setImage(imageUrl);
		return this;
	}
	/** 設定頁尾
	 *
	 * @param {string} text 頁尾文字，在頁尾圖片右邊
	 * @param {string} iconUrl 頁尾圖片，左下角，跟頭像一樣迷你
	 * @returns {EmbedMessage}
	 */
	ESetFooter(text, iconUrl) {
		this.setFooter({ text: text, iconURL: iconUrl });
		return this;
	}
	/** 設定訊息發送時間(在頁尾右邊)
	 *
	 * @returns {EmbedMessage}
	 */
	ESetTimestamp() {
		this.setTimestamp();
		return this;
	}
}

/** 回傳一個 EmbedMessage
 *
 * @returns {EmbedMessage}
 */
exports.ENewEmbed = () => new EmbedMessage();
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
				cl.on(Events?.ClientReady && "ready", doSomeThing);
				break;
			case "message":
				cl.on(Events?.MessageCreate && "messageCreate", doSomeThing);
				break;
			case "messageUpdate":
				cl.on(Events?.MessageUpdate && "messageUpdate", doSomeThing);
				break;
			case "messageDelete":
				cl.on(Events?.MessageDelete && "messageDelete", doSomeThing);
				break;
			case "slash":
				cl.on(Events?.InteractionCreate && "interactionCreate", doSomeThing);
				break;
			case "button":
				cl.on(Events?.InteractionCreate && "interactionCreate", doSomeThing);
				break;
			case "selectMenu":
				cl.on(Events?.InteractionCreate && "interactionCreate", doSomeThing);
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

exports.GetMe = function () {
	return client;
};

//#endregion

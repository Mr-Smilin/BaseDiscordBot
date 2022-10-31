# BaseDiscordBot

基礎 Discord 模板

基於 Discord.js 14.1.0 版

第一次使用請在根目錄創建 .env
設定 bot token

```
TOKEN="your bot token"
BOT_ID="your bot ID"
```

## slashTable

Discord 在斜線命令上有著豐富的擴充性
BDB 透過 `slashTable` 與 `discord.js` 溝通

```
[
  {
    // 斜線命令名稱
    "name": "test",
    // 斜線命令簡介
    "description": "阿你就輸入點甚麼啦",
    // 斜線命令回傳的方式
    // 0 = reply一個訊息
    "replyType": 0,
    // true = 回傳訊息僅接收者可見,false = 預設
    "ephemeral": true,
    // 選項 (若為空陣列則無)
    "options":[{
      // 選項名稱
      "name":"input",
      // 選項簡介
      "description":"輸入文字",
      // 該選項是否必填
      "required": true,
      // 選項類型 會影響 discord 對選項的顯示
      // string | int | bool | user | channel | role | mention | number | attachment
      "type":"string",
      // 預設選擇，存在預設選擇時不能輸入以外的數值 (若為空陣列則無)
      "choices":[{
        // 選擇顯示的名字，跟實際帶入的數值
        "name": "funny","value": "yeee"
      },
      {
        "name": "funny2","value": "yeee2"
      }]
    }]
  }
]
```

Subcommand 方法尚未支援，開發中

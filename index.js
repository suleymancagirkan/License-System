const Discord = require('discord.js');
const mysql = require('mysql');
const client = new Discord.Client({
  shards: "auto",
  intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MESSAGES",
      "GUILD_INTEGRATIONS",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_TYPING",
      "GUILD_INVITES",
      "GUILD_PRESENCES",
      "DIRECT_MESSAGES",
      "GUILD_VOICE_STATES",
      "GUILD_EMOJIS_AND_STICKERS"
  ],
});
client.config = require('./ayarlar.json')
client.commands = new Discord.Collection();

client.connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "license"
})
client.connection.connect(function(err) {
    if (err) throw err;
    console.log("Bağlantı kuruldu!");
    var sql = "CREATE TABLE lisanslar (ip VARCHAR(255), urun VARCHAR(255))";
    client.connection.query(sql, function (err, result) {
        if (err) return console.log("Table zaten bulunuyor.");
        console.log("Table created");
    });
});

require("./handler/command.js")(client)

client.login(client.config.token);

module.exports = {client};

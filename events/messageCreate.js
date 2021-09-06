const Discord = require("discord.js");
module.exports = {
    name: "messageCreate",
    run: async (client, msg) => {
        if (msg.author.bot || msg.channel.type === "dm") return;
        let prefix = client.config.prefix
        let command = msg.content.split(" ")[0].slice(prefix.length);
        let args = msg.content.split(" ").slice(prefix.length);
        if (msg.content.startsWith(prefix)) {
            if (client.commands.get(command) != null) {
                let cmd = client.commands.get(command);
                cmd.run(client, msg, args);
            }
        }
    }
}
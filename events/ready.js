const Discord = require("discord.js")
const mysql = require("mysql")
const API = require("./../api/api.js");
module.exports = { 
    name: "ready",
    run: async(client) => {
               
        API(client)
        let lisans = [];
        client.connection.query("SELECT * FROM lisanslar", function (err, result, fields) {
            if (err) throw err;
            result.map((s) => {
                lisans.push(s);
            })
        })
        setTimeout(() => {
            console.log(`Lisans sistemi aktif. (${lisans.length} adet Lisans)`);
        })
        setInterval(() => {
            let lisanss = [];
            client.connection.query("SELECT * FROM lisanslar", function (err, result, fields) {
                if (err) throw err;
                result.map((s) => {
                    lisanss.push(s);
                })
            })
            setTimeout(() => {
                client.user.setActivity(`${lisanss.length} Lisans aktif.`)
            }, 1000)
        }, 2500)
    }
}
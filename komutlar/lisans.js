const Discord = require("discord.js");
module.exports = {
    name: "lisans",
    aliases: ["license"],
    run: async(client, message, args) => {

        if(!client.config.kullanabilenIDler.includes(message.author.id)) return message.reply("Bu komutu sadece sahiplerim kullanabilir.")
        if(String(args[0]).toLowerCase() == "oluştur") {
            let ip = args[1];
            let urun = args[2];
            
            if(ip) {
                if(urun) {
                    var bulnyor = null;
                    client.connection.query("SELECT * FROM lisanslar", function (err, result, fields) {
                        if (err) throw err;
                        result.map(s => {
                            if(s.ip == ip) {
                                if(String(s.urun).toLowerCase() == urun.toLowerCase()) {
                                    bulnyor = true;
                                    return message.reply("Bu IP adresinde zaten bu ürün bulunuyor.");
                                }
                            }
                        })
                    })
                    setTimeout(() => {
                        if(bulnyor != true) {
                            var sql = "INSERT INTO lisanslar (ip, urun) VALUES ('"+ ip +"', '" + urun +"')";
                            client.connection.query(sql, function (err, result) {
                                if (err) return message.reply("Bu IP adresinde zaten bu ürün bulunuyor.")
                                message.reply("Başarıyla belirli `"+ip+"` adresine `"+urun+"` ürünü tanımlandı.")
                            });
                        }
                    }, 1000)
                } else {
                    return message.reply("Lütfen ürün adını gir.")
                }
            } else {
                return message.reply("Lütfen lisans ip adresini gir.")
            }
        } else if(String(args[0]).toLowerCase() == "kontrol") {
            let ip = args[1];
            
            if(ip) {
                let urunler = [];
                client.connection.query("SELECT * FROM lisanslar", function (err, result, fields) {
                    if (err) throw err;
                    result.map(s => {
                        if(s.ip == ip) {
                            urunler.push(s.urun);
                        }
                    })
                })
                setTimeout(() => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(ip + " adresine tanımlı ürünler")
                        .setFooter("zRooter lisans sistemi")
                        .setColor("BLURPLE");
                    if(urunler.length >= 1) {
                        embed.setDescription("`" + urunler.join("\n`") + "`");
                    }else {
                        embed.setDescription("`Tanımlı ürün yok`");
                    }

                    message.reply({embeds: [embed]});
                }, 2000)
            } else {
                return message.reply("Lütfen lisans ip adresini gir.")
            }
        } else if(String(args[0]).toLowerCase() == "sil"||String(args[0]).toLowerCase() == "kaldır") {
            let ip = args[1];
            let urun = args[2];
            
            if(ip) {
                if(urun) {
                    var sql = "DELETE FROM lisanslar WHERE ip = '"+ip+"' and urun = '"+urun+"'";
                    client.connection.query(sql, function (err, result) {
                        if (err) throw err;
                        if(result.affectedRows >= 1) {
                            return message.reply("Başarıyla `"+ip+"` adresine tanımlı olan `"+urun+"` silindi.")
                        } else {
                            return message.reply("`"+ip+"` adresine tanımlı olan `"+urun+"` ürün yok.")
                        }
                    });
                } else {
                    return message.reply("Lütfen ürün adını gir.")
                }
            } else {
                return message.reply("Lütfen lisans ip adresini gir.")
            }
        }
    }
}
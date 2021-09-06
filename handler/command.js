const fs = require('fs');
module.exports = async(client) => {
    
    fs.readdir("./komutlar", function(err, files) {
        console.log("---- Komutlar yükleniyor ----")
        files.forEach(file => {
            if(String(file).endsWith(".js")) {

                let props = require("../komutlar/" + file);
                client.commands.set(props.name, props)
                if(props.aliases) {
                    props.aliases.forEach(alias => {
                        client.commands.set(alias, props)
                    })
                }
                console.log(props.name + " yüklendi")

            } else {
                console.log(file + " .js ile bitmiyor")
            }
        })
        console.log("---- Komutlar yüklendi ----")
    })

    fs.readdir("./events" , function(err, files) {
        console.log("---- Eventler yükleniyor ----")
        files.forEach(file => {
            if(String(file).endsWith(".js")) {

                let props = require("../events/" + file);
                client.on(props.name, props.run.bind(null, client));
                console.log(props.name + " eventi yüklendi.")

            } else {
                console.log(file + " .js ile bitmiyor")
            }
        })
        console.log("---- Eventler yüklendi ----")
    })

}
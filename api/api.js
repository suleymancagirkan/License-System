const express = require("express");
const mysql = require("mysql");
const app = express();
app.listen(8000, () => console.log("80 portundan dinleniyor."))
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require("ejs");

module.exports = async(client) => {
    app.engine("html", ejs.renderFile);
    app.set("view engine", "html");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    app.get("/", (req, res) => {
        res.render("index.ejs", {client: client});
    });
    app.get("/api", (req, res) => {
        res.render("index.ejs", {client: client});
    });
    app.get("/api/lisans/type=KONTROL&ip=:IP", (req, res) => {
        let ip = req.params.IP
        let urunler = [];
        client.connection.query("SELECT * FROM lisanslar", function (err, result, fields) {
            if (err) throw err;
            result.map(s => {
                if(s.ip == ip) {
                    urunler.push(s.urun);
                }
            })
            res.send(`{ ip: "${ip}", urunler: ${urunler.length >= 1 ? "[" + ('"' + urunler.join(`", "`) + '"') + "]" : "[]"} }`)
        })
    });
    app.get("/api/lisans/type=KONTROL", (req, res) => {
        let ip = req.params.IP
        let lisanslar = [];
        client.connection.query("SELECT * FROM lisanslar", function (err, result, fields) {
            if (err) throw err;
            result.map(s => {
                lisanslar.push(s);
            })
            res.send(lisanslar)
        })
    });

}
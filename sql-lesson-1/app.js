const mysql = require('mysql');
const express = require('express');

const app = express();
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Thundaga32",
    database: "text"
});
const querystring = require("querystring");
con.connect((err) => {
    if (err) console.log(err);
    else {
        con.query("CREATE DATABASE IF NOT EXISTS text", (err, result) => {
            if (err)
            { console.log(err);
            }
            else {
                console.log("DB created");

            }
            con.query("use text");
            con.query("SELECT 1 FROM testTable LIMIT 1", (err, result) => {
                if (err) {
                    con.query("CREATE TABLE testTable (name VARCHAR(255), text VARCHAR(255))", (err, result) => {
                        if (err) console.log(err);
                        else {
                            console.log(result);
                        }
                    })
                }
            })
        });

    }
})

app.get("/", (req, res) => {
    con.query("SELECT * FROM test", (err, body) => {
        if (err) {
            throw(err);
        }
        res.send(body);
    });


});

app.get("/add", (req, res) => {
    let query = querystring.parse(req.url);

    let name = query.name;
    let text = query.text;
    let line = "INSERT INTO test (name, text) VALUES ('" + name + "', '" + text + "');";

    con.query(line, (err, body) => {
        if (err) {
            throw(err);
        }
        res.send(body);
    })


});

app.listen(8888);

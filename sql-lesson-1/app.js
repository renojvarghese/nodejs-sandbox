const mysql = require('mysql');
const express = require('express');

const app = express();
const con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: ""
});

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

});

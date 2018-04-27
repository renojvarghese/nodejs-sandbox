const nodemailer = require('nodemailer');
const http = require('http');
const fs = require("fs");
const sendEmail = (sender, pass, recipient, subject, message) => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: pass
        }
    });

    let email = {
        from: sender,
        to: recipient,
        subject: subject,
        text: message
    }

    transport.sendMail(email, (err, body) => {
        if (err) {
            console.log(err);
            return 1;
        }
        else {
            console.log(body.response);
            return 0;
        }
    });
}

const errorResponse = (res) => {
    res.writeHeader('401', {"Content-Type": "text/html"});
    res.write("Oops. Something bad happened ¯\\_(ツ)_/¯");
    res.end();
}
http.createServer( (req, res) => {
    if (req.method == 'GET') {
        fs.readFile('public/index.html', (err, file) => {
            if (err) {
                errorResponse(err);
            }
            else {
                res.writeHeader("200", {"Content-Type": "text/html"});
                res.write(file);
                res.end();
            }
        });
    }
    else if (req.method == 'POST') {
        req.on('data', (data) => {

            let params = data.toString().split('%40').join('@').split('&');
            params.forEach( (param, index) =>{
                params[index] = param.substring(param.indexOf('=')+1);
            })
            let err = sendEmail(...params);
            if (err) {
                errorResponse(err);
            }
            else {
                fs.readFile('public/success.html', (err, file) => {
                    if (err) {
                        errorResponse(err);
                    }
                    else {
                        res.writeHeader("200", {"Content-Type": "text/html"});
                        res.write(file);
                        res.end();
                    }
                });
            }
        })
    }

}).listen(8888);

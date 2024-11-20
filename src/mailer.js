const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD
    }
});

exports.send = function (to, subject, html) {
    return transporter.sendMail({
        from: process.env.NEXT_PUBLIC_FROM,
        to: to,
        subject: subject,
        html: html
    });
};


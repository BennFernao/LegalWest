require("dotenv").config()

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.nossoEmail,
    pass: process.env.passworddoemail
  }
});


async function enviarEmail(from, to, subject, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html
  });

  return info
}


module.exports = enviarEmail

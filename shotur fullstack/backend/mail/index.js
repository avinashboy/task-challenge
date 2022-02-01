const { USER_EMAIL, USER_PASSWORD, APP_URL } = require("../config");
const nodemailer = require("nodemailer");
const { mailTemplate, forgotMailTemplate } = require("../template/mail");

function sendMail({ name, email, password, code }) {
  let smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(smtpConfig);

  const sender = USER_EMAIL.split("@")[0];
  const link = `${APP_URL}verify?token=${code}`;
  const htmlTemplate = mailTemplate({ sender, link, password, name });
  var mailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: "Please Confirm Your Email Address",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      return console.log("Email sent: " + info.response);
    }
  });
}

function forgotMail({ name, email, code }) {
  let smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(smtpConfig);

  const sender = USER_EMAIL.split("@")[0];
  const link = `${APP_URL}forgot?token=${code}`;
  const htmlTemplate = forgotMailTemplate({ sender, link, name });
  var mailOptions = {
    from: USER_EMAIL,
    to: email,
    subject: "Forgot Password Link",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      return console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { sendMail, forgotMail };

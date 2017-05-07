var functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// Listens for new emails added to /emails/:pushId and sends the email to the recipient
exports.sendEmail = functions.database.ref('/emails/{pushId}').onWrite(event => {
    let mailOptions = {
        from: event.data.val().sender,
        to: event.data.val().recipients,
        subject: event.data.val().subject,
        text: event.data.val().body
    };

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('Email sent to:', mailOptions.to);
    });
  })

var functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const gmailBodyStart = functions.config().gmail.bodystart
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// Listens for new emails added to /emails/:pushId and sends the email to the recipient
exports.sendEmail = functions.database.ref('/emails/{pushId}').onWrite(event => {
    if (event.data.val() === null) { return }

    const body = gmailBodyStart + event.data.val().sender + '\n\n' + event.data.val().body

    // sender email is the same as the configuration email
    // the actual sender email is added into the body
    let mailOptions = {
        from: gmailEmail,
        to: event.data.val().recipients,
        subject: event.data.val().subject,
        text: body
    };
    event.data.ref.remove();

    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('Email sent to:', mailOptions.to);
    });
  })

/**
 * @providesModule MailHelper
 * @flow
 */
 import { Alert } from 'react-native';
 import { getLabel } from 'Labels';
 import { getEmailRef } from 'FirebaseConnection';
 var Mailer = require('NativeModules').RNMail;

 export function launchMailAppWith(subject, recipients, body) {
   Mailer.mail({
     subject: subject,
     recipients: recipients,
     body: body,
   }, (error, event) => {
       if(error) {
         Alert.alert(getLabel('contact.errorTitle'), getLabel('contact.errorMessage'));
       }
   });
 }

 export function sendMailWith(sender, subject, recipient, body) {
    getEmailRef().set({
      sender: sender,
      subject: subject,
      recipients : recipient,
      body : body
    });
 }

 export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let valid = re.test(email)

    if (!valid) {
      Alert.alert(null, getLabel('invalidEmail.message'))
    }

    return valid;
}

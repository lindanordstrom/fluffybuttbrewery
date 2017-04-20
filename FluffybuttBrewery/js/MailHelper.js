/**
 * @providesModule MailHelper
 * @flow
 */
 import { Alert } from 'react-native';
 import { getLabel } from 'Labels';
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

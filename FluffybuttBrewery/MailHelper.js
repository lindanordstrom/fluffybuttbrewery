/**
 * @providesModule MailHelper
 * @flow
 */
 import { AlertIOS } from 'react-native';
 import { getLabel } from 'Labels';
 var Mailer = require('NativeModules').RNMail;

 export function launchMailAppWith(subject, recipients, body) {
     Mailer.mail({
       subject: subject,
       recipients: recipients,
       body: body,
       isHTML: true, // iOS only, exclude if false
     }, (error, event) => {
         if(error) {
           AlertIOS.alert(getLabel('contact.errorTitle'), getLabel('contact.errorMessage'));
         }
     });
   }

/**
 * @providesModule Labels
 * Language: sv
 */

import { isIOS } from 'PlatformWrapper';

const labels = {

  /**
   * Common labels
   */
  common: {

    // Launch
    'launch.errorTitle': 'Server Error',
    'launch.errorMessage': 'Vänligen försök igen',

    // Validate email
    'invalidEmail.message': 'Vänligen fyll i en epost-address',

    // Product List Page
    'plp.title': 'Fluffybutt Brewery',
    'plp.id': 'ProductListPage',

    // Contact Page

    'contact.button': 'Maila Bryggeriet',
    'contact.placeholder': 'Skriv in ditt meddelande här',
    'contact.placeholderEmail': 'Skriv in din epost-address',
    'contact.send': 'Skicka',
    'contact.close': 'Avbryt',
    'contact.subject': 'Allmän förfrågan',
    'contact.emailSent': '          Ditt mail har skickats!          ',
    'contact.facebookURL': 'https://www.facebook.com/fluffybuttbrew/',

    // Product Details Page

    'pdp.id': 'ProductDetailsPage',
    'pdp.contact.button': 'Kontakta bryggeriet angående denna produkt',
    'pdp.contact.subject': 'Ang: ',
    'pdp.contact.body': 'Hej, jag är intresserad utav ',
    'pdp.inStock.label': 'I lager ✅',
    'pdp.notInStock.label': 'Ej i lager ❌',

    // Support Page
    'support.feedbackButtonLabel': 'Ge feedback på appen',
    'support.feedbackSubject': 'FluffybuttBrewery App Feedback',
    'support.feedbackRecipient': 'lindanordstrom86@gmail.com',
    'support.rateButtonLabel': 'Betygsätt appen på ',
    'support.errorTitle': 'Ett fel inträffade',
    'support.feedbackErrorMessage': 'Vi kunde inte öppna din e-postklient, vänligen skicka din app feedback till lindanordstrom86@gmail.com',
    'support.rateErrorMessage': 'Kunde inte öppna länken i ',
    'support.iosStore': 'AppStore',
    'support.androidStore': 'Google Play',
    'support.iosStoreURL': 'itms-apps://itunes.apple.com/app/viewContentsUserReviews?id=',
    'support.androidStoreURL': 'market://details?id=',
  },

  /**
   * Ios-specific labels
   */
  ios: {
    //
  },

  /**
   * Android-specific labels
   */
  android: {
    //
  }
};

function labelsForPlatform(platform) {
  return { ...labels.common, ...(platform === 'ios' ? labels.ios : labels.android) };
}

function getLabel(labelId) {
  const labels = labelsForPlatform(isIOS() ? 'ios' : 'android');
  return labels[labelId];
}

module.exports = { getLabel };

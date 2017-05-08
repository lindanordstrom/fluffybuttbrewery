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
    'plp.currencyLabel': 'kr',
    'plp.alcoholPercentageLabel': 'Alkoholhalt: ',
    'plp.percentageLabel': '%',
    'plp.alcoholPercentageMissing': 'alkoholhalt saknas',
    'plp.priceMissing': 'pris saknas',

    // Contact Page

    'contact.button': 'Maila Bryggeriet',
    'contact.placeholder': 'Skriv in ditt meddelande här',
    'contact.placeholderEmail': 'Skriv in din epost-address',
    'contact.send': 'Skicka',
    'contact.close': 'Avbryt',
    'contact.errorTitle': 'Ett fel inträffade',
    'contact.errorMessage': 'Vi kunde inte öppna din e-postklient, vänligen skicka din förfrågan till andreas.blyberg@live.se',
    'contact.subject': 'Allmän förfrågan',
    'contact.recipient': 'lindanordstrom86@gmail.com',
    'contact.sender': 'lindanordstrom86@gmail.com',
    'contact.emailSent': '          Ditt mail har skickats!          ',

    // Product Details Page

    'pdp.id': 'ProductDetailsPage',
    'pdp.contact.button': 'Kontakta bryggeriet angående denna produkt',
    'pdp.contact.subject': 'Ang: ',
    'pdp.contact.body': 'Hej, jag är intresserad utav ',
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

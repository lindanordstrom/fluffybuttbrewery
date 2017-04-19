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

    // Contact Page

    'contact.button': 'Maila Bryggeriet',
    'contact.details': 'Fluffybutt Brewery\nAntenngatan 55A, 42133 Västra Frölunda\nTel: 0730-40 10 15\n\n',
    'contact.errorTitle': 'Ett fel inträffade',
    'contact.errorMessage': 'Vi kunde inte öppna din e-postklient, vänligen skicka din förfråga till lindanordstrom86@gmail.com',
    'contact.subject': 'Allmän förfrågan',
    'contact.recipient': 'lindanordstrom86@gmail.com',

    // Product Details Page

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

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
    'invalidEmail.message': 'Vänligen fyll i en giltig epost-address',

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
    'pdp.basket.button': 'Lägg till i intresselistan',
    'pdp.inStock.label': 'I lager ✅',
    'pdp.notInStock.label': 'Ej i lager ❌',
    'pdp.basket.added': '          Tillagd i intresselistan!          ',

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

    // Basket Page
    'basket.description': 'Fyll i din epost-address nedan och skicka iväg din intresseförfrågan till bryggeriet.',
    'basket.emptyBasket': 'Lägg till några produkter i din intresselista',
    'basket.disclaimer': 'Observera att produkterna du valt kanske inte finns i lager eller inte finns i den mängd du angett. \n\nEn intresseförfrågan är inte bindande och ingen betalning kommer göras förens båda parter kommit överens via mail. \n\nFörsälning av alkoholhaltiga drycker kan ej göras mot privatpersoner, men alla är välkommna att skicka frågor kring produkterna och var de eventuellt finns till försälning.',
    'basket.button': 'Skicka intresseförfrågan',
    'basket.sendConfirmationTitle': 'Skicka intresseförfrågan?',
    'basket.sendConfirmationMessage': 'Är du säker på att du vill skicka denna intresseförfrågan till bryggeriet?',
    'basket.subject': 'Intresseförfrågan',
    'basket.bodyIntro': 'Hej. Jag är intresserad av följande produkter:\n\n',
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

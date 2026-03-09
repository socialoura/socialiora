// Script de debug pour Google Ads Conversion Tracking
// À exécuter dans la console du navigateur

console.log('=== DEBUG GOOGLE ADS CONVERSION TRACKING ===');

// 1. Vérifier les variables d'environnement
console.log('Variables d\'environnement:');
console.log('NEXT_PUBLIC_GA_AW_ID:', process.env?.NEXT_PUBLIC_GA_AW_ID || 'Non défini côté client');
console.log('NEXT_PUBLIC_GA_INSTA_FUNNEL_ID:', process.env?.NEXT_PUBLIC_GA_INSTA_FUNNEL_ID || 'Non défini côté client');

// 2. Vérifier si gtag est chargé
console.log('\nGTag status:');
console.log('window.gtag existe:', typeof window.gtag !== 'undefined');
console.log('dataLayer existe:', Array.isArray(window.dataLayer));

// 3. Vérifier les configs GA
if (window.dataLayer) {
  console.log('\nConfigs trouvées dans dataLayer:');
  const configs = window.dataLayer.filter(item => 
    item && item[0] === 'config' && item[1] && item[1].startsWith('AW-')
  );
  configs.forEach(config => console.log(config));
}

// 4. Test d'envoi d'événement
console.log('\nTest d\'envoi d\'évévement:');
if (typeof window.gtag !== 'undefined') {
  const testConversion = {
    send_to: 'AW-123456789/insta_funnel_sale', // Remplacer par tes vraies valeurs
    value: 29.99,
    currency: 'EUR',
    transaction_id: 'test_' + Date.now()
  };
  
  console.log('Envoi de test:', testConversion);
  window.gtag('event', 'conversion', testConversion);
  console.log('Événement envoyé ! Vérifie le Network tab.');
} else {
  console.error('gtag n\'est pas disponible !');
}

// 5. Vérifier les erreurs dans la console
console.log('\nRecherche d\'erreurs:');
const warnings = [...console.warn].filter(msg => msg.includes('gtag'));
const errors = [...console.error].filter(msg => msg.includes('gtag'));
if (warnings.length > 0) console.warn('Warnings trouvés:', warnings);
if (errors.length > 0) console.error('Erreurs trouvées:', errors);

console.log('=== FIN DEBUG ===');

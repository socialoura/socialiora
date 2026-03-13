'use client';

import { Language } from '@/i18n/config';

interface PageProps {
  params: { lang: string };
}

export default function PrivacyPage({ params }: PageProps) {
  const lang = params.lang as Language;

  const content = {
    en: {
      title: 'Data Protection Notice',
      lastUpdated: 'Effective from: March 2026',
      sections: [
        {
          title: '1. Data We Gather',
          content: 'We gather personal details that you voluntarily submit when registering an account, placing an order, or reaching out to our team. This may include your name, email address, payment information, and social media handle.'
        },
        {
          title: '2. Purpose of Data Processing',
          content: 'The data we collect is utilized exclusively to deliver, maintain, and enhance our platform, fulfill transactions, send order updates, and respond to your support requests. We never use your data for purposes unrelated to the service.'
        },
        {
          title: '3. Third-Party Disclosure',
          content: 'Your personal data will never be sold, rented, or disclosed to external parties without your explicit permission, except where legally required or necessary to complete a transaction (e.g., payment processor).'
        },
        {
          title: '4. Safeguarding Your Data',
          content: 'We deploy industry-standard encryption protocols and organizational safeguards to shield your personal data from unauthorized access, alteration, or destruction. Our payment partner Stripe is PCI DSS Level 1 certified.'
        },
        {
          title: '5. Tracking Technologies',
          content: 'Our platform employs cookies and analogous tracking mechanisms to enhance user experience, remember preferences, and analyze site traffic patterns. You may adjust cookie settings through your browser at any time.'
        },
        {
          title: '6. Your Data Rights',
          content: 'Under applicable regulations (including GDPR), you retain the right to access, rectify, export, or erase your personal data at any time. To exercise these rights, contact our data protection team at the address below.'
        },
        {
          title: '7. Reach Our Privacy Team',
          content: 'For any concerns regarding this notice, write to support@socialiora.com or send postal mail to Socialiora, 75 Place de la Madeleine, 75010 Paris, France.'
        }
      ]
    },
    fr: {
      title: 'Avis de Protection des Données',
      lastUpdated: 'En vigueur depuis : Mars 2026',
      sections: [
        {
          title: '1. Données Recueillies',
          content: 'Nous recueillons les informations personnelles que vous soumettez volontairement lors de l\'inscription, d\'une commande ou d\'un contact avec notre équipe : nom, adresse e-mail, informations de paiement et identifiant de réseau social.'
        },
        {
          title: '2. Finalité du Traitement',
          content: 'Les données collectées servent exclusivement à délivrer, maintenir et optimiser notre plateforme, exécuter les transactions, envoyer des notifications de commande et répondre à vos demandes d\'assistance.'
        },
        {
          title: '3. Communication à des Tiers',
          content: 'Vos données personnelles ne seront jamais vendues, louées ou divulguées à des parties externes sans votre autorisation explicite, sauf obligation légale ou nécessité liée à l\'exécution d\'une transaction.'
        },
        {
          title: '4. Protection de vos Données',
          content: 'Nous déployons des protocoles de chiffrement conformes aux standards de l\'industrie et des mesures organisationnelles pour protéger vos données contre tout accès, modification ou destruction non autorisés.'
        },
        {
          title: '5. Technologies de Suivi',
          content: 'Notre plateforme utilise des cookies et mécanismes de suivi analogues pour améliorer l\'expérience utilisateur, mémoriser vos préférences et analyser le trafic du site. Vous pouvez ajuster les paramètres des cookies dans votre navigateur.'
        },
        {
          title: '6. Vos Droits sur vos Données',
          content: 'Conformément aux réglementations applicables (dont le RGPD), vous conservez le droit d\'accéder, de rectifier, d\'exporter ou d\'effacer vos données personnelles à tout moment.'
        },
        {
          title: '7. Contacter notre Équipe Données',
          content: 'Pour toute préoccupation relative à cet avis, écrivez à support@socialiora.com ou par courrier à Socialiora, 75 Place de la Madeleine, 75010 Paris, France.'
        }
      ]
    },
    de: {
      title: 'Datenschutzhinweis',
      lastUpdated: 'Gültig ab: März 2026',
      sections: [
        {
          title: '1. Erhobene Daten',
          content: 'Wir erfassen personenbezogene Daten, die Sie bei der Registrierung, Bestellung oder Kontaktaufnahme freiwillig angeben: Name, E-Mail-Adresse, Zahlungsinformationen und Social-Media-Handle.'
        },
        {
          title: '2. Zweck der Datenverarbeitung',
          content: 'Ihre Daten werden ausschließlich zur Bereitstellung, Wartung und Verbesserung unserer Plattform, zur Abwicklung von Transaktionen und zur Beantwortung Ihrer Supportanfragen verwendet.'
        },
        {
          title: '3. Weitergabe an Dritte',
          content: 'Ihre personenbezogenen Daten werden ohne Ihre ausdrückliche Genehmigung weder verkauft noch vermietet oder an externe Parteien weitergegeben, es sei denn, dies ist gesetzlich vorgeschrieben.'
        },
        {
          title: '4. Schutz Ihrer Daten',
          content: 'Wir setzen branchenstandard­konforme Verschlüsselungsprotokolle und organisatorische Schutzmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff, Änderung oder Zerstörung zu schützen.'
        },
        {
          title: '5. Tracking-Technologien',
          content: 'Unsere Plattform verwendet Cookies und vergleichbare Tracking-Mechanismen, um das Nutzererlebnis zu verbessern, Präferenzen zu speichern und Website-Traffic zu analysieren.'
        },
        {
          title: '6. Ihre Datenrechte',
          content: 'Gemäß den geltenden Vorschriften (einschließlich DSGVO) behalten Sie das Recht, jederzeit auf Ihre personenbezogenen Daten zuzugreifen, diese zu berichtigen, zu exportieren oder zu löschen.'
        },
        {
          title: '7. Unser Datenschutzteam erreichen',
          content: 'Bei Fragen zu diesem Hinweis schreiben Sie an support@socialiora.com oder per Post an Socialiora, 75 Place de la Madeleine, 75010 Paris, Frankreich.'
        }
      ]
    },
    es: {
      title: 'Aviso de Protección de Datos',
      lastUpdated: 'Vigente desde: Marzo 2026',
      sections: [
        {
          title: '1. Datos Recopilados',
          content: 'Recopilamos datos personales que usted envía voluntariamente al registrarse, realizar un pedido o contactar con nuestro equipo: nombre, correo electrónico, información de pago e identificador de red social.'
        },
        {
          title: '2. Finalidad del Tratamiento',
          content: 'Los datos recopilados se utilizan exclusivamente para ofrecer, mantener y mejorar nuestra plataforma, procesar transacciones, enviar actualizaciones de pedidos y responder a sus solicitudes de soporte.'
        },
        {
          title: '3. Divulgación a Terceros',
          content: 'Sus datos personales nunca serán vendidos, alquilados o divulgados a partes externas sin su permiso explícito, salvo obligación legal o necesidad vinculada a la ejecución de una transacción.'
        },
        {
          title: '4. Protección de sus Datos',
          content: 'Desplegamos protocolos de cifrado estándar de la industria y salvaguardas organizativas para proteger sus datos contra accesos, alteraciones o destrucción no autorizados.'
        },
        {
          title: '5. Tecnologías de Rastreo',
          content: 'Nuestra plataforma emplea cookies y mecanismos de seguimiento similares para mejorar la experiencia del usuario, recordar preferencias y analizar patrones de tráfico del sitio.'
        },
        {
          title: '6. Sus Derechos sobre los Datos',
          content: 'Conforme a la normativa aplicable (incluyendo el RGPD), usted conserva el derecho de acceder, rectificar, exportar o eliminar sus datos personales en cualquier momento.'
        },
        {
          title: '7. Contactar con nuestro Equipo de Privacidad',
          content: 'Para cualquier consulta sobre este aviso, escriba a support@socialiora.com o por correo postal a Socialiora, 75 Place de la Madeleine, 75010 París, Francia.'
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-gray-950">
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-gray-400">{t.lastUpdated}</p>
        </div>

        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { Language } from '@/i18n/config';

interface PageProps {
  params: { lang: string };
}

export default function PrivacyPage({ params }: PageProps) {
  const lang = params.lang as Language;

  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: December 2024',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us.'
        },
        {
          title: '2. How We Use Your Information',
          content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.'
        },
        {
          title: '3. Information Sharing',
          content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.'
        },
        {
          title: '4. Data Security',
          content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access.'
        },
        {
          title: '5. Cookies',
          content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information.'
        },
        {
          title: '6. Your Rights',
          content: 'You have the right to access, update, or delete your personal information at any time.'
        },
        {
          title: '7. Contact Information',
          content: 'If you have any questions about this Privacy Policy, please contact us at support@socialoura.com'
        }
      ]
    },
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : Décembre 2024',
      sections: [
        {
          title: '1. Informations que nous collectons',
          content: 'Nous collectons les informations que vous nous fournissez directement, comme lorsque vous créez un compte ou utilisez nos services.'
        },
        {
          title: '2. Comment nous utilisons vos informations',
          content: 'Nous utilisons les informations collectées pour fournir, maintenir et améliorer nos services, traiter les transactions et communiquer avec vous.'
        },
        {
          title: '3. Partage d\'informations',
          content: 'Nous ne vendons, n\'échangeons ni ne transférons vos informations personnelles à des tiers sans votre consentement.'
        },
        {
          title: '4. Sécurité des données',
          content: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles.'
        },
        {
          title: '5. Cookies',
          content: 'Nous utilisons des cookies et technologies de suivi similaires pour suivre l\'activité sur notre service.'
        },
        {
          title: '6. Vos droits',
          content: 'Vous avez le droit d\'accéder, de mettre à jour ou de supprimer vos informations personnelles à tout moment.'
        },
        {
          title: '7. Informations de contact',
          content: 'Pour toute question sur cette politique de confidentialité, veuillez nous contacter à support@socialoura.com'
        }
      ]
    },
    de: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Zuletzt aktualisiert: Dezember 2024',
      sections: [
        {
          title: '1. Informationen, die wir sammeln',
          content: 'Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, wie bei der Kontoerstellung oder Nutzung unserer Dienste.'
        },
        {
          title: '2. Wie wir Ihre Informationen verwenden',
          content: 'Wir verwenden die gesammelten Informationen, um unsere Dienste bereitzustellen, zu pflegen und zu verbessern.'
        },
        {
          title: '3. Informationsweitergabe',
          content: 'Wir verkaufen, tauschen oder übertragen Ihre persönlichen Informationen nicht ohne Ihre Zustimmung an Dritte.'
        },
        {
          title: '4. Datensicherheit',
          content: 'Wir implementieren angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer persönlichen Informationen.'
        },
        {
          title: '5. Cookies',
          content: 'Wir verwenden Cookies und ähnliche Tracking-Technologien, um die Aktivität auf unserem Dienst zu verfolgen.'
        },
        {
          title: '6. Ihre Rechte',
          content: 'Sie haben das Recht, jederzeit auf Ihre persönlichen Informationen zuzugreifen, diese zu aktualisieren oder zu löschen.'
        },
        {
          title: '7. Kontaktinformationen',
          content: 'Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns unter support@socialoura.com'
        }
      ]
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: Diciembre 2024',
      sections: [
        {
          title: '1. Información que recopilamos',
          content: 'Recopilamos información que nos proporciona directamente, como cuando crea una cuenta o usa nuestros servicios.'
        },
        {
          title: '2. Cómo usamos su información',
          content: 'Usamos la información recopilada para proporcionar, mantener y mejorar nuestros servicios y procesar transacciones.'
        },
        {
          title: '3. Compartir información',
          content: 'No vendemos, intercambiamos ni transferimos su información personal a terceros sin su consentimiento.'
        },
        {
          title: '4. Seguridad de datos',
          content: 'Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal.'
        },
        {
          title: '5. Cookies',
          content: 'Usamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro servicio.'
        },
        {
          title: '6. Sus derechos',
          content: 'Tiene derecho a acceder, actualizar o eliminar su información personal en cualquier momento.'
        },
        {
          title: '7. Información de contacto',
          content: 'Si tiene preguntas sobre esta Política de Privacidad, contáctenos en support@socialoura.com'
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

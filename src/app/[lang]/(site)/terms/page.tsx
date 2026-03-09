'use client';

import { Language } from '@/i18n/config';

interface PageProps {
  params: { lang: string };
}

export default function TermsPage({ params }: PageProps) {
  const lang = params.lang as Language;

  const content = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: December 2024',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using Socialoura, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          title: '2. Description of Service',
          content: 'Socialoura provides social media growth services for Instagram and TikTok platforms through our network of partners.'
        },
        {
          title: '3. User Responsibilities',
          content: 'Users are responsible for maintaining the confidentiality of their account and password.'
        },
        {
          title: '4. Payment Terms',
          content: 'All payments are processed securely through Stripe. Refunds are handled according to our refund policy.'
        },
        {
          title: '5. Prohibited Activities',
          content: 'Users may not use our services for any illegal or unauthorized purpose.'
        },
        {
          title: '6. Limitation of Liability',
          content: 'Socialoura shall not be liable for any indirect, incidental, special, consequential or punitive damages.'
        },
        {
          title: '7. Contact Information',
          content: 'For any questions about these Terms of Service, please contact us at support@socialoura.com'
        }
      ]
    },
    fr: {
      title: 'Conditions Générales de Vente',
      lastUpdated: 'Dernière mise à jour : Décembre 2024',
      sections: [
        {
          title: '1. Acceptation des Conditions',
          content: 'En accédant et en utilisant Socialoura, vous acceptez d\'être lié par les termes et dispositions de cet accord.'
        },
        {
          title: '2. Description du Service',
          content: 'Socialoura fournit des services de croissance sur les réseaux sociaux pour les plateformes Instagram et TikTok.'
        },
        {
          title: '3. Responsabilités de l\'Utilisateur',
          content: 'Les utilisateurs sont responsables de maintenir la confidentialité de leur compte et de leur mot de passe.'
        },
        {
          title: '4. Conditions de Paiement',
          content: 'Tous les paiements sont traités en toute sécurité via Stripe. Les remboursements sont traités selon notre politique.'
        },
        {
          title: '5. Activités Interdites',
          content: 'Les utilisateurs ne peuvent pas utiliser nos services à des fins illégales ou non autorisées.'
        },
        {
          title: '6. Limitation de Responsabilité',
          content: 'Socialoura ne pourra être tenu responsable des dommages indirects, accessoires, spéciaux ou consécutifs.'
        },
        {
          title: '7. Informations de Contact',
          content: 'Pour toute question sur ces CGV, veuillez nous contacter à support@socialoura.com'
        }
      ]
    },
    de: {
      title: 'Nutzungsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert: Dezember 2024',
      sections: [
        {
          title: '1. Annahme der Bedingungen',
          content: 'Durch die Nutzung von Socialoura stimmen Sie den Bedingungen dieser Vereinbarung zu.'
        },
        {
          title: '2. Beschreibung des Dienstes',
          content: 'Socialoura bietet Wachstumsdienste für soziale Medien für Instagram- und TikTok-Plattformen an.'
        },
        {
          title: '3. Benutzerverantwortlichkeiten',
          content: 'Benutzer sind für die Wahrung der Vertraulichkeit ihres Kontos und Passworts verantwortlich.'
        },
        {
          title: '4. Zahlungsbedingungen',
          content: 'Alle Zahlungen werden sicher über Stripe abgewickelt. Rückerstattungen erfolgen gemäß unserer Rückerstattungsrichtlinie.'
        },
        {
          title: '5. Verbotene Aktivitäten',
          content: 'Benutzer dürfen unsere Dienste nicht für rechtswidrige oder nicht autorisierte Zwecke nutzen.'
        },
        {
          title: '6. Haftungsbeschränkung',
          content: 'Socialoura haftet nicht für indirekte, zufällige, besondere oder Folgeschäden.'
        },
        {
          title: '7. Kontaktinformationen',
          content: 'Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns unter support@socialoura.com'
        }
      ]
    },
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: Diciembre 2024',
      sections: [
        {
          title: '1. Aceptación de los Términos',
          content: 'Al acceder y usar Socialoura, acepta estar sujeto a los términos y disposiciones de este acuerdo.'
        },
        {
          title: '2. Descripción del Servicio',
          content: 'Socialoura proporciona servicios de crecimiento en redes sociales para plataformas Instagram y TikTok.'
        },
        {
          title: '3. Responsabilidades del Usuario',
          content: 'Los usuarios son responsables de mantener la confidencialidad de su cuenta y contraseña.'
        },
        {
          title: '4. Términos de Pago',
          content: 'Todos los pagos se procesan de forma segura a través de Stripe. Los reembolsos se gestionan según nuestra política.'
        },
        {
          title: '5. Actividades Prohibidas',
          content: 'Los usuarios no pueden usar nuestros servicios para fines ilegales o no autorizados.'
        },
        {
          title: '6. Limitación de Responsabilidad',
          content: 'Socialoura no será responsable de daños indirectos, incidentales, especiales o consecuentes.'
        },
        {
          title: '7. Información de Contacto',
          content: 'Para preguntas sobre estos Términos de Servicio, contáctenos en support@socialoura.com'
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

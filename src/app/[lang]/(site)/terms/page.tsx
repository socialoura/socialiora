'use client';

import { Language } from '@/i18n/config';

interface PageProps {
  params: { lang: string };
}

export default function TermsPage({ params }: PageProps) {
  const lang = params.lang as Language;

  const content = {
    en: {
      title: 'General Terms & Conditions',
      lastUpdated: 'Effective from: March 2026',
      sections: [
        {
          title: '1. Agreement to Conditions',
          content: 'Your continued use of the Socialiora platform constitutes your acknowledgment and acceptance of every clause outlined within this document. If you do not consent to these provisions, you must discontinue use immediately.'
        },
        {
          title: '2. Nature of the Platform',
          content: 'Socialiora operates as a digital marketing acceleration service, delivering audience growth solutions across Instagram and TikTok via a curated network of verified promotional partners. Our headquarters are located at 75 Place de la Madeleine, 75010 Paris.'
        },
        {
          title: '3. Client Obligations',
          content: 'Each client bears sole responsibility for safeguarding the confidentiality of their login credentials and account details. Any activity conducted under your credentials shall be deemed authorized by you.'
        },
        {
          title: '4. Billing & Refund Provisions',
          content: 'Every transaction is handled through the PCI-compliant Stripe payment gateway. Refund eligibility is assessed on a case-by-case basis in accordance with our published refund guidelines. Chargebacks initiated without prior contact may result in account suspension.'
        },
        {
          title: '5. Restricted Usage',
          content: 'Clients are expressly forbidden from leveraging the platform for unlawful, fraudulent, or otherwise unauthorized activities. Violation of this clause may lead to immediate termination of service without reimbursement.'
        },
        {
          title: '6. Liability Cap',
          content: 'Under no circumstances shall Socialiora, its officers, directors, or affiliates be held liable for indirect, incidental, consequential, special, or exemplary damages arising from the use of our services, even if we have been advised of the possibility of such damages.'
        },
        {
          title: '7. How to Reach Us',
          content: 'Should you have inquiries regarding these conditions, please direct your correspondence to support@socialiora.com or write to us at 75 Place de la Madeleine, 75010 Paris, France.'
        }
      ]
    },
    fr: {
      title: 'Conditions Générales d\'Utilisation',
      lastUpdated: 'En vigueur depuis : Mars 2026',
      sections: [
        {
          title: '1. Consentement aux Conditions',
          content: 'Votre utilisation continue de la plateforme Socialiora vaut reconnaissance et acceptation de l\'ensemble des clauses figurant dans le présent document. Si vous n\'y consentez pas, veuillez cesser immédiatement toute utilisation.'
        },
        {
          title: '2. Nature de la Plateforme',
          content: 'Socialiora est un service d\'accélération marketing digital, proposant des solutions de croissance d\'audience sur Instagram et TikTok via un réseau de partenaires promotionnels vérifiés. Notre siège est situé au 75 Place de la Madeleine, 75010 Paris.'
        },
        {
          title: '3. Obligations du Client',
          content: 'Chaque client est seul responsable de la protection de ses identifiants de connexion et des informations de son compte. Toute activité effectuée sous vos identifiants sera considérée comme autorisée par vous.'
        },
        {
          title: '4. Facturation et Remboursement',
          content: 'Chaque transaction est traitée via la passerelle de paiement Stripe, conforme PCI. L\'éligibilité au remboursement est évaluée au cas par cas conformément à nos conditions de remboursement publiées.'
        },
        {
          title: '5. Usages Restreints',
          content: 'Il est strictement interdit aux clients d\'exploiter la plateforme à des fins illicites, frauduleuses ou non autorisées. Toute violation de cette clause pourra entraîner la résiliation immédiate du service sans compensation.'
        },
        {
          title: '6. Plafond de Responsabilité',
          content: 'En aucun cas Socialiora, ses dirigeants ou affiliés ne sauraient être tenus responsables de dommages indirects, accessoires, consécutifs, spéciaux ou exemplaires résultant de l\'utilisation de nos services.'
        },
        {
          title: '7. Nous Contacter',
          content: 'Pour toute question relative à ces conditions, veuillez adresser votre correspondance à support@socialiora.com ou par courrier au 75 Place de la Madeleine, 75010 Paris, France.'
        }
      ]
    },
    de: {
      title: 'Allgemeine Geschäftsbedingungen',
      lastUpdated: 'Gültig ab: März 2026',
      sections: [
        {
          title: '1. Zustimmung zu den Bedingungen',
          content: 'Durch die fortgesetzte Nutzung der Socialiora-Plattform erkennen Sie sämtliche in diesem Dokument aufgeführten Bestimmungen an. Sollten Sie nicht einverstanden sein, stellen Sie die Nutzung bitte umgehend ein.'
        },
        {
          title: '2. Art der Plattform',
          content: 'Socialiora ist ein digitaler Marketing-Beschleunigungsdienst, der über ein geprüftes Netzwerk von Werbepartnern Wachstumslösungen für Instagram und TikTok bereitstellt. Unser Sitz befindet sich am 75 Place de la Madeleine, 75010 Paris.'
        },
        {
          title: '3. Pflichten des Kunden',
          content: 'Jeder Kunde ist allein für den Schutz seiner Zugangsdaten und Kontoinformationen verantwortlich. Jede unter Ihren Zugangsdaten durchgeführte Aktivität gilt als von Ihnen autorisiert.'
        },
        {
          title: '4. Abrechnung und Erstattung',
          content: 'Sämtliche Transaktionen werden über das PCI-konforme Zahlungsgateway Stripe abgewickelt. Die Erstattungsfähigkeit wird im Einzelfall gemäß unseren veröffentlichten Erstattungsrichtlinien geprüft.'
        },
        {
          title: '5. Eingeschränkte Nutzung',
          content: 'Kunden ist es ausdrücklich untersagt, die Plattform für rechtswidrige, betrügerische oder anderweitig nicht autorisierte Zwecke zu verwenden. Ein Verstoß kann zur sofortigen Kündigung ohne Erstattung führen.'
        },
        {
          title: '6. Haftungsobergrenze',
          content: 'Unter keinen Umständen haften Socialiora, seine Geschäftsführer oder verbundene Unternehmen für indirekte, beiläufige, folgerichtige, besondere oder exemplarische Schäden, die aus der Nutzung unserer Dienste entstehen.'
        },
        {
          title: '7. So erreichen Sie uns',
          content: 'Bei Fragen zu diesen Bedingungen wenden Sie sich bitte an support@socialiora.com oder schreiben Sie an 75 Place de la Madeleine, 75010 Paris, Frankreich.'
        }
      ]
    },
    es: {
      title: 'Condiciones Generales de Uso',
      lastUpdated: 'Vigente desde: Marzo 2026',
      sections: [
        {
          title: '1. Conformidad con las Condiciones',
          content: 'Al continuar utilizando la plataforma Socialiora, usted reconoce y acepta cada cláusula descrita en este documento. Si no está de acuerdo, debe dejar de utilizar el servicio de inmediato.'
        },
        {
          title: '2. Naturaleza de la Plataforma',
          content: 'Socialiora funciona como un servicio de aceleración de marketing digital, ofreciendo soluciones de crecimiento de audiencia en Instagram y TikTok a través de una red verificada de socios promocionales. Nuestra sede se encuentra en 75 Place de la Madeleine, 75010 París.'
        },
        {
          title: '3. Obligaciones del Cliente',
          content: 'Cada cliente es el único responsable de proteger sus credenciales de acceso y la información de su cuenta. Cualquier actividad realizada con sus credenciales se considerará autorizada por usted.'
        },
        {
          title: '4. Facturación y Reembolsos',
          content: 'Todas las transacciones se procesan a través de la pasarela de pago Stripe, compatible con PCI. La elegibilidad para reembolso se evalúa caso por caso según nuestras directrices de reembolso publicadas.'
        },
        {
          title: '5. Uso Restringido',
          content: 'Queda expresamente prohibido que los clientes utilicen la plataforma con fines ilegales, fraudulentos o no autorizados. La violación de esta cláusula puede resultar en la terminación inmediata del servicio sin reembolso.'
        },
        {
          title: '6. Límite de Responsabilidad',
          content: 'En ningún caso Socialiora, sus directivos o afiliados serán responsables de daños indirectos, incidentales, consecuentes, especiales o ejemplares derivados del uso de nuestros servicios.'
        },
        {
          title: '7. Cómo Contactarnos',
          content: 'Si tiene consultas sobre estas condiciones, envíe su correspondencia a support@socialiora.com o escriba a 75 Place de la Madeleine, 75010 París, Francia.'
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

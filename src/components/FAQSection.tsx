'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQSectionProps {
  lang: string;
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const content = {
    en: {
      title: 'Got Questions? We Have Answers',
      subtitle: 'All the details you need before getting started',
      faqs: [
        {
          question: 'Will this put my account at risk?',
          answer: 'Not at all. Our approach relies on fully compliant techniques aligned with every platform\'s guidelines. Your credentials are never requested, and sensitive data stays private.',
        },
        {
          question: 'How quickly are followers delivered?',
          answer: 'The majority of orders reach completion in 5–10 minutes. Higher-volume requests may roll out over 24 hours via gradual delivery for optimal security.',
        },
        {
          question: 'Are the followers genuine people?',
          answer: 'Every single follower is a real, active account. We categorically refuse bots and hollow profiles—your engagement comes from authentic users.',
        },
        {
          question: 'What if the results disappoint me?',
          answer: 'We stand behind a full money-back promise. If you\'re anything less than thrilled within 30 days, we\'ll issue a complete refund—no questions, no hassle.',
        },
        {
          question: 'Is there protection against follower drops?',
          answer: 'Absolutely. Every order includes a 60-day replenishment guarantee. Should any followers disappear during that window, we top them up at no extra charge.',
        },
      ],
    },
    fr: {
      title: 'Questions Fréquemment Posées',
      subtitle: 'Tout ce que vous devez savoir',
      faqs: [
        {
          question: 'Ce service est-il sûr pour mon compte ?',
          answer: 'Absolument ! Nous utilisons des méthodes 100% sûres conformes à toutes les directives des plateformes. Aucun mot de passe n\'est jamais requis.',
        },
        {
          question: 'À quelle vitesse vais-je recevoir mes abonnés ?',
          answer: 'La plupart des commandes sont complétées en 5-10 minutes. Les grandes commandes peuvent prendre jusqu\'à 24h pour une livraison progressive.',
        },
        {
          question: 'S\'agit-il de vrais abonnés ou de bots ?',
          answer: 'Tous les abonnés sont de vrais comptes. Nous n\'utilisons jamais de bots ou de faux profils.',
        },
        {
          question: 'Que se passe-t-il si je ne suis pas satisfait ?',
          answer: 'Nous offrons une garantie satisfait ou remboursé à 100%. Si vous n\'êtes pas complètement satisfait sous 30 jours, nous vous remboursons.',
        },
        {
          question: 'Offrez-vous des recharges si des abonnés disparaissent ?',
          answer: 'Oui ! Nous offrons une garantie de recharge de 60 jours. Si des abonnés disparaissent, nous les remplaçons gratuitement.',
        },
      ],
    },
    de: {
      title: 'Häufig Gestellte Fragen',
      subtitle: 'Alles, was Sie wissen müssen',
      faqs: [
        {
          question: 'Ist dieser Service sicher für mein Konto?',
          answer: 'Absolut! Wir verwenden 100% sichere Methoden, die allen Plattformrichtlinien entsprechen. Es wird nie ein Passwort benötigt.',
        },
        {
          question: 'Wie schnell erhalte ich meine Follower?',
          answer: 'Die meisten Bestellungen werden innerhalb von 5-10 Minuten abgeschlossen. Größere Bestellungen können bis zu 24 Stunden dauern.',
        },
        {
          question: 'Sind das echte Follower oder Bots?',
          answer: 'Alle Follower sind echte Konten. Wir verwenden niemals Bots oder gefälschte Profile.',
        },
        {
          question: 'Was ist, wenn ich nicht zufrieden bin?',
          answer: 'Wir bieten eine 100% Geld-zurück-Garantie. Wenn Sie innerhalb von 30 Tagen nicht vollständig zufrieden sind, erstatten wir Ihren Kauf.',
        },
        {
          question: 'Bieten Sie Nachfüllungen an, wenn Follower abfallen?',
          answer: 'Ja! Wir bieten eine 60-Tage-Nachfüllgarantie. Wenn Follower während dieser Zeit abfallen, ersetzen wir sie kostenlos.',
        },
      ],
    },
  };

  const t = content[lang as keyof typeof content] || content.en;

  return (
    <article className="py-28 bg-white">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-5">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {t.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-violet-300 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-7 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-violet-600 to-pink-600 rotate-180'
                      : 'bg-gray-100'
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-white" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 animate-slide-up">
                  <p className="text-base leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

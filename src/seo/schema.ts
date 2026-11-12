import type { LanguagesType } from '../i18/langs'

const SITE_URL = 'https://costaricatures.com'

const descriptions: Record<LanguagesType, string> = {
  ru: 'Индивидуальные туры, экскурсии и трансферы в Коста-Рике от русскоговорящего гида Ольги Наймушиной.',
  es: 'Tours, excursiones y traslados en Costa Rica con la guía rusohablante Olga Naimushina.',
  en: 'Tours, excursions and transfers in Costa Rica with Russian-speaking guide Olga Naimushina.',
}

export const getStructuredData = (language: LanguagesType, pathname: string, t: (key: string) => string) => {
  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'TravelAgency',
      '@id': `${SITE_URL}/#travelagency`,
      name: 'Costa Rica Tures',
      alternateName: [
        'Costa Rica Tours',
        'Туры Коста-Рика',
        'Costa Rica Tures — Туры и гид Ольга Наймушина',
      ],
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      image: `${SITE_URL}/og/cover.jpg`,
      description: descriptions[language],
      telephone: '+50689122090',
      email: 'oldagatour@gmail.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '125 metros al este de la escuela Simon Bolivar',
        addressLocality: 'Grecia',
        addressRegion: 'Alajuela',
        postalCode: '20304',
        addressCountry: 'CR',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Costa Rica',
      },
      knowsLanguage: [
        { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
        { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
      founder: { '@id': `${SITE_URL}/#olga` },
      employee: [
        { '@id': `${SITE_URL}/#olga` },
        { '@id': `${SITE_URL}/#david` },
      ],
      foundingDate: '2018',
      knowsAbout: [
        'Туры по Коста-Рике',
        'Экскурсии и авторские маршруты',
        'VIP-транспорт и трансферы',
        'Подбор отелей',
        'Организация туров для туроператоров',
      ],
      legalName: 'SRL Oldaga Group',
      sameAs: [
        'https://www.facebook.com/Brokertour.ru',
        'https://www.instagram.com/costarica_travelideas/',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#olga`,
      name: 'Ольга Наймушина',
      alternateName: 'Olga Naimushina',
      description: 'Основатель Costa Rica Tures, организатор и координатор туров.',
      jobTitle: 'Основатель, организатор и координатор туров',
      worksFor: { '@id': `${SITE_URL}/#travelagency` },
      knowsLanguage: [
        { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
        { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
      sameAs: ['https://needguide.net/view_guide.php?user_id=19691'],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#david`,
      name: 'Давид Гонсалес',
      alternateName: 'David Gonzalez',
      description: 'Главный гид, гид-костариканец, свободно говорящий по-русски.',
      jobTitle: 'Главный гид',
      worksFor: { '@id': `${SITE_URL}/#travelagency` },
      knowsLanguage: [
        { '@type': 'Language', name: 'Russian', alternateName: 'ru' },
        { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
        { '@type': 'Language', name: 'English', alternateName: 'en' },
      ],
      sameAs: ['https://needguide.net/view_guide.php?user_id=22898'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Costa Rica Tures',
      inLanguage: ['ru', 'es', 'en'],
      publisher: { '@id': `${SITE_URL}/#travelagency` },
    },
  ]

  if (pathname === '/about/') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about/#webpage`,
      url: `${SITE_URL}${language === 'ru' ? '/about/' : `/${language}/about/`}`,
      inLanguage: language,
      mainEntity: { '@id': `${SITE_URL}/#travelagency` },
      about: [
        { '@id': `${SITE_URL}/#travelagency` },
        { '@id': `${SITE_URL}/#olga` },
        { '@id': `${SITE_URL}/#david` },
      ],
    })
  }

  if (pathname === '/faq/') {
    const questions: Array<Record<string, unknown>> = []
    for (let i = 1; i <= 20; i += 1) {
      const questionKey = `faq.${i}.question`
      const answerKey = `faq.${i}.answer`
      const question = t(questionKey)
      const answer = t(answerKey)
      if (question && answer && question !== questionKey && answer !== answerKey) {
        questions.push({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })
      }
    }

    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/faq/#faq`,
      url: `${SITE_URL}${language === 'ru' ? '/faq/' : `/${language}/faq/`}`,
      inLanguage: language,
      mainEntity: questions,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

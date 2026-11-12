import { describe, expect, it } from 'vitest'
import { getStructuredData } from './schema'

const t = (key: string) => {
  if (key === 'faq.1.question') return 'Вопрос'
  if (key === 'faq.1.answer') return 'Ответ'
  return key
}

const types = (pathname: string) =>
  getStructuredData('ru', pathname, t)['@graph'].map((item) => item['@type'])

describe('structured data', () => {
  it('contains the core entities', () => {
    expect(types('/')).toEqual(expect.arrayContaining(['TravelAgency', 'Person', 'WebSite']))
  })

  it('links the agency, both guides and NeedGuide profiles', () => {
    const graph = getStructuredData('ru', '/', t)['@graph']
    const agency = graph.find((item) => item['@type'] === 'TravelAgency')
    const people = graph.filter((item) => item['@type'] === 'Person')

    expect(agency?.employee).toHaveLength(2)
    expect(agency?.founder).toEqual({ '@id': 'https://costaricatures.com/#olga' })
    expect(people[0]?.sameAs).toContain('https://needguide.net/view_guide.php?user_id=19691')
    expect(people[1]?.sameAs).toContain('https://needguide.net/view_guide.php?user_id=22898')
  })

  it('adds AboutPage only to the about page', () => {
    expect(types('/about/')).toContain('AboutPage')
    expect(types('/')).not.toContain('AboutPage')
  })

  it('adds FAQPage with questions only to the FAQ page', () => {
    const faq = getStructuredData('ru', '/faq/', t)['@graph'].find((item) => item['@type'] === 'FAQPage')

    expect(faq?.mainEntity).toHaveLength(1)
    expect(faq?.inLanguage).toBe('ru')
    expect(types('/')).not.toContain('FAQPage')
  })
})

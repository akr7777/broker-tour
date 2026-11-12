import { useTranslation } from 'react-i18next'
import { ArticleTitle } from '../../shared/title/title'
import { WidgetWrapper } from '../../shared/widget-wrapper/widget-wrapper'

import './about-page.scss'

const OLGA_NEEDGUIDE = 'https://needguide.net/view_guide.php?user_id=19691'
const DAVID_NEEDGUIDE = 'https://needguide.net/view_guide.php?user_id=22898'

const services = [
  'service1',
  'service2',
  'service3',
  'service4',
  'service5',
  'service6',
  'service7',
  'service8',
]

const reasons = ['why1', 'why2', 'why3', 'why4', 'why5']

export const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <div className="about-page">
      <WidgetWrapper>
        <ArticleTitle title={t('about_page.title')} level="h1" />
        <p className="about-page-intro">{t('about_page.intro')}</p>
        <p>{t('about_page.experience')}</p>

        <h2>{t('about_page.team_title')}</h2>
        <div className="about-page-team">
          <article className="about-page-person">
            <div className="about-page-photo-placeholder" aria-label={t('about_page.olga_name')}>
              <span>ОН</span>
            </div>
            <div>
              <h3>{t('about_page.olga_name')}</h3>
              <p className="about-page-role">{t('about_page.olga_role')}</p>
              <p>{t('about_page.olga_bio')}</p>
              <a href={OLGA_NEEDGUIDE} target="_blank" rel="noopener noreferrer">
                {t('about_page.needguide')}
              </a>
            </div>
          </article>

          <article className="about-page-person">
            <div className="about-page-photo-placeholder" aria-label={t('about_page.david_name')}>
              <span>ДГ</span>
            </div>
            <div>
              <h3>{t('about_page.david_name')}</h3>
              <p className="about-page-role">{t('about_page.david_role')}</p>
              <p>{t('about_page.david_bio')}</p>
              <a href={DAVID_NEEDGUIDE} target="_blank" rel="noopener noreferrer">
                {t('about_page.needguide')}
              </a>
            </div>
          </article>
        </div>

        <h2>{t('about_page.services_title')}</h2>
        <ul className="about-page-list">
          {services.map((service) => (
            <li key={service}>{t(`about_page.${service}`)}</li>
          ))}
        </ul>

        <h2>{t('about_page.why_title')}</h2>
        <ul className="about-page-list">
          {reasons.map((reason) => (
            <li key={reason}>{t(`about_page.${reason}`)}</li>
          ))}
        </ul>

        <h2>{t('about_page.b2b_title')}</h2>
        <p>{t('about_page.b2b_text')}</p>
      </WidgetWrapper>
    </div>
  )
}

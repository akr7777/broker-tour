import { usePageContext } from 'vike-react/usePageContext'
import type { LanguagesType } from '../src/i18/langs'
import { AnalyticsScripts } from '../src/seo/analytics'
import { SITE_URL, getSeoHeadData } from '../src/seo/head'

export function Head() {
  const pageContext = usePageContext()
  const language = (pageContext.routeParams.lang ?? 'ru') as LanguagesType
  const { title, description, canonical, alternates, structuredData } = getSeoHeadData(
    language,
    pageContext.urlPathname,
  )

  return (
    <>
      <AnalyticsScripts />
      <script src="/index-preloader-script.js" defer />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {Object.entries(alternates).map(([hreflang, href]) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${SITE_URL}/og/cover.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}

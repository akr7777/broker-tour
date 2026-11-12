import type { PageContext } from 'vike/types'

export function route(pageContext: PageContext) {
  const match = pageContext.urlPathname.match(/^\/(?:(es|en)\/)?tour-info\/(\d+)\/?$/)
  if (!match) return false
  return { routeParams: { lang: match[1] ?? 'ru', tourId: match[2] } }
}

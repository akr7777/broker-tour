import type { PageContext } from 'vike/types'

export default function lang(pageContext: PageContext) {
  return pageContext.routeParams.lang ?? 'ru'
}

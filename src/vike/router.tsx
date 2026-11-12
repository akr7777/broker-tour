import { usePageContext } from 'vike-react/usePageContext'

type NavigateOptions = {
  replace?: boolean
}

const navigate = (to: string, options?: NavigateOptions) => {
  if (typeof window === 'undefined') return
  void import('vike/client/router').then(({ navigate: vikeNavigate }) => {
    vikeNavigate(to, options?.replace ? { overwriteLastHistoryEntry: true } : undefined)
  })
}

export const useNavigate = () => navigate

export const useParams = () => {
  const pageContext = usePageContext()
  return pageContext.routeParams
}

export const useLocation = () => {
  const pageContext = usePageContext()
  return {
    pathname: pageContext.urlPathname,
    search: pageContext.urlParsed.searchOriginal ?? '',
    hash: typeof window === 'undefined' ? '' : window.location.hash,
  }
}

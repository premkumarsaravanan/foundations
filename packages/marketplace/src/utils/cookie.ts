import hardtack from 'hardtack'

// cookie 10 years
export const COOKIE_MAX_AGE_INFINITY = 60 * 60 * 24 * 365 * 10
export const COOKIE_FIRST_TIME_LOGIN = 'reapit-first-login-complete'

export const COOKIE_FIRST_TIME_LOGIN_DEVELOPER = 'reapit-developer-first-login-complete'
export const COOKIE_TERMS_ACCEPTED = 'reapit-term-accepted'
export const COOKIE_FIRST_SUBMIT = 'reapit-read-docs'

export const COOKIE_DOMAIN_WHITELIST = ['.reapit.cloud', 'localhost']

export const getCookieString = (key: string): string => {
  try {
    const cookie = hardtack.get(key) as string
    return cookie
  } catch {
    return ''
  }
}

export const setCookieString = (
  key: string,
  value: string | Date,
  maxAge?: number,
  href: string = window.location.href,
): void => {
  const whitelistedHost = COOKIE_DOMAIN_WHITELIST.filter(item => href.includes(item))[0]

  if (whitelistedHost) {
    hardtack.set(key, value.toString(), {
      path: '/',
      domain: whitelistedHost,
      samesite: 'lax',
      maxAge,
    })
  }
}

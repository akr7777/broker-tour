import emailjs from '@emailjs/browser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildBookingParams, sendBookingNotification } from './emailjs'

vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn() },
}))

const sendMock = vi.mocked(emailjs.send)

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service')
  vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'template')
  vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('EmailJS booking notification', () => {
  it('builds normalized params', () => {
    const params = buildBookingParams({
      tourTitle: ' Tour ',
      phone: ' +506 8912 2090 ',
      message: ' Hello ',
      language: 'ru',
      pageUrl: 'https://example.com/tour-info/1',
    })

    expect(params.tour_title).toBe('Tour')
    expect(params.phone).toBe('+506 8912 2090')
    expect(params.message).toBe('Hello')
    expect(params.language).toBe('ru')
    expect(params.page_url).toBe('https://example.com/tour-info/1')
    expect(params.submitted_at).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('sends with configured ids and public key', async () => {
    sendMock.mockResolvedValue({ status: 200, text: 'OK' })

    await sendBookingNotification({
      tourTitle: 'Tour',
      phone: '+50689122090',
      message: 'Hello',
      language: 'es',
      pageUrl: 'https://example.com/tour-info/1',
    })

    expect(sendMock).toHaveBeenCalledWith(
      'service',
      'template',
      expect.objectContaining({
        tour_title: 'Tour',
        phone: '+50689122090',
        language: 'es',
      }),
      { publicKey: 'public' },
    )
  })

  it('throws if config is missing', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '')

    await expect(sendBookingNotification({
      tourTitle: 'Tour',
      phone: '+50689122090',
      message: 'Hello',
      language: 'es',
    })).rejects.toThrow('EmailJS configuration is missing')
  })

  it('throws on non-200 response', async () => {
    sendMock.mockResolvedValue({ status: 422, text: 'Bad template' })

    await expect(sendBookingNotification({
      tourTitle: 'Tour',
      phone: '+50689122090',
      message: 'Hello',
      language: 'es',
    })).rejects.toThrow('EmailJS responded with status 422')
  })
})

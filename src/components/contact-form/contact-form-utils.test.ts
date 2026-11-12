import { describe, expect, it } from 'vitest'
import { isHoneypotFilled, isValidPhone, normalizePhoneDigits } from './contact-form-utils'

describe('contact form utilities', () => {
  it('normalizes a phone number', () => {
    expect(normalizePhoneDigits('+506 8912-2090')).toBe('50689122090')
  })

  it('validates phone length', () => {
    expect(isValidPhone('123')).toBe(false)
    expect(isValidPhone('+506 8912 2090')).toBe(true)
  })

  it('detects a filled honeypot', () => {
    expect(isHoneypotFilled('')).toBe(false)
    expect(isHoneypotFilled('   ')).toBe(false)
    expect(isHoneypotFilled('spam')).toBe(true)
  })
})

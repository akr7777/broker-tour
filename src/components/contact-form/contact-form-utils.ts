export const normalizePhoneDigits = (phone: string) => phone.replace(/\D/g, '')

export const isValidPhone = (phone: string) => normalizePhoneDigits(phone).length >= 7

export const isHoneypotFilled = (value: string) => value.trim().length > 0

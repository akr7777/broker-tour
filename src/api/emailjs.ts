import emailjs from '@emailjs/browser'

export type BookingNotification = {
    tourTitle: string
    phone: string
    message: string
    language: string
    pageUrl?: string
}

type EmailJsConfig = {
    serviceId: string
    templateId: string
    publicKey: string
}

const readConfig = (): EmailJsConfig => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

    if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
    }

    return { serviceId, templateId, publicKey }
}

export const buildBookingParams = (data: BookingNotification) => ({
    tour_title: data.tourTitle.trim(),
    phone: data.phone.trim(),
    message: data.message.trim(),
    language: data.language,
    page_url: data.pageUrl || window.location.href,
    submitted_at: new Date().toISOString(),
})

export const sendBookingNotification = async (data: BookingNotification) => {
    const { serviceId, templateId, publicKey } = readConfig()

    const response = await emailjs.send(
        serviceId,
        templateId,
        buildBookingParams(data),
        { publicKey },
    )

    if (response.status !== 200) {
        throw new Error(`EmailJS responded with status ${response.status}`)
    }

    return response
}

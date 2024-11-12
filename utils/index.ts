import type {Contact} from "~/types"

export function formatPhoneNumber(input: string) {
    let cleaned = input.replace(/\D/g, '')

    if (cleaned.length === 11) {
        return cleaned
    }

    return null
}

export function unformatPhoneNumber(input: string): string | null {
    let cleaned = input.replace(/\D/g, '')

    if (cleaned.length !== 11)
        return null

    // Форматируем номер в нужный формат
    const match = cleaned.match(/^(7)(\d{3})(\d{3})(\d{2})(\d{2})$/)

    if (match) {
        return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
    }

    return null // Возвращаем null, если формат не совпадает
}

export function formatFormValues(values: Object) {
    return <Contact>Object.fromEntries(
        Object.entries(values).map(([key, value]) => {
            if (key === 'phone')
                return [key, formatPhoneNumber(value)]
            return [key, value];
        })
    )
}
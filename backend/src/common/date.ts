export function parseBRDateTime(value: string): Date {
    const [date, time] = value.split(' ')
    const [dd, mm, yyyy] = date.split('/').map(Number)
    const [hh, min] = time.split(':').map(Number)

    if (!dd || !mm || !yyyy || hh < 0 || hh > 23 || min < 0 || min > 59) {
        throw new Error('Data/hora inválida.')
    }

    return new Date(yyyy, mm - 1, dd, hh, min, 0, 0);

}
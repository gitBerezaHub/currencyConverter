const API_KEY = "825cd8f41f73cb21801a01b4"
const API_URL = "https://v6.exchangerate-api.com/v6"

export async function fetchRates(base) {

    const res = await fetch(`${API_URL}/${API_KEY}/latest/${base}`)

    if (!res.ok)
        throw new Error("Ошибка загрузки курса")

    const data = await res.json()

    return data.conversion_rates
}
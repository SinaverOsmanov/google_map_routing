export async function getAddress(lat: number, lon: number) {
    const response = await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lon)
    return await response.json()
}

import { WeatherDto } from "@/types/dtos"

export async function fetchData(): Promise<any> {
  const response = await fetch('https://localhost:7075/WeatherForecast')

  if (response.ok) {
    const data: WeatherDto[] = await response.json()

    return data
  }

  return []
}
"use client"

import { useState } from "react";
import { PageBox } from "@/components/page-box";
import { Button } from "@mui/material";

interface WeatherDto {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export default function CreateAccount({ title }: { title: string}): React.ReactElement {
  const [weathers, setWeathers] = useState<WeatherDto[]>([])

  async function fetchData(): Promise<any> {
    const response = await fetch('https://localhost:7075/WeatherForecast')

    if (response.ok) {
      const data: WeatherDto[] = await response.json()

      setWeathers(data)
    }
  }

  return (
    <PageBox>
      <span>Create account</span>
      <div>
        {weathers.map((weather, index) => (
          <div key={index}>
            <span>{weather.date}</span>
            <span>{weather.temperatureC}</span>
            <span>{weather.summary}</span>
          </div>
        ))}
      </div>
      <Button variant="outlined" onClick={() => fetchData()} >Get weather forecast</Button>
    </PageBox>
  )
}

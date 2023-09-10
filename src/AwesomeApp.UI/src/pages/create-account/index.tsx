"use client"

import { useState } from "react";
import { NavBar } from "../../components/nav-bar"
import styles from "./styles.module.css"
import { resolve } from "path";
import { GetStaticPathsResult } from "next";

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
    <div>
      <span>{title}</span>
      <div>
        {weathers.map((weather, index) => (
          <div key={index}>
            <span>{weather.date}</span>
            <span>{weather.temperatureC}</span>
            <span>{weather.summary}</span>
          </div>
        ))}
      </div>
      <input type="button" value="Get Weather Forecast" onClick={() => fetchData()} />
      <NavBar />
    </div>
  )
}

type StaticProps = {
  props : {
    title: string;
  };
}

export async function getStaticProps({ params }: any): Promise<StaticProps> {
  // return new Promise<StaticProps>(
  //   (resolve) => resolve({
    return {
      props: {
        title: 'Test static props ' + params?.something
      }
    }
    // })
  // )
}

// export async function getStaticPaths(): Promise<GetStaticPathsResult> {
//   return {
//     paths: [
//       {
//         params: {
//           something: 'test'
//         }
//       },
//       {
//         params: {
//           something: 'test2'
//         }
//       }
//     ],
//     fallback: false
//   }
// }

// type ServerSideProps = {
//   props: {
//     id: number;
//   };
// }

// export async function getServerSideProps(): Promise<ServerSideProps> {
//   return new Promise(
//     (resolve) => resolve({
//       props: {
//         id: Math.random() * 100
//       }
//     })
//   )
// }
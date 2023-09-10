import { CustomerType } from "@/models";

export interface CreateAccountDto {
  email: string;
  password: string;
  fullName: string;
  age: number;
  customerType: CustomerType
}

// To be removed
export interface WeatherDto {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

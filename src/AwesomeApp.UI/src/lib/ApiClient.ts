import useSWR from "swr";

export function useApiClient(): any {
  const { data, error, isLoading } = useSWR("") 
  
  return data
}
import useSWR from "swr";

async function getActiveAccounts(payload: any): Promise<any> {
  const { data, error, isLoading } = useSWR("/api/accounts", payload) 
  
  return data
} 
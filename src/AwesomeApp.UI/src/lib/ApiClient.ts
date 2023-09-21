// const test = localStorage.getItem('authToekn')

const headers = { 'Content-Type': 'application/json' }

function getUrlQuery(query: { [param: string]: string | number | boolean }): string {
  if (query) {
    return '?' + Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
  }

  return ''
}

export const apiClient = {
  get: (endpoint: string, query?: { [param: string]: string | number | boolean } ) => {
    if (query) {
      endpoint = endpoint + getUrlQuery(query)
    }

    return fetch(endpoint, { method: 'GET' })
  },
  post: (endpoint: string, body?: any) => fetch(endpoint, { method: 'POST', body: JSON.stringify(body), headers: headers }),
  put: (endpoint: string, body?: any) => fetch(endpoint, { method: 'PUT', body: JSON.stringify(body), headers: headers }),
  patch: (endpoint: string, body?: any) => fetch(endpoint, { method: 'PATCH', body: JSON.stringify(body), headers: headers }),
  delete: (endpoint: string) => fetch(endpoint, { method: 'DELETE' }),
  options: (endpoint: string) => fetch(endpoint, { method: 'OPTIONS' }),
}

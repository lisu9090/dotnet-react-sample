// const test = localStorage.getItem('authToekn')

export const apiClient = {
  get: (endpoint: string, query?: { [param: string]: string | number | boolean } ) => {
    if (query) {
      endpoint = endpoint + getUrlQuery(query)
    }

    return fetch(endpoint, { method: 'GET' })
  },
  post: (endpoint: string, body?: any) => fetch(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint: string, body?: any) => fetch(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint: string, body?: any) => fetch(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint: string) => fetch(endpoint, { method: 'DELETE' }),
  options: (endpoint: string) => fetch(endpoint, { method: 'OPTIONS' }),
}

function getUrlQuery(query: { [param: string]: string | number | boolean }): string {
  if (query) {
    return '?' + Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
  }

  return ''
}
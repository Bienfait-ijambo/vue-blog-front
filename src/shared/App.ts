interface IApi {
  apiStatus: 'developpement' | 'production'
  developpement: {
    baseUrl: string
    apiURL: string
  }
  production: {
    baseUrl: string
    apiURL: string
  }
}

const appApi: IApi = {
  developpement: {
    baseUrl: 'http://127.0.0.1:8000',
    apiURL: 'http://127.0.0.1:8000/api'
  },
  production: {
    baseUrl: '',
    apiURL: ''
  },
  apiStatus: 'developpement'
}

export const APP = appApi.apiStatus === 'developpement' 
? appApi.developpement 
: appApi.production

// export const api=

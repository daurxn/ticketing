import axios from 'axios'
import { NextPageContext } from 'next'

export default  ({ req }: NextPageContext) => {
  if (typeof window === 'undefined') {
    // We are on the server
    
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req?.headers
    })
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: '/'
    })
  }
};

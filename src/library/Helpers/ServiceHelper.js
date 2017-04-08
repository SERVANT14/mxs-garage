import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import axios from 'axios'

export class ServiceHelper {
  static getClientFor (serviceName) {
    return feathers()
      .configure(rest('http://localhost:3030').axios(axios))
      .service(serviceName)
  }
}

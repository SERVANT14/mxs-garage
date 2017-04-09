import feathers from 'feathers/client'
import rest from 'feathers-rest/client'
import axios from 'axios'

export class ServiceHelper {
  /**
   * Get a client based on the given service name.
   *
   * @param serviceName
   *
   * @returns {*}
   */
  static getClientFor (serviceName) {
    return feathers()
      .configure(rest('http://localhost:3030').axios(axios))
      .service(serviceName)
  }
}

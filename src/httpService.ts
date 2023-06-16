const aws_sm_url = 'http://ec2-18-203-81-106.eu-west-1.compute.amazonaws.com/sm-repo/submodels/'
export class HttpService {

  async getAsIsAAS() {
    try {
      const as_built_id = 'aHR0cHM6Ly9uZXRpbGlvbi1hYXMtY29ubmVjdG9yLmhlcm9rdWFwcC5jb20vdjEvY29uZmlndXJhdGlvbnNfYXNfYnVpbHQvMzk2NTk5'
      const response = await fetch(aws_sm_url + as_built_id + '/')
      return await response.text();
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getAsPlannedAAS() {
    try {
      const as_planned_id = 'aHR0cHM6Ly9uZXRpbGlvbi1hYXMtY29ubmVjdG9yLmhlcm9rdWFwcC5jb20vdjEvY29uZmlndXJhdGlvbnNfYXNfZG9jdW1lbnRlZC8zOTY1OTk='
      const response = await fetch(aws_sm_url + as_planned_id + '/')
      return await response.text();
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  /*
  async updateAsPlannedAAS(asPlannedAAS: string) {
    try {
      const response = await fetch('http://localhost:5000/AAS', {
        method: 'PUT', 
        body: asPlannedAAS,
        headers: {'Content-Type': 'application/json'}
      })
      return await response.text();
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  */

}
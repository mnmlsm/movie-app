import React from 'react'
import './App.css'

class SwapiService {
  _apiBase = 'https://swapi.dev/api/'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)

    return await res.json()
  }

  getAllPeople() {
    return this.getResource('/people/')
  }

  getPerson(id) {
    return this.getResource(`/people/${id}/`)
  }
}

const examplaApi = new SwapiService()
const body = examplaApi.getPerson(24)
body.then((res) => {
  console.log(res)
})

export default class App extends React.Component {
  render() {
    return <div className="App"></div>
  }
}

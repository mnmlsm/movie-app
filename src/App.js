import React from 'react'
import './App.css'

import CardList from './components/CardList'

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CardList />
      </div>
    )
  }
}

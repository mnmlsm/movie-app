import React from 'react'
import './App.css'

import SearchForm from './components/SearchForm/SearchForm'
import CardList from './components/CardList'

export default class App extends React.Component {
  state = {
    query: '',
  }

  render() {
    const { query } = this.state
    return (
      <div className="App">
        <SearchForm
          getQuery={(query) => {
            this.setState({ query: query })
          }}
        />
        <CardList queryValue={query} />
      </div>
    )
  }
}

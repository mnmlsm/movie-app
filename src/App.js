import React from 'react'
import './App.css'

import SearchForm from './components/SearchForm/SearchForm'
import CardList from './components/CardList'
import Paginate from './components/Paginate'

export default class App extends React.Component {
  state = {
    query: '',
    pageNumber: 1,
    data: {},
  }
  handlePageChange = (pageNumber) => {
    this.setState({
      pageNumber: pageNumber,
    })
  }

  handleOnLoad = (data) => {
    this.setState({
      data: data,
    })
  }
  render() {
    const { query, pageNumber, data } = this.state
    console.log(pageNumber)
    return (
      <div className="App">
        <SearchForm
          getQuery={(query) => {
            this.setState({ query: query })
          }}
        />
        <CardList queryValue={query} pageNumber={pageNumber} onLoadedData={this.handleOnLoad} />
        <Paginate onPageChange={this.handlePageChange} current={data.page} total={data.total_results} />
      </div>
    )
  }
}

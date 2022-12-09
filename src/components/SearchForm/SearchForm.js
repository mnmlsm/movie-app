import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import MovieDBService from '../../movieAPI/MovieDbApi'
import './SearchForm.css'
export default class SearchForm extends React.Component {
  movieDBService = new MovieDBService()

  handleInput = (value) => {
    this.setState({
      inputQuery: value,
    })
  }

  _handleAndPassQuery = (e) => {
    this.handleInput(e.target.value)
    this.props.getQuery(e.target.value)
  }

  debounceQueryPassing = debounce(this._handleAndPassQuery, 300)

  render() {
    return (
      <div className="search-bar-container">
        <Input
          className="input-form"
          placeholder="Type to search..."
          autoFocus
          onChange={(e) => {
            this.debounceQueryPassing(e)
          }}
        />
      </div>
    )
  }
}

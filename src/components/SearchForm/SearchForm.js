import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import './SearchForm.css'

export default class SearchForm extends React.Component {
  handleInput = (value) => {
    this.setState({
      inputQuery: value,
    })
  }

  handleAndPassQuery = (e) => {
    const { getQuery } = this.props
    this.handleInput(e.target.value)
    getQuery(e.target.value)
  }

  debounceQueryPassing = debounce(this.handleAndPassQuery, 200)

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

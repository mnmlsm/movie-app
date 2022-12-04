import React from 'react'
import './App.css'

import CardList from './components/CardList'
import MovieDBService from './services/movieDB'

export default class App extends React.Component {
  state = {
    data: {
      result: [],
      loading: true,
    },
  }

  componentDidMount = () => {
    new MovieDBService().getPopularMovieList().then((dataFromApi) => {
      this.setState(() => {
        const newData = [...dataFromApi.results]
        return {
          data: {
            result: newData,
            loading: false,
          },
        }
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <div className="App">
        <CardList data={data} />
      </div>
    )
  }
}

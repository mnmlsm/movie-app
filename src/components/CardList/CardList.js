import React from 'react'

import MovieDBService from '../../services/movieDB/MovieDbApi'
import CardContent from '../CardContent/CardContent'

import './CardList.css'

export default class CardList extends React.Component {
  state = {
    data: [],
  }

  movieDBService = new MovieDBService()

  componentDidMount() {
    this.movieDBService.getPopularMovieList().then((result) => {
      this.setState({
        data: result.results,
      })
    })
  }

  render() {
    const { data } = this.state
    return (
      <main className="card-list">
        {data.map((item, index) => {
          return <CardContent key={item.id} id={index} />
        })}
      </main>
    )
  }
}

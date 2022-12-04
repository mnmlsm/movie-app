import React from 'react'
import './CardContent.css'
import { Card } from 'antd'

import MovieDBService from '../../services/movieDB'

const { Meta } = Card

export default class CardContent extends React.Component {
  movieDBService = new MovieDBService()

  state = {
    movieTitle: null,
    dateOfCreation: null,
    movieDescription: null,
    moveGeners: ['Action', 'Drama'],
    moviePosterUrl: {
      url: null,
      isLoading: true,
    },
  }

  cutDescription(description) {
    const arrayOfWords = description.split(' ')
    const countWords = arrayOfWords.length
    return countWords > 40 ? arrayOfWords.splice(0, 40).join(' ') + '...' : description
  }

  async loadCardInfo(id) {
    this.movieDBService.getPopularMovieList().then((movieBase) => {
      this.setState({
        movieTitle: movieBase.results[id].original_title,
        moviePosterUrl: {
          url: movieBase.results[id].poster_path,
          isLoading: false,
        },
        movieDescription: this.cutDescription(movieBase.results[id].overview),
        dateOfCreation: new Date(movieBase.results[id].release_date).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        }),
      })
    })
  }

  componentDidMount() {
    this.loadCardInfo(this.props.id)
  }

  render() {
    const { movieTitle, dateOfCreation, movieDescription, moveGeners, moviePosterUrl } = this.state

    const genres = (
      <div>
        <div className="genres">
          {moveGeners.map((genre) => {
            return (
              <div className="genres-item" key={genre}>
                {genre}
              </div>
            )
          })}
        </div>
        <p className="movie-description">{movieDescription}</p>
      </div>
    )
    return (
      <React.Fragment>
        <Card
          className="card"
          hoverable={true}
          cover={
            <img
              alt="movie poster"
              className="card-image"
              src={`https://image.tmdb.org/t/p/original/${moviePosterUrl.url}`}
            />
          }
        >
          <Meta title={movieTitle} description={dateOfCreation} />
          {genres}
        </Card>
      </React.Fragment>
    )
  }
}

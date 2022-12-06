import React from 'react'
import './CardContent.css'
import { Card, Tooltip } from 'antd'

import Poster from '../Poster'
const { Meta } = Card

export default class CardContent extends React.Component {
  state = {
    movieTitle: null,
    dateOfCreation: null,
    moveGeners: ['Action', 'Drama'],
    moviePosterUrl: null,
  }

  _cutDescription(description) {
    const arrayOfWords = description.split(' ')
    const countWords = arrayOfWords.length
    return countWords > 40 ? arrayOfWords.splice(0, 40).join(' ') + '...' : description
  }

  _dateFormat(date) {
    return new Date(date).toLocaleString('en-us', {
      month: 'long',
      year: 'numeric',
      day: 'numeric',
    })
  }

  componentDidMount() {
    const { movieData } = this.props
    this.setState({
      movieTitle: movieData.original_title,
      moviePosterUrl: movieData.poster_path,
      dateOfCreation: this._dateFormat(movieData.release_date),
    })
  }

  genres = (
    <div>
      <div className="genres">
        {this.state.moveGeners.map((genre) => {
          return (
            <div className="genres-item" key={genre}>
              {genre}
            </div>
          )
        })}
      </div>
      <p className="movie-description">
        {this.props.movieData.overview
          ? this._cutDescription(this.props.movieData.overview)
          : 'NO DESCRIPTION AVALIABLE'}
      </p>
    </div>
  )

  render() {
    const { movieTitle, dateOfCreation, moviePosterUrl } = this.state

    const movieTitleToShow = (
      <Tooltip title={movieTitle}>
        <span>{movieTitle}</span>
      </Tooltip>
    )
    return (
      <React.Fragment>
        <Card
          className="card"
          hoverable={true}
          cover={<Poster url={moviePosterUrl} onLoadPoster={this.onItemLoaded} />}
        >
          <Meta title={movieTitleToShow} description={dateOfCreation} />
          {this.genres}
        </Card>
      </React.Fragment>
    )
  }
}

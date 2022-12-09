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
    <div className="genres">
      {this.state.moveGeners.map((genre) => {
        return (
          <div className="genres-item" key={genre}>
            {genre}
          </div>
        )
      })}
    </div>
  )

  render() {
    const { movieTitle, dateOfCreation, moviePosterUrl } = this.state
    const { movieData } = this.props

    const movieTitleToShow =
      movieTitle?.length > 30 ? (
        <Tooltip title={movieTitle}>
          <span>{movieTitle}</span>
        </Tooltip>
      ) : (
        <span>{movieTitle}</span>
      )

    const movieDescription =
      movieData.overview.length !== this._cutDescription(movieData.overview).length ? (
        <Tooltip title={movieData.overview}>
          <span>{this._cutDescription(movieData.overview)}</span>
        </Tooltip>
      ) : (
        <span>{movieData.overview}</span>
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
          <p className="movie-description">{movieData.overview ? movieDescription : 'NO DESCRIPTION AVALIABLE'}</p>
        </Card>
      </React.Fragment>
    )
  }
}

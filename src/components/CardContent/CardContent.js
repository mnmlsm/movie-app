import React from 'react'
import './CardContent.css'
import { Card, Tooltip, Rate, Progress, Space } from 'antd'

import { GenresConsumer } from '../../GenresContext'
import Poster from '../Poster'

const { Meta } = Card

export default class CardContent extends React.Component {
  state = {
    movieTitle: null,
    dateOfCreation: null,
    moviePosterUrl: null,
    movieGenresIds: [],
    rating: 0,
    isRated: false,
    id: null,
  }

  _cutDescription(description, limit) {
    const arrayOfWords = description.split(' ')
    const countWords = arrayOfWords.length
    return countWords > limit ? arrayOfWords.splice(0, limit).join(' ') + '...' : description
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
      movieGenresIds: this.props.movieGenresIds,
      id: this.props.id,
    })
  }

  handleRaitingChange = (rating) => {
    this.setState({
      rating: rating,
      isRated: true,
    })
  }

  render() {
    const { movieTitle, dateOfCreation, moviePosterUrl, rating, id, isRated } = this.state

    const { movieData, handleRatedMovie, rating: propRating } = this.props

    const strokeColor = (rating) => {
      rating *= 10
      if (rating >= 0 && rating < 30) {
        return '#E90000'
      } else if (rating >= 30 && rating <= 50) {
        return '#E97E00'
      } else if (rating > 50 && rating <= 70) {
        return '#E9D100'
      } else if (rating > 70 && rating <= 100) {
        return '#66E900'
      }
    }

    const progressElement = (
      <Progress
        type="circle"
        percent={!isRated ? propRating * 10 : rating * 10}
        format={(percent) => `${percent / 10}`}
        width={30}
        strokeWidth={4}
        strokeColor={!isRated ? strokeColor(propRating) : strokeColor(rating)}
      />
    )

    const movieTitleToShow =
      movieTitle?.length > 20 ? (
        <>
          <Tooltip title={movieTitle}>
            <span>{this._cutDescription(movieTitle, 3)}</span>
          </Tooltip>
          <Space wrap>{progressElement}</Space>
        </>
      ) : (
        <>
          <span>{movieTitle}</span>
          <Space wrap>{progressElement}</Space>
        </>
      )

    const movieDescription =
      movieData.overview.length !== this._cutDescription(movieData.overview, 30).length ? (
        <>
          {' '}
          <Tooltip title={movieData.overview}>
            <span>{this._cutDescription(movieData.overview, 30)}</span>
          </Tooltip>
        </>
      ) : (
        <>
          <span>{movieData.overview}</span>
        </>
      )

    const genres = (
      <div className="genres">
        <GenresConsumer>
          {({ genres }) => {
            const result = []
            if (genres !== undefined) {
              this.state.movieGenresIds.forEach((id) => {
                result.push(genres.filter((value) => value.id === id)[0].name)
              })
              return result.map((name, index) => {
                return (
                  <div className="genres-item" key={index}>
                    {name}
                  </div>
                )
              })
            }
          }}
        </GenresConsumer>
      </div>
    )

    return (
      <React.Fragment>
        <Card
          className="card"
          hoverable={true}
          cover={<Poster url={moviePosterUrl} onLoadPoster={this.onItemLoaded} />}
        >
          <Meta title={movieTitleToShow} description={dateOfCreation} />
          {genres}
          <p className="movie-description">{movieData.overview ? movieDescription : 'NO DESCRIPTION AVALIABLE'}</p>
          <Rate
            allowHalf
            defaultValue={0}
            count={10}
            onChange={(raiting) => {
              handleRatedMovie(raiting, id)
              this.handleRaitingChange(raiting)
            }}
            value={!isRated ? propRating : rating}
            disabled={isRated}
          />
        </Card>
      </React.Fragment>
    )
  }
}

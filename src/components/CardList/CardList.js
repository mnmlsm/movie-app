import React from 'react'
import { Spin } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import MovieDBService from '../../movieAPI'
import CardContent from '../CardContent/CardContent'
import './CardList.css'
import ErrorIndicator from '../ErrorIndicator'

export default class CardList extends React.Component {
  movieDBService = new MovieDBService()

  state = {
    data: [],
    isLoadingData: true,
    error: false,
  }

  componentDidMount() {
    this.movieDBService
      .getMovieListByPhrase('doctor')
      .then((result) => {
        this.setState({
          data: result.results,
          isLoadingData: false,
        })
      })
      .catch(this.onError)
  }

  onError = (err) => {
    this.setState({
      error: true,
      isLoadingData: false,
    })
  }

  render() {
    const { data, isLoadingData, error } = this.state

    const hasData = !(isLoadingData || error)

    const errorMessage = error ? <ErrorIndicator /> : null

    const spinner = isLoadingData ? <Spin size={'large'} /> : null

    const styleOffline = { justifyContent: 'center', alignItems: 'center' }
    const styleOnLoading =
      isLoadingData || error ? { justifyContent: 'center', alignItems: 'center' } : { justifyContent: 'space-between' }

    const content = hasData
      ? data.map((item, index) => {
          return <CardContent key={item.id} id={index} movieData={data[index]} />
        })
      : null

    return (
      <React.Fragment>
        <Online>
          <main className="card-list" style={styleOnLoading}>
            {errorMessage}
            {spinner}
            {content}
          </main>
        </Online>
        <Offline>
          <main className="card-list" style={styleOffline}>
            <ErrorIndicator message="No Internet Connection. Contact your provider or check cables" />
          </main>
        </Offline>
      </React.Fragment>
    )
  }
}

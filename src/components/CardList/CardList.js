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
    this.setState(() => {
      return {
        data: 'Type to search for your favorite movie',
        isLoadingData: false,
      }
    })
  }

  componentDidUpdate = (previousProp) => {
    if (previousProp.queryValue !== this.props.queryValue) {
      this.movieDBService
        .getMovieListByPhrase(this.props.queryValue)
        .then((fetchedData) => {
          if (fetchedData.total_results === 0) {
            this.setState(() => {
              return {
                data: 'No movies were found on your query',
                isLoadingData: false,
              }
            })
          } else {
            this.setState(() => {
              return {
                data: fetchedData,
                isLoadingData: false,
              }
            })
          }
        })
        .catch(this.onError)
    }
  }

  onError = () => {
    this.setState({
      error: true,
      isLoadingData: false,
    })
  }

  render() {
    const { data, isLoadingData, error } = this.state
    const hasData = !(isLoadingData || error)
    const hasDataNoMovies = hasData && this.state.data !== 'No movies were found on your query'
    const hasDataFirstStart = hasData && this.state.data !== 'Type to search for your favorite movie'

    const errorMessage = error ? <ErrorIndicator /> : null

    const spinner = isLoadingData ? <Spin size={'large'} /> : null

    const styleOffline = { justifyContent: 'center', alignItems: 'center' }
    const styleOnLoading =
      isLoadingData || error ? { justifyContent: 'center', alignItems: 'center' } : { justifyContent: 'space-between' }

    const content =
      hasDataNoMovies && hasDataFirstStart ? (
        data.results.map((item, index) => {
          return <CardContent key={item.id} id={index} movieData={data.results[index]} />
        })
      ) : isLoadingData ? (
        <Spin size={'large'} style={{ margin: '36px auto' }} />
      ) : (
        <h3 style={{ width: '360px', margin: '36px auto' }}>{this.state.data}</h3>
      )

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

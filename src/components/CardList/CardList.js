import React from 'react'
import { Spin } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import CardContent from '../CardContent'
import './CardList.css'
import ErrorIndicator from '../ErrorIndicator'

export default class CardList extends React.Component {
  state = {
    error: false,
  }

  onError = () => {
    this.setState({
      error: true,
    })
  }

  render() {
    const { isLoadingData, data, handleRatedMovie } = this.props
    const { error } = this.state

    const hasData = !(isLoadingData || error)

    const hasDataNoMovies = hasData && this.props.data !== 'No movies were found on your query'

    const errorMessage = error ? <ErrorIndicator /> : null
    const hasError = errorMessage ? true : false

    const styleOffline = { justifyContent: 'center', alignItems: 'center' }
    const styleOnLoading =
      isLoadingData || error ? { justifyContent: 'center', alignItems: 'center' } : { justifyContent: 'space-between' }

    const content = hasDataNoMovies ? (
      data.results.map((item, index) => {
        return (
          <CardContent
            key={item.id}
            id={item.id}
            movieData={data.results[index]}
            movieGenresIds={data.results[index].genre_ids}
            handleRatedMovie={handleRatedMovie}
            rating={data.results[index].rating}
          />
        )
      })
    ) : isLoadingData ? (
      <Spin size={'large'} style={{ margin: '36px auto' }} />
    ) : (
      <h3 style={{ width: '360px', margin: '36px auto', textAlign: 'center' }}>{data}</h3>
    )

    return (
      <React.Fragment>
        <Online>
          <main className="card-list" style={styleOnLoading}>
            {errorMessage}
            {!hasError && content}
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

import React from 'react'
import { Spin } from 'antd'

import MovieDBService from '../../movieAPI'
import CardContent from '../CardContent/CardContent'
import './CardList.css'

export default class CardList extends React.Component {
  movieDBService = new MovieDBService()

  state = {
    data: [],
    isLoadingData: true,
  }

  componentDidMount() {
    this.movieDBService
      .getMovieListByPhrase('Space')
      .then((result) => {
        setTimeout(() => {
          this.setState({
            data: result.results,
            isLoadingData: false,
          })
        }, 500)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { data } = this.state

    return (
      <main
        className="card-list"
        style={
          this.state.isLoadingData
            ? { justifyContent: 'center', alignItems: 'center' }
            : { justifyContent: 'space-between' }
        }
      >
        {this.state.isLoadingData ? <Spin size={'large'} /> : null}
        {data.map((item, index) => {
          return <CardContent key={item.id} id={index} movieData={data[index]} />
        })}
      </main>
    )
  }
}

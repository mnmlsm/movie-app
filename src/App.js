import React from 'react'
import { Tabs } from 'antd'
import { debounce } from 'lodash'

import MovieDBService from './movieAPI'
import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import CardList from './components/CardList'
import Paginate from './components/Paginate'
import { GenresProvider } from './GenresContext'

export default class App extends React.Component {
  movieDBService = new MovieDBService()

  state = {
    query: '',
    sessionId: '',
    pageNumber: 1,
    data: [],
    isLoadingData: true,
    error: false,
    hasRatedMovies: false,
    genres: [],
    ratedValues: {
      data: [],
      pageNumber: 1,
    },
  }

  componentDidMount = () => {
    this.handleSession()
  }

  componentDidUpdate = (_, prevState) => {
    if (prevState.query !== this.state.query || prevState.pageNumber !== this.state.pageNumber) {
      this.movieDBService
        .getMovieListByPhrase(this.state.query, this.state.pageNumber)
        .then((fetchedData) => {
          this.handleFetchedData(fetchedData)
        })
        .catch(this.onError)
    }
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      pageNumber: pageNumber,
    })
  }

  handleRatedPageChange = (pageNumber = 1) => {
    this.getRatedMovies(this.state.sessionId, pageNumber)
  }

  getRatedMovies = (sessionId, pageId = 1) => {
    this.movieDBService.getRatedMovies(sessionId, pageId).then((res) => {
      this.setState(() => {
        return {
          ratedValues: {
            data: res,
          },
          hasRatedMovies: true,
          isLoadingData: false,
        }
      })
    })
  }

  handleGenres = () => {
    this.movieDBService.getGenres().then((genres) => {
      this.setState(() => {
        return {
          genres: genres,
        }
      })
    })
  }

  handleFetchedData = (fetchedData) => {
    if (fetchedData.total_results === 0) {
      this.setState(() => {
        return {
          data: 'No movies were found on your query',
          isLoadingData: false,
        }
      })
    } else {
      this.setState(() => {
        this.handleGenres()
        return {
          data: fetchedData,
          isLoadingData: false,
        }
      })
    }
  }

  handleSession = () => {
    this.movieDBService.getSessionID().then((res) => {
      this.setState({
        sessionId: res,
      })
      this.movieDBService
        .getMovieListByPhrase(this.state.query, this.state.query)
        .then((fetchedData) => {
          this.handleFetchedData(fetchedData)
        })
        .catch(this.onError)
    })
  }

  addNewRatedMovie = (sessionId) => {
    this.getRatedMovies(sessionId)
  }

  debounceAddingMovie = debounce(this.addNewRatedMovie, 80)

  handleRatedMovies = async (raiting, id) => {
    const { sessionId } = this.state
    this.movieDBService.postRateMovie(id, sessionId, raiting).then((_) => {
      this.debounceAddingMovie(sessionId)
    })
  }

  render() {
    const { pageNumber, data, isLoadingData, genres, ratedValues, hasRatedMovies } = this.state
    return (
      <div className="App">
        <GenresProvider value={genres}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: 'Search',
                key: '1',
                children: (
                  <>
                    <SearchForm
                      key={1}
                      getQuery={(query) => {
                        this.setState({ query: query })
                      }}
                    />
                    <CardList
                      key="card-list"
                      data={data}
                      pageNumber={pageNumber}
                      isLoadingData={isLoadingData}
                      handleRatedMovies={this.handleRatedMovies}
                    />
                    <Paginate
                      key="paginate"
                      onPageChange={this.handlePageChange}
                      current={data?.page}
                      total={data?.total_results}
                    />
                  </>
                ),
              },
              {
                label: 'Rated',
                key: '2',
                children: (
                  <>
                    <CardList
                      key="card-list"
                      data={ratedValues.data}
                      pageNumber={ratedValues.pageNumber}
                      isLoadingData={isLoadingData}
                    />
                    <Paginate
                      key="paginate"
                      onPageChange={this.handleRatedPageChange}
                      current={ratedValues?.data?.page}
                      total={ratedValues?.data?.total_results}
                    />
                  </>
                ),
                disabled: !hasRatedMovies,
              },
            ]}
          />
        </GenresProvider>
      </div>
    )
  }
}

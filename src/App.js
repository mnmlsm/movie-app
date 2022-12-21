import React from 'react'
import { Tabs } from 'antd'

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
    genres: [],
    hasRatedMovies: false,
    searchPageNumber: 1,
    ratedPageNumber: 1,

    searchValues: {
      data: [],
      isLoadingData: true,
    },

    ratedValues: {
      data: [],
      isLoadingData: true,
    },
  }

  componentDidMount() {
    const { query, searchPageNumber } = this.state
    // Creating Guest Session ID
    this.movieDBService.getSessionID().then((sessionId) => {
      this.setState({
        sessionId: sessionId,
      })
      this.movieDBService
        .getMovieListByPhrase(query, searchPageNumber)
        .then((fetchedData) => {
          this.handleFetchedData(fetchedData)
        })
        .catch((err) => {
          throw new Error(err.message)
        })
    })
  }

  componentDidUpdate(_, prevState) {
    // Search Tab
    const { query, searchPageNumber } = this.state
    if (prevState.query !== query || prevState.searchPageNumber !== searchPageNumber) {
      this.movieDBService
        .getMovieListByPhrase(query, searchPageNumber)
        .then((fetchedData) => {
          this.handleFetchedData(fetchedData)
        })
        .catch((err) => {
          throw new Error(err.message)
        })
    }
  }

  // Search movie functions
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
      this.setState({
        searchValues: {
          data: 'No movies were found on your query',
          isLoadingData: false,
        },
      })
    } else {
      this.handleGenres()
      this.setState({
        searchValues: {
          data: fetchedData,
          isLoadingData: false,
        },
      })
    }
  }

  handleSearchPageChange = (pageId) => {
    this.setState({
      searchPageNumber: pageId,
    })
  }

  // Rated movie functions
  // adding rated movie for list to show in Rated Tab
  handleRatedMovie = (raiting, id) => {
    const { sessionId, ratedPageNumber } = this.state
    this.movieDBService.postRateMovie(id, sessionId, raiting).then((status) => {
      if (status.success) {
        this.setState({
          hasRatedMovies: status.success,
        })
        this.movieDBService.getRatedMovies(sessionId, ratedPageNumber).then((result) => {
          this.setState({
            ratedValues: {
              data: result,
              isLoadingData: false,
            },
          })
        })
      }
    })
  }

  handleTabChange = () => {
    const { sessionId, ratedPageNumber } = this.state
    this.movieDBService.getRatedMovies(sessionId, ratedPageNumber).then((result) => {
      this.setState({
        ratedValues: {
          data: result,
          isLoadingData: false,
        },
      })
    })
  }

  handleRatedPageChange = (pageId) => {
    const { sessionId } = this.state
    this.movieDBService.getRatedMovies(sessionId, pageId).then((result) => {
      this.setState({
        ratedPageNumber: pageId,
        ratedValues: {
          data: result,
          isLoadingData: false,
        },
      })
    })
  }

  render() {
    const {
      genres,
      searchPageNumber,
      ratedPageNumber,
      searchValues: { data: foundData, isLoadingData: isLoadingFoundData },
      ratedValues: { data: ratedData, isLoadingData: isLoadingRatedData },
      hasRatedMovies,
    } = this.state
    return (
      <div className="App">
        <GenresProvider value={genres}>
          <Tabs
            onChange={this.handleTabChange}
            defaultActiveKey="1"
            items={[
              {
                label: 'Search',
                key: '1',
                children: (
                  <>
                    <SearchForm
                      key="main-search-form"
                      getQuery={(query) => {
                        this.setState({ query: query })
                      }}
                    />
                    <CardList
                      key="card-list"
                      data={foundData}
                      isLoadingData={isLoadingFoundData}
                      handleRatedMovie={this.handleRatedMovie}
                    />
                    <Paginate
                      key="search-paginate"
                      onPageChange={this.handleSearchPageChange}
                      current={searchPageNumber}
                      total={foundData?.total_results}
                    />
                  </>
                ),
              },
              {
                label: 'Rated',
                key: '2',
                children: (
                  <>
                    <CardList key="card-list" data={ratedData} isLoadingData={isLoadingRatedData} />
                    <Paginate
                      key="rated-paginate"
                      onPageChange={this.handleRatedPageChange}
                      current={ratedPageNumber}
                      total={ratedData?.total_results}
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

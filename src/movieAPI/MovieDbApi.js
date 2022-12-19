export default class MovieDBService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie'
  // https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
  _apiGenresBase = 'https://api.themoviedb.org/3/genre/movie/list'
  _apiKey = 'bc2d5b86a06bc3441572f28bd67391dc'
  _apiImageBase = 'https://image.tmdb.org/t/p/'
  // work with quest session
  _questSessionGettingBase = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._apiKey}`

  getSessionID = async () => {
    try {
      const sessionId = await (await fetch(this._questSessionGettingBase)).json()
      return await sessionId.guest_session_id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  postRateMovie = async (movieId, sessionId, value) => {
    const result = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
          value: value,
        }),
      }
    ).catch((error) => {
      throw new Error(error)
    })
    return await result.json()
  }

  getRatedMovies = async (sessionId, pageId = 1) => {
    const result = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.desc&page=${pageId}`
    )
    return await result.json()
  }

  async getResource(query = '', pageId = 1) {
    if (query.length === 0) {
      return 'No movies were found on your query'
    }
    const res = await fetch(
      `${this._apiBase}?api_key=${this._apiKey}&language=en-US&query=${query}&page=${pageId}&include_adult=false`
    )
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${query}, ${res.status}`)
    }

    return await res.json()
  }

  async getMovieListByPhrase(query, pageId = 1) {
    return await this.getResource(query, pageId)
  }

  async getGenres() {
    const result = await (await fetch(`${this._apiGenresBase}?api_key=${this._apiKey}&language=en-US`)).json()
    return result
  }
}

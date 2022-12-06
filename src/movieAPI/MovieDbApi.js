export default class MovieDBService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie'
  _apiKey = 'bc2d5b86a06bc3441572f28bd67391dc'
  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=adsasdasd&page=1&include_adult=false
  _apiImageBase = 'https://image.tmdb.org/t/p/'

  async getResource(query) {
    const res = await fetch(
      `${this._apiBase}?api_key=${this._apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${query}, ${res.status}`)
    }
    return await res.json()
  }

  async getMovieListByPhrase(query) {
    return await this.getResource(query)
  }
}

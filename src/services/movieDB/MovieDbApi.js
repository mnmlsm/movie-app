export default class MovieDBService {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = 'bc2d5b86a06bc3441572f28bd67391dc'

  _apiImageBase = 'https://image.tmdb.org/t/p/'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}?api_key=${this._apiKey}`)
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, ${res.status}`)
    }
    return await res.json()
  }

  async getPopularMovieList() {
    return await this.getResource('/movie/popular')
  }
}

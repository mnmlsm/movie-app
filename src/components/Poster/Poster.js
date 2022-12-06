import React from 'react'
import { Spin } from 'antd'

export default class Poster extends React.Component {
  state = {
    showSpinner: true,
    showImage: false,
  }

  render() {
    const { showImage, showSpinner } = this.state
    const { url } = this.props

    const hideImage = !showImage ? { display: 'none' } : { display: 'block' }
    const imageSrc = url ? `https://image.tmdb.org/t/p/original/${url}` : 'https://tinyurl.com/5kp6e4s8'

    return (
      <React.Fragment>
        {showSpinner ? <Spin /> : null}
        <img
          className="card-image"
          style={hideImage}
          onLoad={() => {
            this.setState({
              showSpinner: false,
              showImage: true,
            })
          }}
          alt="movie poster"
          src={imageSrc}
        />
      </React.Fragment>
    )
  }
}

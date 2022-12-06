import React from 'react'
import { Spin } from 'antd'

export default class Poster extends React.Component {
  state = {
    loaded: false,
    showSpinner: true,
    showImage: false,
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showSpinner ? <Spin /> : null}
        <img
          style={!this.state.showImage ? { display: 'none' } : { display: 'block' }}
          onLoad={() => {
            this.setState({
              loaded: true,
              showSpinner: false,
              showImage: true,
            })
          }}
          alt="movie poster"
          className="card-image"
          src={
            this.props.url
              ? `https://image.tmdb.org/t/p/original/${this.props.url}`
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png'
          }
        />
      </React.Fragment>
    )
  }
}

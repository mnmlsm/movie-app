import React from 'react'
import { Space, Alert } from 'antd'
import './ErrorIndicator.css'

export default class ErrorIndicator extends React.Component {
  render() {
    const message = this.props.message ? this.props.message : 'Server is not answering'
    const description = this.props.message ? 'Trying to fix' : 'You probably have been blocked! Try to use VPN service.'
    return (
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Alert message={message} description={description} type="error" showIcon />
      </Space>
    )
  }
}

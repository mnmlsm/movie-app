import React from 'react'
import { Pagination } from 'antd'

import './Paginate.css'

export default class Paginate extends React.Component {
  handleChange = (e) => {
    this.props.onPageChange(e)
  }

  render() {
    const { current, total } = this.props
    const content =
      total > 20 ? (
        <React.Fragment>
          {' '}
          <Pagination
            className="pagination"
            current={current}
            defaultCurrent={1}
            total={total}
            onChange={this.handleChange}
            showSizeChanger={false}
            responsive={true}
            pageSize={20}
          />
        </React.Fragment>
      ) : null
    return <div className="pagination-contaner">{content}</div>
  }
}

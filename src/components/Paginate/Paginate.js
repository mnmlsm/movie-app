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
          <Pagination
            className="pagination"
            current={current}
            defaultCurrent={1}
            defaultPageSize={20}
            total={total}
            onChange={this.handleChange}
            showSizeChanger={false}
            responsive={true}
          />
        </React.Fragment>
      ) : null
    return <div className="pagination-contaner">{content}</div>
  }
}

import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsURL} = this.props // destructuring props
    return (
      <div>
        <div className="card" style={{ width: '16rem' }}>
          <img src={!imageURL? "https://media.istockphoto.com/photos/daily-papers-with-news-on-the-computer-picture-id1301656823?b=1&amp;k=20&amp;m=1301656823&amp;s=170667a&amp;w=0&amp;h=s9IXcVfB151qb7Vb_9uJbl-XDGr2179rHA4ikgpdTUM=": imageURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsURL} target='_blank' rel="noreferrer" className="btn btn-sm btn-info">Read More...</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

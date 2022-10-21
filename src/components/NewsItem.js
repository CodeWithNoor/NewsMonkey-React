import React from 'react'

const NewsItem = (props) => {

  let { title, description, imageURL, newsURL, author, date, source } = props // destructuring props
  return (
    <div>
      <div className="card" style={{ width: '16rem' }}>
        <img src={!imageURL ? "https://www.mooc.org/hubfs/applications-of-computer-programming.jpg" : imageURL} className="card-img-top" alt="..." />

        <div className="card-body">
          <span className=" translate-right badge rounded-pill bg-light text-dark d-flex justify-content-end position-absolute top-0" style={{ right: 0 }}>{source}<span className="visually-hidden">unread messages</span> </span>
          <h5 className="card-title">{title} </h5>

          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted"> By{!author ? "Anonymous" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsURL} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem

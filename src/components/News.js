import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)


  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  // document.title = `${capitalize(props.category)} - NewsMonkey` ---> Both are same work to initalize before or after useEffect

  const updateNews = async (pageNo) => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(30)
    let parseData = await data.json()
    props.setProgress(70)
    console.log(parseData)

    setArticles(parseData.articles)
    settotalResults(parseData.totalResults)
    setLoading(false)

    props.setProgress(100)

  }

  useEffect(() => {  // relate to component did mount
    document.title = `${capitalize(props.category)} - NewsMonkey`
    updateNews()
    // eslint-disable-next-line
  }, [])

  // const handlePrevClick = async () => {
  //   setPage(page - 1)
  //   updateNews()
  // }


  // const handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews()
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url)
    let parseData = await data.json()
    setArticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
  }


  return (
    <>
      {/* map is a higher order array method */}
      <h2 className="text-center" style={{ marginTop: '80px' }}>NewsMonkey - Top {capitalize(props.category)} Headlines</h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >

        <div className="container">

          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-3" style={{ margin: '20px' }} key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 70) : "Description not found"} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>

            })}
          </div>

        </div>
      </InfiniteScroll>

    </>
  )
}

News.defaultProps = {
  country: "us",
  pageSize: 15,
  category: "general",
}

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string
}

export default News

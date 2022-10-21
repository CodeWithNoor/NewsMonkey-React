import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 15,
    category: "general",
  }

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  

  // When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement.
  // take a classs object so now we call function

  constructor(props) {
    // Must call super constructor in derived class
    super(props)
    // console.log("This is a constructor")

    // if you want to changes a component without page reload to see display
    // Initializing local state by assigning an object to this.state.
    // Binding event handler methods to an instance.
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
  }

  updateNews = async(pageNo) => {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    this.props.setProgress(30)
    let parseData = await data.json()
    this.props.setProgress(70)
    console.log(parseData)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress (100)
  }


  // The componentDidMount() method runs after the component output has been rendered to the DOM

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading: true})
    
    // let data = await fetch(url)
    // let parseData = await data.json()
    // console.log(parseData)

    // --->  It will use this.setState() to schedule updates to the component local state:
    // --->  Do Not Modify State Directly
    // this.setState({articles: parseData.articles,

    // ---> totalResults --> The total number of results available for your request. Only a limited number are shown at a time though, so use the page parameter in your requests to page through them.
    // totalResults : parseData.totalResults,
    // loading : false
    // })
    this.updateNews()
  }


  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`

    // this.setState({loading: true})
    // let data = await fetch(url)
    // let parseData =  await data.json()
    // console.log(parseData)
    // console.log('parseData')

    // this.setState({page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }

  
  handleNextClick = async () => {
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`

    //   this.setState({loading: true})
    //   let data = await fetch(url)
    //   let parseData = await data.json()
    //   console.log(parseData)
    //   console.log('parseData')

    //   this.setState({page: this.state.page + 1,
    //     articles: parseData.articles,
    //     loading: false
    //   })   
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }
  
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    })
  }

  render() {
    return (
      <>
        {/* map is a higher order array method */}
        <h2 className="text-center my-4">NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > 

          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-3" style={{ margin: '20px' }} key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 70) : "Description not found"} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}
            </div>

          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
  <button type="button" disabled={this.state.page <= 1} className="btn btn-dark btn-sm mx-1" onClick={this.handlePrevClick} > &larr; Previous</button>
 <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark btn-sm mx-1" onClick={this.handleNextClick} >Next &rarr;</button>
</div> */}
</>
)
  }
}

export default News

import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  // When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement.
  // take a classs object so now we call function

  constructor() {
    //Must call super constructor in derived class
    super()
    // console.log("This is a constructor")

    //if you want to changes a component without page reload to see display
    // Initializing local state by assigning an object to this.state.
    // Binding event handler methods to an instance.
    this.state = {
      articles: [],
      loading: false,
      page: 1

    }
  }

  // The componentDidMount() method runs after the component output has been rendered to the DOM
  async componentDidMount(){
  let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6ff98319596d471c808dfccdeef89753&page=1&pageSize=20'
  let data = await fetch(url)
  let parseData = await data.json()
  console.log(parseData)

  // It will use this.setState() to schedule updates to the component local state:
  // Do Not Modify State Directly
  this.setState({articles: parseData.articles,

  // totalResults --> The total number of results available for your request. Only a limited number are shown at a time though, so use the page parameter in your requests to page through them.
  totalResults : parseData.totalResults
  })
  }

  handlePrevClick = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6ff98319596d471c808dfccdeef89753&page=${this.state.page - 1}&pageSize=20`
    let data = await fetch(url)
    let parseData =  await data.json()
    console.log(parseData)
    console.log('parseData')
    
    this.setState({page: this.state.page - 1,
      articles: parseData.articles
    })
  }
  
  handleNextClick = async () => {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){ }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6ff98319596d471c808dfccdeef89753&page=${this.state.page + 1}&pageSize=20`
      let data = await fetch(url)
      let parseData = await data.json()
      console.log(parseData)
      console.log('parseData')
  
      this.setState({page: this.state.page + 1,
        articles: parseData.articles
      })    
    }
  }
  render() {
    return (

      //  map is a higher order array method 
      <div className="container my-4">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-3" style={{margin: '20px'}} key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 70) : ""} imageURL={element.urlToImage} newsURL={element.url} />
            </div>
          })}
        </div>

          <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1}  className="btn btn-dark btn-sm mx-1" onClick={this.handlePrevClick} > &larr; Previous</button>
          <button type="button" className="btn btn-dark btn-sm mx-1" onClick={this.handleNextClick} >Next &rarr;</button>
          </div>
      </div>

    )
  }
}

export default News

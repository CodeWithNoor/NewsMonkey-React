import './App.css';
import React, { Component } from 'react'
import Navabar from './components/Navabar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
// import NewsItem from './components/NewsItem';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {

// Render() 
// React renders HTML to the web page by using a function called render().
// The purpose of the function is to display the specified HTML code inside the specified HTML element.
// In the render() method, we can read props and state and return our JSX code to the root component of our app.

state = {
  progress: 0
}

setProgress = (progress) => {
  this.setState({progress: progress})
}

apiKey = process.env.REACT_APP_NEWS_API
pageSize = 15
  render() {
    return (
      <>
      <Router>

        <Navabar/>
        <LoadingBar  color='#f11946' progress={this.state.progress}/>
      <Routes>
          {/* How to force remounting on React components? */}
          {/* To force remounting on React components, we can set the key prop of the component to a new unique value. */}
          <Route exact path="/" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} key="general" pageSize = {this.pageSize} country = "us" category = "general"/>}/> 
          <Route exact path="/business" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} key="business" pageSize = {this.pageSize} country = "us" category = "business"/>}/> 
          <Route exact path="/entertainment" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} key="entertainment" pageSize = {this.pageSize} country = "us" category = "entertainment"/> }/> 
          <Route exact path="/health" element = { <News setProgress={this.setProgress} apiKey = {this.apiKey} key="health" pageSize = {this.pageSize} country = "us" category = "health"/> }/>
          <Route exact path="/general" element = { <News setProgress={this.setProgress} apiKey = {this.apiKey} key="general" pageSize = {this.pageSize} country = "us" category = "general"/>}/> 
          <Route exact path="/science" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} key="science" pageSize = {this.pageSize} country = "us" category = "science"/> }/> 
          <Route exact path="/technology" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} key="technology" pageSize = {this.pageSize} country = "us" category = "technology"/> }/> 
          <Route exact path="/sports" element = {<News setProgress={this.setProgress} apiKey = {this.apiKey} key="technology" pageSize = {this.pageSize} country = "us" category = "sports"/> }/> 
      </Routes>
      </Router>

      </>
    )
  }
}



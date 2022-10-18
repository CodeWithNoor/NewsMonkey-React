import './App.css';
import React, { Component } from 'react'
import Navabar from './components/Navabar';
import News from './components/News';
import NewsItem from './components/NewsItem';

export default class App extends Component {

// Render() 
// React renders HTML to the web page by using a function called render().
// The purpose of the function is to display the specified HTML code inside the specified HTML element.
// In the render() method, we can read props and state and return our JSX code to the root component of our app.

  render() {
    return (
      <div>
        <Navabar/>
        <News/>
      </div>
    )
  }
}


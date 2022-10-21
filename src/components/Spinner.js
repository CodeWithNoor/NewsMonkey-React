// ******************* Function Based Component *************************
// ********************************************************************

import React from 'react'
import loading from './loading.gif'

const Spinner = () => {

  return (
    <div className='text-center'>
      <img src={loading} alt="loading" />
    </div>
  )

}

export default Spinner



// ******************* Class Based Component *************************
// ********************************************************************

// import React, { Component } from 'react'
// import loading from './loading.gif'

// export default class Spinner extends Component {
//   render() {
//     return (
//       <div className='text-center'>
//         <img src={loading} alt="loading" />
//       </div>
//     )
//   }
// }
import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div style={{height: '80vh'}}>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App

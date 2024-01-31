import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Shows from './components/Shows.jsx'
import Show from './components/Show.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      {/* <Route path='/shows/:id' element={} /> */}
      <Route  path="/shows" element={<Shows /> }  />
        <Route path='/shows/:id' element={<Show />} /> 
    </Routes>
  </Router>,
)

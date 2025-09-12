import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import Room from './pages/Room';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/Room/:roomId' element={<Room/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
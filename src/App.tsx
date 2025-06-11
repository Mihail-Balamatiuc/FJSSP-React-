import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import About from './pages/about/about'
import Navbar from './pages/navbar/navbar'
import Config from './pages/config/config'
import Compare from './pages/compare/compare'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/config' element={<Config/>}/>
        <Route path='/compare' element={<Compare/>}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import About from './pages/about/about'
import Navbar from './pages/navbar/navbar'
import Config from './pages/config/config'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/config' element={<Config/>}/>
      </Routes>
    </>
  )
}

export default App

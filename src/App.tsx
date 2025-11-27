
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Input from './Input/Input'
import Update from './update/update'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          
        
        <Route path="/input" element={<Input />} />

        <Route path='/update/:id' element={<Update />} />
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

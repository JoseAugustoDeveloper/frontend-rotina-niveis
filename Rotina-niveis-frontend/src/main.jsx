import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

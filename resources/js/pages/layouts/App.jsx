import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
        Main App File
        <Header/>
        <Sidebar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default App
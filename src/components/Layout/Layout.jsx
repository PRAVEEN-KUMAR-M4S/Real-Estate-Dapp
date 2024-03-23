import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className='gradient-bg-welcome'>
        <Header/>
        <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout
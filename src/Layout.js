import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className="container my-5">

    <Navbar/>
    </div>
     <Outlet/> {/*ya asay kam karay ga kay hamara header aur footer same rahay aur jo change karna hay aus may outlet day do  */}
    
    </>
  )
}

export default Layout

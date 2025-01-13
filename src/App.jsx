import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Page/Body/Body'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'

const App = () => {
  return (
    <>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      </Route>
     

    </Routes>


  </BrowserRouter>


  </>
  )
}

export default App
import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Page/Body/Body'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import { Provider } from 'react-redux'
import appStore from './Utils/appStore'
import Feed from './Page/Feed/Feed'
import Profile from './Components/Profile/Profile'


const App = () => {
  return (
    <>
  <Provider store={appStore}>

    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>

     <Route path='/feed' element={<Feed/>}></Route>

      
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      </Route>
     

    </Routes>


  </BrowserRouter>
 
  </Provider>
  </>
  )
}

export default App
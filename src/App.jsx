import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Page/Body/Body'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import { Provider } from 'react-redux'
import appStore from './Utils/appStore'
import Feed from './Page/Feed/Feed'
import Profile from './Components/Profile/Profile'
import Connections from './Components/Connections/Connections'
import Requests from './Components/Requests/Requests'
import Chat from './Components/Chat/Chat'


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
      <Route path='/connections' element={<Connections/>}></Route>
      <Route path='/requests' element={<Requests/>}></Route>
      <Route path='/chat/:requestId' element={<Chat/>}></Route>


      </Route>
     

    </Routes>


  </BrowserRouter>
 
  </Provider>
  </>
  )
}

export default App
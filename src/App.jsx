import React, { Suspense } from 'react'
import "./App.css"
import "./index.css";
import Website from './pages/Website';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Addprpty from './pages/AddPrpty/Addprpty';
import Property from './pages/property/property';
import Details from './pages/deatils/Details';
import Profile from './pages/Profile/Profile';
import UpdateProperty from './pages/UpdateProperty/updateproperty';



const App=() =>{
  return (
 <BrowserRouter>
 <Suspense fallback={<div>Loading....</div>}>
  <Routes>
    <Route element={<Layout/>}> 
      <Route path='/' element={<Website/>}/>
      <Route path='/addproperty' element={<Addprpty/>}/>
      <Route path='/property' >
        <Route index element={<Property/>}/>
       <Route path=':propertyId' element={<Details/>}/>
      </Route>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/updateproperty/formdetails' >
      <Route path=':propertyId' element={<UpdateProperty/>}/>
      </Route>
      <Route path='/updateproperty'>
        <Route path=':propertyId' element={<Details/>}/>
        </Route>
    </Route>
 </Routes>
 </Suspense>
 </BrowserRouter>
  )
}

export default App
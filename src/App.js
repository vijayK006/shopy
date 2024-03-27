import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Users from './Pages/Users';
import Details from './Pages/Details';
import Clientmaster from './Pages/Clientmater';

// Firm Master
import FirmMaster from './Pages/Firm-Master/FirmMaster';
import View_Firm_Master from './Pages/Firm-Master/View-Firm-Master';
import Add_Firm_Master from './Pages/Firm-Master/Add-Firm-Master';
import Edit_Firm_Master from './Pages/Firm-Master/Edit-Firm-Master';


const App = () => {
  return (
    <>
     <BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/User" element={<Users/>}/>
  <Route path="/firm-master" element={<FirmMaster/>}/>
  <Route path="/view-firm-master/:id" element={<View_Firm_Master/>}/>
  <Route path="/edit-firm-master/:id" element={<Edit_Firm_Master/>}/>
  <Route path="/add-firm-master" element={<Add_Firm_Master/>}/>
  <Route path="/client-master" element={<Clientmaster/>}/>
  <Route path="/details/:id" element={<Details/>}/>


</Routes>
     </BrowserRouter>
    </>
  )
}

export default App

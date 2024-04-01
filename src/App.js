import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Users from './Pages/Users';
import Details from './Pages/Details';


// Firm Master
import FirmMaster from './Pages/Firm-Master/FirmMaster';
import Add_Firm_Master from './Pages/Firm-Master/Add-Firm-Master';
import Edit_Firm_Master from './Pages/Firm-Master/Edit-Firm-Master';

//Client Master
import Clientmaster from './Pages/Client-Master/Clientmaster';
import Edit_Client_Master from './Pages/Client-Master/Edit-Client-Master';
import Add_Client_Master from './Pages/Client-Master/Add-Client-Master';

const App = () => {
  return (
    <>
     <BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/User" element={<Users/>}/>


{/* Firm Master */}
  <Route path="/firm-master" element={<FirmMaster/>}/>
  <Route path="/edit-firm-master/:id" element={<Edit_Firm_Master/>}/>
  <Route path="/add-firm-master" element={<Add_Firm_Master/>}/>

{/* Client Master */}
<Route path="/client-master" element={<Clientmaster/>}/>
<Route path="/edit-client-master/:id" element={<Edit_Client_Master/>}/>
<Route path="/add-client-master" element={<Add_Client_Master/>}/>

  <Route path="/details/:id" element={<Details/>}/>


</Routes>
     </BrowserRouter>
    </>
  )
}

export default App

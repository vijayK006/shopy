import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';

// Firm Master
import FirmMaster from './Pages/Firm-Master/FirmMaster';
import Add_Firm_Master from './Pages/Firm-Master/Add-Firm-Master';
import Edit_Firm_Master from './Pages/Firm-Master/Edit-Firm-Master';

//Client Master
import Clientmaster from './Pages/Client-Master/Clientmaster';
import Edit_Client_Master from './Pages/Client-Master/Edit-Client-Master';
import Add_Client_Master from './Pages/Client-Master/Add-Client-Master';

//Service Master
import Servicemaster from './Pages/Service-Master/Servicemaster';
import Add_Service_Master from './Pages/Service-Master/Add-Service-Master';
import Edit_Service_Master from './Pages/Service-Master/Edit-Service-Master';

// Expenses Master
import Expense_Master from './Pages/Expense-Master/Expense-Master';
import Edit_Expenese_Master from './Pages/Expense-Master/Edit-Expenses-Master';
import Add_Expenses_Master from './Pages/Expense-Master/Add-Expenses-Master';

// Employee Manager
import EmployeManager from './Pages/Employee-Manager/Employe-manager';
import Add_Employe from './Pages/Employee-Manager/Add-Employee';
import Edit_employe from './Pages/Employee-Manager/Edit-Employee';

// Target Master
import TargetMaster from './Pages/Target-Master/TargetMaster';
import Add_Target_Master from './Pages/Target-Master/Add-Target-Master';
import Edit_Target_Master from './Pages/Target-Master/Edit-Target-Master';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Firm Master */}
          <Route path="/firm-master" element={<FirmMaster />} />
          <Route path="/edit-firm-master/:id" element={<Edit_Firm_Master />} />
          <Route path="/add-firm-master" element={<Add_Firm_Master />} />

          {/* Client Master */}
          <Route path="/client-master" element={<Clientmaster />} />
          <Route path="/edit-client-master/:id" element={<Edit_Client_Master />} />
          <Route path="/add-client-master" element={<Add_Client_Master />} />

          {/* Service Master */}
          <Route path="/service-master" element={<Servicemaster />} />
          <Route path="/add-service-master" element={<Add_Service_Master />} />
          <Route path="/edit-service-master/:id" element={<Edit_Service_Master />} />

          {/* Expenses Master */}
          <Route path="/expenses-master" element={<Expense_Master />} />
          <Route path="/add-expenses-master" element={<Add_Expenses_Master />} />
          <Route path="/edit-expenses-master/:id" element={<Edit_Expenese_Master />} />


          {/* Employee Manager */}
          <Route path="/employe-manager" element={<EmployeManager />} />
          <Route path="/add-employee" element={<Add_Employe />} />
          <Route path="/edit-employee/:id" element={<Edit_employe />} />

          {/* Target Master */}
          <Route path="/target-master" element={<TargetMaster />} />
          <Route path="/add-target-master" element={<Add_Target_Master />} />
          <Route path="/edit-target-master/:id" element={<Edit_Target_Master />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

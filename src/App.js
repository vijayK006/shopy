import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

// Firm Master
import FirmMaster from "./Pages/Firm-Master/FirmMaster";
import Add_Firm_Master from "./Pages/Firm-Master/Add-Firm-Master";
import Edit_Firm_Master from "./Pages/Firm-Master/Edit-Firm-Master";

//Client Master
import Clientmaster from "./Pages/Client-Master/Clientmaster";
import Edit_Client_Master from "./Pages/Client-Master/Edit-Client-Master";
import Add_Client_Master from "./Pages/Client-Master/Add-Client-Master";

//Service Master
import Servicemaster from "./Pages/Service-Master/Servicemaster";
import Add_Service_Master from "./Pages/Service-Master/Add-Service-Master";
import Edit_Service_Master from "./Pages/Service-Master/Edit-Service-Master";

// Expenses Master
import Expense_Master from "./Pages/Expense-Master/Expense-Master";
import Edit_Expenese_Master from "./Pages/Expense-Master/Edit-Expenses-Master";
import Add_Expenses_Master from "./Pages/Expense-Master/Add-Expenses-Master";

// Employee Manager
import EmployeManager from "./Pages/Employee-Manager/Employe-manager";
import Add_Employe from "./Pages/Employee-Manager/Add-Employee";
import Edit_employe from "./Pages/Employee-Manager/Edit-Employee";

// Employee Access
import Access from './Pages/Employee-Access/Access';


// Target Master
import TargetMaster from './Pages/Target-Master/TargetMaster';
import Add_Target_Master from './Pages/Target-Master/Add-Target-Master';
import Edit_Target_Master from './Pages/Target-Master/Edit-Target-Master';
import ProtectRoute from './Auth/ProtectRoute';
import Add_Expenses_Payment from './Pages/Expense-Master/Add-Expenses-Payment';
import Expense_Payment from './Pages/Expense-Master/Expense-Payment';
import Edit_Expense_Payment from './Pages/Expense-Master/Edit-Expense-Payment';
import Add_Target_Out from './Pages/Target-Master/Add-Target-out';
import TargetOut from './Pages/Target-Master/Target-Out';
import Edit_Target_Out from './Pages/Target-Master/Edit-Target-Out';
import TargetReport from './Pages/Reports/Target-Report';
import ExpenseReport from './Pages/Reports/Expense-Report';
import Update_Access from "./Pages/Employee-Access/Update-Access";
import EmployeeLogin from "./Pages/EmployeeLogin";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:employeeId" element={<ProtectRoute Component={Home} />} />
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />

          {/* Firm Master */}
          <Route path="/firm-master/:employeeId" element={<FirmMaster />} />
          <Route path="/edit-firm-master/:employeeId/:id" element={<Edit_Firm_Master />} />
          <Route path="/add-firm-master" element={<Add_Firm_Master />} />

          {/* Client Master */}
          <Route path="/client-master" element={<Clientmaster />} />
          <Route
            path="/edit-client-master/:id"
            element={<Edit_Client_Master />}
          />
          <Route path="/add-client-master" element={<Add_Client_Master />} />

          {/* Service Master */}
          <Route path="/service-master" element={<Servicemaster />} />
          <Route path="/add-service-master" element={<Add_Service_Master />} />
          <Route
            path="/edit-service-master/:id"
            element={<Edit_Service_Master />}
          />

          {/* Expenses Master */}
          <Route path="/expenses-master" element={<Expense_Master />} />
          <Route
            path="/add-expenses-master"
            element={<Add_Expenses_Master />}
          />
          <Route
            path="/edit-expenses-master/:id"
            element={<Edit_Expenese_Master />}
          />

          {/* -------- */}
          <Route
            path="/add-expenses-payment"
            element={<Add_Expenses_Payment />}
          />
          <Route path="/expenses-payment" element={<Expense_Payment />} />
          <Route
            path="/edit-expenses-payment/:id"
            element={<Edit_Expense_Payment />}
          />

          {/* Employee Manager */}
          <Route path="/employe-manager" element={<EmployeManager />} />
          <Route path="/add-employee" element={<Add_Employe />} />
          <Route path="/edit-employee/:id" element={<Edit_employe />} />
          {/* --------- */}
          <Route path="/access" element={<Access />} />
          <Route path="/update-access" element={<Update_Access />} />


          {/* Target Master */}
          <Route path="/target-master" element={<TargetMaster />} />
          <Route path="/add-target-master" element={<Add_Target_Master />} />
          <Route
            path="/edit-target-master/:id"
            element={<Edit_Target_Master />}
          />
          {/* --------------- */}
          <Route path="/target-out" element={<TargetOut />} />
          <Route path="/add-target-out" element={<Add_Target_Out />} />
          <Route path="/edit-target-out/:id" element={<Edit_Target_Out />} />

{/* Reports */}
<Route path="/target-report" element={<TargetReport />} />
<Route path="/expense-report" element={<ExpenseReport />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

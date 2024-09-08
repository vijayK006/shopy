import React, { useEffect } from "react";
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
import Leadgeneration from "./Pages/Lead-Generation/Lead-generation";
import Add_lead_generation from "./Pages/Lead-Generation/Add-lead-generation";
import Edit_Lead_generation from "./Pages/Lead-Generation/Edit-lead-generation";

import Add_bill from "./Pages/Bill-Genaration/Add-bill";
import BillGeneration from "./Pages/Bill-Genaration/Bill-generation";
import Edit_bill from "./Pages/Bill-Genaration/edit-bill";
import Bill_pdf from "./Pages/Bill-Genaration/Bill-pdf";
import Add_sales from "./Pages/Sales-Manager/Add-Sales";
import Sales_Manager from "./Pages/Sales-Manager/Sales-Manager";
import Edit_Sales from "./Pages/Sales-Manager/Edit-Sales";


const App = () => {

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.clear();
  //   };

  //   // Add event listener for beforeunload
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:employeeId" element={<ProtectRoute Component={Home} />} />
          <Route path="/" element={<ProtectRoute Component={Home} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />

          {/* <Route path="/" element={<ProtectRoute Component={Home} />} />
          <Route path="/:employeeId" element={<ProtectRoute Component={Home} />} /> */}

          {/* Firm Master */}
          <Route path="/firm-master/:employeeId" element={<ProtectRoute Component={FirmMaster} />} />
          <Route path="/edit-firm-master/:employeeId/:id" element={<ProtectRoute Component={Edit_Firm_Master} />} />
          <Route path="/add-firm-master/:employeeId" element={<ProtectRoute Component={Add_Firm_Master} />} />

          {/* Client Master */}
          <Route path="/client-master/:employeeId" element={<ProtectRoute Component={Clientmaster} />} />
          <Route path="/edit-client-master/:employeeId/:id" element={<ProtectRoute Component={Edit_Client_Master} />} />
          <Route path="/add-client-master/:employeeId" element={<ProtectRoute Component={Add_Client_Master} />} />

          {/* Service Master */}
          <Route path="/service-master/:employeeId" element={<ProtectRoute Component={Servicemaster} />} />
          <Route path="/add-service-master/:employeeId" element={<ProtectRoute Component={Add_Service_Master} />} />
          <Route path="/edit-service-master/:employeeId/:id" element={<ProtectRoute Component={Edit_Service_Master} />} />

          {/* Expenses Master */}
          <Route path="/expenses-master/:employeeId" element={<ProtectRoute Component={Expense_Master} />} />
          <Route path="/add-expenses-master/:employeeId" element={<ProtectRoute Component={Add_Expenses_Master} />} />
          <Route path="/edit-expenses-master/:employeeId/:id" element={<ProtectRoute Component={Edit_Expenese_Master} />} />

          {/* -------- */}
          <Route path="/add-expenses-payment/:employeeId" element={<ProtectRoute Component={Add_Expenses_Payment} />} />
          <Route path="/expenses-payment/:employeeId" element={<ProtectRoute Component={Expense_Payment} />} />
          <Route path="/edit-expenses-payment/:employeeId/:id" element={<ProtectRoute Component={Edit_Expense_Payment} />} />

          {/* Employee Manager */}
          <Route path="/employe-manager/:employeeId" element={<ProtectRoute Component={EmployeManager} />} />
          <Route path="/add-employee/:employeeId" element={<ProtectRoute Component={Add_Employe} />} />
          <Route path="/edit-employee/:employeeId/:id" element={<ProtectRoute Component={Edit_employe} />} />
          {/* --------- */}
          <Route path="/access/:employeeId" element={<ProtectRoute Component={Access} />} />
          <Route path="/update-access/:employeeId" element={<ProtectRoute Component={Update_Access} />} />


          {/* Target Master */}
          <Route path="/target-master/:employeeId" element={<ProtectRoute Component={TargetMaster} />} />
          <Route path="/add-target-master/:employeeId" element={<ProtectRoute Component={Add_Target_Master} />} />
          <Route path="/edit-target-master/:employeeId/:id" element={<ProtectRoute Component={Edit_Target_Master} />} />
          {/* --------------- */}
          <Route path="/target-out/:employeeId" element={<ProtectRoute Component={TargetOut} />} />
          <Route path="/add-target-out/:employeeId" element={<ProtectRoute Component={Add_Target_Out} />} />
          <Route path="/edit-target-out/:employeeId/:id" element={<ProtectRoute Component={Edit_Target_Out} />} />

          {/* Reports */}
          <Route path="/target-report/:employeeId" element={<ProtectRoute Component={TargetReport} />} />
          <Route path="/expense-report/:employeeId" element={<ProtectRoute Component={ExpenseReport} />} />

          {/* Lead Generation */}
          <Route path="/lead-generation/:employeeId" element={<ProtectRoute Component={Leadgeneration} />} />
          <Route path="/add-lead-generation/:employeeId" element={<ProtectRoute Component={Add_lead_generation} />} />
          <Route path="/edit-lead-generation/:employeeId/:id" element={<ProtectRoute Component={Edit_Lead_generation} />} />

          {/* Bill */}
          <Route path="/bill-pdf/:employeeId/:id" element={<ProtectRoute Component={Bill_pdf} />} />
          <Route path="/add-bill/:employeeId" element={<ProtectRoute Component={Add_bill} />} />
          <Route path="/edit-bill/:employeeId/:id" element={<ProtectRoute Component={Edit_bill} />} />
          <Route path="/bill-generation/:employeeId" element={<ProtectRoute Component={BillGeneration} />} />

        {/* Sales Manager */}
        <Route path="/add-sales/:employeeId" element={<ProtectRoute Component={Add_sales} />} />
        <Route path="/sales-manager/:employeeId" element={<ProtectRoute Component={Sales_Manager} />} />
        <Route path="/edit-sales/:employeeId/:id" element={<ProtectRoute Component={Edit_Sales} />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

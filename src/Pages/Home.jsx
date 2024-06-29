import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Topbar from '../layouts/Topbar'
import Sidebar from '../layouts/Sidebar'
import Admincards from '../Components/Admin-cards';
import { PiCreditCard } from "react-icons/pi";

import { GoPerson } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import TargetStatus from '../Components/TargetStatus'
import TargetStatus_Employee from '../Components/TargetStatus-Employe';
import Sales_Details from '../Components/Sales-Details'


const Home = () => {
  const { employeeId } = useParams();
  const role = localStorage.getItem('role')

  const [firmmastercount, setFirmmasterCount] = useState([]);
  const [clientmastercount, setClientmastercount] = useState([]);
  const [servicemastercount, setServicemastercount] = useState([]);
  const [expensemastercount, setExpensemastercount] = useState([]);

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/firm/get-firm.php')
      .then(res => {
        setFirmmasterCount(res.data.length)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/client/get-client.php')
      .then(res => {
        setClientmastercount(res.data.length)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/service/get-service.php')
      .then(res => {
        setServicemastercount(res.data.length)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/expense/get-expense.php')
      .then(res => {
        setExpensemastercount(res.data.length)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <>

      <Topbar />
      <Sidebar />

      <div className='main-content' id='mainbody'>
        <div className="container-fluid mt-3">


          {role === 'admin' ? (
            <>
              <div className='row'>

                <Admincards cardtitle="Firm Master"
                  icon={PiCreditCard}
                  iconColor='#ff3e57'
                  cardbg='#ff3e57'
                  borderRcolor='3px solid #ff3e57'
                  circlebg='white'
                  datacount={firmmastercount}
                  pageLink={`/firm-master/${employeeId}`}
                >
                </Admincards>

                <Admincards cardtitle="Client Master"
                  icon={GoPerson}
                  iconColor='#00cebe'
                  cardbg='#00cebe'
                  borderRcolor='3px solid #00cebe'
                  circlebg='white'
                  datacount={clientmastercount}
                  pageLink={`/client-master/${employeeId}`}
                >
                </Admincards>

                <Admincards cardtitle="Service Master"
                  icon={IoSettingsOutline}
                  iconColor='#f927a8'
                  cardbg='#f927a8'
                  borderRcolor='3px solid #ff3e57'
                  circlebg='white'
                  datacount={servicemastercount}
                  pageLink={`/service-master/${employeeId}`}
                >
                </Admincards>

                <Admincards cardtitle="Expenses"
                  icon={MdOutlineSettingsInputComponent}
                  iconColor='#ff4c00'
                  cardbg='#ff4c00'
                  borderRcolor='3px solid #ff3e57'
                  circlebg='white'
                  datacount={expensemastercount}
                // pageLink={`/expenses-master/${employeeId}`}
                >
                </Admincards>

              </div>

              {/* <TargetStatus /> */}
              <Sales_Details/>
            </>

          ) : (
            <TargetStatus_Employee />
          )}


        </div>

      </div>


    </>
  )
}

export default Home

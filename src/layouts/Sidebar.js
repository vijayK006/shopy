import React, { useEffect, useState } from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoPricetagsOutline, IoSettingsOutline } from "react-icons/io5";
import { BsPersonGear, BsShopWindow } from 'react-icons/bs';
import { RxTarget } from 'react-icons/rx';
import { TbReport } from 'react-icons/tb';
import { FaRegAddressCard } from 'react-icons/fa';


const Sidebar = () => {
  const location = useLocation();
  const role = localStorage.getItem('role')
  console.log(role);
  const { employeeId } = useParams();

  const [currentPage, setCurrentPage] = useState(location.pathname);
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);


  const toggleDropdown = (dropdownId) => {
    const dropbutton = document.getElementById(dropdownId);
    dropbutton.classList.toggle('opensubmenu');

    // Check the classList to determine the state
    if (dropbutton.classList.contains('opensubmenu')) {
      dropbutton.style.backgroundColor = '#ff5f1a11';
      dropbutton.style.color = 'black';
      document.addEventListener('click', (event) => closeDropdown(event, dropdownId));
    } else {
      dropbutton.style.backgroundColor = ''; // Reset to default
      dropbutton.style.color = ''; // Reset to default
      document.removeEventListener('click', (e) => closeDropdown(e, dropdownId));
    }

    document.addEventListener('click', closeDropdown);
  };

  const closeDropdown = (event, dropdownId) => {
    const dropdown = document.getElementById(dropdownId);

    if (dropdown && dropdown.contains(event.target)) {
      // Click occurred inside the dropdown, do nothing
      return;
    }

    if (dropdown) {
      // Click occurred outside the dropdown, close it
      dropdown.classList.remove('opensubmenu');
      dropdown.style.backgroundColor = ''; // Reset to default
      dropdown.style.color = ''; // Reset to default

      // Remove the event listener after closing the dropdown
      document.removeEventListener('click', (event) => closeDropdown(event, dropdownId));
    }
  };

  return (
    <>
      <div className='side-bar' id='sidemenu'>

        <div className='side-navbar'>
          <ul className='menu mt-4'>
            {/* Home page */}
            <NavLink className="disble-decoration" to={`/${employeeId}`}><li className={`items ${currentPage.startsWith(`/${employeeId}`) ? 'active' : ''}`}><BiHomeAlt2 className="icons" /> <span className='resp'>Home</span></li></NavLink>

            {/* Firm Master */}
            <NavLink className="disble-decoration" to={`/firm-master/${employeeId}`}><li className={`items ${currentPage.startsWith('/firm-master') || currentPage.startsWith('/add-firm-master') || currentPage.startsWith('/edit-firm-master') ? 'active' : ''}`}><BsShopWindow className="icons" /> <span className='resp'>Firm Master</span></li></NavLink>

            {/* Client Master */}
            <NavLink className="disble-decoration" to={`/client-master/${employeeId}`}><li className={`items ${currentPage.startsWith('/client-master') || currentPage.startsWith('/add-client-master') || currentPage.startsWith('/edit-client-master') ? 'active' : ''}`}><BsPersonGear className="icons" /> <span className='resp'>Client Master</span></li></NavLink>

            {/* Service Master */}
            <NavLink className="disble-decoration" to={`/service-master/${employeeId}`}><li className={`items ${currentPage.startsWith('/service-master') || currentPage.startsWith('/add-service-master') || currentPage.startsWith('/edit-service-master') ? 'active' : ''}`}><IoSettingsOutline className="icons" /> <span className='resp'>Service Master</span></li></NavLink>

            {/* Lead Generation */}
            <NavLink className="disble-decoration" to={`/lead-generation/${employeeId}`}><li className={`items ${currentPage.startsWith('/lead-generation/') || currentPage.startsWith('/add-lead-generation') || currentPage.startsWith('/edit-lead-generation') ? 'active' : ''}`}><IoSettingsOutline className="icons" /> <span className='resp'>Lead Generation</span></li></NavLink>

            {/* Employee Master */}
            {role === 'admin' ? (
              <NavLink className="disble-decoration" to={`/employe-manager/${employeeId}`}><li className={`items ${currentPage.startsWith('/employe-manager') || currentPage.startsWith('/add-employee') || currentPage.startsWith('/edit-employee') ? 'active' : ''}`}><FaRegAddressCard className="icons" /> <span className='resp'>Employee Master</span></li></NavLink>
            ) : (
              <p className='d-none'>NO PERMISSION FOR EMPLOYEE</p>
            )}
            {/* <NavLink className="disble-decoration" to="/employe-manager"><li className={`items ${currentPage === '/employe-manager' || currentPage === '/add-employee' || currentPage.startsWith('/edit-employee') ? 'active' : ''}`}><FaRegAddressCard className="icons" /> <span className='resp'>Employee Master</span></li></NavLink> */}

            {/* Employee Access */}
            {role === 'admin' ? (
              <NavLink className="disble-decoration" to="" >
                <li className={`dropmenu items-drop  ${currentPage.startsWith('/access') || currentPage.startsWith('/update-access') ? 'active-drop' : ''}`} onClick={() => toggleDropdown('dropitems1')} id='dropitems1'>
                  <IoPricetagsOutline className="icons" /> <span className='resp'>Employee Access <IoIosArrowDown /></span>

                  <ul className='submenu' >
                    <NavLink to={`/access/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/access') ? 'link-active' : ''}`}><IoIosArrowForward />Add Access</li></NavLink>

                    <NavLink to={`/update-access/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/update-access') ? 'link-active' : ''}`}><IoIosArrowForward />Update Access</li></NavLink>
                  </ul>
                </li>
              </NavLink>
            ) : (
              <p className='d-none'>NO PERMISSION FOR EMPLOYEE</p>
            )}


            {/* Expenses Master */}
            {role === 'admin' ? (
              <NavLink className="disble-decoration" to="" >
                <li className={`dropmenu items-drop  ${currentPage.startsWith('/expenses-master') || currentPage.startsWith('/add-expenses-master') || currentPage.startsWith('/edit-expenses-master') || currentPage.startsWith('/add-expenses-payment') || currentPage.startsWith('/expenses-payment') || currentPage.startsWith('/edit-expenses-payment') ? 'active-drop' : ''}`} onClick={() => toggleDropdown('dropitems2')} id='dropitems2'>
                  <IoPricetagsOutline className="icons" /> <span className='resp'>Expenses Master <IoIosArrowDown /></span>

                  <ul className='submenu'>
                    <NavLink to={`/add-expenses-master/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/add-expenses-master') || currentPage.startsWith('/expenses-master') || currentPage.startsWith('/edit-expenses-master') ? 'link-active' : ''}`}><IoIosArrowForward /> Add Expense Category</li></NavLink>

                    <NavLink to={`/expenses-payment/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/add-expenses-payment') || currentPage.startsWith('/expenses-payment') || currentPage.startsWith('/edit-expenses-payment') ? 'link-active' : ''}`}><IoIosArrowForward /> Expenses Payment</li></NavLink>
                  </ul>
                </li>
              </NavLink>
            ) : (
              <p className='d-none'>NO PERMISSION FOR EMPLOYEE</p>
            )}


            {/* Target Master */}
            {role === 'admin' ? (
              // <NavLink className="disble-decoration" to="" >
              //   <li className={`dropmenu items-drop  ${currentPage.startsWith('/target-master') || currentPage.startsWith('/add-target-master') || currentPage.startsWith('/edit-target-master') || currentPage.startsWith('/target-out') || currentPage.startsWith('/add-target-out') || currentPage.startsWith('/edit-target-out') ? 'active-drop' : ''}`} onClick={() => toggleDropdown('dropitems3')} id='dropitems3'>
              //     <RxTarget className="icons" /> <span className='resp'>Target Master <IoIosArrowDown /></span>

              //     <ul className='submenu' >
              //       <NavLink to={`/target-master/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/target-master') || currentPage.startsWith('/add-target-master') || currentPage.startsWith('/edit-target-master') ? 'link-active' : ''}`}><IoIosArrowForward /> View Target Master</li></NavLink>

              //       <NavLink to={`/target-out/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/target-out') || currentPage.startsWith('/add-target-out') || currentPage.startsWith('/edit-target-out') ? 'link-active' : ''}`}><IoIosArrowForward /> Target Master Out</li></NavLink>
              //     </ul>
              //   </li>
              // </NavLink>

              <NavLink className="disble-decoration" to={`/target-master/${employeeId}`}><li className={`items ${currentPage.startsWith('/target-master/') || currentPage.startsWith('/add-target-master') || currentPage.startsWith('/edit-target-master') ? 'active' : ''}`}><IoSettingsOutline className="icons" /> <span className='resp'>Target Master</span></li></NavLink>
            ) : (
              <p className='d-none'>NO PERMISSION FOR EMPLOYEE</p>
            )}


            {/* Reports */}
            {role === 'admin' ? (
              <NavLink className="disble-decoration" to="" >
                <li className={`dropmenu items-drop  ${currentPage.startsWith('/target-report') || currentPage.startsWith('/expense-report') ? 'active-drop' : ''}`} onClick={() => toggleDropdown('dropitems4')} id='dropitems4'>
                  <TbReport className="icons" /> <span className='resp'>Reports <IoIosArrowDown /></span>

                  <ul className='submenu' >
                    <NavLink to={`/target-report/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/target-report') ? 'link-active' : ''}`}><IoIosArrowForward /> Target Master Report</li></NavLink>

                    <NavLink to={`/expense-report/${employeeId}`}><li className={`droplink-text ${currentPage.startsWith('/expense-report') ? 'link-active' : ''}`}><IoIosArrowForward /> Expense Master Report</li></NavLink>
                  </ul>
                </li>
              </NavLink>
            ) : (
              <p className='d-none'>NO PERMISSION FOR EMPLOYEE</p>
            )}

            {/* Bill Generation */}
            {/* <NavLink className="disble-decoration" to={`/bill-generation/${employeeId}`}>
              <li className={`items ${currentPage.startsWith('/bill-generation') || currentPage.startsWith('/add-bill') || currentPage.startsWith('/edit-bill') ? 'active' : ''}`}>
                <IoSettingsOutline className="icons" />
                <span className='resp'>Bill Generation</span>
              </li>
            </NavLink> */}

            {/* Sales Manager */}
            <NavLink className="disble-decoration" to={`/sales-manager/${employeeId}`}>
              <li className={`items ${currentPage.startsWith('/add-sales') || currentPage.startsWith('/sales-manager') ? 'active' : ''}`}>
                <IoSettingsOutline className="icons" />
                <span className='resp'>Sales Manager</span>
              </li>
            </NavLink>

          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
import React, { useEffect, useState } from 'react';
import {BiHomeAlt2, BiCategory} from 'react-icons/bi';
import { NavLink, useLocation  } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { GrUserManager } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSettingsInputComponent, MdOutlineWorkHistory } from "react-icons/md";


const Sidebar = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

    const toggleDropdown = (dropdownId) => {
      const dropbutton = document.getElementById(dropdownId);
      dropbutton.classList.toggle('opensubmenu');
    
      // Check the classList to determine the state
      if (dropbutton.classList.contains('opensubmenu')) {
        dropbutton.style.backgroundColor = 'white';
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


    const currentpage = window.location.pathname;
    const navpage = document.querySelectorAll('.disble-decoration');

    navpage.forEach(function(navpager){
      if(navpager.getAttribute('href') === currentpage){
        navpager.style.color="black";
        console.log('color changed')
      }else{
        navpager.style.color=""
        console.log('color not changed')
      }
    })

    console.log(currentpage);
    
  return ( 
    <>
      <div className='side-bar' id='sidemenu'>

<div className='side-navbar'>
    <ul className='menu'>
        <NavLink className="disble-decoration" to="/"><li className={`items ${currentPage === '/' && 'active'}`}><BiHomeAlt2 className="icons"/> <span className='resp'>Home</span></li></NavLink>

        <NavLink className="disble-decoration" to="/firm-master"><li className={`items ${currentPage === '/firm-master' && 'active'}`}><BiCategory className="icons"/> <span className='resp'>Firm Master</span></li></NavLink>

        <NavLink className="disble-decoration" to="/client-master"><li className={`items ${currentPage === '/client-master' && 'active'}`}><GrUserManager className="icons"/> <span className='resp'>Client Master</span></li></NavLink>

        <NavLink className="disble-decoration " to="/service-master"><li className={`items ${currentPage === '/service-master' && 'active'}`}><IoSettingsOutline  className="icons"/> <span className='resp'>Service Master</span></li></NavLink>
    
        <NavLink className="disble-decoration" to="" >
        <li className='items dropmenu' onClick={()=> toggleDropdown('dropitems1')} id='dropitems1'>
        <MdOutlineSettingsInputComponent  className="icons"/> <span className='resp'>Expense Master <IoIosArrowDown/></span> 
        <ul className='submenu'>
        <NavLink className="disble-decoration" to="/add-expenses-master"><li><IoIosArrowForward/>  &nbsp;&nbsp; Add Expenses</li></NavLink> 
        <NavLink className="disble-decoration" to="/expenses-master"><li><IoIosArrowForward/> &nbsp;&nbsp;  Expenses Manager</li></NavLink>
        </ul>
        </li>
        </NavLink>

        <NavLink className="disble-decoration " to="/employe-manager"><li className={`items ${currentPage === '/employe-manager' && 'active'}`}><MdOutlineWorkHistory  className="icons"/> <span className='resp'>Employee Manager</span></li></NavLink>


    </ul>
</div>
        </div>
    </>
  )
}

export default Sidebar;

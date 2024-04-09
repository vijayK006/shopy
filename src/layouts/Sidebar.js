import React, { useEffect, useState } from 'react';
import { BiHomeAlt2, BiCategory } from 'react-icons/bi';
import { NavLink, useLocation } from 'react-router-dom';
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


// const resper = document.querySelector('.resp')
// if(currentPage.classList.contains('active')){
// resper.forEach((referlink)=>{
//   referlink.style.color='orange';
// })
// }else{
//   resper.forEach((referlink)=>{
//     referlink.style.color='';
//   })
// }

  return (
    <>
      <div className='side-bar' id='sidemenu'>

        <div className='side-navbar'>
          <ul className='menu mt-4'>
            <NavLink className="disble-decoration" to="/"><li className={`items ${currentPage === '/' && 'active'}`}><BiHomeAlt2 className="icons" /> <span className='resp'>Home</span></li></NavLink>

            <NavLink className="disble-decoration" to="/firm-master"><li className={`items ${currentPage === '/firm-master' || currentPage === '/add-firm-master' || currentPage.startsWith('/edit-firm-master') ? 'active' : ''}`}><BiCategory className="icons" /> <span className='resp'>Firm Master</span></li></NavLink>

            <NavLink className="disble-decoration" to="/client-master"><li className={`items ${currentPage === '/client-master' || currentPage === '/add-client-master' || currentPage.startsWith('/edit-client-master') ? 'active' : ''}`}><GrUserManager className="icons" /> <span className='resp'>Client Master</span></li></NavLink>

            <NavLink className="disble-decoration " to="/service-master"><li className={`items ${currentPage === '/service-master' || currentPage === '/add-service-master' || currentPage.startsWith('/edit-service-master') ? 'active' : ''}`}><IoSettingsOutline className="icons" /> <span className='resp'>Service Master</span></li></NavLink>

            <NavLink className="disble-decoration " to="/expenses-master"><li className={`items ${currentPage === '/expenses-master' || currentPage === '/add-expenses-master' || currentPage.startsWith('/edit-expenses-master') ? 'active' : ''}`}><MdOutlineSettingsInputComponent className="icons" /> <span className='resp'>Expenses Master</span></li></NavLink>

            <NavLink className="disble-decoration" to="/employe-manager"><li className={`items ${currentPage === '/employe-manager' || currentPage === '/add-employee' || currentPage.startsWith('/edit-employee') ? 'active' : ''}`}><MdOutlineWorkHistory className="icons" /> <span className='resp'>Employee Manager</span></li></NavLink>

            <NavLink className="disble-decoration" to="/target-master"><li className={`items ${currentPage === '/target-master' ? 'active' : ''}`}><MdOutlineWorkHistory className="icons" /> <span className='resp'>Target Master</span></li></NavLink>

          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar;

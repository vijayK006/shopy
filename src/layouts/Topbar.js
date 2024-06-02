import React from 'react'
import { TfiMenu } from 'react-icons/tfi';
import adminImg from '../img/man.png';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();
  const opentoggler = () => {
    document.getElementById('mainbody').classList.toggle('maintoggle');
    document.getElementById('sidemenu').classList.toggle('sidetoggle');

  }

  const logout =()=>{
    navigate('/login');
    localStorage.clear()
  }

  return (
    <>
      <div className='top-bar'>

        <div className='start-container'>
          <TfiMenu className='menu-icon' onClick={opentoggler} />

          <div className='logo'>
            {/* <img src="" alt="logo-not-found"/> */}
            <h5 className='nav-logo'>Digital Shopee</h5>
          </div>
        </div>

        <div className='top-menu-bar d-flex gap-2'>

        <div className='d-flex gap-2 px-4'>
            <img src={adminImg} alt='admin-img' className='topbar-thumb' />
            <div className='more'>
              <span>Staff</span>
              <div className='status d-flex gap-1'>
                <div className='tag' />
                <p>Online</p>
              </div>
            </div>
          </div>

          <div className='notify'>
            <IoMdNotificationsOutline className='icon' />
          </div>

          <div onClick={logout} className='notify'>
            <RiLogoutCircleRLine className='icon' />
          </div>

        </div>
      </div>
    </>
  )
}

export default Topbar;

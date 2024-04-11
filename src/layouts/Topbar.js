import React from 'react'
import { TfiMenu } from 'react-icons/tfi';
import adminImg from '../img/man.png';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';

const Topbar = () => {
  const opentoggler = () => {
    document.getElementById('mainbody').classList.toggle('maintoggle');
    document.getElementById('sidemenu').classList.toggle('sidetoggle');

  }
  return (
    <>
      <div className='top-bar'>

        <div className='start-container'>
          <TfiMenu className='menu-icon' onClick={opentoggler} />

          <div className='logo'>
            {/* <img src="" alt="logo-not-found"/> */}
            <h5 className='nav-logo'>dashboard</h5>
          </div>
        </div>

        <div className='top-menu-bar gap-3'>

<div className='notify'>
<IoMdNotificationsOutline className='icon'/>
</div>

        <div className='d-flex gap-2 align-items-center'>
<img src={adminImg} alt='admin-img' className='topbar-thumb'/>
<span>Admin</span>
<IoIosArrowDown />
        </div>

        </div>
      </div>
    </>
  )
}

export default Topbar;

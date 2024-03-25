import React from 'react'
import {TfiMenu} from 'react-icons/tfi';


const Topbar = () => {
  const opentoggler = ()=>{
    document.getElementById('mainbody').classList.toggle('maintoggle');
    document.getElementById('sidemenu').classList.toggle('sidetoggle');

}
  return (
    <>
      <div className='top-bar'>

  <div className='start-container'>
  <TfiMenu className='menu-icon' onClick={opentoggler}/>

  <div className='logo'>
  {/* <img src="" alt="logo-not-found"/> */}
  <h5 className='nav-logo'>dashboard</h5>
  </div>
  </div>

  <div className='top-menu-bar'>
    <ul>
      <li>Home</li>
      <li>Logout</li>
    </ul>
  </div>
</div>
    </>
  )
}

export default Topbar;

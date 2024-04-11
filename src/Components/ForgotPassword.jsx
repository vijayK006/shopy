import React,{useState} from 'react';

import { MdOutlinePassword, MdOutlineLockPerson } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";


const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);


  const closeforget=()=>{
    document.getElementById('forgotopen').classList.remove('feropen')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>

<div className='forgot-popup'  id='forgotopen' >
<div className='d-flex justify-content-between align-items-center'>
<h5 className='subheader-font'>Forgot Password</h5>

<GrClose onClick={closeforget} className='close-icon'/>
</div>
<form >
 <div className='from-container'>
 <input type='text' placeholder='Enter Employee ID' className='login-form my-1' style={{backgroundColor:"transparent"}} />
 <MdOutlineLockPerson   className="icon"/>
 </div>



 <div className='from-container'>
 <input type={showPassword ? 'text' : 'password'} placeholder='Enter New Password' className='login-form mt-1' style={{backgroundColor:"transparent"}}/>
 <MdOutlinePassword    className="icon"/>
 {showPassword ? (
                    <FaRegEyeSlash
                      className='icon-r'
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaRegEye
                      className='icon-r'
                      onClick={togglePasswordVisibility}
                    />
                  )}

                  
 </div>

 <input type='submit' className='login-btn mt-4' value="Save" />
    </form>

</div>
      
    </>
  )
}

export default ForgotPassword;

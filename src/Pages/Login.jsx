import React,{useState} from 'react';
import banner1 from '../img/login.avif';
import { MdOutlinePassword, MdOutlineLockPerson } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuUserCog } from "react-icons/lu";
import { Link  } from 'react-router-dom';
import Axios from 'axios';
// import ForgotPassword from '../Components/ForgotPassword';

// import { Navigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');


  // const [loginStatus, setLoginStatus] = useState("");

  const [showPassword, setShowPassword] = useState(false);


  const loginHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/stafflogin", {
      userId: userId,
      username: username,
      password: password,
    }).then((response) => {
      if(response.data.message === "Success"){
        window.location.href = "/Home";
      } else {

    // alert('wrong creadentials');

const war=document.getElementById('warning');

war.classList.add('warning-add')


      }
    })
  }

    const classforpass=()=>{
       document.getElementById('forgotopen').classList.add('feropen');
    }

  const removeall=()=>{
   const wars= document.getElementById('warning');
   wars.classList.remove('warning-add');
  //  document.getElementById('forgotopen').classList.remove('feropen');
  }


    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };



  return (
    <>
<div className='login-body'>

    <div className='login-container shadow' onClick={removeall}>

<div className='banner'>
<img src={banner1} alt='login-banner'/>
</div>

<div className='login-section'>
<div className=' mt-5 mb-2 mx-3 p-3' style={{borderRadius:"15px"}}>
<p className='warning-message' id='warning'><IoIosCloseCircleOutline className='icon'/> Wrong Creadentials</p>

<h5>Staff Login</h5>
<p className='card-text' >Enter your account  details to sign in</p>

 <form onSubmit={loginHandler} className='pt-5'>
 {/* <div className='from-container'>
 <input type='text' placeholder='Enter Employee ID' className='login-form my-1' value={userId} onChange={(e) => setUserId(e.target.value)}/>
 <MdOutlineLockPerson   className="icon"/>
 </div> */}

 <div className='from-container'>
 <input type='text' placeholder='Enter Username' className='login-form my-1' value={username} onChange={(e) => setUsername(e.target.value)}/>
 <LuUserCog   className="icon"/>
 </div>

 <div className='from-container'>
 <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' className='login-form mt-1' value={password} onChange={(e) => setPassword(e.target.value)}/>
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
 {/* <Link to='/' className='login-text-pass subheader-font' onClick={classforpass}>Forgot Password ?</Link> */}

 <input type='submit' className='login-btn mt-4' value="Sign in"/>
    </form>
</div>
   
</div>



    </div>

    {/* <ForgotPassword/> */}
</div>
    </>
  )
}

export default Login

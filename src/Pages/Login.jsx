import React, { useEffect, useState } from 'react';
import banner1 from '../img/login.avif';
import { MdOutlinePassword, MdOutlineLockPerson } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuUserCog } from "react-icons/lu";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import ForgotPassword from '../Components/ForgotPassword';

import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate()
  // const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [valueData, setValueData] = useState({
    username: '',
    password: '',

  })


  // const loginHandler = (e) => {
  //   e.preventDefault();
  //   Axios.post("http://localhost:3002/stafflogin", {
  //     username: username,
  //     password: password,
  //   }).then((response) => {
  //     if (response.data.message === "Success") {
  //       window.location.href = "/";
  //     } else {
  //       // alert('wrong creadentials');
  //       const warning = document.getElementById('warning');
  //       warning.classList.add('warning-add');
  //     }
  //   })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    // setLoading(true);

    const formData = new FormData();
    formData.append('username', valueData.username);
    formData.append('password', valueData.password);

    axios.post('https://shopee-firm.000webhostapp.com/api/login/login.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        if (res.data.message === "Login successful") {
          console.log('Login Success')
          navigate('/');
          localStorage.setItem('login', true)
        }
      })
      .catch(err => {
        console.log("Login Failed con")
        console.log(err)
      });
  };

  const classforpass = () => {
    document.getElementById('forgotopen').classList.add('feropen');
  }

  const removeall = () => {
    const wars = document.getElementById('warning');
    wars.classList.remove('warning-add');
    //  document.getElementById('forgotopen').classList.remove('feropen');
  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueData({ ...valueData, [name]: value });
  };



  return (
    <>
      <div className='login-body'>

        <div className='login-container shadow' onClick={removeall}>

          <div className='banner'>
            <img src={banner1} alt='login-banner' />
          </div>

          <div className='login-section'>
            <div className=' mt-5 mb-2 mx-3 p-3' style={{ borderRadius: "15px" }}>
              <p className='warning-message' id='warning'><IoIosCloseCircleOutline className='icon' /> Wrong Creadentials</p>

              <h5 className='font-w-600'>Welcome to Digitel Shopee Login Page</h5>
              <p className='card-text t-color-gray' >Enter your account  details to sign in</p>

              <form onSubmit={handleSubmit} className='pt-5'>

                <div className='from-container'>
                  <input type='text' placeholder='Enter Username' className='login-form my-1' name='username' value={valueData.username}
                    onChange={handleChange} />
                  <LuUserCog className="icon" />
                </div>

                <div className='from-container'>
                  <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' className='login-form mt-1' name='password' value={valueData.password} onChange={handleChange} />

                  <MdOutlinePassword className="icon" />
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

                <input type='submit' className='login-btn mt-4' value="Sign in" />
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

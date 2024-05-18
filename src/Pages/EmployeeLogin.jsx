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


const EmployeeLogin = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [valueData, setValueData] = useState({
    phone: '',
    password: '',

  })




  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append('phone', valueData.phone);
    formData.append('password', valueData.password);

    axios.post('https://digitalshopee.online/api/login/employee-login.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        if (res.data.message === "Login successful") {
          const employeeId = res.data.id;
          console.log('Login Success')
          navigate(`/${employeeId}`);
          localStorage.setItem('login', true)
          localStorage.setItem('employeeId', employeeId);
          localStorage.setItem('role', 'employeeId')

        }
      })
      .catch(err => {
        console.log("Login Failed con")
        const warning = document.getElementById('warning');
        warning.classList.add('warning-add');
        setLoading(false);
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

              <h5 className='font-w-600'>Welcome to Digital Shopee Employee Login Page</h5>
              <p className='card-text t-color-gray' >Enter your account  details to sign in</p>

              <form onSubmit={handleSubmit} className='pt-5'>

                <div className='from-container'>
                  <input type='text' placeholder='Enter Username' className='login-form my-1' name='phone' value={valueData.phone}
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

                {loading ? ( // Conditional rendering for loading popup
                                        <>
                                        
                                        <button type='submit' className='login-btn mt-4' >Sign In &nbsp; &nbsp;
                                        <div className="spinner-border text-light spinner-border-sm scaleonload"></div>
                                        </button>
                                            
                                        </>
                                    ) : (
                                      <button type='submit' className='login-btn mt-4' >Sign In</button>
                                    )}
              </form>
            </div>

          </div>



        </div>

        {/* <ForgotPassword/> */}
      </div>
    </>
  )
}

export default EmployeeLogin

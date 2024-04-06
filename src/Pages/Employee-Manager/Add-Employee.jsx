import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';
import { AiFillPicture } from "react-icons/ai";

const Add_Employe = () => {


const [profile_photodoc, setProfile_photodoc] = useState(null)


    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const [valueData, setValueData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        password: '',
        address: '',

        profile_photo: null,
        resume: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', valueData.name);
        formData.append('email', valueData.email);
        formData.append('phone', valueData.phone);
        formData.append('dob', valueData.dob);
        formData.append('password', valueData.password);
        formData.append('address', valueData.address);
        formData.append('profile_photo', valueData.profile_photo);
        formData.append('resume', valueData.resume);
        




        axios.post('https://shopee-firm.000webhostapp.com/api/employee/add-employee.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate('/employe-manager')
                console.log('Employee Submitted Successfully')
            })
            .catch(err => console.log(err));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'profile_photo' || name === 'resume') {
            const file = e.target.files && e.target.files[0]; // Check if e.target.files exists
            if (file) {
                setValueData({
                    ...valueData,
                    [name]: file
                });
    
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Update the corresponding state variable based on the uploaded file name
                    if (name === 'profile_photo') {
                        setProfile_photodoc(reader.result);
                    } 
                };
                reader.readAsDataURL(file);
            } else {
                setValueData({
                    ...valueData,
                    [name]: null
                });
    
                // Reset the corresponding image state variable to null
                if (name === 'profile_photo') {
                    setProfile_photodoc(null);
                } 
            }
        } else {
            setValueData({
                ...valueData,
                [name]: value
            });
        }
    };

    

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>

                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/employe-manager'>Employee Manager</Link> / <Link className='t-theme-color'>Add Employee Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Add Employee Photo</label>
                                <div className='img-format mb-1 main-field'>
                                    <img src={profile_photodoc} alt='' />
                                <label for='profile_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div>
                                <input type='file' className='form-control d-none' id='profile_photo' name='profile_photo' onChange={handleChange} />
                            </div>

                        
                            <div className='col-md-4 py-1'/>
                            <div className='col-md-4 py-1'/>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Enter Employee Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter name' onChange={handleChange} />

                                {/* <p className='warning'>{alertname}</p> */}
                            </div>


                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Enter Employee Email-id</label>
                                <input type='text' className='form-control' value={valueData.email} name='email' placeholder='Please enter email-id' onChange={handleChange} />

                                {/* <p className='warning'>{alertowner}</p> */}
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Add Resume / CV</label>
                                <input type='file' className='form-control' name='resume' onChange={handleChange} />

                                {/* <p className='warning'>{alertowner}</p> */}
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Enter Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />

                                {/* <p className='warning'>{alertphone}</p> */}
                            </div>


                            {/* <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Enter Alternate mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone' placeholder='Please enter alternate mobile no. (Optional)' onChange={handleChange} />
                              


                            </div> */}

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Enter Empoloyee DOB</label>
                                <input type='date' className='form-control' value={valueData.dob} name='dob' placeholder='' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Enter Empoloyee Password</label>
                                <input type='text' className='form-control' value={valueData.password} name='password' placeholder='Enter new password' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>

                           

                            <div className='d-flex justify-content-end pt-4'>
                                {/* <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Submit</button> */}

                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} disabled={loading}>
                                    {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Submit &nbsp; &nbsp;
                                            <div className="spinner-border text-info spinner-border-sm scaleonload"></div>
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>

                        </div>



                    </form>
                </div>



            </div>
        </>
    )
}

export default Add_Employe

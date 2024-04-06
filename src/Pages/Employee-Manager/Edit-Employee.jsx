import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import { AiFillPicture } from "react-icons/ai";


const Edit_employe = () => {
    const { id } = useParams();
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


    useEffect(() => {
        axios.get(`https://shopee-firm.000webhostapp.com/api/employee/get-employee-by-id.php?id=${id}`)
            .then(response => {

                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    name: firmData.name,
                    email: firmData.email,
                    phone: firmData.phone,
                    dob: firmData.dob,
                    password: firmData.password,
                    address: firmData.address,

                    // Assuming these are the correct keys for logo, owner_image, and sign
                    profile_photo: firmData.profile_photo,
                    resume: firmData.resume,

                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

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


        const confirmDelete = window.confirm("Are you sure you want to update this Firm Master");
        if (confirmDelete) {
            axios.post(`https://shopee-firm.000webhostapp.com/api/employee/edit-employee.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Employee Updated Successfully')
                    navigate('/employe-manager')
                })
                .catch(err => console.log(err));

        }

    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'profile_photo' || name === 'resume') {
            // Update state for image file
            setValueData({
                ...valueData,
                [name]: e.target.files[0]
            });

            // Create URL for selected file and set it as src attribute of the img tag
            const reader = new FileReader();
            reader.onload = function (event) {
                const imgSrc = event.target.result;
                const imgTag = document.getElementById(`${name}-preview`);
                if (imgTag) {
                    imgTag.src = imgSrc;
                }
            };
            reader.readAsDataURL(e.target.files[0]);
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/employe-manager'>Employee Manager</Link> / <Link className='t-theme-color'>Edit Employee Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Employe Profile Photo</label>
                                <div className='img-format mb-1 main-field'>
                                    <img src={`https://shopee-firm.000webhostapp.com/api/employee/${valueData.profile_photo}`} alt='' id="logo-preview" />
                                    <label for='profile_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div>
                                <input type='file' className='form-control d-none' id='profile_photo' name='profile_photo' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1' />
                            <div className='col-md-4 py-1' />

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Employee Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter name' onChange={handleChange} />

                                {/* <p className='warning'>{alertname}</p> */}
                            </div>


                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Email-id</label>
                                <input type='text' className='form-control' value={valueData.email} name='email' placeholder='Please enter email-id' onChange={handleChange} />

                                {/* <p className='warning'>{alertowner}</p> */}
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Resume / CV</label>
                                <input type='file' className='form-control' name='resume' onChange={handleChange} />
                                <a href={`https://shopee-firm.000webhostapp.com/api/employee/${valueData.resume}`} className='btn btn-info' target='_blank'>View CV</a>
                                {/* <p className='warning'>{alertowner}</p> */}
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />

                                {/* <p className='warning'>{alertphone}</p> */}
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>DOB</label>
                                <input type='date' className='form-control' value={valueData.dob} name='dob' placeholder='' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Password</label>
                                <input type='text' className='form-control' value={valueData.password} name='password' placeholder='Enter new password' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>


                            <div className='d-flex justify-content-end pt-4'>
                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Update</button>
                            </div>

                        </div>



                    </form>

                </div>
            </div>
        </>
    )
}

export default Edit_employe

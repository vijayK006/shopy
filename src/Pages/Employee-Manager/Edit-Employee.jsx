import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import { AiFillPicture } from "react-icons/ai";


const Edit_employe = () => {
    const { id } = useParams();
    const { employeeId } = useParams();
    const [alertEmpName, setAlertEmpName] = useState();
    const [alertEmpMobileNo, setAlertEmpMobileNo] = useState();
    const [alertEmpEmail, setAlertEmpEmail] = useState();
    const [alertEmpPassowrd, setAlertEmpPassowrd] = useState();
    const [getemployeeMobilenumber, setGetemployeeMobilenumber] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // const [selectedFile, setSelectedFile] = useState(null);

    const [valueData, setValueData] = useState({
        name: '',
        email: '',
        phone: '',
        alt_phone: '',
        dob: '',
        password: '',
        post: '',
        salary: '',
        doj: '',
        dor: '',
        address: '',

        profile_photo: null,
        resume: null,
        adhaar_photo: null,
        pan_photo: null,
        passport: null,
        education: null,
    })

    useEffect(() => {
        axios.get('https://digitalshopee.online/api/employee/get-employee.php')
            .then(res => {
                const migratefirm = res.data.map(employe => ({ phone: employe.phone, id: employe.id }))
                setGetemployeeMobilenumber(migratefirm)
                console.log(migratefirm)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);



    useEffect(() => {
        axios.get(`https://digitalshopee.online/api/employee/get-employee-by-id.php?id=${id}`)
            .then(response => {

                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    name: firmData.name,
                    email: firmData.email,
                    phone: firmData.phone,
                    alt_phone: firmData.alt_phone,
                    dob: firmData.dob,
                    password: firmData.password,
                    post: firmData.post,
                    salary: firmData.salary,
                    doj: firmData.doj,
                    dor: firmData.dor,
                    address: firmData.address,

                    // Assuming these are the correct keys for logo, owner_image, and sign
                    profile_photo: firmData.profile_photo,
                    resume: firmData.resume,
                    adhaar_photo: firmData.adhaar_photo,
                    pan_photo: firmData.pan_photo,
                    passport: firmData.passport,
                    education: firmData.education,

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
        formData.append('alt_phone', valueData.alt_phone);
        formData.append('dob', valueData.dob);
        formData.append('password', valueData.password);
        formData.append('post', valueData.post);
        formData.append('salary', valueData.salary);
        formData.append('doj', valueData.doj);
        formData.append('dor', valueData.dor);
        formData.append('address', valueData.address);

        formData.append('profile_photo', valueData.profile_photo);
        formData.append('resume', valueData.resume);
        formData.append('adhaar_photo', valueData.adhaar_photo);
        formData.append('pan_photo', valueData.pan_photo);
        formData.append('passport', valueData.passport);
        formData.append('education', valueData.education);

        
        if (!valueData.name === "") {
            setAlertEmpName("");
            setLoading(true);
        } else if (valueData.name === "") {
            setAlertEmpName("Please fill your name");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else{
            setAlertEmpName("");
            setLoading(true);
        }


        if (getemployeeMobilenumber.includes(valueData.phone)) {
            setAlertEmpMobileNo("This mobile number already exists. Please enter a different mobile number.");
            setLoading(false);
            return;
        }

        const regnumber = /^[0-9]{10}$/;
        if (regnumber.test(valueData.phone)) {
            setAlertEmpMobileNo("");
            setLoading(true);
        } else if (!regnumber.test(valueData.phone) && valueData.phone === "") {
            setAlertEmpMobileNo("Please enter your mobile Number");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertEmpMobileNo("Mobile number should be 10 digits (no letters and spaces allowed).");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        const regemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regemail.test(valueData.email)) {
            setAlertEmpEmail("");
            setLoading(true);
        } else if (valueData.email === "") {
            setAlertEmpEmail("Please enter email-id");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else if (!regemail.test(valueData.email)) {
            setAlertEmpEmail("Email-id is not valid");
            //   e.preventDefault();
            setLoading(false);
            return;
        }


        if (!valueData.password === "") {
            setAlertEmpPassowrd("");
            setLoading(true);
        } else if (valueData.password === "") {
            setAlertEmpPassowrd("Please enter password");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else{
            setAlertEmpPassowrd("");
            setLoading(true);
        }


        const confirmDelete = window.confirm("Are you sure you want to update this Firm Master");
        if (confirmDelete) {
            axios.post(`https://digitalshopee.online/api/employee/edit-employee.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Employee Updated Successfully')
                    navigate(`/employe-manager/${employeeId}`)
                })
                .catch(err => console.log(err));

        }

    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'profile_photo' || name === 'resume' || name === 'adhaar_photo' || name === 'pan_photo' || name === 'passport' || name === 'education') {
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
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/employe-manager/${employeeId}`}>Employee Manager</Link> / <Link className='t-theme-color'>Edit Employee Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Employe Profile Photo</label>
                                <div className='img-format mb-1 main-field'>
                                    <img src={`https://digitalshopee.online/api/employee/${valueData.profile_photo}`} alt='' id="profile_photo-preview" />
                                    <label for='profile_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div>
                                <input type='file' className='form-control d-none' id='profile_photo' name='profile_photo' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1' />
                            <div className='col-md-4 py-1' />

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Employee Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter name' onChange={handleChange} />

                                <p className='warning'>{alertEmpName}</p>
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Empoloyee DOB</label>
                                <input type='date' className='form-control' value={valueData.dob} name='dob' placeholder='' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />

                                <p className='warning'>{alertEmpMobileNo}</p>
                            </div>


                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Alternate Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone' placeholder='Please enter alternate mobile no.' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Employee Email-id</label>
                                <input type='text' className='form-control' value={valueData.email} name='email' placeholder='Please enter email-id' onChange={handleChange} />

                                <p className='warning'>{alertEmpEmail}</p>
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Employee Address</label>
                                <input type='text' className='form-control' value={valueData.address} name='address' placeholder='Please enter address' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Employee Post</label>
                                <input type='text' className='form-control' value={valueData.post} name='post' placeholder='Please enter post' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Employee Salary</label>
                                <input type='number' className='form-control' value={valueData.salary} name='salary' placeholder='Please enter salary' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Empoloyee DOJ</label>
                                <input type='date' className='form-control' value={valueData.doj} name='doj' placeholder='' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Empoloyee DOR</label>
                                <input type='date' className='form-control' value={valueData.dor} name='dor' placeholder='' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Empoloyee Password</label>
                                <input type='text' className='form-control' value={valueData.password} name='password' placeholder='Enter new password' onChange={handleChange} />

                                <p className='warning'>{alertEmpPassowrd}</p>
                            </div>
                            
                            <div className='col-12 py-3 border-top' />

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Aadhaar Card</label>


                                <input type='file' className='form-control' id='adhaar_photo' name='adhaar_photo' onChange={handleChange} />

                                <div className='d-flex align-items-center gap-2 pt-1'>
                                    <label for='adhaar_photo' className='file-data'>Update </label>

                                    <a href={`https://digitalshopee.online/api/employee/${valueData.adhaar_photo}`} className='file-data-outline' target='_blank' rel="noreferrer">View </a>
                                </div>

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Pan Card</label>

                                <input type='file' className='form-control' id='pan_photo' name='pan_photo' onChange={handleChange} />

                                <div className='d-flex align-items-center gap-2 pt-1'>
                                    <label for='pan_photo' className='file-data'>Update</label>

                                    <a href={`https://digitalshopee.online/api/employee/${valueData.pan_photo}`} className='file-data-outline' target='_blank' rel="noreferrer">View</a>
                                </div>

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Resume / CV </label>


                                <input type='file' className='form-control' id='resume' name='resume' onChange={handleChange} />

                                <div className='d-flex align-items-center gap-2 pt-1'>
                                    <label for='resume' className='file-data'>Update</label>

                                    <a href={`https://digitalshopee.online/api/employee/${valueData.resume}`} className='file-data-outline' target='_blank' rel="noreferrer">View </a>
                                </div>

                            </div>


                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Education</label>


                                <input type='file' className='form-control' id='education' name='education' onChange={handleChange} />

                                <div className='d-flex align-items-center gap-2 pt-1'>
                                    <label for='education' className='file-data'>Update</label>

                                    <a href={`https://digitalshopee.online/api/employee/${valueData.education}`} className='file-data-outline' target='_blank' rel="noreferrer">View</a>
                                </div>

                            </div>


                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Other's</label>


                                <input type='file' className='form-control' id='passport' name='passport' onChange={handleChange} />

                                <div className='d-flex align-items-center gap-2 pt-1'>
                                    <label for='passport' className='file-data'>Update</label>

                                    <a href={`https://digitalshopee.online/api/employee/${valueData.passport}`} className='file-data-outline' target='_blank' rel="noreferrer">View</a>
                                </div>

                            </div>

                            <div className='d-flex justify-content-end pt-4'>
                            <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} disabled={loading}>
                                    {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Updating &nbsp; &nbsp;
                                            <div className="spinner-border text-danger spinner-border-sm scaleonload"></div>
                                        </>
                                    ) : (
                                        "Update"
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

export default Edit_employe

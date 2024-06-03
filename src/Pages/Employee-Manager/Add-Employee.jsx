import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';
import { AiFillPicture } from "react-icons/ai";

const Add_Employe = () => {
    const { employeeId } = useParams();
const [alertEmpName, setAlertEmpName] = useState();
const [alertEmpMobileNo, setAlertEmpMobileNo] = useState();
const [alertEmpEmail, setAlertEmpEmail] = useState();
const [alertEmpPassowrd, setAlertEmpPassowrd] = useState();
const [getemployeeMobilenumber, setGetemployeeMobilenumber] = useState([]);

    const [profile_photodoc, setProfile_photodoc] = useState(null)

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
            const migratephone = res.data.map(employee=> employee.phone)
            setGetemployeeMobilenumber(migratephone)
            console.log(migratephone)
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          });
      }, []);

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

        axios.post('https://digitalshopee.online/api/employee/add-employee.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate(`/employe-manager/${employeeId}`)
                console.log('Employee Submitted Successfully')
            })
            .catch(err => console.log(err));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'profile_photo' || name === 'resume' || name === 'adhaar_photo' || name === 'pan_photo' || name === 'passport' || name === 'education') {
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
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/employe-manager/${employeeId}`}>Employee Manager</Link> / <Link className='t-theme-color'>Add Employee Details</Link></p>

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


                            {/* <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Alternate mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone' placeholder='Please enter alternate mobile no. (Optional)' onChange={handleChange} />
                            </div> */}



                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Employee Post</label>
                                <input type='text' className='form-control' value={valueData.post} name='post' placeholder='Please enter post' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Employee Salary</label>
                                <input type='number' className='form-control' value={valueData.salary} name='salary' placeholder='Please enter salary' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Empoloyee DOJ</label>
                                <input type='date' className='form-control' value={valueData.doj} name='doj' placeholder='' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Empoloyee DOR</label>
                                <input type='date' className='form-control' value={valueData.dor} name='dor' placeholder='' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Empoloyee Password</label>
                                <input type='text' className='form-control' value={valueData.password} name='password' placeholder='Enter new password' onChange={handleChange} />

                                <p className='warning'>{alertEmpPassowrd}</p>
                            </div>

                            <hr />
                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Aadhaar Card</label>
                                <input type='file' className='form-control' name='adhaar_photo' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Pan Card</label>
                                <input type='file' className='form-control' name='pan_photo' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Resume / CV</label>
                                <input type='file' className='form-control' name='resume' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Education</label>
                                <input type='file' className='form-control' name='education' onChange={handleChange} />

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Other's </label>
                                <input type='file' className='form-control' name='passport' onChange={handleChange} />

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

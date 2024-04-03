import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city/dist/cjs/index.js";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from 'axios';

const Add_Client_Master = () => {

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [loading, setLoading] = useState(false);
const [getfirmnames, setGetfirmnames] = useState([])
    const navigate = useNavigate();

    const [alertname, setAlertname] = useState();
    const [alertprofession, setAlertprofession] = useState();
    const [alertphone, setAlertphone] = useState();
    const [alertemail, setAlertemail] = useState();
    const [alertstate, setAlertstate] = useState();
    const [alertdestrict, setAlertdestrict] = useState();


    useEffect(() => {
        // Set default country to India after the component mounts
        const defaultCountry = { id: 101, name: "India" };
        setCountryid(defaultCountry.id);

    }, []);

    const [valueData, setValueData] = useState({
        address: '',
        adhaar: '',
        phone: '',
        alt_phone: '',
        email: '',
        date: '',
        category: '',
        state: '',
        district: '',
        taluk: '',
        pin: '',
        license: '',
        name: '',
        pan: '',
        ration: '',
        reference: '',
        voter_id: '',
        profession: '',
        other:'',
        dob:'',


        client_photo: null,
        adhaar_photo: null,
        pan_photo: null,
        voter_id_photo: null,
        license_photo: null,
        ration_photo: null,
        other_photo: null,
    })

    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData();

        formData.append('address', valueData.address);
        formData.append('adhaar', valueData.adhaar);
        formData.append('phone', valueData.phone);
        formData.append('alt_phone', valueData.alt_phone);
        formData.append('email', valueData.email);
        formData.append('date', valueData.date);
        formData.append('category', valueData.category);
        formData.append('state', valueData.state);
        formData.append('district', valueData.district);
        formData.append('taluk', valueData.taluk);
        formData.append('pin', valueData.pin);
        formData.append('license', valueData.license);
        formData.append('name', valueData.name);
        formData.append('pan', valueData.pan);
        formData.append('profession', valueData.profession);
        formData.append('ration', valueData.ration);
        formData.append('reference', valueData.reference);
        formData.append('voter_id', valueData.voter_id);
        formData.append('other', valueData.other);
        formData.append('dob', valueData.dob);

        formData.append('client_photo', valueData.client_photo);
        formData.append('adhaar_photo', valueData.adhaar_photo);
        formData.append('pan_photo', valueData.pan_photo);
        formData.append('voter_id_photo', valueData.voter_id_photo);
        formData.append('license_photo', valueData.license_photo);
        formData.append('ration_photo', valueData.ration_photo);
        formData.append('other_photo', valueData.other_photo);


        const regname = /^[a-zA-Z\s]+$/;
        if (regname.test(valueData.name)) {
            setAlertname("");
            setLoading(true);
        } else if (!regname.test(valueData.name) && valueData.name === "") {
            setAlertname("Please fill your client name");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertname("Name should not be in a number");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        const regprofession = /^[a-zA-Z\s]+$/;
        if (regprofession.test(valueData.profession)) {
            setAlertprofession("");
            setLoading(true);
        } else if (!regprofession.test(valueData.profession) && valueData.profession === "") {
            setAlertprofession("Please fill profession ");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertprofession("Name should not be in a number ");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        const regnumber = /^[0-9]{10}$/;
        if (regnumber.test(valueData.phone)) {
            setAlertphone("");
            setLoading(true);
        } else if (!regnumber.test(valueData.phone) && valueData.phone === "") {
            setAlertphone("Please enter your mobile Number");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertphone("Mobile number should be 10 digits (no letters and spaces allowed).");
            //   e.preventDefault();
            setLoading(false);
            return;
        }


        const regemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regemail.test(valueData.email)) {
            setAlertemail("");
            setLoading(true);
        } else if (valueData.email === "") {
            setAlertemail("Please enter email-id");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else if (!regemail.test(valueData.email)) {
            setAlertemail("Email-id is not valid");
            //   e.preventDefault();
            setLoading(false);
            return;
        }


        const regstate = /^[a-zA-Z\s]+$/;
        if (regstate.test(valueData.state)) {
            setAlertstate("");
            setLoading(true);
        } else if (!regstate.test(valueData.state) && valueData.state === "") {
            setAlertstate("Select your state");
            //   e.preventDefault();
            setLoading(false);
            return;
        }


        const regdistrict = /^[a-zA-Z\s]+$/;
        if (regdistrict.test(valueData.district)) {
            setAlertdestrict("");
            setLoading(true);
        } else if (!regdistrict.test(valueData.district) && valueData.district === "") {
            setAlertdestrict("Select district");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        axios.post('https://shopee-firm.000webhostapp.com/api/client/add-client.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate('/client-master')
                console.log('Client info Submitted Successfully')
            })
            .catch(err => console.log(err));
    };


 
    useEffect(() => {
        axios.get('https://shopee-firm.000webhostapp.com/api/firm/get-firm.php')
          .then(res => {
            const migratefirmname = res.data.map(firm=> firm.firm_name)
            setGetfirmnames(migratefirmname)
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          });
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setValueData({ ...valueData, [name]: value });
        if (name === 'client_photo' || name === 'adhaar_photo'  || name === 'pan_photo'  || name === 'voter_id_photo'  || name === 'license_photo' || name === 'ration_photo' || name === 'other_photo' ) {
            setValueData({
                ...valueData,
                [name]: e.target.files[0]
            });
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/client-master'>Client Master</Link> / <Link className='t-theme-color'>Add Client Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-12 pt-1 pb-4'>
                            <div className='col-md-4'>
                                 <label className='text-sm font-w-500 p-2'>Add Client Profile Picture</label>
                                <input type='file' className='form-control' name='client_photo' onChange={handleChange} />
                            </div>
                               
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Add Aadhar Card</label>
                                <input type='file' className='form-control' name='adhaar_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.adhaar} name='adhaar' placeholder='Please enter aadhar card number' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Add Pan Card</label>
                                <input type='file' className='form-control' name='pan_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.pan} name='pan' placeholder='Please enter PAN card number' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Add Voter-id</label>
                                <input type='file' className='form-control' name='voter_id_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.voter_id} name='voter_id' placeholder='Please enter voter-id' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500    p-2'>Add License</label>
                                <input type='file' className='form-control' name='license_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.license} name='license' placeholder='Please enter license number' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Add Ration Card </label>
                                <input type='file' className='form-control' name='ration_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.ration} name='ration' placeholder='Please enter ration card number' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Add Other Document</label>
                                <input type='file' className='form-control' name='other_photo' onChange={handleChange} />

                                         
                                <input type='text' className='form-control' value={valueData.other} name='other' placeholder='Please enter other document' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Client Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter name' onChange={handleChange} />

                                <p className='warning'>{alertname}</p>
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Profession</label>
                                <input type='text' className='form-control' value={valueData.profession} name='profession' placeholder='Please enter client profession' onChange={handleChange} />

                                <p className='warning'>{alertprofession}</p>
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />

                                <p className='warning'>{alertphone}</p>
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Alternate mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone' placeholder='Please enter alternate mobile no. (Optional)' onChange={handleChange} />
                                {/* <p className='warning'>{alertaltphone}</p> */}


                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Email ID</label>
                                <input type='text' className='form-control' value={valueData.email} name='email' placeholder='Please enter email-id' onChange={handleChange} />

                                <p className='warning'>{alertemail}</p>
                            </div>

                            {/* <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Category</label>
                                <input type='text' className='form-control' value={valueData.category} name='category' placeholder='Please enter category' onChange={handleChange} />
                            </div> */}

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select Category</label>
                                <select className='form-control' value={valueData.category} name='category' onChange={handleChange}>
                                <option value="">Select client category </option>
                                    {getfirmnames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter D O B</label>
                                <input type='date' className='form-control' value={valueData.dob} name='dob' placeholder='Please enter date of birth' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Reference</label>
                                <input type='text' className='form-control' value={valueData.reference} name='reference' placeholder='Please enter reference' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Pin Code</label>
                                <input type='text' className='form-control' value={valueData.pin} name='pin' placeholder='Please enter pin code' onChange={handleChange} />
                            </div>

                            {/* <div className='col-md-4 py-1' style={{display:"none"}}>
                                <label className='text-sm font-w-500 p-2'>Enter Country</label>
                                <CountrySelect
                                    onChange={(e) => {
                                        setCountryid(e.id);
                                    }}
                                    placeHolder={countryname}
                                    value={countryid}
                                />
                            </div> */}

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select State</label>

                                <StateSelect
                                    countryid={countryid}
                                    onChange={(e) => {
                                        setstateid(e.id);
                                        console.log("Selected state:", e);
                                        setValueData({
                                            ...valueData,
                                            state: e.name // Assuming e.id contains the state value
                                        });
                                    }}
                                    placeHolder="Select State"
                                    value={valueData.state}

                                />
                                <p className='warning'>{alertstate}</p>




                                {/* <input type='text' className='form-control' value={valueData.state} name='state' placeholder='Please enter state' onChange={handleChange} /> */}

                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select District</label>

                                <CitySelect
                                    countryid={countryid}
                                    stateid={stateid}
                                    onChange={(e) => {
                                        console.log("Selected city:", e);
                                        setValueData({
                                            ...valueData,
                                            district: e.name // Assuming e.id contains the city value
                                        });
                                    }}
                                    placeHolder="Select district"
                                    value={valueData.district}

                                />
                                <p className='warning'>{alertdestrict}</p>


                                {/* <input type='text' className='form-control' value={valueData.district} name='district' placeholder='Please enter City' onChange={handleChange} /> */}

                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Taluka</label>
                                <input type='text' className='form-control' value={valueData.taluk} name='taluk' placeholder='Please enter Taluka' onChange={handleChange} />
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

export default Add_Client_Master

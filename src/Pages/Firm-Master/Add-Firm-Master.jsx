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

const Add_Firm_Master = () => {

    const [countryid, setCountryid] = useState(0);
const [logoimg, setLogoimg] = useState(null)
const [ownerimg, setOwnerimg] = useState(null)
const [signimg, setSignimg] = useState(null)
    const [stateid, setstateid] = useState(0);
    const [loading, setLoading] = useState(false);
    const [getFirmMobilenumber, setGetFirmMobilenumber] = useState([])
    const navigate = useNavigate();

    const [alertname, setAlertname] = useState();
    const [alertowner, setAlertowner] = useState();
    const [alertphone, setAlertphone] = useState();
    const [alertemail, setAlertemail] = useState();
    const [alertstate, setAlertstate] = useState();
    const [alertdestrict, setAlertdestrict] = useState();


    useEffect(() => {
        // Set default country to India after the component mounts
        const defaultCountry = { id: 101, name: "India" };
        setCountryid(defaultCountry.id);
    
    }, []);

    useEffect(() => {
        axios.get('https://shopee-firm.000webhostapp.com/api/firm/get-firm.php')
          .then(res => {
            const migratephone = res.data.map(firm=> firm.phone)
            setGetFirmMobilenumber(migratephone)
            console.log(migratephone)
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          });
      }, []);

    const [valueData, setValueData] = useState({
        firm_name: '',
        owner_name: '',
        phone: '',
        alt_phone: '',
        email: '',
        business_type: '',
        business_category: '',
        address: '',
        state: '',
        district: '',
        taluk: '',
        pin: '',
        logo: null,
        owner_image: null,
        sign: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('firm_name', valueData.firm_name);
        formData.append('owner_name', valueData.owner_name);
        formData.append('phone', valueData.phone);
        formData.append('alt_phone', valueData.alt_phone);
        formData.append('email', valueData.email);
        formData.append('business_type', valueData.business_type);
        formData.append('business_category', valueData.business_category);
        formData.append('address', valueData.address);
        formData.append('state', valueData.state);
        formData.append('district', valueData.district);
        formData.append('taluk', valueData.taluk);
        formData.append('pin', valueData.pin);
        formData.append('logo', valueData.logo);
        formData.append('owner_image', valueData.owner_image);
        formData.append('sign', valueData.sign);


        const regname = /^[a-zA-Z\s]+$/;
        if (regname.test(valueData.firm_name)) {
            setAlertname("");
            setLoading(true);
        } else if (!regname.test(valueData.firm_name) && valueData.firm_name === "") {
            setAlertname("Please fill your firm name");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertname("Name should not be in a number");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        const regnameowner = /^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$/;
        if (regnameowner.test(valueData.owner_name)) {
            setAlertowner("");
            setLoading(true);
        } else if (!regnameowner.test(valueData.owner_name) && valueData.owner_name === "") {
            setAlertowner("Please fill owner name");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertowner("Name should not be in a number ");
            //   e.preventDefault();
            setLoading(false);
            return;
        }
        
        if (getFirmMobilenumber.includes(valueData.phone)) {
            setAlertphone("This mobile number already exists. Please enter a different mobile number.");
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

        axios.post('https://shopee-firm.000webhostapp.com/api/firm/add-firm.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate('/firm-master')
                console.log('Form Submitted Successfully')
            })
            .catch(err => console.log(err));
    };




    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === 'logo' || name === 'owner_image' || name === 'sign') {
    //         setValueData({
    //             ...valueData,
    //             [name]: e.target.files[0]
    //         });
    //     } else {
    //         setValueData({
    //             ...valueData,
    //             [name]: value
    //         });
    //     }


    // if we want to display images preview
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }else {
    //     setValueData({
    //         ...valueData,
    //         [name]: value
    //     });
    // }

    // };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'logo' || name === 'owner_image' || name === 'sign') {
            const file = e.target.files && e.target.files[0]; // Check if e.target.files exists
            if (file) {
                setValueData({
                    ...valueData,
                    [name]: file
                });
    
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Update the corresponding state variable based on the uploaded file name
                    if (name === 'logo') {
                        setLogoimg(reader.result);
                    } else if (name === 'owner_image') {
                        setOwnerimg(reader.result);
                    } else if (name === 'sign') {
                        setSignimg(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                setValueData({
                    ...valueData,
                    [name]: null
                });
    
                // Reset the corresponding image state variable to null
                if (name === 'logo') {
                    setLogoimg(null);
                } else if (name === 'owner_image') {
                    setOwnerimg(null);
                } else if (name === 'sign') {
                    setSignimg(null);
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/firm-master'>Firm Master</Link> / <Link className='t-theme-color'>Add Firm Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Logo</label>
                                <div className='img-format mb-1'>
                                    <img src={logoimg} alt='' />
                                </div>
                                <input type='file' className='form-control' name='logo' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Owner Photo</label>
                                <div className='img-format mb-1'>
                                    <img src={ownerimg} alt='' />
                                </div>
                                <input type='file' className='form-control' name='owner_image' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Owner Sign</label>
                                <div className='img-format mb-1'>
                                    <img src={signimg} alt='' />
                                </div>
                                <input type='file' className='form-control' name='sign' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Firm Name</label>
                                <input type='text' className='form-control' value={valueData.firm_name} name='firm_name' placeholder='Please enter name' onChange={handleChange} />

                                <p className='warning'>{alertname}</p>
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Owner Name</label>
                                <input type='text' className='form-control' value={valueData.owner_name} name='owner_name' placeholder='Please enter owner name' onChange={handleChange} />

                                <p className='warning'>{alertowner}</p>
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

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Type</label>
                                <input type='text' className='form-control' value={valueData.business_type} name='business_type' placeholder='Please enter business type' onChange={handleChange} />
                            </div>

                            {/* <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select Business Type</label>
                                <select className='form-control' value={valueData.business_type} name='business_type' onChange={handleChange}>
                                    <option value="">Please select business type</option>
                                    <option value="type1">Type 1</option>
                                    <option value="type2">Type 2</option>
                                    <option value="type3">Type 3</option>

                                </select>
                            </div> */}

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Category</label>
                                <input type='text' className='form-control' value={valueData.business_category} name='business_category' placeholder='Please enter business category' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Office Address</label>
                                <input type='text' className='form-control' value={valueData.address} name='address' placeholder='Please enter office address' onChange={handleChange} />
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

export default Add_Firm_Master

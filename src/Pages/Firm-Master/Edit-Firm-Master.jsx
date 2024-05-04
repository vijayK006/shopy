import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city/dist/cjs/index.js";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from 'axios';
import { AiFillPicture } from "react-icons/ai";


const Edit_Firm_Master = () => {
    const { id } = useParams();

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);

    const [getFirmMobilenumber, setGetFirmMobilenumber] = useState([])
    const [alertphone, setAlertphone] = useState();

    const [alertname, setAlertname] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        // Set default country to India after the component mounts
        const defaultCountry = { id: 101, name: "India" };
        setCountryid(defaultCountry.id);
    }, []);


    useEffect(() => {
        axios.get('https://shopee-firm.000webhostapp.com/api/firm/get-firm.php')
            .then(res => {
                const migratephone = res.data.map(firm => firm.phone)
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


    useEffect(() => {
        axios.get(`https://shopee-firm.000webhostapp.com/api/firm/get-by-id-firm.php?id=${id}`)
            .then(response => {

                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    firm_name: firmData.firm_name,
                    owner_name: firmData.owner_name,
                    phone: firmData.phone,
                    alt_phone: firmData.alt_phone,
                    email: firmData.email,
                    business_type: firmData.business_type,
                    business_category: firmData.business_category,
                    address: firmData.address,
                    state: firmData.state,
                    district: firmData.district,
                    taluk: firmData.taluk,
                    pin: firmData.pin,
                    // Assuming these are the correct keys for logo, owner_image, and sign
                    logo: firmData.logo,
                    owner_image: firmData.owner_image,
                    sign: firmData.sign
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

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


        const reglName = /^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$/;
        if (reglName.test(valueData.firm_name)) {
            setAlertname("");
        } else if (!reglName.test(valueData.firm_name) && valueData.firm_name === "") {
            setAlertname("Please fill you last name");
            //   e.preventDefault();
            return;
        } else {
            setAlertname("Name should not be in a number ");
            //   e.preventDefault();
            return;
        }



        const confirmDelete = window.confirm("Are you sure you want to update this Firm Master");
        if (confirmDelete) {
            axios.post(`https://shopee-firm.000webhostapp.com/api/firm/edit-by-id-firm.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Form Updated Successfully')
                    navigate('/firm-master')
                })
                .catch(err => console.log(err));

        }

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
    // };


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'logo' || name === 'owner_image' || name === 'sign') {
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/firm-master'>Firm Master</Link> / <Link className='t-theme-color'>Edit Firm Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Business Logo</label>
                                <div className='img-format mb-1 main-field'>
                                    <img src={`https://shopee-firm.000webhostapp.com/api/firm/${valueData.logo}`} alt='' id="logo-preview" />
                                    <label for='logo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div>
                                <input type='file' className='form-control d-none' id='logo' name='logo' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'/>
                            <div className='col-md-4 py-1'/>
                            
                          

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Firm Name</label>
                                <input type='text' className='form-control' value={valueData.firm_name} name='firm_name' placeholder='Please enter name' onChange={handleChange} />

                                <p className='warning'>{alertname}</p>
                            </div>


                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Owner Name</label>
                                <input type='text' className='form-control' value={valueData.owner_name} name='owner_name' placeholder='Please enter owner name' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />

                                <p className='warning'>{alertphone}</p>

                            </div>


                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Alternate mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone' placeholder='Please enter alternate mobile no. (Optional)' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Email ID</label>
                                <input type='email' className='form-control' value={valueData.email} name='email' placeholder='Please enter email-id' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Business Type</label>
                                <input type='text' className='form-control' value={valueData.business_type} name='business_type' placeholder='Please enter email-id' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Business Category</label>
                                <input type='text' className='form-control' value={valueData.business_category} name='business_category' placeholder='Please enter business category' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Office Address</label>
                                <input type='text' className='form-control' value={valueData.address} name='address' placeholder='Please enter office address' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Pin Code</label>
                                <input type='text' className='form-control' value={valueData.pin} name='pin' placeholder='Please enter pin code' onChange={handleChange} />
                            </div>



                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> State</label>
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
                                    placeHolder={valueData.state}
                                    value={valueData.state}
                                />
                                {/* <input type='text' className='form-control' value={valueData.state} name='state' placeholder='Please enter state' onChange={handleChange} /> */}

                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> district</label>
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
                                    placeHolder={valueData.district}
                                    value={valueData.district}
                                />
                                {/* <input type='text' className='form-control' value={valueData.district} name='district' placeholder='Please enter City' onChange={handleChange} /> */}

                            </div>

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'> Taluka</label>
                                <input type='text' className='form-control' value={valueData.taluk} name='taluk' placeholder='Please enter Taluka' onChange={handleChange} />
                            </div>

                            <hr />

                            <div className='col-md-4 py-2'>
                                <label className='text-sm font-w-500 p-2'>Business Owner Photo</label>


                                <input type='file' className='form-control' id='owner_image' name='owner_image' onChange={handleChange} />

                                <div className='d-flex align-items-center justify-content-start gap-2 pt-1'>
                                    <label for='owner_image' className='file-data text-center' style={{ width: "100px" }}>Upload</label>

                                    <a href={`https://shopee-firm.000webhostapp.com/api/firm/${valueData.owner_image}`} style={{ width: "100px" }} className='file-data-outline text-center' target='_blank' rel="noreferrer">View </a>
                                </div>

                            </div>

                            <div className='col-md-4 py-2'>
                            <label className='text-sm font-w-500 p-2'> Business Owner Sign</label>

                            <input type='file' className='form-control' id='sign' name='sign' onChange={handleChange} />

                                <div className='d-flex align-items-center justify-content-start gap-2 pt-1'>
                                    <label for='sign' className='file-data text-center' style={{ width: "100px" }}>Upload</label>

                                    <a href={`https://shopee-firm.000webhostapp.com/api/firm/${valueData.sign}`} style={{ width: "100px" }} className='file-data-outline text-center' target='_blank' rel="noreferrer">View </a>
                                </div>

                            </div>


                            <div className='d-flex justify-content-end pt-4'>
                                <button type='submit' className='btn btn-bg-orange ' style={{ width: "200px" }} >Update</button>
                            </div>

                        </div>



                    </form>

                </div>
            </div>
        </>
    )
}

export default Edit_Firm_Master

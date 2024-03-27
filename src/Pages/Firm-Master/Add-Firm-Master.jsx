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
    const [stateid, setstateid] = useState(0);
    const navigate = useNavigate();

    const [alertname, setAlertname] = useState();

    useEffect(() => {
        // Set default country to India after the component mounts
        const defaultCountry = { id: 101, name: "India" };
        setCountryid(defaultCountry.id);
    }, []);

    const [valueData, setValueData] = useState({
        firm_name:'',
        owner_name:'',
        phone:'',
        alt_phone:'',
        email:'',
        business_type:'',
        business_category:'',
        address:'',
        state:'',
        district:'',
        taluk:'',
        pin:'',
        logo:null,
        owner_image:null,
        sign:null
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'logo' || name === 'owner_image' || name === 'sign') {
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

                <div className='container-fluid'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-5'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Logo</label>
                                <input type='file' className='form-control' name='logo' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Owner Photo</label>
                                <input type='file' className='form-control' name='owner_image' onChange={handleChange}/>
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Owner Sign</label>
                                <input type='file' className='form-control' name='sign' onChange={handleChange}/>
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Firm Name</label>
                                <input type='text' className='form-control' value={valueData.firm_name} name='firm_name' placeholder='Please enter name' onChange={handleChange} />

                                <p className='warning'>{alertname}</p>
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Owner Name</label>
                                <input type='text' className='form-control' value={valueData.owner_name} name='owner_name' placeholder='Please enter owner name' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Alternate mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone'  placeholder='Please enter alternate mobile no. (Optional)' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Email ID</label>
                                <input type='email' className='form-control' value={valueData.email} name='email'  placeholder='Please enter email-id' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Type</label>
                                <input type='text' className='form-control' value={valueData.business_type} name='business_type'  placeholder='Please enter business type' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Business Category</label>
                                <input type='text' className='form-control' value={valueData.business_category} name='business_category'  placeholder='Please enter business category' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Office Address</label>
                                <input type='text' className='form-control' value={valueData.address} name='address'  placeholder='Please enter office address' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Pin Code</label>
                                <input type='text' className='form-control' value={valueData.pin} name='pin'  placeholder='Please enter pin code' onChange={handleChange} />
                            </div>

                            {/* <div className='col-md-4 py-1' style={{ display: "none" }}>
                                <label className='text-sm font-w-500 p-2'>Enter Country</label>
                                <CountrySelect
                                    onChange={(e) => {
                                        setCountryid(e.id);
                                    }}
                                    placeHolder="Select Country"
                                    value={countryid}
                                />
                            </div> */}

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter State</label>
                                {/* <StateSelect
                                    countryid={countryid}
                                    onChange={(e) => {
                                        setstateid(e.id);
                                    }}
                                    placeHolder="Select State"
                                /> */}
                                <input type='text' className='form-control' value={valueData.state} name='state'  placeholder='Please enter state' onChange={handleChange} />

                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter district</label>
                                {/* <CitySelect
                                    countryid={countryid}
                                    stateid={stateid}
                                    onChange={(e) => {
                                        console.log(e);
                                    }}
                                    placeHolder="Select City"
                                /> */}
                                <input type='text' className='form-control' value={valueData.district} name='district'  placeholder='Please enter City' onChange={handleChange} />

                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Enter Taluka</label>
                                <input type='text' className='form-control' value={valueData.taluk} name='taluk'  placeholder='Please enter Taluka' onChange={handleChange}/>
                            </div>

                            <div className='d-flex justify-content-end pt-4'>
                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Submit</button>
                            </div>

                        </div>



                    </form>

                </div>
            </div>
        </>
    )
}

export default Add_Firm_Master

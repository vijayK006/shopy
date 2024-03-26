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

const View_Firm_Master = () => {
    const { id } = useParams();
    const [owner_image, setOwnerimg] = useState();
    const [logo, setLogoimg] = useState();
    const [sign, setSignimg] = useState();
    const [firm_name, setFirmName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [alt_phone, setAltmobileno] = useState('');
    const [business_category, setBusinesscat] = useState('');
    const [business_type, setBusinesstype] = useState('');
    const [date, setDob] = useState('');
    const [district, setDistrict] = useState('');
    const [email, setEmail] = useState('');
    const [owner_name, setOwnername] = useState('');
    const [pin, setPin] = useState('');
    const [state, setState] = useState('');
    const [taluka, setTaluka] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`https://shopee-firm.000webhostapp.com/api/firm/get-by-id-firm.php?id=${id}`)

            .then(res => {
                console.log(res.data)
                setFirmName(res.data[0].firm_name)
                setOwnerimg(res.data[0].owner_image)
                setLogoimg(res.data[0].logo)
                setSignimg(res.data[0].sign)
                setAddress(res.data[0].address)
                setPhone(res.data[0].phone)
                setAltmobileno(res.data[0].alt_phone)
                setBusinesscat(res.data[0].business_category)
                setBusinesstype(res.data[0].business_type)
                setDob(res.data[0].date)
                setDistrict(res.data[0].district)
                setEmail(res.data[0].email)
                setOwnername(res.data[0].owner_name)
                setPin(res.data[0].pin)
                setState(res.data[0].state)
                setTaluka(res.data[0].taluk)

            })
            .catch(err => console.log(err))
    }, [id])

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);

    useEffect(() => {
        // Set default country to India after the component mounts
        const defaultCountry = { id: 101, name: "India" };
        setCountryid(defaultCountry.id);
    }, []);


    const Update = (e) => {
        e.preventDefault();
        axios.post(`https://shopee-firm.000webhostapp.com/api/firm/edit-by-id-firm.php?id=${id}`, {
            firm_name,
            address,
            phone,
            alt_phone,
            business_category,
            business_type,
            date,
            district,
            email,
            owner_name,
            pin,
            state,
            taluka,
            owner_image,
            logo,
            sign,
        })
            .then(result => {
                console.log(result.data)
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>

                <div className='container-fluid'>
                    <div className='shadow p-3'>
                        <p className='margin-0'><Link to='/'>Dashboard Home</Link> - <Link to='/firm-master'>Firm Master</Link> - <Link>View Firm Details</Link></p>
                    </div>
                    <form className='mt-5 pt-5' onSubmit={Update}>
                        <div className='row shadow p-3 mt-5'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Business Logo</label>
                                <div className='img-format'>
                                    <img src={`https://shopee-firm.000webhostapp.com/api/firm/${logo}`} alt='' />
                                </div>
                                <input type='file' className='form-control' />
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Business Owner Photo</label>
                                <div className='img-format'>
                                    <img src={`https://shopee-firm.000webhostapp.com/api/firm/${owner_image}`} alt='' />
                                </div>
                                <input type='file' className='form-control' />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Business Owner Sign</label>
                                <div className='img-format'>
                                    <img src={`https://shopee-firm.000webhostapp.com/api/firm/${sign}`} alt='' />
                                </div>
                                <input type='file' className='form-control' />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Firm Name</label>
                                <input type='text' className='form-control' placeholder='Please enter name' value={firm_name} onChange={(e) => setFirmName(e.target.value)} />
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Owner Name</label>
                                <input type='text' className='form-control' placeholder='Please enter owner name' value={owner_name} onChange={(e) => setOwnername(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>DOB</label>
                                <input type='text' className='form-control' placeholder='Please enter date of birth' value={date} onChange={(e) => setDob(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Mobile No.</label>
                                <input type='number' className='form-control' placeholder='Please enter mobile no.' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Alternate mobile No.</label>
                                <input type='number' className='form-control' placeholder='Please enter alternate mobile no. (Optional)' value={alt_phone} onChange={(e) => setAltmobileno(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Email ID</label>
                                <input type='email' className='form-control' placeholder='Please enter email-id' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Business Type</label>
                                <input type='text' className='form-control' placeholder='Please enter email-id' value={business_type} onChange={(e) => setBusinesstype(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Business Category</label>
                                <input type='text' className='form-control' placeholder='Please enter business category' value={business_category} onChange={(e) => setBusinesscat(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Office Address</label>
                                <input type='text' className='form-control' placeholder='Please enter office address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Pin Code</label>
                                <input type='text' className='form-control' placeholder='Please enter pin code' value={pin} onChange={(e) => setPin(e.target.value)} />
                            </div>

                            <div className='col-md-4 py-1' style={{ display: "none" }}>
                                <label className='text-sm font-w-500 p-2'>Country</label>
                                <CountrySelect
                                    onChange={(e) => {
                                        setCountryid(e.id);
                                    }}
                                    placeHolder="Select Country"
                                    value={countryid}
                                />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>State</label>
                                {/* <StateSelect
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id);
          }}
          placeHolder="Select State"
        /> */}

                                <input type='text' className='form-control' placeholder='Please enter State' value={state} onChange={(e) => setState(e.target.value)} />

                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>City</label>
                                {/* <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            console.log(e);
          }}
          placeHolder="Select City"
        /> */}
                                <input type='text' className='form-control' placeholder='Please enter District' value={district} onChange={(e) => setDistrict(e.target.value)} />

                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Taluka</label>
                                <input type='text' className='form-control' placeholder='Please enter Taluka' value={taluka} onChange={(e) => setTaluka(e.target.value)} />
                            </div>

                        </div>

                        <input type='submit' className='btn btn-dark mt-5' value="Update" />
                    </form>

                </div>
            </div>
        </>
    )
}

export default View_Firm_Master

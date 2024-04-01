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

const Edit_Client_Master = () => {
    const { id } = useParams();

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [getfirmnames, setGetfirmnames] = useState([])

    const [alertname, setAlertname] = useState();
    const navigate = useNavigate();

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
        license:'',
        name:'',
        pan:'',
        ration:'',
        reference:'',
        voter_id:'',
        profession:'',

        client_photo: null,
    })


    useEffect(() => {
        axios.get(`https://shopee-firm.000webhostapp.com/api/client/get-client-by-id.php?id=${id}`)
            .then(response => {

                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    address: firmData.address,
                    adhaar: firmData.adhaar,
                    phone: firmData.phone,
                    alt_phone: firmData.alt_phone,
                    email: firmData.email,
                    date: firmData.date,
                    category: firmData.category,
                    state: firmData.state,
                    district: firmData.district,
                    taluk: firmData.taluk,
                    pin: firmData.pin,
                    license: firmData.license,
                    name: firmData.name,
                    pan: firmData.pan,
                    profession: firmData.profession,
                    ration: firmData.ration,
                    reference: firmData.reference,
                    voter_id: firmData.voter_id,

                    // Assuming these are the correct keys for client_photo, owner_image, and sign
                    client_photo: firmData.client_photo,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

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
        
        formData.append('client_photo', valueData.client_photo);
   


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

        const confirmDelete = window.confirm("Are you sure you want to update this Client Master");
        if (confirmDelete) {
            axios.post(`https://shopee-firm.000webhostapp.com/api/client/edit-by-id-client.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Client Updated Successfully')
                    navigate('/client-master')
                })
                .catch(err => console.log(err));

        }

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
        if (name === 'client_photo') {
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/client-master'>Client Master</Link> / <Link className='t-theme-color'>Edit View Firm Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Client Profile Picture</label>
                                <div className='img-format'>
                                    <img src={`https://shopee-firm.000webhostapp.com/api/client/${valueData.client_photo}`} alt='' />
                                </div>
                                <input type='file' className='form-control' name='client_photo' onChange={handleChange} />
                            </div>
                            <div className='col-md-4 py-1'/>
                            <div className='col-md-4 py-1'/>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Client Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter name' onChange={handleChange} />

                                {/* <p className='warning'>{alertname}</p> */}
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Mobile No.</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />
                            </div>


                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Alternate mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone' placeholder='Please enter alternate mobile no. (Optional)' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Email ID</label>
                                <input type='email' className='form-control' value={valueData.email} name='email' placeholder='Please enter email-id' onChange={handleChange} />
                            </div>

                            {/* <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Client Category</label>
                                <input type='text' className='form-control' value={valueData.category} name='category'  placeholder='Please enter email-id' onChange={handleChange} />
                            </div> */}

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Client Category</label>
                                <select className='form-control' value={valueData.category} name='category' onChange={handleChange}>
                                <option value="">Select client category </option>
                                    {getfirmnames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> D O B</label>
                                <input type='text' className='form-control' value={valueData.date} name='date' placeholder='Please enter Date of birth' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Client Address</label>
                                <input type='text' className='form-control' value={valueData.address} name='address' placeholder='Please enter client address' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>PAN Card Number</label>
                                <input type='text' className='form-control' value={valueData.pan} name='pan' placeholder='Please enter client pan number' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Client Profession</label>
                                <input type='text' className='form-control' value={valueData.profession} name='profession' placeholder='Please enter client profession' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Ration Card Number</label>
                                <input type='text' className='form-control' value={valueData.ration} name='ration' placeholder='Please enter client ration' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Aadhaar Card Number</label>
                                <input type='text' className='form-control' value={valueData.adhaar} name='adhaar' placeholder='Please enter adhaar number' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Voter-id</label>
                                <input type='text' className='form-control' value={valueData.voter_id} name='voter_id' placeholder='Please enter client voter_id' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Pin Code</label>
                                <input type='text' className='form-control' value={valueData.pin} name='pin' placeholder='Please enter pin code' onChange={handleChange} />
                            </div>

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>reference</label>
                                <input type='text' className='form-control' value={valueData.reference} name='reference' placeholder='Please enter reference' onChange={handleChange} />
                            </div>

                            {/* <div className='col-md-4 py-1' style={{ display: "none" }}>
                                <label className='text-sm font-w-500 p-2'> Country</label>
                                <CountrySelect
                                    onChange={(e) => {
                                        setCountryid(e.id);
                                    }}
                                    placeHolder="Select Country"
                                    value={countryid}
                                />
                            </div> */}

                            <div className='col-md-4 py-1'>
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

                            <div className='col-md-4 py-1'>
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

                            <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'> Taluka</label>
                                <input type='text' className='form-control' value={valueData.taluk} name='taluk' placeholder='Please enter Taluka' onChange={handleChange} />
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

export default Edit_Client_Master;

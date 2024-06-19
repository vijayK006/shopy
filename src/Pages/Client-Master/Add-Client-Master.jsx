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


const Add_Client_Master = () => {
    const { employeeId } = useParams();
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [loading, setLoading] = useState(false);
    const [getfirmnames, setGetfirmnames] = useState([])
    const navigate = useNavigate();

    const [client_photoImg, setClient_photoimg] = useState(null);
    const [adhaar_photoImg, setAdhaar_photoimg] = useState(null);
    const [pan_photoImg, setPan_photoimg] = useState(null);
    const [voter_id_photoImg, setVoter_id_photoimg] = useState(null);
    const [license_photoImg, setLicense_photoimg] = useState(null);
    const [ration_photoImg, setRation_photoimg] = useState(null);
    const [other_photoImg, setOther_photoimg] = useState(null);

    const [alertname, setAlertname] = useState();
    const [alertphone, setAlertphone] = useState();


    useEffect(() => {
        // Set default country to India after the component mounts
        const defaultCountry = { id: 101, name: "India" };
        setCountryid(defaultCountry.id);

    }, []);

    const [getClientMobilenumber, setGetClientMobilenumber] = useState([])
    useEffect(() => {
        axios.get('https://digitalshopee.online/api/client/get-client.php')
          .then(res => {
            const migratephone = res.data.map(firm=> firm.phone)
            setGetClientMobilenumber(migratephone)
            console.log(migratephone)
          })
          .catch(err => {
            console.error('Error fetching data:', err);
          });
      }, []);

    const [valueData, setValueData] = useState({
        address: '',
        adhaar: '',
        phone: '',
        alt_phone: '',
        email: '',
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
        other: '',
        dob: '',


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

        if (getClientMobilenumber.includes(valueData.phone)) {
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




        axios.post('https://digitalshopee.online/api/client/add-client.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate(`/client-master/${employeeId}`)
                console.log('Client info Submitted Successfully')
            })
            .catch(err => console.log(err));
    };



    useEffect(() => {
        axios.get('https://digitalshopee.online/api/firm/get-firm.php')
            .then(res => {
                const migratefirmname = res.data.map(firm => firm.firm_name)
                setGetfirmnames(migratefirmname)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);


    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setValueData({ ...valueData, [name]: value });
    //     if (name === 'client_photo' || name === 'adhaar_photo'  || name === 'pan_photo'  || name === 'voter_id_photo'  || name === 'license_photo' || name === 'ration_photo' || name === 'other_photo' ) {
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
        if (name === 'client_photo' || name === 'adhaar_photo' || name === 'pan_photo' || name === 'voter_id_photo' || name === 'license_photo' || name === 'ration_photo' || name === 'other_photo') {
            const file = e.target.files && e.target.files[0]; // Check if e.target.files exists
            if (file) {
                setValueData({
                    ...valueData,
                    [name]: file
                });

                const reader = new FileReader();
                reader.onloadend = () => {
                    // Update the corresponding state variable based on the uploaded file name
                    if (name === 'client_photo') {
                        setClient_photoimg(reader.result);
                    } else if (name === 'adhaar_photo') {
                        setAdhaar_photoimg(reader.result);
                    } else if (name === 'pan_photo') {
                        setPan_photoimg(reader.result);
                    } else if (name === 'voter_id_photo') {
                        setVoter_id_photoimg(reader.result);
                    } else if (name === 'license_photo') {
                        setLicense_photoimg(reader.result);
                    } else if (name === 'ration_photo') {
                        setRation_photoimg(reader.result);
                    } else if (name === 'other_photo') {
                        setOther_photoimg(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                setValueData({
                    ...valueData,
                    [name]: null
                });

                // Reset the corresponding image state variable to null
                if (name === 'client_photo') {
                    setClient_photoimg(null);
                } else if (name === 'adhaar_photo') {
                    setAdhaar_photoimg(null);
                } else if (name === 'pan_photo') {
                    setPan_photoimg(null);
                } else if (name === 'voter_id_photo') {
                    setVoter_id_photoimg(null);
                } else if (name === 'license_photo') {
                    setLicense_photoimg(null);
                } else if (name === 'ration_photo') {
                    setRation_photoimg(null);
                } else if (name === 'other_photo') {
                    setOther_photoimg(null);
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
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/client-master/${employeeId}`}>Client Master</Link> / <Link className='t-theme-color'>Add Client Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2 position-relative'> Client Name <span className='manditory'>*</span></label>

                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter name' onChange={handleChange} />

                                <p className='warning'>{alertname}</p>
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> D O B</label>
                                <input type='date' className='form-control' value={valueData.dob} name='dob' placeholder='Please enter date of birth' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2 position-relative'> Mobile No. <span className='manditory'>*</span></label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter mobile no.' onChange={handleChange} />

                                <p className='warning'>{alertphone}</p>
                            </div>


                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Alternate mobile No.</label>
                                <input type='number' className='form-control' value={valueData.alt_phone} name='alt_phone' placeholder='Please enter alternate mobile no. (Optional)' onChange={handleChange} />
                                {/* <p className='warning'>{alertaltphone}</p> */}
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Profession</label>
                                <input type='text' className='form-control' value={valueData.profession} name='profession' placeholder='Please enter client profession' onChange={handleChange} />

                                {/* <p className='warning'>{alertprofession}</p> */}
                            </div>

                           

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Email ID</label>
                                <input type='text' className='form-control' value={valueData.email} name='email' placeholder='Please enter email-id' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Select Category</label>
                                <select className='form-control' value={valueData.category} name='category' onChange={handleChange}>
                                    <option value="">Select client category </option>
                                    {getfirmnames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                           
<div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Reference</label>
                                <input type='text' className='form-control' value={valueData.reference} name='reference' placeholder='Please enter reference' onChange={handleChange} />
                            </div>
                            
                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Addreass</label>
                                <input type='text' className='form-control' value={valueData.address} name='address' placeholder='Please enter address' onChange={handleChange} />
                            </div>

                            

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Pin Code</label>
                                <input type='text' className='form-control' value={valueData.pin} name='pin' placeholder='Please enter pin code' onChange={handleChange} />
                            </div>

                            {/* <div className='col-md-3 py-1' style={{display:"none"}}>
                                <label className='text-sm font-w-500 p-2'> Country</label>
                                <CountrySelect
                                    onChange={(e) => {
                                        setCountryid(e.id);
                                    }}
                                    placeHolder={countryname}
                                    value={countryid}
                                />
                            </div> */}

                            <div className='col-md-3 py-2'>
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
                                {/* <p className='warning'>{alertstate}</p> */}


                                {/* <input type='text' className='form-control' value={valueData.state} name='state' placeholder='Please enter state' onChange={handleChange} /> */}

                            </div>

                            <div className='col-md-3 py-2'>
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
                                {/* <p className='warning'>{alertdestrict}</p> */}


                                {/* <input type='text' className='form-control' value={valueData.district} name='district' placeholder='Please enter City' onChange={handleChange} /> */}

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Taluka</label>
                                <input type='text' className='form-control' value={valueData.taluk} name='taluk' placeholder='Please enter Taluka' onChange={handleChange} />
                            </div>
<hr/>
                            <div className='col-md-12 pt-1 pb-4'>
                                <div className='col-md-3'>
                                    <label className='text-sm font-w-500 p-2'>Client Profile Picture</label>
                                    {/* <div className='img-format mb-1 main-field'>
                                        <img src={client_photoImg} alt='' />
                                        <label for='client_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                    </div> */}

                                    <input type='file' className='form-control' id='client_photo' name='client_photo' onChange={handleChange} />
                                </div>

                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Aadhar Card</label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={adhaar_photoImg} alt='' />
                                    <label for='adhaar_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='adhaar_photo' name='adhaar_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.adhaar} name='adhaar' placeholder='Please enter aadhar card number' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Pan Card</label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={pan_photoImg} alt='' />
                                    <label for='pan_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='pan_photo' name='pan_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.pan} name='pan' placeholder='Please enter PAN card number' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Voter-id</label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={voter_id_photoImg} alt='' />
                                    <label for='voter_id_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='voter_id_photo' name='voter_id_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.voter_id} name='voter_id' placeholder='Please enter voter-id' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500  p-2'> Passport</label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={license_photoImg} alt='' />
                                    <label for='license_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='license_photo' name='license_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.license} name='license' placeholder='Please enter license number' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Ration Card </label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={ration_photoImg} alt='' />
                                    <label for='ration_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='ration_photo' name='ration_photo' onChange={handleChange} />

                                <input type='text' className='form-control' value={valueData.ration} name='ration' placeholder='Please enter ration card number' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Other Document</label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={other_photoImg} alt='' />
                                    <label for='other_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='other_photo' name='other_photo' onChange={handleChange} />

                                <input type='text' className='form-control' 
                                value={valueData.other} 
                                name='other' placeholder='Please enter other document' 
                                onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Other Document(beta)</label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={other_photoImg} alt='' />
                                    <label for='other_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='other_photo' name='other_photo' onChange={handleChange} />


                                <input type='text' className='form-control' 
                                // value={valueData.other} 
                                name='other' placeholder='Please enter other document' 
                                // onChange={handleChange} 
                                />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Other Document(beta)</label>
                                {/* <div className='img-format mb-1 main-field'>
                                    <img src={other_photoImg} alt='' />
                                    <label for='other_photo' className='actionbutton'><AiFillPicture className='icon' /> Add Picture</label>
                                </div> */}
                                <input type='file' className='form-control mb-1' id='other_photo' name='other_photo' onChange={handleChange} />


                                <input type='text' className='form-control' 
                                // value={valueData.other} 
                                name='other' placeholder='Please enter other document' 
                                // onChange={handleChange} 
                                />
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

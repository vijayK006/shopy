import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useParams } from 'react-router-dom'
import {
    CitySelect,
    CountrySelect,
    StateSelect,
  } from "react-country-state-city/dist/cjs/index.js";
  import "react-country-state-city/dist/react-country-state-city.css";
import axios from 'axios';

const View_Firm_Master = () => {
    const {id} = useParams();
const [ownerimage , setOwnerimg] = useState();
const [logoimage , setLogoimg] = useState();
const [signimage , setSignimg] = useState();
const [firmName, setFirmName] = useState();
const [address, setAddress] = useState();
const [mobileno, setMobileno] = useState();
const [altmobileno, setAltmobileno] = useState();
const [businesscat, setBusinesscat] = useState();
const [businesstype, setBusinesstype] = useState();
const [dob, setDob] = useState();
const [district, setDistrict] = useState();
const [email, setEmail] = useState();
const [ownername, setOwnername] = useState();
const [pin, setPin] = useState();
const [state, setState] = useState();
const [taluka, setTaluka] = useState();

    useEffect(()=>{
      axios.get(`https://shopee-firm.000webhostapp.com/api/firm/get-by-id-firm.php?id=${id}`)
     
      .then(res=>{ 
        console.log(res.data)
        setFirmName(res.data[0].firm_name)
        setOwnerimg(res.data[0].owner_image)
        setLogoimg(res.data[0].logo)
        setSignimg(res.data[0].sign)
        setAddress(res.data[0].address)
        setMobileno(res.data[0].phone)
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
      .catch(err=> console.log(err))
    }, [id])

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);

    useEffect(() => {
        // Set default country to India after the component mounts
        const defaultCountry = { id: 101, name: "India" };
        setCountryid(defaultCountry.id);
    }, []);



  return (
    <>
       <Topbar/>
    <Sidebar/>
<div className='main-content' id='mainbody'>

<div className='container-fluid'>
<div className='shadow p-3'>
<p className='margin-0'><Link to='/'>Dashboard Home</Link> - <Link to='/firm-master'>Firm Master</Link> - <Link>View Firm Details</Link></p>
</div>
<div className='row shadow p-3 mt-5'>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Business Logo</label>
    <div className='img-format'>
<img src={`https://shopee-firm.000webhostapp.com/api/firm/${logoimage}`} alt=''/>
    </div>
    <input type='file' className='form-control'/>
</div>


<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Business Owner Photo</label>
    <div className='img-format'>
<img src={`https://shopee-firm.000webhostapp.com/api/firm/${ownerimage}`} alt=''/>
    </div>
    <input type='file' className='form-control'/>
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Business Owner Sign</label>
    <div className='img-format'>
<img src={`https://shopee-firm.000webhostapp.com/api/firm/${signimage}`} alt=''/>
    </div>
    <input type='file' className='form-control'/>
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Firm Name</label>
    <input type='text' className='form-control' placeholder='Please enter name' value={firmName}/>
</div>


<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Owner Name</label>
    <input type='text' className='form-control' placeholder='Please enter owner name' value={ownername} />
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>DOB</label>
    <input type='text' className='form-control' placeholder='Please enter date of birth' value={dob} />
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Mobile No.</label>
    <input type='number' className='form-control' placeholder='Please enter mobile no.' value={mobileno}/>
</div>


<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Alternate mobile No.</label>
    <input type='number' className='form-control' placeholder='Please enter alternate mobile no. (Optional)' value={altmobileno}/>
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Email ID</label>
    <input type='email' className='form-control' placeholder='Please enter email-id' value={email}/>
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Business Type</label>
    <input type='email' className='form-control' placeholder='Please enter email-id' value={businesstype}/>
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Business Category</label>
    <input type='text' className='form-control' placeholder='Please enter business category' value={businesscat}/>
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Office Address</label>
    <input type='text' className='form-control' placeholder='Please enter office address' value={address}/>
</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Pin Code</label>
    <input type='text' className='form-control' placeholder='Please enter pin code' value={pin}/>
</div>

<div className='col-md-4 py-1' style={{display:"none"}}>
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

    <input type='text' className='form-control' placeholder='Please enter State' value={state}/>

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
    <input type='text' className='form-control' placeholder='Please enter District' value={district}/>

</div>

<div className='col-md-4 py-1'>
    <label className='text-sm font-w-500 p-2'>Taluka</label>
    <input type='text' className='form-control' placeholder='Please enter Taluka' value={taluka}/>
</div>

</div>
</div>
</div> 
    </>
  )
}

export default View_Firm_Master

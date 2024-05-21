import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Add_lead_generation = () => {
    const { employeeId } = useParams();

    const[getServiceName, setGetServiceName] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [alertservicecode, setAlertservicecode] = useState();
    const [alertservicename, setAlertservicename] = useState();
    const [alertserviceamount, setAlertserviceamount] = useState();
    const [alertserviceexpense, setAlertserviceexpense] = useState();

    const [valueData, setValueData] = useState({
        name: '',
        phone: '',
        service: '',
        document: '',
        payment: '',
        status: '',
        work_date: '',
        ack_no: '',
        date: '',

    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', valueData.name);
        formData.append('phone', valueData.phone);
        formData.append('service', valueData.service);
        formData.append('document', valueData.document);
        formData.append('payment', valueData.payment);
        formData.append('status', valueData.status);
        formData.append('work_date', valueData.work_date);
        formData.append('ack_no', valueData.ack_no);
        formData.append('date', valueData.date);

      

        // const regnumbercode = /^\d{1,20}$/;
        // if (regnumbercode.test(valueData.code)) {
        //     setAlertservicecode("");
        //     setLoading(true);
        // } else if (!regnumbercode.test(valueData.code) && valueData.code === "") {
        //     setAlertservicecode("Please enter new service code");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // } else {
        //     setAlertservicecode("Service code should not be more then 20 digits");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // }

        // if (getServiceCode.includes(valueData.code)) {
        //     setAlertservicecode("This service code is already exists. Please enter a different service code.");
        //     setLoading(false);
        //     return;
        // }

       
        // if (!valueData.name === "") {
        //     setAlertservicename("");
        //     setLoading(true);
        // } else if (valueData.name === "") {
        //     setAlertservicename("Please fill your service name");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // } 

        // const regnumberamount = /^\d{1,20}$/;
        // if (regnumberamount.test(valueData.amount)) {
        //     setAlertserviceamount("");
        //     setLoading(true);
        // } else if (!regnumberamount.test(valueData.amount) && valueData.amount === "") {
        //     setAlertserviceamount("Please enter your service amount");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // } else {
        //     setAlertserviceamount("Service amount should not be more then 20 digits");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // }

          
       

        // const regnumber = /^\d{1,20}$/;
        // if (regnumber.test(valueData.expense)) {
        //     setAlertserviceexpense("");
        //     setLoading(true);
        // } else if (!regnumber.test(valueData.expense) && valueData.expense === "") {
        //     setAlertserviceexpense("Please enter your service expense");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // } else {
        //     setAlertserviceexpense("Service expense should not be more then 20 digits");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // }

        axios.post('https://digitalshopee.online/api/lead-generation/add-lead.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                // navigate(`/lead-generation/${employeeId}`)
                console.log('Lead generation Submitted Successfully')
            })
            .catch(err => console.log(err));
    };



    useEffect(() => {
        axios.get('https://digitalshopee.online/api/service/get-service.php')
            .then(res => {
                const migrateservicename = res.data.map(service => service.name)
                setGetServiceName(migrateservicename)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueData({ ...valueData, [name]: value });
    };


    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>

                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/lead-generation/${employeeId}`}>Lead Generation</Link> / <Link className='t-theme-color'>Add Lead Generation Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                        <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Lead Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter lead name' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Lead Phone Number</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter lead phone number' onChange={handleChange} />
                            </div>

                            


                        <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select Service</label>
                                <select className='form-control' value={valueData.service} name='service' onChange={handleChange}>
                                    <option value="">Select Service </option>
                                    {getServiceName.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            
                        <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Documents Received</label>
                                <select className='form-control' value={valueData.document} name='document' onChange={handleChange}>
                                    <option value="">Select Document Status </option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No </option>
                                </select>
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Payment</label>
                                <select className='form-control' value={valueData.payment} name='payment' onChange={handleChange}>
                                    <option value="">Select Payment Status </option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No </option>
                                </select>
                            </div>


                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Work Date</label>
                                <input type='date' className='form-control' value={valueData.work_date} name='work_date' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Acknowledge Number</label>
                                <input type='number' className='form-control' value={valueData.ack_no} name='ack_no' placeholder='Please enter acknowledge number' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Date</label>
                                <input type='date' className='form-control' value={valueData.date} name='date' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Status / Remark</label>
                                <input type='text' className='form-control' value={valueData.status} name='status' onChange={handleChange} />
                            </div>

                            <div className='d-flex justify-content-end pt-4'>
                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Submit</button>

                                {/* <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} disabled={loading}>
                                    {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Submit &nbsp; &nbsp;
                                            <div className="spinner-border text-info spinner-border-sm scaleonload"></div>
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button> */}
                            </div>

                        </div>



                    </form>
                </div>



            </div>
        </>
    )
}

export default Add_lead_generation

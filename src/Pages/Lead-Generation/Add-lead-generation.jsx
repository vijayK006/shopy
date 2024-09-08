import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Add_lead_generation = () => {
    const { employeeId } = useParams();

    const [getServiceName, setGetServiceName] = useState([]);
    const [ackNumber, setAckNumber] = useState([])

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [alertleadname, setAlertleadname] = useState();
    const [alertphonenumber, setAlertphonenumber] = useState();
    const [alertservice, setAlertservice] = useState();
    const [alertdocx, setAlertdocx] = useState();
    const [alertpayment, setAlertpayment] = useState();
    const [alertworkdate, setAlertworkdate] = useState();
    const [alertaoknumber, setAlertaoknumber] = useState();

    const [valueData, setValueData] = useState({
        name: '',
        phone: '',
        service: '',
        document: '',
        payment: '',
        status: '',
        work_date: '',
        ack_no: '',
        date: new Date().toISOString().substr(0, 10)

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



        if (!valueData.name === "") {
            setAlertleadname("");
            setLoading(true);
        } else if (valueData.name === "") {
            setAlertleadname("Please fill your lead name");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertleadname("");
            setLoading(true);
        }


        const regnumber = /^[0-9]{10}$/;
        if (regnumber.test(valueData.phone)) {
            setAlertphonenumber("");
            setLoading(true);
        } else if (!regnumber.test(valueData.phone) && valueData.phone === "") {
            setAlertphonenumber("Please enter your mobile Number");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertphonenumber("Mobile number should be 10 digits (no letters and spaces allowed).");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        if (!valueData.service === "") {
            setAlertservice("");
            setLoading(true);
        } else if (valueData.service === "") {
            setAlertservice("Please select service");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertservice("");
            setLoading(true);
        }

        // if (!valueData.document === "") {
        //     setAlertdocx("");
        //     setLoading(true);
        // } else if (valueData.document === "") {
        //     setAlertdocx("Please select document status");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // } else {
        //     setAlertdocx("");
        //     setLoading(true);
        // }

        if (!valueData.payment === "") {
            setAlertpayment("");
            setLoading(true);
        } else if (valueData.payment === "") {
            setAlertpayment("Please select payment status");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertpayment("");
            setLoading(true);
        }

        // if (!valueData.work_date === "") {
        //     setAlertworkdate("");
        //     setLoading(true);
        // } else if (valueData.work_date === "") {
        //     setAlertworkdate("Please select work date");
        //     //   e.preventDefault();
        //     setLoading(false);
        //     return;
        // } else {
        //     setAlertworkdate("");
        //     setLoading(true);
        // }


        // if (valueData.ack_no === "") {
        //     setAlertaoknumber("Please enter new acknowledge number");
        //     setLoading(false);
        //     return;

        // } else {
        //     setAlertaoknumber("");
        //     //   e.preventDefault();
        //     setLoading(true);
        // }


        axios.post('https://digitalshopee.online/api/lead-generation/add-lead.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate(`/lead-generation/${employeeId}`)
                console.log('Lead generation Submitted Successfully')
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get('https://digitalshopee.online/api/lead-generation/get-lead.php')
            .then(res => {
                const migrateAckno = res.data.map(lead => lead.ack_no)
                setAckNumber(migrateAckno)
                console.log(migrateAckno)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);


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
                                <label className='text-sm font-w-500 p-2'>Date</label>
                                <input type='date' className='form-control' value={valueData.date} name='date' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Lead Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter lead name' onChange={handleChange} />

                                <p className='warning'>{alertleadname}</p>
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Phone Number</label>
                                <input type='number' className='form-control' value={valueData.phone} name='phone' placeholder='Please enter lead phone number' onChange={handleChange} />
                                <p className='warning'>{alertphonenumber}</p>

                            </div>




                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select Service</label>
                                <select className='form-control' value={valueData.service} name='service' onChange={handleChange}>
                                    <option value="">Select Service </option>
                                    {getServiceName.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>

                                <p className='warning'>{alertservice}</p>

                            </div>


                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Documents Received</label>
                                <select className='form-control' value={valueData.document} name='document' onChange={handleChange}>
                                    <option value="">Select Document Status </option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No </option>
                                </select>

                                <p className='warning'>{alertdocx}</p>

                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Payment</label>
                                <select className='form-control' value={valueData.payment} name='payment' onChange={handleChange}>
                                    <option value="">Select Payment Status </option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No </option>
                                </select>
                                <p className='warning'>{alertpayment}</p>

                            </div>


                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Work Date</label>
                                <input type='date' className='form-control' value={valueData.work_date} name='work_date' onChange={handleChange} />
                                <p className='warning'>{alertworkdate}</p>

                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Acknowledge Number</label>
                                <input type='text' className='form-control' value={valueData.ack_no} name='ack_no' placeholder='Please enter acknowledge number' onChange={handleChange} />
                                <p className='warning'>{alertaoknumber}</p>

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

import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Edit_Service_Master = () => {
    const { id } = useParams();
    const { employeeId } = useParams();
    const [permissions, setPermissions] = useState({ edit_service: null });
    const role = localStorage.getItem('role');

    const [loading, setLoading] = useState(false);
    const [alertservicecode, setAlertservicecode] = useState();
    const [alertservicename, setAlertservicename] = useState();
    const [alertserviceamount, setAlertserviceamount] = useState();
    const [alertserviceexpense, setAlertserviceexpense] = useState();

    const navigate = useNavigate();


    const [valueData, setValueData] = useState({
        code: '',
        name: '',
        expense: '',
        amount: '',
        documents: '',
    })


    useEffect(() => {
        axios.get(`https://digitalshopee.online/api/service/get-by-id-service.php?id=${id}`)
            .then(response => {

                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    code: firmData.code,
                    name: firmData.name,
                    expense: firmData.expense,
                    amount: firmData.amount,
                    documents: firmData.documents,
                 
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    
    useEffect(() => {
        axios.get(`https://digitalshopee.online/api/employee-permission/get-permission.php?id=${employeeId}`)
          .then(response => {
            setPermissions(response.data[0]);
            console.log(response.data[0]);
          })
          .catch(error => {
            console.error("Error fetching permissions:", error);
          });
      }, [employeeId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('code', valueData.code);
        formData.append('name', valueData.name);
        formData.append('expense', valueData.expense);
        formData.append('amount', valueData.amount);
        formData.append('documents', valueData.documents);



        const regname = /^[a-zA-Z\s]+$/;
        if (regname.test(valueData.name)) {
            setAlertservicename("");
            setLoading(true);
        } else if (!regname.test(valueData.name) && valueData.name === "") {
            setAlertservicename("Please fill your service name");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertservicename("Name should not be in a number");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        const regnumberamount = /^\d{1,20}$/;
        if (regnumberamount.test(valueData.amount)) {
            setAlertserviceamount("");
            setLoading(true);
        } else if (!regnumberamount.test(valueData.amount) && valueData.amount === "") {
            setAlertserviceamount("Please enter your service amount");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertserviceamount("Service amount should not be more then 20 digits");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        const regnumbercode = /^\d{1,20}$/;
        if (regnumbercode.test(valueData.code)) {
            setAlertservicecode("");
            setLoading(true);
        } else if (!regnumbercode.test(valueData.code) && valueData.code === "") {
            setAlertservicecode("Please enter your service code");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertservicecode("Service code should not be more then 20 digits");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        const regnumber = /^\d{1,20}$/;
        if (regnumber.test(valueData.expense)) {
            setAlertserviceexpense("");
            setLoading(true);
        } else if (!regnumber.test(valueData.expense) && valueData.expense === "") {
            setAlertserviceexpense("Please enter your service expense");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertserviceexpense("Service expense should not be more then 20 digits");
            //   e.preventDefault();
            setLoading(false);
            return;
        }
       

        const confirmUpdate = window.confirm("Are you sure you want to update this Service Master");
        if (confirmUpdate) {
            axios.post(`https://digitalshopee.online/api/service/update-by-id-service.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Service Updated Successfully')
                    navigate(`/service-master/${employeeId}`)
                })
                .catch(err => console.log(err));

        }

    };


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueData({   ...valueData,   [name]: value });
    };



    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/service-master/${employeeId}`}>Service Master</Link> / <Link className='t-theme-color'>Edit Service Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                        <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Code</label>
                                <input type='text' className='form-control' value={valueData.code} name='code' placeholder='Please service code' onChange={handleChange} />

                                <p className='warning'>{alertservicecode}</p>
                            </div>


                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter Service name' onChange={handleChange} />

                                <p className='warning'>{alertservicename}</p>
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Amount</label>
                                <input type='number' className='form-control' value={valueData.amount} name='amount' placeholder='Please enter service amount' onChange={handleChange} />
                                <p className='warning'>{alertserviceamount}</p>
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Expense</label>
                                <input type='number' className='form-control' value={valueData.expense} name='expense' placeholder='Please enter expense' onChange={handleChange} />

                                <p className='warning'>{alertserviceexpense}</p>
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Required Documents</label>
                                <input type='text' className='form-control' value={valueData.documents} name='documents' placeholder='Please enter documents' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>


                      
                            {role === 'admin' ? (
                                <div className='d-flex justify-content-end pt-4'>
                                    <button type='submit' className='btn btn-bg-orange ' style={{ width: "200px" }} >
                                    {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Update &nbsp; &nbsp;
                                            <div className="spinner-border text-info spinner-border-sm scaleonload"></div>
                                        </>
                                    ) : (
                                        "Update"
                                    )}
                                    </button>
                                </div>
                            ) : (

                                permissions.edit_service === "yes" && (
                                    <div className='d-flex justify-content-end pt-4'>
                                        <button type='submit' className='btn btn-bg-orange ' style={{ width: "200px" }} >
                                        {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Update &nbsp; &nbsp;
                                            <div className="spinner-border text-info spinner-border-sm scaleonload"></div>
                                        </>
                                    ) : (
                                        "Update"
                                    )}
                                        </button>
                                    </div>
                                )

                            )}

                        </div>



                    </form>

                </div>
            </div>
        </>
    )
}

export default Edit_Service_Master

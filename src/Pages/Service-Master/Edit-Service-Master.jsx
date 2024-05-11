import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Edit_Service_Master = () => {
    const { id } = useParams();

    const navigate = useNavigate();


    const [valueData, setValueData] = useState({
        code: '',
        name: '',
        expense: '',
        amount: '',
        documents: '',
    })


    useEffect(() => {
        axios.get(`https://shopee-firm.000webhostapp.com/api/service/get-by-id-service.php?id=${id}`)
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('code', valueData.code);
        formData.append('name', valueData.name);
        formData.append('expense', valueData.expense);
        formData.append('amount', valueData.amount);
        formData.append('documents', valueData.documents);


        // const reglName = /^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$/;
        // if (reglName.test(valueData.firm_name)) {
        //     setAlertname("");
        // } else if (!reglName.test(valueData.firm_name) && valueData.firm_name === "") {
        //     setAlertname("Please fill you last name");
        //     //   e.preventDefault();
        //     return;
        // } else {
        //     setAlertname("Name should not be in a number ");
        //     //   e.preventDefault();
        //     return;
        // }

       

        const confirmDelete = window.confirm("Are you sure you want to update this Service Master");
        if (confirmDelete) {
            axios.post(`https://shopee-firm.000webhostapp.com/api/service/update-by-id-service.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Service Updated Successfully')
                    navigate('/service-master')
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/service-master'>Service Master</Link> / <Link className='t-theme-color'>Edit Service Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                        <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Code</label>
                                <input type='text' className='form-control' value={valueData.code} name='code' placeholder='Please service code' onChange={handleChange} />

                                {/* <p className='warning'>{alertname}</p> */}
                            </div>


                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter Service name' onChange={handleChange} />

                                {/* <p className='warning'>{alertowner}</p> */}
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Amount</label>
                                <input type='number' className='form-control' value={valueData.amount} name='amount' placeholder='Please enter service amount' onChange={handleChange} />
                                {/* <p className='warning'>{alertaltphone}</p> */}
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Expense</label>
                                <input type='number' className='form-control' value={valueData.expense} name='expense' placeholder='Please enter expense' onChange={handleChange} />

                                {/* <p className='warning'>{alertphone}</p> */}
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Required Documents</label>
                                <input type='text' className='form-control' value={valueData.documents} name='documents' placeholder='Please enter documents' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
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

export default Edit_Service_Master

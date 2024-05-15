import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';

const Add_Expenses_Master = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const [valueData, setValueData] = useState({
        name: '',
        description: '',

    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', valueData.name);
        formData.append('description', valueData.description);


        axios.post('https://digitalshopee.online/api/expense/add-expense.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log('Expense Updated Successfully')
                navigate('/expenses-master')
            })
            .catch(err => console.log(err));
    };




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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/expenses-master'>Expense Master</Link> / <Link className='t-theme-color'>Add Expense Master Details</Link></p>

                    <div className='actions'>
                        <Link to='/expenses-master' className='btn btn-bg-orange btn-sm b-radius-50 '> View Expense List</Link>
                    </div>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                        <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Expenses Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Enter expenses name' onChange={handleChange} />

                                {/* <p className='warning'>{alertname}</p> */}
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Expenses Description</label>
                                <input type='text' className='form-control' value={valueData.description} name='description' placeholder='Enter expenses description' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>




                            <div className='d-flex justify-content-end pt-4'>
                                {/* <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Submit</button> */}

                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} disabled={loading}>
                                    {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Submit &nbsp; &nbsp;
                                            <div className="spinner-border text-warning spinner-border-sm scaleonload"></div>
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

export default Add_Expenses_Master

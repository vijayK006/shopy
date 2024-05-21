import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Edit_Expenese_Master = () => {
    const { id } = useParams();
const deleteid = id;
const { employeeId } = useParams();

console.log(`delete id is ${deleteid}`)

    const navigate = useNavigate();

    const [valueData, setValueData] = useState({
        name: '',
        description: '',
    })



    useEffect(() => {
        axios.get(`https://digitalshopee.online/api/expense/get-by-id-expense.php?id=${id}`)
            .then(response => {

                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    name: firmData.name,
                    description: firmData.description
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', valueData.name);
        formData.append('description', valueData.description);


        const confirmUpdate = window.confirm("Are you sure you want to update this Expense Master");
        if (confirmUpdate) {
            axios.post(`https://digitalshopee.online/api/expense/update-by-id-expense.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Expense Updated Successfully')
                    navigate(`/expenses-master/${employeeId}`)
                })
                .catch(err => console.log(err));

        }

    };


    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Expense Master");
        if (confirmDelete) {
            axios.post(`https://digitalshopee.online/api/expense/delete-by-id-expense.php?id=${deleteid}`)
                .then(res => {
                    navigate('/expenses-master')
                   console.log('deleted successfully')
                })
                .catch(err => {
                    console.error('Error deleting data:', err);
                });
        }
    }

    
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
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/expenses-master/${employeeId}`}>Expenses Master</Link> / <Link className='t-theme-color'>Edit Expenses Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                        <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Expencses Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Enter expencses name' onChange={handleChange} />

                                {/* <p className='warning'>{alertname}</p> */}
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Expencses Description</label>
                                <input type='text' className='form-control' value={valueData.description} name='description' placeholder='Enter expencses description' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>


                      

                            <div className='d-flex justify-content-end pt-4'>
                                <button type='submit' className='btn btn-bg-orange' style={{ width: "150px" }} >Update</button>
                               &nbsp;
                               &nbsp;
                                <button type='button' onClick={()=>handleDelete(deleteid)} className='btn btn-danger' style={{ width: "150px" }} >Delete</button>

                            </div>

                        </div>



                    </form>

                </div>
            </div>
        </>
    )
}

export default Edit_Expenese_Master

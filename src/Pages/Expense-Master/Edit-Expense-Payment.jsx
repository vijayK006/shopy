import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Edit_Expense_Payment = () => {
    const { id } = useParams();
    const { employeeId } = useParams();

    const [getexpensenames, setGetexpensenames] = useState([])
    const [getemployenames, setGetemployenames] = useState([])

    const navigate = useNavigate();

    const [valueData, setValueData] = useState({
        employee_id: '',
        expense_id: '',
        amount: '',
        date: '',
        remark: ''
    })


    useEffect(() => {
        axios.get(`https://digitalshopee.online/api/expense-payment/get-by-id-payment.php?id=${id}`)
            .then(response => {

                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    employee_id: firmData.employee_id,
                    expense_id: firmData.expense_id,
                    amount: firmData.amount,
                    date: firmData.date,
                    remark: firmData.remark,

                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('employee_id', valueData.employee_id);
        formData.append('expense_id', valueData.expense_id);
        formData.append('amount', valueData.amount);
        formData.append('date', valueData.date);
        formData.append('remark', valueData.remark);



        const confirmDelete = window.confirm("Are you sure you want to update this Expense Master");
        if (confirmDelete) {
            axios.post(`https://digitalshopee.online/api/expense-payment/update-payment.php?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Expense Payment Updated Successfully')
                    navigate('/expenses-payment')
                })
                .catch(err => console.log(err));

        }

    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueData({ ...valueData, [name]: value });
    };


    useEffect(() => {
        axios.get('https://digitalshopee.online/api/expense/get-expense.php')
            .then(res => {
                const migrateexpensename = res.data.map(expenses => expenses.name)
                setGetexpensenames(migrateexpensename)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    useEffect(() => {
        axios.get('https://digitalshopee.online/api/employee/get-employee.php')
            .then(res => {
                const migrateemployename = res.data.map(employe => employe.name)
                setGetemployenames(migrateemployename)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);


    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/expenses-payment/${employeeId}`}>Expense Payment</Link> / <Link className='t-theme-color'>EditAdd Expense Payment</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>
        
                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Expense Date</label>
                                <input type='date' className='form-control' value={valueData.date} name='date' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Update Expense</label>
                                <select className='form-control' value={valueData.expense_id} name='expense_id' onChange={handleChange}>
                                    <option value="">Select Expense Category </option>
                                    {getexpensenames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Expense Amount</label>
                                <input type='number' className='form-control' value={valueData.amount} name='amount' placeholder='Please enter expense amount' onChange={handleChange} />
                            </div>


                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Expense Remark</label>
                                <input type='text' className='form-control' value={valueData.remark} name='remark' placeholder='Please enter expense remark' onChange={handleChange} />
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

export default Edit_Expense_Payment

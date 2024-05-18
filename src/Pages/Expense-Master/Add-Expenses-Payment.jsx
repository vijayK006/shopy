import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Add_Expenses_Payment = () => {
  const { employeeId } = useParams();

    const [loading, setLoading] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('employee_id', valueData.employee_id);
        formData.append('expense_id', valueData.expense_id);
        formData.append('amount', valueData.amount);
        formData.append('date', valueData.date);
        formData.append('remark', valueData.remark);


        axios.post('https://digitalshopee.online/api/expense-payment/add-payment.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log('Expense Payment Added Successfully')
                navigate('/expenses-payment')
            })
            .catch(err => console.log(err));
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
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/expenses-payment/${employeeId}`}>Expense Payment</Link> / <Link className='t-theme-color'>Add Expense Payment</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Select Expense Date</label>
                                <input type='date' className='form-control' value={valueData.date} name='date' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Select Expense</label>
                                <select className='form-control' value={valueData.expense_id} name='expense_id' onChange={handleChange}>
                                    <option value="">Select Expense Category </option>
                                    {getexpensenames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Select Employe</label>
                                <select className='form-control' value={valueData.employee_id} name='employee_id' onChange={handleChange}>
                                    <option value="">Select Employe Name</option>
                                    {getemployenames.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div> */}

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Expense Description</label>
                                <input type='text' className='form-control' value={valueData.remark} name='remark' placeholder='Please enter expense description' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Expense Amount</label>
                                <input type='number' className='form-control' value={valueData.amount} name='amount' placeholder='Please enter expense amount' onChange={handleChange} />
                            </div>


                            <div className='d-flex justify-content-end pt-4'>
                                {/* <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Submit</button> */}

                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} disabled={loading}>
                                    {loading ? ( // ConTditional rendering for loading popup
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

export default Add_Expenses_Payment 

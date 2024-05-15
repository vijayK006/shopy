import React, { useEffect, useState } from 'react';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add_Target_Out = () => {
    const navigate = useNavigate();

    const [getempoloyenames, setGetempoloyenames] = useState([]);
    const [getservicenames, setGetservicenames] = useState([]);
    const [serviceAmount, setServiceAmount] = useState();
 
    useEffect(() => {
                axios.get('https://digitalshopee.online/api/employee/get-employee.php')
                    .then(res => {
                        const migrateemploye = res.data.map(employee => employee.name)
                        setGetempoloyenames(migrateemploye)
                    })
                    .catch(err => {
                        console.error('Error fetching data:', err);
                    });
            }, []);


    useEffect(() => {
        axios.get('https://digitalshopee.online/api/service/get-service.php')
            .then(res => {
                const migrateservice = res.data.map(service => ({
                    id: service.id,
                    name: service.name,
                    amount: service.amount
                }));
                setGetservicenames(migrateservice);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const [valueData, setValueData] = useState({
        employee_id: '',
        service_id: '',
        no_of_orders: '',
        amount: '',
        date: '',

    });


  

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        // const totalcal = valueData.no_of_orders * serviceAmount;

        formData.append('employee_id', valueData.employee_id);
        formData.append('service_id', valueData.service_id);
        formData.append('no_of_orders', valueData.no_of_orders);
        formData.append('amount', valueData.amount);
        formData.append('date', valueData.date);    



        axios.post('https://digitalshopee.online/api/target-out/add-target.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate('/target-out')
                console.log('Target Out Submitted Successfully')
            })
            .catch(err => console.log(err));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueData({ ...valueData, [name]: value });

        if (name === 'service_id') {
            const selectedService = getservicenames.find(service => service.name === value);
            if (selectedService) {
                setServiceAmount(selectedService.amount);
            }
        }
    };
    

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/target-out'>Target Out</Link> / <Link className='t-theme-color'>Add Target Out</Link></p>
                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                        <div className='col-md-4 py-1'>
                                <label className='text-sm font-w-500 p-2'>Target From Date</label>
                                <input type='date' className='form-control' value={valueData.date} name='date' placeholder='' onChange={handleChange} />
                            </div>

                        <div className='col-md-4 py-1'>{/* not Connected */}
                                <label className='text-sm font-w-500 p-2'>Target To Date</label>
                                <input type='date' className='form-control' 
                                // value={valueData.date}
                                 name='date' placeholder='' 
                                // onChange={handleChange}
                                 />
                            </div>

                     

                           
                            <div className='col-md-12 py-1 border-bottom'/>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Select Service</label>
                                <select className='form-control' value={valueData.service_id} name='service_id' onChange={handleChange}>
                                    <option value="">Select Service</option>
                                    {getservicenames.map(service => (
                                        <option key={service.id} value={service.name}>{service.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='col-md-3 py-2'>
                                 <label className='text-sm font-w-500 p-2'>Select Employee</label>
                                 <select className='form-control' value={valueData.employee_id} name='employee_id' onChange={handleChange}>
                                     <option value="">Select Employee</option>
                                     {getempoloyenames.map((name, index) => (
                                         <option key={index} value={name}>{name}</option>
                                     ))}
                                 </select>
                                 {/* <p className='warning'>{alertowner}</p> */}
                             </div>
                            

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>No. of Orders</label>
                                <input type='number' className='form-control' value={valueData.no_of_orders} name='no_of_orders' placeholder='Please enter no. of orders' onChange={handleChange} />
                            </div>

                            {/* <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Total Amount</label>
                                <input type='number' className='form-control' 
                                value={valueData.total_amount}
                                 name='total_amount' onChange={handleChange} placeholder={valueData.no_of_orders * serviceAmount} readOnly/>
                            </div> */}

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'>Total Amount</label>
                                <input type='number' className='form-control' 
                                value={valueData.amount}
                                 name='amount' onChange={handleChange} placeholder="0"/>
                            </div>

                            <div className='col-md-6 py-2'>{/* not Connected */}
                                <label className='text-sm font-w-500 p-2'>Target Description</label>
                                <textarea type='text' rows={2} cols={2} className='form-control' value="not connected" name='target-description' placeholder='Target Description not connected' onChange={handleChange} ></textarea>
                            </div>

                            <div className='d-flex justify-content-end pt-4'>
                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Add_Target_Out;


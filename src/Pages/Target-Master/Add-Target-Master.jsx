import React, { useEffect, useState } from 'react';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add_Target_Master = () => {
    const navigate = useNavigate();

    const [getempoloyenames, setGetempoloyenames] = useState([]);
    const [getservicenames, setGetservicenames] = useState([]);
    const [targets, setTargets] = useState([
        {
            employee_id: '',
            service_id: '',
            no_of_orders: '',
            total_amount: '',
            from_date: '2024-10-20',
            to_date: '2024-10-20',
            description: ''
        }
    ]);


    const addTarget = () => {
        setTargets([...targets, {
            employee_id: '',
            service_id: '',
            no_of_orders: '',
            total_amount: '',
            from_date: '2024-10-20',
            to_date: '2024-10-20',
            description: ''
        }]);
    };

    const removeTarget = (index) => {
        const newTargets = [...targets];
        newTargets.splice(index, 1);
        setTargets(newTargets);
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newTargets = [...targets];
        newTargets[index][name] = value;
        setTargets(newTargets);
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Here you can iterate over formDataArray and submit each item in formData format
    //     targets.forEach(formData => {
    //         axios.post('https://digitalshopee.online/api/target/add-target.php', formData,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //         )
    //             .then(res => {
    //                 console.log('Target Submitted Successfully');
    //             })
    //             .catch(err => console.log(err));
    //     });
    //     // navigate('/target-master');
    // };


    const handleSubmit = (e) => {
        e.preventDefault();
      
        const formattedTargets = targets.map(target => ({
          employee_id: target.employee_id,
          service_id: target.service_id,
          no_of_orders: target.no_of_orders,
          total_amount: target.total_amount,
          from_date: target.from_date,
          to_date: target.to_date,
          description: target.description
        }));
      
        axios.post('https://digitalshopee.online/api/target/add-target.php', formattedTargets,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
          .then(response => {
            console.log('Data submitted successfully');
          })
          .catch(error => {
            console.error('Error submitting data:', error);
          });
      };

    useEffect(() => {
        axios.get('https://shopee-firm.000webhostapp.com/api/employee/get-employee.php')
            .then(res => {
                const migrateemploye = res.data.map(employee => employee.name)
                setGetempoloyenames(migrateemploye)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);


    useEffect(() => {
        axios.get('https://shopee-firm.000webhostapp.com/api/service/get-service.php')
            .then(res => {
                const migrateservice = res.data.map(service => service.name)
                setGetservicenames(migrateservice)
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/target-master'>Target Master</Link> / <Link className='t-theme-color'>Add Target Master Details</Link></p>
                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-12 py-1 border-bottom' />
                            {targets.map((target, index) => (
                                <div key={index} className='row shadow p-3 mt-2 bg-white b-radius-10'>


                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Target From Date</label>
                                        <input type='date' className='form-control' value={target.from_date} name='from_date' placeholder='' onChange={(e) => handleChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Target To Date</label>
                                        <input type='date' className='form-control' value={target.to_date} name='to_date' placeholder='' onChange={(e) => handleChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-2'>
                                        <label className='text-sm font-w-500 p-2'>Select Service</label>
                                        <select className='form-control' value={target.service_id} name='service_id' onChange={(e) => handleChange(index, e)}>
                                            <option value="">Select Service</option>
                                            {getservicenames.map((name, index) => (
                                                <option key={index} value={name}>{name}</option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className='col-md-3 py-2'>
                                        <label className='text-sm font-w-500 p-2'>Select Employee</label>
                                        <select className='form-control' value={target.employee_id} name='employee_id' onChange={(e) => handleChange(index, e)}>
                                            <option value="">Select Employee</option>
                                            {getempoloyenames.map((name, index) => (
                                                <option key={index} value={name}>{name}</option>
                                            ))}
                                        </select>
                                        {/* <p className='warning'>{alertowner}</p> */}
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>no_of_orders</label>
                                        <input type='number' className='form-control' value={target.no_of_orders} name='no_of_orders' placeholder='' onChange={(e) => handleChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>total amount</label>
                                        <input type='number' className='form-control' value={target.total_amount} name='total_amount' placeholder='' onChange={(e) => handleChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>description</label>
                                        <input type='text' className='form-control' value={target.description} name='description' placeholder='' onChange={(e) => handleChange(index, e)} />
                                    </div>
                                    <div className='d-flex justify-content-between pt-4'>
                                        <button type='button' className='btn btn-bg-orange' onClick={() => removeTarget(index)}>Remove</button>
                                    </div>
                                </div>

                            ))}


                            <div className='d-flex justify-content-end pt-4'>
                                <button type='button' className='btn btn-bg-orange mr-2' onClick={addTarget}>Add</button>

                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Add_Target_Master;


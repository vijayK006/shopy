// import React, { useEffect, useState } from 'react';
// import Topbar from '../../layouts/Topbar';
// import Sidebar from '../../layouts/Sidebar';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Add_Target_Master = () => {
//     const navigate = useNavigate();

//     const [getempoloyenames, setGetempoloyenames] = useState([]);
//     const [getservicenames, setGetservicenames] = useState([]);
//     const [formDataArray, setFormDataArray] = useState([
//         {
//             employee_id: '',
//             service_id: '',
//             no_of_orders: '',
//             total_amount: '',
//             from_date: '',
//             to_date: '',
//             description: '',
//         }
//     ]);

    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Here you can iterate over formDataArray and submit each item in formData format
//         formDataArray.forEach(formData => {
//             axios.post('https://shopee-firm.000webhostapp.com/api/target/add-target.php', formData)
//                 .then(res => {
//                     console.log('Target Submitted Successfully');
//                 })
//                 .catch(err => console.log(err));
//         });
//         // navigate('/target-master');
//     };

    
//     const handleChange = (index, e) => {
//         const { name, value } = e.target;
//         const newFormDataArray = [...formDataArray];
//         newFormDataArray[index] = { ...newFormDataArray[index], [name]: value };
//         setFormDataArray(newFormDataArray);
//     };

//     const addField = () => {
//         setFormDataArray([...formDataArray, {
//             employee_id: '',
//             service_id: '',
//             no_of_orders: '',
//             total_amount: '',
//             from_date: '',
//             to_date: '',
//             description: '',
//         }]);
//     };

//     const removeField = (index) => {
//         const newFormDataArray = [...formDataArray];
//         newFormDataArray.splice(index, 1);
//         setFormDataArray(newFormDataArray);
//     };

//     useEffect(() => {
//         axios.get('https://shopee-firm.000webhostapp.com/api/employee/get-employee.php')
//             .then(res => {
//                 const migrateemploye = res.data.map(employee => employee.name)
//                 setGetempoloyenames(migrateemploye)
//             })
//             .catch(err => {
//                 console.error('Error fetching data:', err);
//             });
//     }, []);


//     useEffect(() => {
//         axios.get('https://shopee-firm.000webhostapp.com/api/service/get-service.php')
//             .then(res => {
//                 const migrateservice = res.data.map(service => service.name)
//                 setGetservicenames(migrateservice)
//             })
//             .catch(err => {
//                 console.error('Error fetching data:', err);
//             });
//     }, []);


//     return (
//         <>
//             <Topbar />
//             <Sidebar />
//             <div className='main-content' id='mainbody'>
//                 <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
//                     <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/target-master'>Target Master</Link> / <Link className='t-theme-color'>Add Target Master Details</Link></p>
//                 </div>

//                 <div className='container-fluid mb-5'>
//                     <form onSubmit={handleSubmit}>
//                         <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

//                             <div className='col-md-12 py-1 border-bottom' />
//                             {formDataArray.map((formData, index) => (
//                               <div  key={index} className='row shadow p-3 mt-2 bg-white b-radius-10'>

                              
//                         <div className='col-md-3 py-1'>
//                         <label className='text-sm font-w-500 p-2'>Target From Date</label>
//                         <input type='date' className='form-control' value={formData.from_date} name='from_date' placeholder='' onChange={(e) => handleChange(index, e)} />
//                     </div>

//                     <div className='col-md-3 py-1'>
//                     <label className='text-sm font-w-500 p-2'>Target To Date</label>
//                     <input type='date' className='form-control' value={formData.to_date} name='to_date' placeholder='' onChange={(e) => handleChange(index, e)} />
//                 </div>

//                               <div className='col-md-3 py-2'>
//                               <label className='text-sm font-w-500 p-2'>Select Service</label>
//                               <select className='form-control' value={formData.service_id} name='service_id' onChange={(e) => handleChange(index, e)}>
//                                   <option value="">Select Service</option>
//                                   {getservicenames.map((name, index) => (
//                                       <option key={index} value={name}>{name}</option>
//                                   ))}
//                               </select>
//                           </div>

                          
//                           <div className='col-md-3 py-2'>
//                           <label className='text-sm font-w-500 p-2'>Select Employee</label>
//                           <select className='form-control' value={formData.employee_id} name='employee_id' onChange={(e) => handleChange(index, e)}>
//                               <option value="">Select Employee</option>
//                               {getempoloyenames.map((name, index) => (
//                                   <option key={index} value={name}>{name}</option>
//                               ))}
//                           </select>
//                           {/* <p className='warning'>{alertowner}</p> */}
//                       </div>

//                       <div className='col-md-3 py-1'>
//                     <label className='text-sm font-w-500 p-2'>no_of_orders</label>
//                     <input type='number' className='form-control' value={formData.no_of_orders} name='no_of_orders' placeholder='' onChange={(e) => handleChange(index, e)} />
//                 </div>

//                 <div className='col-md-3 py-1'>
//                 <label className='text-sm font-w-500 p-2'>total amount</label>
//                 <input type='number' className='form-control' value={formData.total_amount} name='total_amount' placeholder='' onChange={(e) => handleChange(index, e)} />
//             </div>

//             <div className='col-md-3 py-1'>
//             <label className='text-sm font-w-500 p-2'>description</label>
//             <input type='text' className='form-control' value={formData.description} name='description' placeholder='' onChange={(e) => handleChange(index, e)} />
//         </div>
//                               <div className='d-flex justify-content-between pt-4'>
//                                     <button type='button' className='btn btn-bg-orange' onClick={() => removeField(index)}>Remove</button>
//                                 </div>
// </div>

//                             ))}
                           



                       

//                             <div className='d-flex justify-content-end pt-4'>
//                             <button type='button' className='btn btn-bg-orange mr-2' onClick={addField}>Add</button>

//                                 <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }}>Submit</button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Add_Target_Master;


import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';

const Add_Target_Master = () => {

    const navigate = useNavigate();

    const [getempoloyenames, setGetempoloyenames] = useState([])
    const [getservicenames, setGetservicenames] = useState([])
    const [getserviceamount, setGetserviceamount] = useState([])

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

    const [formData, setFormData] = useState({
        employee_id: [''],
        service_id: [''],
        no_of_orders: [''],
        total_amount: [''],
        service_amount: [],
        date: [''],
        // from_date: [''],
        // to_date: [''],
        // description:['']
    });


    const handleAddFields = () => {
        setFormData({
            ...formData,
            employee_id: [...formData.employee_id, ''],
            service_id: [...formData.service_id, ''],
            no_of_orders: [...formData.no_of_orders, ''],
            total_amount: [...formData.total_amount, ''],
            date: [...formData.date, '']
        });
    };

    // const handleChange = (index, e) => {
    //     const { name, value } = e.target;
    //     const newFormData = { ...formData };
    //     newFormData[name][index] = value;
    //     setFormData(newFormData);
    // };

    //1
    const handleChange = async (index, e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData };
        newFormData[name][index] = value;
        setFormData(newFormData);

       
    };



    const handleRemoveFields = (index) => {
        const newFormData = { ...formData };
        Object.keys(newFormData).forEach((key) => {
            newFormData[key].splice(index, 1);
        });
        setFormData(newFormData);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        // setLoading(true);

        const formDatas = new FormData();
        formData.employee_id.forEach(id => formDatas.append('employee_id[]', id));
        formData.service_id.forEach(id => formDatas.append('service_id[]', id));
        formData.no_of_orders.forEach(order => formDatas.append('no_of_orders[]', order));
        formData.total_amount.forEach(amount => formDatas.append('total_amount[]', amount));
        formData.date.forEach(date => formDatas.append('date[]', date));
        formData.date.forEach(date => formDatas.append('date[]', date));
        formData.date.forEach(date => formDatas.append('date[]', date));

        axios.post('https://shopee-firm.000webhostapp.com/api/target/add-target.php', formDatas, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log('Target master uploaded Successfully')
                // navigate('/expenses-master')
            })
            .catch(err => console.log(err));
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



    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>

                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/target-master' >Target Master</Link> / <Link to='' className='t-theme-color'>Add Target Master</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    {formData.employee_id.map((_, index) => (
                        <div key={index}>

                            <input
                                type="date"
                                name="date"
                                value={formData.date[index]}
                                onChange={(e) => handleChange(index, e)}
                            />

                            <select className='' value={formData.employee_id[index]} name='employee_id' onChange={(e) => handleChange(index, e)}>
                                <option value="">Select employee name </option>
                                {getempoloyenames.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>

                            {/* <input
                                type="text"
                                name="service_id"
                                value={formData.service_id[index]}
                                onChange={(e) => handleChange(index, e)}
                                placeholder='Enter service-id'
                            /> */}

<select className='' value={formData.service_id[index]} name='service_id' onChange={(e) => handleChange(index, e)}>
                                <option value="">Select service name </option>
                                {getservicenames.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>

                            <input
                                type="number"
                                name="no_of_orders"
                                value={formData.no_of_orders[index]}
                                onChange={(e) => handleChange(index, e)}
                                placeholder='Enter no of orders'
                            />

                            <input
                                type="text"
                                name="total_amount"
                                value={formData.total_amount[index]}
                                onChange={(e) => handleChange(index, e)}
                                placeholder='Enter total amount'
                            />


                            <button type="button" onClick={() => handleRemoveFields(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddFields}>
                        Add
                    </button>
                    <button type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

            </div>
        </>
    )
}

export default Add_Target_Master

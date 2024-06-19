// import React, { useEffect, useState } from 'react'
// import Topbar from '../../layouts/Topbar'
// import Sidebar from '../../layouts/Sidebar'
// import { Link, useNavigate, useParams } from 'react-router-dom'

// import axios from 'axios';
// import { BiBarcodeReader } from 'react-icons/bi';

// const Add_Service_Master = () => {
//     const { employeeId } = useParams();

//     const[getServiceCode, setGetServiceCode] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const [alertservicecode, setAlertservicecode] = useState();
//     const [alertservicename, setAlertservicename] = useState();
//     const [alertserviceamount, setAlertserviceamount] = useState();
//     const [alertserviceexpense, setAlertserviceexpense] = useState();

//     useEffect(() => {
//         axios.get('https://digitalshopee.online/api/service/get-service.php')
//             .then(res => {
//                 const migrateservicecode = res.data.map(service => service.code)
//                 setGetServiceCode(migrateservicecode)
//                 console.log(migrateservicecode)
//             })
//             .catch(err => {
//                 console.error('Error fetching data:', err);
//             });
//     }, []);

//     const [valueData, setValueData] = useState({
//         code: '',
//         name: '',
//         expense: '',
//         amount: '',
//         documents: '',

//     })

//     const [generated, setGenerated] = useState(false);
//     const generateRandomNumber = () => {
//         // Generate a random number between 100 and 999 (inclusive)
//         const randomNumber = Math.floor(Math.random() * 9000) + 1000;
//         // Update the state with the new random number
//         setValueData((prevState) => ({
//             ...prevState,
//             code: randomNumber
//           }));
//           setGenerated(true); 
//       };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append('code', valueData.code);
//         formData.append('name', valueData.name);
//         formData.append('expense', valueData.expense);
//         formData.append('amount', valueData.amount);
//         formData.append('documents', valueData.documents);

      

//         const regnumbercode = /^\d{1,20}$/;
//         if (regnumbercode.test(valueData.code)) {
//             setAlertservicecode("");
//             setLoading(true);
//         } else if (!regnumbercode.test(valueData.code) && valueData.code === "") {
//             setAlertservicecode("Please generate new service code");
//             //   e.preventDefault();
//             setLoading(false);
//             return;
//         } else {
//             setAlertservicecode("Service code should not be more then 20 digits");
//             //   e.preventDefault();
//             setLoading(false);
//             return;
//         }

//         if (getServiceCode.includes(valueData.code)) {
//             setAlertservicecode("This service code is already exists. Please generate a different service code.");
//             setLoading(false);
//             return;
//         }

       
//         if (!valueData.name === "") {
//             setAlertservicename("");
//             setLoading(true);
//         } else if (valueData.name === "") {
//             setAlertservicename("Please fill your service name");
//             //   e.preventDefault();
//             setLoading(false);
//             return;
//         } 

//         const regnumberamount = /^\d{1,20}$/;
//         if (regnumberamount.test(valueData.amount)) {
//             setAlertserviceamount("");
//             setLoading(true);
//         } else if (!regnumberamount.test(valueData.amount) && valueData.amount === "") {
//             setAlertserviceamount("Please enter your service amount");
//             //   e.preventDefault();
//             setLoading(false);
//             return;
//         } else {
//             setAlertserviceamount("Service amount should not be more then 20 digits");
//             //   e.preventDefault();
//             setLoading(false);
//             return;
//         }

          
       

//         const regnumber = /^\d{1,20}$/;
//         if (regnumber.test(valueData.expense)) {
//             setAlertserviceexpense("");
//             setLoading(true);
//         } else if (!regnumber.test(valueData.expense) && valueData.expense === "") {
//             setAlertserviceexpense("Please enter your service expense");
//             //   e.preventDefault();
//             setLoading(false);
//             return;
//         } else {
//             setAlertserviceexpense("");
//             //   e.preventDefault();
//             setLoading(true);
//             return;
//         }

//         axios.post('https://digitalshopee.online/api/service/add-service.php', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })
//             .then(res => {
//                 navigate(`/service-master/${employeeId}`)
//                 console.log('Service Submitted Successfully')
//             })
//             .catch(err => console.log(err));
//     };




//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setValueData({ ...valueData, [name]: value });

//     //     setValueData((prevState) => ({
//     //         ...prevState,
//     //         [name]: value,
//     //       }));
//     // };


//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setGenerated(false);
//         setValueData((prevState) => ({
//           ...prevState,
//           [name]: value
//         }));
//       };

//     return (
//         <>
//             <Topbar />
//             <Sidebar />
//             <div className='main-content' id='mainbody'>

//                 <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
//                     <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/service-master/${employeeId}`}>Service Master</Link> / <Link className='t-theme-color'>Add Service Master Details</Link></p>

//                 </div>

//                 <div className='container-fluid mb-5'>
//                     <form onSubmit={handleSubmit}>
//                         <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

//                             <div className='col-md-3 py-2'>
//                                 <label className='text-sm font-w-500 p-2'> Service Code</label>

//                                 <div className='d-flex align-items-center gap-2'>
//                                 <button onClick={generateRandomNumber} className='gen-button'><BiBarcodeReader /></button>
//                                 <input  type='number' className='form-control' value={valueData.code} name='code' placeholder='Please service code' onChange={handleChange} />
//                                 </div>
                                
//                                 <p className='warning'>{alertservicecode}</p>
//                             </div>


//                             <div className='col-md-3 py-2'>
//                                 <label className='text-sm font-w-500 p-2'> Service Name</label>
//                                 <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter Service name' onChange={handleChange} />

//                                 <p className='warning'>{alertservicename}</p>
//                             </div>

//                             <div className='col-md-3 py-2'>
//                                 <label className='text-sm font-w-500 p-2'> Service Amount</label>
//                                 <input type='number' className='form-control' value={valueData.amount} name='amount' placeholder='Please enter service amount' onChange={handleChange} />
//                                 <p className='warning'>{alertserviceamount}</p>
//                             </div>

//                             <div className='col-md-3 py-2'>
//                                 <label className='text-sm font-w-500 p-2'> Service Expense</label>
//                                 <input type='text' className='form-control' value={valueData.expense} name='expense' placeholder='Please enter expense' onChange={handleChange} />

//                                 <p className='warning'>{alertserviceexpense}</p>
//                             </div>


//                             <div className='col-md-3 py-2'>
//                                 <label className='text-sm font-w-500 p-2'> Required Documents</label>
//                                 <input type='text' className='form-control' value={valueData.documents} name='documents' placeholder='Please enter documents' onChange={handleChange} />

//                                 {/* <p className='warning'>{alertemail}</p> */}
//                             </div>



//                             <div className='d-flex justify-content-end pt-4'>
//                                 {/* <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Submit</button> */}

//                                 <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} disabled={loading}>
//                                     {loading ? ( // Conditional rendering for loading popup
//                                         <>
//                                             Submit &nbsp; &nbsp;
//                                             <div className="spinner-border text-info spinner-border-sm scaleonload"></div>
//                                         </>
//                                     ) : (
//                                         "Submit"
//                                     )}
//                                 </button>
//                             </div>

//                         </div>



//                     </form>
//                 </div>



//             </div>
//         </>
//     )
// }

// export default Add_Service_Master

import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar'
import Sidebar from '../../layouts/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios';

const Add_Service_Master = () => {
    const { employeeId } = useParams();

    const[getServiceCode, setGetServiceCode] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [alertservicecode, setAlertservicecode] = useState();
    const [alertservicename, setAlertservicename] = useState();
    const [alertserviceamount, setAlertserviceamount] = useState();
    const [alertserviceexpense, setAlertserviceexpense] = useState();


    useEffect(() => {
        axios.get('https://digitalshopee.online/api/service/get-service.php')
            .then(res => {
                const migrateservicecode = res.data.map(service => service.code)
                setGetServiceCode(migrateservicecode)
                console.log(migrateservicecode)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const [valueData, setValueData] = useState({
        code: '',
        name: '',
        expense: '',
        amount: '',
        documents: '',

    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('code', valueData.code);
        formData.append('name', valueData.name);
        formData.append('expense', valueData.expense);
        formData.append('amount', valueData.amount);
        formData.append('documents', valueData.documents);

      

        const regnumbercode = /^\d{1,20}$/;
        if (regnumbercode.test(valueData.code)) {
            setAlertservicecode("");
            setLoading(true);
        } else if (!regnumbercode.test(valueData.code) && valueData.code === "") {
            setAlertservicecode("Please enter new service code");
            //   e.preventDefault();
            setLoading(false);
            return;
        } else {
            setAlertservicecode("Service code should not be more then 20 digits");
            //   e.preventDefault();
            setLoading(false);
            return;
        }

        if (getServiceCode.includes(valueData.code)) {
            setAlertservicecode("This service code is already exists. Please enter a different service code.");
            setLoading(false);
            return;
        }

       
        if (!valueData.name === "") {
            setAlertservicename("");
            setLoading(true);
        } else if (valueData.name === "") {
            setAlertservicename("Please fill your service name");
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
            setAlertserviceexpense("");
            //   e.preventDefault();
            setLoading(true);
            return;
        }

        axios.post('https://digitalshopee.online/api/service/add-service.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate(`/service-master/${employeeId}`)
                console.log('Service Submitted Successfully')
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
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/service-master/${employeeId}`}>Service Master</Link> / <Link className='t-theme-color'>Add Service Master Details</Link></p>

                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'> Service Code</label>
                                <input type='number' className='form-control' value={valueData.code} name='code' placeholder='Please service code' onChange={handleChange} />

                                <p className='warning'>{alertservicecode}</p>
                            </div>


                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Service Name</label>
                                <input type='text' className='form-control' value={valueData.name} name='name' placeholder='Please enter Service name' onChange={handleChange} />

                                <p className='warning'>{alertservicename}</p>
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Service Amount</label>
                                <input type='number' className='form-control' value={valueData.amount} name='amount' placeholder='Please enter service amount' onChange={handleChange} />
                                <p className='warning'>{alertserviceamount}</p>
                            </div>

                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Service Expense</label>
                                <input type='number' className='form-control' value={valueData.expense} name='expense' placeholder='Please enter expense' onChange={handleChange} />

                                <p className='warning'>{alertserviceexpense}</p>
                            </div>


                            <div className='col-md-3 py-2'>
                                <label className='text-sm font-w-500 p-2'> Required Documents</label>
                                <input type='text' className='form-control' value={valueData.documents} name='documents' placeholder='Please enter documents' onChange={handleChange} />

                                {/* <p className='warning'>{alertemail}</p> */}
                            </div>



                            <div className='d-flex justify-content-end pt-4'>
                                {/* <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} >Submit</button> */}

                                <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }} disabled={loading}>
                                    {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Submit &nbsp; &nbsp;
                                            <div className="spinner-border text-info spinner-border-sm scaleonload"></div>
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

export default Add_Service_Master
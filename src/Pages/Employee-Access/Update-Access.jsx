import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import axios from 'axios';
import { CiCircleCheck } from "react-icons/ci";


const Update_Access = () => {
    const [getemployenames, setGetemployenames] = useState([]);
    const [loading, setLoading] = useState(false);

    const [valueData, setValueData] = useState({
        employee_id: '',

        add_firm: 'no',
        view_firm: 'no',
        edit_firm: 'no',
        delete_firm: 'no',

        add_client: 'no',
        view_client: 'no',
        edit_client: 'no',
        delete_client: 'no',

        add_service: 'no',
        view_service: 'no',
        edit_service: 'no',
        delete_service: 'no',

        add_expense: 'no',
        view_expense: 'no',
        edit_expense: 'no',
        delete_expense:'no'
    });
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

    useEffect(() => {
        if (selectedEmployeeId) {
            axios.get(`https://digitalshopee.online/api/employee-permission/get-permission.php?id=${selectedEmployeeId}`)
            .then(response => {
                console.log(response.data);
                    const firmData = response.data[0];// Assuming response.data contains the firm data
                    console.log(firmData.view_service)
                    setValueData({
                        employee_id: firmData.employee_id,
    
                        add_firm: firmData.add_firm,
                        view_firm: firmData.view_firm,
                        edit_firm: firmData.edit_firm,
                        delete_firm: firmData.delete_firm,
    
                        add_client: firmData.add_client,
                        view_client: firmData.view_client,
                        edit_client: firmData.edit_client,
                        delete_client: firmData.delete_client,
    
                        add_service: firmData.add_service,
                        view_service: firmData.view_service,
                        edit_service: firmData.edit_service,
                        delete_service: firmData.delete_service,
    
                        add_expense: firmData.add_expense,
                        view_expense: firmData.view_expense,
                        edit_expense: firmData.edit_expense,
                        delete_expense: firmData.delete_expense
                     
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedEmployeeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);   

        const formData = new FormData();

        formData.append('employee_id', valueData.employee_id);

        formData.append('add_firm', valueData.add_firm);
        formData.append('view_firm', valueData.view_firm);
        formData.append('edit_firm', valueData.edit_firm);
        formData.append('delete_firm', valueData.delete_firm);

        formData.append('add_client', valueData.add_client);
        formData.append('view_client', valueData.view_client);
        formData.append('edit_client', valueData.edit_client);
        formData.append('delete_client', valueData.delete_client);

        formData.append('add_service', valueData.add_service);
        formData.append('view_service', valueData.view_service);
        formData.append('edit_service', valueData.edit_service);
        formData.append('delete_service', valueData.delete_service);

        formData.append('add_expense', valueData.add_expense);
        formData.append('view_expense', valueData.view_expense);
        formData.append('edit_expense', valueData.edit_expense);
        formData.append('delete_expense', valueData.delete_expense);


        const confirmUpdate = window.confirm("Are you sure you want to update this Employee Access");
        if (confirmUpdate) {
            setLoading(true);
            axios.post(`https://digitalshopee.online/api/employee-permission/update-permission.php?id=${selectedEmployeeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log('Employee Access Updated Successfully')
                    const alert = document.getElementById('alert');
                    alert.classList.add('open-alert')
                    setLoading(true);
                    setTimeout(() => {
                    alert.classList.remove('open-alert')
            setLoading(false);
                        
                    }, 2000);
                })
                .catch(err => console.log(err));

        }

    };

const handleChange = (e) => {
    const { name, value, checked } = e.target;

    // If the target element is a checkbox, update its state
    if (e.target.type === 'checkbox') {
        setValueData(prevState => ({
            ...prevState,
            [name]: checked ? 'yes' : 'no'
        }));
    } else {
        // If the target element is a select input, update the employee_id state
        if (name === 'employee_id') {
            setSelectedEmployeeId(value); // Update selected employee ID
        }
        setValueData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
};

    
    useEffect(() => {
        axios.get('https://digitalshopee.online/api/employee/get-employee.php')
            .then(res => {
                const migrateemployename = res.data.map(employee => ({
                    id: employee.id,
                    name: employee.name
                }));
                setGetemployenames(migrateemployename);
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
                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='' className='t-theme-color'>Employee Update Access</Link></p>

                </div>
                <div className='shadow p-5 b-radius-10 bg-white'>
                <form onSubmit={handleSubmit}>
                {/* <form> */}
                    <div className='col-md-4 py-2'>
                        <label className='text-sm font-w-500 p-2'>Select Employe</label>
                        <select className='form-control' value={selectedEmployeeId} name='employee_id' onChange={handleChange}>
                            <option value="">Select Employe Name</option>
                            {getemployenames.map((employee, index) => (
                                <option key={index} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-md-4 py-2' />
                    <div className='col-md-4 py-2' />

  {selectedEmployeeId && (
<>
                    <div className='col-md-12 py-3'>
                        <p>Firm Master</p>
                        <div className='row'>

                        <div className='col-md-2'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="add_firm" name="add_firm" value={valueData.add_firm} onChange={handleChange} checked={valueData.add_firm === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Add</label>
                                </div>
                            </div>                           

                            <div className='col-md-2'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="view_firm" name="view_firm" value={valueData.view_firm} onChange={handleChange} checked={valueData.view_firm === 'yes'} />
                                    <label className="form-check-label" htmlFor="firmview">View</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="edit_firm" name="edit_firm" value={valueData.edit_firm} onChange={handleChange} checked={valueData.edit_firm === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmedit">Edit</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="delete_firm" name="delete_firm" value={valueData.delete_firm} onChange={handleChange} checked={valueData.delete_firm === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmdelete">Delete</label>
                                </div>
                            </div>
                     
                        </div>
                    </div>
                    <div className='col-md-12 py-3'>
                        <p>Client Master</p>
                        <div className='row'>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="add_client" name="add_client" value={valueData.add_client
                                    } onChange={handleChange} checked={valueData.add_client === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Add</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="view_client" name="view_client" value={valueData.view_client
                                    } onChange={handleChange} checked={valueData.view_client === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">View</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="edit_client" name="edit_client" value={valueData.edit_client
                                    } onChange={handleChange} checked={valueData.edit_client === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Edit</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="delete_client" name="delete_client" value={valueData.delete_client
                                    } onChange={handleChange} checked={valueData.delete_client === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Delete</label>
                                </div>
                            </div>
                          
                        </div>
                    </div>

                    <div className='col-md-12 py-3'>
                        <p>Service Master</p>
                        <div className='row'>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="add_service" name="add_service" value={valueData.add_service} onChange={handleChange} checked={valueData.add_service === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Add</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="view_service" name="view_service" value={valueData.view_service} onChange={handleChange} checked={valueData.view_service === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">View</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="edit_service" name="edit_service" value={valueData.edit_service } onChange={handleChange} checked={valueData.edit_service === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Edit</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="delete_service" name="delete_service" value={valueData.delete_service} onChange={handleChange} checked={valueData.delete_service === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Delete</label>
                                </div>
                            </div>
                          
                        </div>
                    </div>

                    <div className='col-md-12 py-3 d-none'>
                        <p>Expense Master</p>
                        <div className='row'>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="add_expense" name="add_expense" value={valueData.add_expense} onChange={handleChange} checked={valueData.add_expense === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Add</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="view_expense" name="view_expense" value={valueData.view_expense} onChange={handleChange} checked={valueData.view_expense === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">View</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="edit_expense" name="edit_expense" value={valueData.edit_expense } onChange={handleChange} checked={valueData.edit_expense === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Edit</label>
                                </div>
                            </div>

                            <div className='col-md-2'>
                            <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="delete_expense" name="delete_expense" value={valueData.delete_expense} onChange={handleChange} checked={valueData.delete_expense === 'yes'}/>
                                    <label className="form-check-label" htmlFor="firmview">Delete</label>
                                </div>
                            </div>
                          
                        </div>
                    </div>

                  
                           <button type='submit' className='btn btn-bg-orange mt-5' style={{ width: "200px" }} disabled={loading}>
                    {loading ? ( // Conditional rendering for loading popup
                                        <>
                                            Update &nbsp; &nbsp;
                                            <div className="spinner-border text-info spinner-border-sm scaleonload"></div>
                                        </>
                                    ) : (
                                        "Update"
                                    )}
                    </button>
                    </>
                    )}
                 
                </form>
                    

                </div>
            </div>

            <div className='success-alert' id='alert'>
                <div className='message'>
                <div className='d-flex justify-content-center'>
                    <CiCircleCheck  className='icon'/>
                </div>
                    <p className='pt-3'>Employee Access Added Successfully</p>
                </div>
            </div>
        </>
    );
};

export default Update_Access;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../layouts/Topbar';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';

const Access = () => {
    const [getemployenames, setGetemployenames] = useState([]);
    const [valueData, setValueData] = useState({
        employee_id: '',
        firmfullaccess: false,
        firmview: false,
        firmedit: false,
        firmdelete: false,
        clientfullaccess: false,
        clientview: false,
        clientedit: false,
        clientdelete: false
    });

    useEffect(() => {
        axios.get('https://shopee-firm.000webhostapp.com/api/employee/get-employee.php')
            .then(res => {
                const migrateemployename = res.data.map(employe => employe.name);
                setGetemployenames(migrateemployename);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueData({ ...valueData, [name]: e.target.checked ? 'yes' : 'no' });
        console.log(`${name} changed to ${e.target.checked ? 'yes' : 'no'}`);
    };

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='' className='t-theme-color'>Employee Access</Link></p>
                </div>
                <div className='shadow p-5 b-radius-10 bg-white'>
                    <div className='col-md-4 py-2'>
                        <label className='text-sm font-w-500 p-2'>Select Employe</label>
                        <select className='form-control' value={valueData.employee_id} name='employee_id' onChange={handleChange}>
                            <option value="">Select Employe Name</option>
                            {getemployenames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-md-4 py-2' />
                    <div className='col-md-4 py-2' />
                    <div className='col-md-12 py-3'>
                        <p>Firm Master</p>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="firmfullaccess" name="firmfullaccess" value={valueData.firmfullaccess} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="firmfullaccess">Full Access</label>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="firmview" name="firmview" value={valueData.firmview} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="firmview">Full View</label>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="firmedit" name="firmedit" value={valueData.firmedit} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="firmedit">View / Edit</label>
                                </div>
                            </div>

                            <div className='col-md-3'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="firmdelete" name="firmdelete" value={valueData.firmdelete} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="firmdelete">Full Delete</label>
                                </div>
                            </div>
                     
                        </div>
                    </div>
                    <div className='col-md-12 py-3'>
                        <p>Client Master</p>
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="clientfullaccess" name="clientfullaccess" value={valueData.clientfullaccess} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="clientfullaccess">Full Access</label>
                                </div>
                            </div>
                            {/* Add other checkboxes for client */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Access;

import React, { useEffect, useState } from 'react';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit_bill = () => {
    const { id, employeeId } = useParams();
    const role = localStorage.getItem('role');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [serviceOptions, setServiceOptions] = useState([]);


    const [valueData, setValueData] = useState({
        id: '',
        client_id: '',
        date: '',
        receipt: '',
        ack_no: '',
        remark_1: '',
        total: '',
        items: [
            { service_code: '', service_name: '', quantity: '', amount: '', remark: '' }
        ]
    });



    const [getClientName, setGetClientName] = useState([]);
    useEffect(() => {
        axios.get('https://digitalshopee.online/api/client/get-client.php')
            .then(res => {
                // const migrateclientname = res.data.map(client => client.name)
                const migrateClientName = res.data.map(client => client.name).sort((a, b) => a.localeCompare(b));
                setGetClientName(migrateClientName)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    useEffect(() => {
        // Fetch the bill data
        axios.get(`https://digitalshopee.online/api/bill/get-id-bill.php?id=${id}`)
            .then(response => {
                const firmData = response.data[0]; // Assuming response.data contains the firm data
                setValueData({
                    id: firmData.id,
                    client_id: firmData.client_id,
                    date: firmData.date,
                    receipt: firmData.receipt,
                    ack_no: firmData.ack_no,
                    remark_1: firmData.remark_1,
                    total: firmData.total,
                    items: firmData.items || [{ service_code: '', service_name: '', quantity: '', amount: '', remark: '' }]
                });
            })
            .catch(error => {
                console.log(error);
            });

        // Fetch service options for the select tag
        axios.get('https://digitalshopee.online/api/service/get-service.php') // Assuming this endpoint returns the service options
            .then(response => {
                setServiceOptions(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const confirmUpdate = window.confirm("Are you sure you want to update this Bill generation?");
        if (confirmUpdate) {
            axios.put(`https://digitalshopee.online/api/bill/edit-bill.php`, valueData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log('Bill Updated Successfully');
                    navigate(`/bill-generation/${employeeId}`);
                })
                .catch(err => console.log(err));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, index, key] = name.split('-');

        if (field === 'item') {
            const items = [...valueData.items];
            if (key === 'service_name') {
                const selectedService = serviceOptions.find(option => option.name === value);
                if (selectedService) {
                    items[index].service_code = selectedService.code;
                }
            }
            items[index][key] = value;
            setValueData({ ...valueData, items });
        } else {
            setValueData({ ...valueData, [name]: value });
        }
    };

    const addItem = () => {
        setValueData({
            ...valueData,
            items: [...valueData.items, { service_code: '', service_name: '', quantity: '', amount: '', remark: '' }]
        });
    };

    const removeItem = (index) => {
        const items = [...valueData.items];
        items.splice(index, 1);
        setValueData({ ...valueData, items });
    };

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/bill-generation/${employeeId}`}>Bills</Link> / <Link className='t-theme-color'>Edit Bill</Link></p>
                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row shadow p-3 mt-2 bg-white b-radius-10'>

                            <div className='col-md-3 py-1 d-none'>
                                <label className='text-sm font-w-500 p-2'>id</label>
                                <input type='text' className='form-control' value={valueData.id} name='id' placeholder='' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select Client</label>

                                <select className='form-control' value={valueData.client_id} name='client_id' onChange={handleChange}>
                                    <option value="">Select Service </option>
                                    {getClientName.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Date</label>
                                <input type='date' className='form-control' value={valueData.date} name='date' placeholder='' onChange={handleChange} />
                            </div>
                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Receipt</label>
                                <input type='text' className='form-control' value={valueData.receipt} name='receipt' placeholder='' onChange={handleChange} />
                            </div>
                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Acknowledge Number</label>
                                <input type='text' className='form-control' value={valueData.ack_no} name='ack_no' placeholder='' onChange={handleChange} />
                            </div>
                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Remark</label>
                                <input type='text' className='form-control' value={valueData.remark_1} name='remark_1' placeholder='' onChange={handleChange} />
                            </div>

                            <hr />

                            {valueData.items.map((item, index) => (
                                <div key={index} className='row shadow p-3 mt-2 bg-white b-radius-10'>
                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Service Name</label>
                                        <select
                                            className='form-control'
                                            value={item.service_name}
                                            name={`item-${index}-service_name`}
                                            onChange={handleChange}
                                        >
                                            <option value=''>Select Service Name</option>
                                            {serviceOptions.map((option, idx) => (
                                                <option key={idx} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Service Code</label>
                                        <input type='text' className='form-control' value={item.service_code} name={`item-${index}-service_code`} placeholder='' readOnly />
                                    </div>
                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Quantity</label>
                                        <input type='number' className='form-control' value={item.quantity} name={`item-${index}-quantity`} placeholder='' onChange={handleChange} />
                                    </div>
                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Amount</label>
                                        <input type='number' className='form-control' value={item.amount} name={`item-${index}-amount`} placeholder='' onChange={handleChange} />
                                    </div>
                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Remark</label>
                                        <input type='text' className='form-control' value={item.remark} name={`item-${index}-remark`} placeholder='' onChange={handleChange} />
                                    </div>
                                    <div className='col-md-2 py-1 d-flex align-items-end'>
                                        <button type='button' className='btn btn-danger btn-sm' onClick={() => removeItem(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}

                            <div className='d-flex justify-content-between pt-4'>
                                <input type='text' className='btn-outline-theme' value={valueData.total} name='totalamount' placeholder='Total Amount' onChange={handleChange} readOnly />

                                <div className='d-flex gap-3'>
                                    <button type='button' className='btn btn-bg-orange' onClick={addItem}>Add Item</button>
                                    <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }}>Submit</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit_bill;


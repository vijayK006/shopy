import React, { useEffect, useState } from 'react';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit_Sales = () => {
    const { id, employeeId } = useParams();
    const role = localStorage.getItem('role');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [serviceOptions, setServiceOptions] = useState([]);
    const [clientDetails, setClientDetails] = useState(null); // New state for client details
    const [storedClientId, setstoredClientId] = useState();

    const [valueData, setValueData] = useState({
        client_id: '',
        date: new Date().toISOString().substr(0, 10),
        total: 0,
        items: [
            {
                sale_date: '',
                service_code: '',
                service_name: '',
                quantity: '',
                amount: '',
                remark: '',
                discount: '',
                paid_status: '',
                paid_type: '',
                paid_amount: ''
            }
        ]
    });



    const [getClientName, setGetClientName] = useState([]);
    useEffect(() => {
        axios.get('https://digitalshopee.online/api/client/get-client.php')
            .then(res => {
                const migrateClientName = res.data
                    .map(client => ({
                        id: client.id,
                        name: client.name
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setGetClientName(migrateClientName)

            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    useEffect(() => {
        // Fetch the bill data
        axios.get(`https://digitalshopee.online/api/sales/get-id-sales.php?id=${id}`)
            .then(response => {
                const firmData = response.data[0];
                const clientId = response.data[0].client_id;
                setstoredClientId(clientId)
                console.log(clientId) // Assuming response.data contains the firm data
                setValueData({
                    id: firmData.id,
                    client_id: firmData.client_id,
                    client_name: firmData.client_name,
                    client_phone: firmData.client_phone,
                    date: firmData.date,
                    total: firmData.total,

                    items: firmData.items || [{
                        sale_date: '',
                        service_code: '',
                        service_name: '',
                        quantity: '',
                        amount: '',
                        remark: '',
                        discount: '',
                        paid_status: '',
                        paid_type: '',
                        paid_amount: ''
                    }]
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

        const confirmUpdate = window.confirm("Are you sure you want to update this sales manager?");
        if (confirmUpdate) {
            axios.put(`https://digitalshopee.online/api/sales/edit-sales.php`, valueData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log('Sales Updated Successfully');
                    navigate(`/sales-manager/${employeeId}`);
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
            // calculateTotalAmount();

        } else {
            setValueData({ ...valueData, [name]: value });
        }

        if (name === 'client_id') {
            fetchClientData(value);
        } else {
            setClientDetails(null);
        }
    };



    const fetchClientData = (clientId) => {
        axios.get(`https://digitalshopee.online/api/client/get-client-by-id.php?id=${clientId}`)
            .then(response => {
                setClientDetails(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching client details:', error);
            });


    };

    useEffect(() => {
        if (storedClientId) {
            axios.get(`https://digitalshopee.online/api/client/get-client-by-id.php?id=${storedClientId}`)
                .then(response => {
                    setClientDetails(response.data[0]);
                })
                .catch(error => {
                    console.error('Error fetching client details:', error);
                });
        }
    }, [storedClientId])

    const addItem = () => {
        setValueData({
            ...valueData,
            items: [...valueData.items, {
                sale_date: '',
                service_code: '',
                service_name: '',
                quantity: '',
                amount: '',
                remark: '',
                discount: '',
                paid_status: '',
                paid_type: '',
                paid_amount: ''
            }]
        });
    };

    const removeItem = (index) => {
        const items = [...valueData.items];
        items.splice(index, 1);
        setValueData({ ...valueData, items });
    };

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        valueData.items.forEach(item => {
            totalAmount += parseFloat(item.amount) || 0;
        });
        // setValueData({ ...valueData, total: totalAmount }); // Update totalamount in formData
        setValueData(prevFormData => ({ ...prevFormData, total: totalAmount }));

    };




    const calculatePaidAmount = () => {
        let paidAmount = 0;
        valueData.items.forEach(item => {
            paidAmount += parseFloat(item.paid_amount) || 0;
        });
        setValueData(prevFormData => ({ ...prevFormData, paid: paidAmount }));
    };

    const calculatePendingAmount = () => {
        let pendingAmount = 0;
        valueData.items.forEach(item => {
            pendingAmount += (parseFloat(item.amount) - parseFloat(item.paid_amount)) || 0;
        });
        setValueData(prevFormData => ({ ...prevFormData, pending: pendingAmount }));
    };

    useEffect(() => {
        calculateTotalAmount();
        calculatePaidAmount()
        calculatePendingAmount()
    }, [valueData.items]);

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/sales-manager/${employeeId}`}>Sales Manager</Link> / <Link className='t-theme-color'>Edit Sales</Link></p>
                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row border p-3 mt-5 bg-white b-radius-10'>

                            <div className='col-md-3 py-1 d-none'>
                                <label className='text-sm font-w-500 p-2'>id</label>
                                <input type='text' className='form-control' value={valueData.id} name='id' placeholder='' onChange={handleChange} />
                            </div>

                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Select Client</label>

                                <select className='form-control' value={valueData.client_id} name='client_id' onChange={handleChange}>
                                    <option value="">Select Client </option>
                                    {getClientName.map((clients, index) => (
                                        <option key={index} value={clients.id}>{clients.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-md-3 py-1'>
                                <label className='text-sm font-w-500 p-2'>Date</label>
                                <input type='date' className='form-control' value={valueData.date} name='date' placeholder='' onChange={handleChange} />
                            </div>

                            </div>

                            {clientDetails && (
                                <div className='row border p-3 mt-2 bg-white b-radius-10'>
                                    <h5 className='text-sm font-w-500 p-2'>Client Details</h5>

                                    <div className='col-md-3 py-1'>
                                        <p className='mb-4'>Email: {clientDetails.email}</p>
                                        <p className='mb-4'>Phone: {clientDetails.phone}</p>
                                        <p className='mb-4'>Aadhaar No.: {clientDetails.adhaar}</p>
                                        <p className='mb-4'>Category: {clientDetails.category}</p>
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <p className='mb-4'>DOB: {clientDetails.dob}</p>
                                        <p className='mb-4'>Profession: {clientDetails.profession}</p>
                                        <p className='mb-4'>Pan: {clientDetails.pan}</p>
                                        <p className='mb-4'>Voter Id: {clientDetails.voter_id}</p>
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <p className='mb-4'>License: {clientDetails.license}</p>
                                        <p className='mb-4'>Ration: {clientDetails.ration}</p>
                                        <p className='mb-4'>Reference: {clientDetails.reference}</p>
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <p className='mb-4'>Address: {clientDetails.address}</p>
                                        <p className='mb-4'>Taluk: {clientDetails.taluk}</p>
                                        <p className='mb-4'>District: {clientDetails.district}</p>
                                        <p className='mb-4'>State: {clientDetails.state} - {clientDetails.pin}</p>
                                    </div>
                                </div>
                            )}

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

                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Discount</label>
                                        <input type='text' className='form-control' value={item.discount} name={`item-${index}-discount`} placeholder='' onChange={handleChange} />
                                    </div>

                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Payment Type</label>
                                        <select value={item.paid_type} name={`item-${index}-paid_type`} placeholder='' onChange={handleChange} className='form-control'>
                                            <option value=''>Select payment type</option>
                                            <option value='Full Paid'>Full Paid</option>
                                            <option value='Partially Paid'>Partially Paid</option>
                                            <option value='No Paid'>No Paid</option>
                                        </select>
                                    </div>

                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Payment Type</label>
                                        <select value={item.paid_status} name={`item-${index}-paid_status`} placeholder='' onChange={handleChange} className='form-control'>
                                            <option value=''>Select payment Status</option>
                                            <option value='Yes'>Yes</option>
                                            <option value='No'>No</option>
                                        </select>
                                    </div>

                                    <div className='col-md-2 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Paid Amount</label>
                                        <input type='text' className='form-control' value={item.paid_amount} name={`item-${index}-paid_amount`} placeholder='' onChange={handleChange} />
                                    </div>

                                    <div className='col-md-2 py-1 d-flex align-items-end'>
                                        <button type='button' className='btn btn-danger btn-sm' onClick={() => removeItem(index)}>Remove</button>
                                    </div>
                                </div>
                            ))}

                            <div className='d-flex justify-content-between pt-4'>
                                <div className='d-flex gap-2'>
                                    <input type='text' className='btn btn-bg-orange' value={valueData.total} name='totalamount' placeholder='Total Amount' onChange={handleChange} readOnly />
                                    <button type='button' className='btn btn-bg-orange'>Paid Amount : {valueData.paid}</button>
                                    <button type='button' className='btn btn-bg-orange'>Pending Amount : {valueData.pending}</button>
                                </div>
                                <div className='d-flex gap-3'>
                                    <button type='button' className='btn btn-bg-orange' onClick={addItem}>Add Item</button>
                                    <button type='submit' className='btn btn-bg-orange' style={{ width: "200px" }}>Submit</button>
                                </div>

                            </div>
                     
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit_Sales;


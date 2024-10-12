import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Add_sales = () => {
    const navigate = useNavigate();
    const { employeeId } = useParams();

    const [getClientName, setGetClientName] = useState([]);
    const [clientDetails, setClientDetails] = useState(null); // New state for client details

    useEffect(() => {
        axios.get('https://digitalshopee.online/api/client/get-client.php')
            .then(res => {
                const migrateClientName = res.data
                    .map(client => ({ id: client.id, name: client.name }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setGetClientName(migrateClientName);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const [getServiceName, setGetServiceName] = useState([]);
    useEffect(() => {
        axios.get('https://digitalshopee.online/api/service/get-service.php')
            .then(res => {
                const migrateServicename = res.data.sort((a, b) => a.name.localeCompare(b.name));
                setGetServiceName(migrateServicename);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const [formData, setFormData] = useState({
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'client_id') {
            fetchClientData(value);
        } else {
            setClientDetails(null);
        }
    };

    // const handleItemChange = (index, e) => {
    //     const { name, value } = e.target;
    //     const items = [...formData.items];
    //     items[index][name] = value;

    //     if (name === 'service_name') {
    //         const selectedService = getServiceName.find(service => service.name === value);
    //         if (selectedService) {
    //             items[index].amount = selectedService.amount;
    //         } else {
    //             items[index].amount = '';
    //         }
    //     }

    //     if (name === 'quantity') {
    //         const quantity = parseFloat(value) || 0;
    //         const amount = parseFloat(items[index].amount) || 0;
    
    //         // Calculate the total amount based on quantity
    //         items[index].amount = amount * quantity;
    //     }
    
    //     // Update the field's value
    //     items[index][name] = value;

    //     setFormData({ ...formData, items });
    // };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...formData.items];
    
        // Store the service amount when the service is selected
        if (name === 'service_name') {
            const selectedService = getServiceName.find(service => service.name === value);
            if (selectedService) {
                items[index].baseAmount = selectedService.amount; // Store the base amount separately
                items[index].amount = selectedService.amount * (items[index].quantity || 1); // Set amount considering quantity
            } else {
                items[index].baseAmount = 0;
                items[index].amount = 0;
            }
        }
    
        // Handle quantity change and calculate total amount
        if (name === 'quantity') {
            const quantity = parseFloat(value) || 0;
            const baseAmount = parseFloat(items[index].baseAmount) || 0;
    
            // Calculate the total amount based on quantity
            items[index].amount = baseAmount * quantity;
        }
    
        // Update the field's value
        items[index][name] = value;
    
        // Set the updated items back to the state
        setFormData({ ...formData, items });
    };

    
    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, {
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
        const items = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://digitalshopee.online/api/sales/add-sales.php', formData)
            .then(response => {
                console.log('Success:', response.data);
                navigate(`/add-sales/${employeeId}`);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const calculateTotalAmount = () => {
        let totalAmount = 0;
        formData.items.forEach(item => {
            totalAmount += parseFloat(item.amount) || 0;
        });
        setFormData(prevFormData => ({ ...prevFormData, total: `Total Amount :${totalAmount}` }));
    };

    const calculatePaidAmount = () => {
        let paidAmount = 0;
        formData.items.forEach(item => {
            paidAmount += parseFloat(item.paid_amount) || 0;
        });
        setFormData(prevFormData => ({ ...prevFormData, paid: paidAmount }));
    };

    const calculatePendingAmount = () => {
        let pendingAmount = 0;
        formData.items.forEach(item => {
            pendingAmount += (parseFloat(item.amount) - parseFloat(item.paid_amount)) || 0;
        });
        setFormData(prevFormData => ({ ...prevFormData, pending: pendingAmount }));
    };

    useEffect(() => {
        calculateTotalAmount();
        calculatePaidAmount();
        calculatePendingAmount();
    }, [formData.items]);

    const fetchClientData = (clientId) => {
        axios.get(`https://digitalshopee.online/api/client/get-client-by-id.php?id=${clientId}`)
            .then(response => {
                setClientDetails(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching client details:', error);
            });
    };

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/sales-manager/${employeeId}`}>Sales</Link> / <Link className='t-theme-color'>Add Sales</Link></p>
                </div>

                <div className='container-fluid mb-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row border p-3 mt-5 bg-white b-radius-10'>
                            <div className='row'>
                                <div className='col-md-3 py-1'>
                                    <label className='text-sm font-w-500 p-2'>Client Name</label>
                                    <select className='form-control' value={formData.client_id} name='client_id' onChange={handleChange}>
                                        <option value="">Select Client</option>
                                        {getClientName.map((client, index) => (
                                            <option key={index} value={client.id}>{client.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='col-md-3 py-1'>
                                    <label className='text-sm font-w-500 p-2'>Date</label>
                                    <input type='date' className='form-control' value={formData.date} name='date' placeholder='' onChange={handleChange} />
                                </div>
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

                        <div>
                            {formData.items.map((item, index) => (
                                <div key={index} className='row border-1px p-3 mt-2 bg-white b-radius-10'>
                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Select Service</label>
                                        <select className='form-control' value={item.service_name} name='service_name' onChange={(e) => handleItemChange(index, e)}>
                                            <option value="">Select Service</option>
                                            {getServiceName.map((service, index) => (
                                                <option key={index} value={service.name}>{service.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='col-md-3 py-1 d-none'>
                                        <label className='text-sm font-w-500 p-2'>Service Code</label>
                                        <input type="text" name="service_code" placeholder="Service Code" className='form-control' value={item.service_code} onChange={(e) => handleItemChange(index, e)} readOnly />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Service Quantity</label>
                                        <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} className='form-control' onChange={(e) => handleItemChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Service Amount</label>
                                        <input type="number" name="amount" placeholder="Amount" value={item.amount} className='form-control' onChange={(e) => handleItemChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Service Remark</label>
                                        <input type="text" name="remark" placeholder="Remark" value={item.remark} className='form-control' onChange={(e) => handleItemChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Service Discount</label>
                                        <input type="text" name="discount" placeholder="Discount" value={item.discount} className='form-control' onChange={(e) => handleItemChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Payment Type</label>
                                        <select value={item.paid_type} name='paid_type' onChange={(e) => handleItemChange(index, e)} className='form-control'>
                                            <option value=''>Select payment type</option>
                                            <option value='Full Paid'>Full Paid</option>
                                            <option value='Partially Paid'>Partially Paid</option>
                                            <option value='No Paid'>No Paid</option>
                                        </select>
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Payment Status</label>
                                        <select value={item.paid_status} name='paid_status' onChange={(e) => handleItemChange(index, e)} className='form-control'>
                                            <option value=''>Select payment Status</option>
                                            <option value='Yes'>Yes</option>
                                            <option value='No'>No</option>
                                        </select>
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Paid Amount</label>
                                        <input type="text" name="paid_amount" placeholder="Enter paid amount" value={item.paid_amount} className='form-control' onChange={(e) => handleItemChange(index, e)} />
                                    </div>

                                    <div className='col-md-3 py-1'>
                                        <label className='text-sm font-w-500 p-2'>Sale Date</label>
                                        <input type="date" name="sale_date" placeholder="Enter paid amount" value={item.sale_date} className='form-control' onChange={(e) => handleItemChange(index, e)} />
                                    </div>

                                    <div className='d-flex justify-content-between pt-4'>
                                        <button type="button" onClick={() => removeItem(index)} className='btn btn-danger btn-sm'>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='d-flex justify-content-between pt-4 gap-4'>
                            <div className='d-flex gap-2'>
                                <input type='text' className='btn btn-bg-orange' value={formData.total} name='totalamount' placeholder='Total Amount' onChange={handleChange} readOnly />
                                <button type='button' className='btn btn-bg-orange'>Paid Amount : {formData.paid}</button>
                                <button type='button' className='btn btn-bg-orange'>Pending Amount : {formData.pending}</button>
                            </div>

                            <div className='d-flex gap-3'>
                                <button type="button" onClick={addItem} className='btn btn-bg-orange mr-2'>Add Item</button>
                                <button type="submit" className='btn btn-bg-orange' style={{ width: "200px" }}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Add_sales;


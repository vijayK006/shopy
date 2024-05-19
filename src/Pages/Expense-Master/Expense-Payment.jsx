import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { MdNoteAdd } from 'react-icons/md';
import { BsArrowLeftRight } from 'react-icons/bs';
import { LuIndianRupee } from 'react-icons/lu';
import { BiReset } from 'react-icons/bi';
import { TbFilterCog } from 'react-icons/tb';

const Expense_Payment = () => {
    const [apiDatas, setApiDatas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');


    // const fetchData = () => {
    //     axios.get('https://digitalshopee.online/api/expense-payment/get-payment.php')
    //         .then(res => {
    //             setApiDatas(res.data);
    //             calculateTotalAmount(res.data);
    //         })
    //         .catch(err => {
    //             console.error('Error fetching data:', err);
    //         });
    // }

    const fetchData = () => {
        axios.get('https://digitalshopee.online/api/expense-payment/get-payment.php')
            .then(res => {
                const responseData = res.data || [];
                if (Array.isArray(responseData)) {
                    setApiDatas(responseData);
                    calculateTotalAmount(responseData);
                } else {
                    console.error('Invalid data format:', responseData);
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const loadall = () => {
        fetchData();
        setStartDate('00-00-0000')
        setEndDate('00-00-0000')
        setTotalAmount(0)
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Expense Payment?");
        if (confirmDelete) {
            axios.post(`https://digitalshopee.online/api/expense-payment/delete-payment.php?id=${id}`)
                .then(res => {
                    fetchData();
                })
                .catch(err => {
                    console.error('Error deleting data:', err);
                });
        }
    }



    const handleFilter = () => {
        let filteredData = apiDatas;

        // Filter by date range
        filteredData = filteredData.filter(item => {
            const itemDate = new Date(item.date);
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;

            if (startDateObj && endDateObj) {
                return itemDate >= startDateObj && itemDate <= endDateObj;
            } else if (startDateObj) {
                return itemDate >= startDateObj;
            } else if (endDateObj) {
                return itemDate <= endDateObj;
            }
            return true;
        });

        // Filter by selected service
        if (selectedService) {
            filteredData = filteredData.filter(item => item.expense_id === selectedService);
        }

        if (selectedEmployee) {
            filteredData = filteredData.filter(item => item.employee_id === selectedEmployee);
        }

        // Calculate total amount for filtered data
        calculateTotalAmount(filteredData);

        setApiDatas(filteredData);
    }

    const calculateTotalAmount = (data) => {
        const total = data.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        setTotalAmount(total);
    }

    // Extract unique service names
    const serviceNames = Array.from(new Set(apiDatas.map(item => item.expense_id)));
    const employeeNames = Array.from(new Set(apiDatas.map(item => item.employee_id)));


    const columns = [
        { field: 'displayOrder', headerName: 'Sl.No', width: 70 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'expense_id', headerName: 'Expense Name', width: 200 },
        { field: 'amount', headerName: 'Expense Amount', width: 200 },
        { field: 'remark', headerName: 'Description', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 230,
            renderCell: (params) => (
                <>
                    <Link to={`/edit-expenses-payment/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
                        <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} />  View / Edit
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Link className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
                        <AiOutlineDelete style={{ fontSize: '15px', marginBottom: '4px' }} /> Delete
                    </Link>
                </>
            ),
        },
    ];

    const rows = apiDatas.length > 0 ? apiDatas.map((item, index) => ({
        id: item.id || index,
        displayOrder: index + 1,
        date: item.date,
        expense_id: item.expense_id,
        amount: item.amount,
        remark: item.remark,
    })) : [];


    const filterbtn = () => {
        const filtermenu = document.getElementById('filtermenu');
        filtermenu.classList.toggle('openfilter')
    }
    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50 bread-parent'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='' className='t-theme-color'>Expense Payment</Link></p>
                    <div>
                        {/* <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        
                        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                            <option value="">All Services</option>
                            {serviceNames.map(service => (  
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                        <button onClick={handleFilter}>Filter</button>
                        <button onClick={loadall}>reset</button>
                        */}

                    </div>
                    <div className='actions'>
                        <Link to='/add-expenses-payment' className='btn btn-bg-orange btn-sm b-radius-50 '><MdNoteAdd style={{ fontSize: "18px", marginBottom: '2px' }} /> Add Expense Payment</Link>
                      

                        {/* <button type='button' className='btn btn-bg-orange btn-sm b-radius-50 ' onClick={filterbtn}><FaFilter style={{ marginBottom: '2px' }} /> Filter</button> */}

                    </div>

                    <div className='filter-card shadow p-2 b-radius-10' id='filtermenu'>

                        <div className='d-flex gap-3 align-items-center'>
                            <div className='form-head'>
                                <input type='date' className='filter-fields' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <span> <BsArrowLeftRight /> </span>
                            <div className='form-head'>
                                <input type='date' className='filter-fields' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        </div>


                        <div className='form-head'>
                            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className='filter-fields'>
                                <option value="">All Services</option>
                                {serviceNames.map(service => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                            </select>
                        </div>

                        <div className='form-head'>
                            <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className='filter-fields'>
                                <option value="">All Employees</option>
                                {employeeNames.filter(Boolean).map(employee => (
                                    <option key={employee} value={employee}>{employee}</option>
                                ))}
                            </select>
                        </div>

                        <div className='d-flex gap-2 justify-content-end pb-3'>
                            <button type='button' className='btn btn-bg-orange btn-sm letter-spacing-1' onClick={handleFilter}><TbFilterCog /> Check</button>

                            <button type='button' className='btn btn-bg-orange btn-sm letter-spacing-1' onClick={loadall}><BiReset /> Reset</button>
                        </div>

                        <p>Total Amount: {totalAmount} <LuIndianRupee /></p>


                    </div>
                </div>

                <div style={{ height: '75vh', width: '100%' }} className="bg-white">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5} // Specify the page size
                    />


                </div>

            </div>
        </>
    );
};

export default Expense_Payment;

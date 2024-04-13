import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaFilter } from "react-icons/fa";
import axios from 'axios';
import { MdNoteAdd } from 'react-icons/md';
import { BsArrowLeftRight } from 'react-icons/bs';
import { LuIndianRupee } from 'react-icons/lu';
import { BiReset } from 'react-icons/bi';
import { TbFilterCog } from 'react-icons/tb';

const TargetReport = () => {
    const [apiDataTarget, setApiDataTarget] = useState([]);
    const [apiDataTargetOut, setApiDataTargetOut] = useState([]);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedService, setSelectedService] = useState('');

    const fetchData = () => {
        axios.all([
            axios.get('https://shopee-firm.000webhostapp.com/api/target/get-target.php'),
            axios.get('https://shopee-firm.000webhostapp.com/api/target-out/get-target.php')
        ])
        .then(axios.spread((responseTarget, responseTargetOut) => {
            const targetData = responseTarget.data || [];
            const targetOutData = responseTargetOut.data || [];
            setApiDataTarget(targetData);
            setApiDataTargetOut(targetOutData);
            calculatePendingOrders(targetData, targetOutData);
        }))
        .catch(err => {
            console.error('Error fetching data:', err);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const calculatePendingOrders = (targetData, targetOutData) => {
        let pending = 0;
        targetData.forEach(target => {
            const matchingTargetOut = targetOutData.find(item => item.service_id === target.service_id);
            if (matchingTargetOut) {
                const pendingOrder = target.no_of_orders - matchingTargetOut.no_of_orders;
                pending += pendingOrder;
            }
        });
        setPendingOrders(pending);
        calculateTotalAmount(targetData);
    }

    const calculateTotalAmount = (data) => {
        const total = data.reduce((acc, item) => acc + parseFloat(item.total_amount), 0);
        setTotalAmount(total);
    }

    // Extract unique service names
    const serviceNames = Array.from(new Set(apiDataTarget.map(item => item.service_id)));

    const columns = [
        { field: 'displayOrder', headerName: 'Sl.No', width: 70 },
        { field: 'employee_id', headerName: 'Employee Name', width: 150 },
        { field: 'service_id', headerName: 'Service Name', width: 150 },
        { field: 'no_of_orders', headerName: 'Total Orders', width: 150 },
        { field: 'total_amount', headerName: 'Total Amount', width: 150 },
        { field: 'date', headerName: 'Date', type: 'Date', width: 150 },
    ];

    const rows = apiDataTarget.length > 0 ? apiDataTarget.map((item, index) => ({
        id: item.id || index,
        displayOrder: index + 1,
        employee_id: item.employee_id,
        service_id: item.service_id,
        no_of_orders: item.no_of_orders,
        total_amount: item.total_amount,
        date: item.date,
    })) : [];

    const filterbtn = () => {
        const filtermenu = document.getElementById('filtermenu');
        filtermenu.classList.toggle('openfilter');
    }

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50 bread-parent'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/target-master' className='t-theme-color'>Target Master</Link></p>
                    <div className='actions'>
                        <Link to='/add-target-master' className='btn btn-bg-orange btn-sm b-radius-50 '><MdNoteAdd style={{ fontSize: "18px", marginBottom: '2px' }} /> Add Target Master</Link>
                        &nbsp;
                        &nbsp;
                        <button type='button' className='btn btn-bg-orange btn-sm b-radius-50 ' onClick={filterbtn}><FaFilter style={{ marginBottom: '2px' }} /> Filter</button>
                    </div>
                </div>

                <div className='filter-card shadow p-2 b-radius-10' id='filtermenu'>
                    <div className='d-flex gap-3 align-items-center'>
                        <div className='form-head'>
                            <input type='date' className='filter-fields' value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
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

                    <div className='d-flex gap-2 justify-content-end pb-3'>
                        <button type='button' className='btn btn-bg-orange btn-sm letter-spacing-1' onClick={fetchData}><TbFilterCog /> Check</button>
                        <button type='button' className='btn btn-bg-orange btn-sm letter-spacing-1' onClick={fetchData}><BiReset /> Reset</button>
                    </div>

                    <p>Pending Orders: {pendingOrders}</p>
                    <p>Total Amount: {totalAmount} <LuIndianRupee /></p>
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

export default TargetReport;

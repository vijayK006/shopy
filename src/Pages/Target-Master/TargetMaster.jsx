import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';

const TargetMaster = () => {
    const [apiDatas, setApiDatas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://shopee-firm.000webhostapp.com/api/target/get-target.php')
            .then(res => {
                setApiDatas(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }


    const loadall =()=>{
        fetchData();
        setStartDate('00-00-0000')
        setEndDate('00-00-0000')
        setTotalAmount(0)
    }
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Service Master?");
        if (confirmDelete) {
            axios.post(`https://shopee-firm.000webhostapp.com/api/target/delete-by-id-target.php?id=${id}`)
                .then(res => {
                    fetchData();
                })
                .catch(err => {
                    console.error('Error deleting data:', err);
                });
        }
    }

    // const handleFilter = () => {
    //     // Filter the data based on the selected date range
    //     const filteredData = apiDatas.filter(item => {
    //         const itemDate = new Date(item.date);
    //         const startDateObj = startDate ? new Date(startDate) : null;
    //         const endDateObj = endDate ? new Date(endDate) : null;
    
    //         // Check if the item's date falls within the selected range
    //         if (startDateObj && endDateObj) {
    //             return itemDate >= startDateObj && itemDate <= endDateObj;
    //         } else if (startDateObj) {
    //             return itemDate >= startDateObj;
    //         } else if (endDateObj) {
    //             return itemDate <= endDateObj;
    //         }
    //         return true; // Return true to include all data if no date range selected
    //     });
    
    //     // Set the filtered data to state
    //     setApiDatas(filteredData);
    // }
    

    const handleFilter = () => {
        // Filter the data based on the selected date range
        const filteredData = apiDatas.filter(item => {
            const itemDate = new Date(item.date);
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;

            // Check if the item's date falls within the selected range
            if (startDateObj && endDateObj) {
                return itemDate >= startDateObj && itemDate <= endDateObj;
            } else if (startDateObj) {
                return itemDate >= startDateObj;
            } else if (endDateObj) {
                return itemDate <= endDateObj;
            }
            return true; // Return true to include all data if no date range selected
        });

        // Calculate total amount for filtered data
        calculateTotalAmount(filteredData);

        // Set the filtered data to state
        setApiDatas(filteredData);
    }
    
    const calculateTotalAmount = (data) => {
        const total = data.reduce((acc, item) => acc + parseFloat(item.total_amount), 0);
        setTotalAmount(total);
    }
    

    

    const columns = [
        { field: 'displayOrder', headerName: 'Sl.No', width: 70 },  
        { field: 'employee_id', headerName: 'Employe Name', width: 150 },
        { field: 'service_id', headerName: 'Service Name', width: 150 },
        { field: 'no_of_orders', headerName: 'Order Qty.', width: 150 },
        { field: 'total_amount', headerName: 'Total Amount', width: 150 },
        { field: 'date', headerName: 'Date', type:'Date', width: 150 },
        {
            field: 'actions', 
            headerName: 'Actions', 
            sortable: false,
            width: 230,
            renderCell: (params) => (
                <>
                    <Link to={`/edit-target-master/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
                        <FaRegEdit  style={{fontSize:'15px', marginBottom:'4px'}}/>  View / Edit 
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Link  className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
                        <AiOutlineDelete style={{fontSize:'15px', marginBottom:'4px'}}/> Delete
                    </Link>
                </>
            ), 
        },
    ];

    const rows = apiDatas.length > 0 ? apiDatas.map((item, index) => ({
        id: item.id || index,   
        displayOrder: index + 1,
        employee_id: item.employee_id,
        service_id: item.service_id,
        no_of_orders: item.no_of_orders,
        total_amount: item.total_amount,
        date: item.date,
    })) : [];

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>
                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/target-master' className='t-theme-color'>Target Master</Link></p>
                    <div>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <button onClick={handleFilter}>Filter</button>
                        <button onClick={loadall}>reset</button>
                    </div>
                    <Link to='/add-target-master' className='btn btn-bg-orange btn-sm b-radius-50'>Add Target Master</Link>
                </div>

                <div style={{ height: '75vh', width: '100%' }} className="bg-white">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5} // Specify the page size
                    />


                </div>

                <p>Total Amount: {totalAmount}</p>
            </div>
        </>
    );
};

export default TargetMaster;

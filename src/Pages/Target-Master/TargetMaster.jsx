import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { MdNoteAdd, MdOutlineDownloading } from 'react-icons/md';
import { BsArrowLeftRight } from 'react-icons/bs';
import { LuIndianRupee } from 'react-icons/lu';
import { BiReset } from 'react-icons/bi';
import { TbFilterCog } from 'react-icons/tb';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const TargetMaster = () => {
    const [apiDatas, setApiDatas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [selectedService, setSelectedService] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const { employeeId } = useParams();

    const downloadExcel = () => {
        const transformedData = apiDatas.map(({ id, client_photo,
          adhaar_photo,
          pan_photo,
          voter_id_photo,
          license_photo,
          ration_photo,
          other_photo, ...rest }) => rest);
    
        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
        saveAs(blob, 'Target Master.xlsx');
      };


    const fetchData = () => {
        axios.get('https://digitalshopee.online/api/target/get-target.php')
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
        // Get the current date
        const currentDate = new Date();
        
        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        
        // Get the last day of the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
        // Format dates to YYYY-MM-DD
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
    
        // Set the start date and end date
        setStartDate(formatDate(firstDayOfMonth));
        setEndDate(formatDate(lastDayOfMonth));
      }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const loadall = () => {
        fetchData();
        setStartDate(startDate)
        setEndDate(endDate)
        setTotalAmount(0)
        setSelectedService('')
setSelectedEmployee('')
        const refer = document.getElementById('refer');
        refer.style.display = "block"
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Target Master?");
        if (confirmDelete) {
            axios.post(`https://digitalshopee.online/api/target/delete-by-id-target.php?id=${id}`)
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
            const itemDate = new Date(item.from_date);
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
            filteredData = filteredData.filter(item => item.service_id === selectedService);
        }

        if (selectedEmployee) {
            filteredData = filteredData.filter(item => item.employee_name === selectedEmployee);
        }

        // Calculate total amount for filtered data
        calculateTotalAmount(filteredData);

        setApiDatas(filteredData);

        const refer = document.getElementById('refer');
        refer.style.display = "none"
    }

    const calculateTotalAmount = (data) => {
        const total = data.reduce((acc, item) => acc + parseFloat(item.total_amount), 0);
        const totalqty = data.reduce((acc, item) => acc + parseFloat(item.no_of_orders), 0);
        setTotalAmount(total);
        setTotalQty(totalqty);
    }

    // Extract unique service names
    const serviceNames = Array.from(new Set(apiDatas.map(item => item.service_id)));
    const employeeNames = Array.from(new Set(apiDatas.map(item => item.employee_name)));


    const columns = [
        { field: 'displayOrder', headerName: 'Sl.No', width: 70 },
        { field: 'from_date', headerName: 'From Date', width: 100 },
        { field: 'to_date', headerName: 'To Date', width: 100 },

        { field: 'employee_id', headerName: 'Employe Name', width: 200 },
        { field: 'service_id', headerName: 'Service Name', width: 150 },
        { field: 'no_of_orders', headerName: 'Order Qty.', width: 100 },
        { field: 'total_amount', headerName: 'Total Amount', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 230,
            renderCell: (params) => (
                <>
                    <Link to={`/edit-target-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
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
        employee_id: item.employee_name,
        service_id: item.service_id,
        no_of_orders: item.no_of_orders,
        total_amount: item.total_amount,
        from_date: item.from_date,
        to_date: item.to_date,
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/target-master' className='t-theme-color'>Target Master</Link></p>
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
                    <div className='actions d-flex gap-3'>
                    <button type="button" className='download-btn' onClick={downloadExcel}><MdOutlineDownloading className='icon'/> Export to Excel</button>

                        <Link to={`/add-target-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50 '><MdNoteAdd style={{ fontSize: "18px", marginBottom: '2px' }} /> Add Target Master</Link>

                        <button type='button' className='btn btn-bg-orange btn-sm b-radius-50 ' onClick={filterbtn}><FaFilter style={{ marginBottom: '2px' }} /> Filter</button>

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
                            <button type='button' className='btn btn-bg-orange btn-sm letter-spacing-1' id="refer" onClick={handleFilter}><TbFilterCog /> Check</button>

                            <button type='button' className='btn btn-bg-orange btn-sm letter-spacing-1' onClick={loadall}><BiReset /> Reset</button>
                        </div>


                        <div className='d-flex justify-content-between'>
                            <p className='px-2'>Total Amount:<LuIndianRupee /> {totalAmount} </p>
                            <p className='px-2'>Total Quality:{totalQty} </p>
                        </div>




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

export default TargetMaster;

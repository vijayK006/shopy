import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDownloading } from "react-icons/md";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import axios from 'axios';



const Sales_Manager = () => {
    const [apiDatas, setApiDatas] = useState([]);
    const role = localStorage.getItem('role');
    const { employeeId } = useParams();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://digitalshopee.online/api/sales/get-sales.php')
            .then(res => {
                console.log(res.data)
                setApiDatas(res.data)

            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }

    useEffect(() => {
        axios.get('https://digitalshopee.online/api/sales/get-sales.php')
            .then(res => {
                console.log(res.data)
                setApiDatas(res.data)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);



    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Service Master");
        if (confirmDelete) {
            axios.post(`https://digitalshopee.online/api/sales/delete-sales.php?id=${id}`)
                .then(res => {
                    fetchData();
                })
                .catch(err => {
                    console.error('Error deleting data:', err);
                });
        }
    }


    const columns = [
        { field: 'displayOrder', headerName: 'Sl.No', width: 70 },
        { field: 'client_name', headerName: 'Client Name', width: 200 },
        { field: 'date', headerName: 'Date', width: 100 },
        { field: 'phone', headerName: 'Phone Number', width: 100 },
        {   field: 'total', headerName: 'Total Amount', type: 'number', width: 90,},
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 350,
            renderCell: (params) => (
                <>

                    <Link to={`/edit-sales/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
                        <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} />  View / Edit
                    </Link>


                    &nbsp;
                    &nbsp;

                    <Link className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
                        <AiOutlineDelete style={{ fontSize: '15px', marginBottom: '4px' }} /> Delete
                    </Link>

                    &nbsp;
                    &nbsp;

                    <Link to={`/bill-pdf/${employeeId}/${params.row.id}`} className='btn btn-outline-secondary btn-sm'>
                        Bill PDF
                    </Link>

                </>

            ),
        },

    ];

    const rows = apiDatas.length > 0 ?
        apiDatas.map((item, index) => ({
            id: item.id || index,
            displayOrder: index + 1,
            client_name: item.name,
            date: item.date,
            phone: item.phone,
            total: item.total
        })) : [];



    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>

                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to="" className='t-theme-color'>Sales Manager</Link></p>

                    <div className='d-flex gap-2'>
                        {/* <button type="button" className='download-btn' onClick={downloadExcel}><MdOutlineDownloading className='icon'/> Export to Excel</button> */}
                        <Link to={`/add-sales/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Sales Manager</Link>
                    </div>

                </div>


                <div style={{ height: '75vh', width: '100%' }} className="bg-white position-relative">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5} // Specify the page size
                    // checkboxSelection
                    />


                </div>
            </div>


        </>

    );
};

export default Sales_Manager;




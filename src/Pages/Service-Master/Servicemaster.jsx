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



const Servicemaster = () => {
    const [apiDatas, setApiDatas] = useState([]);
    const role = localStorage.getItem('role');
    const { employeeId } = useParams();

    const [permissions, setPermissions] = useState({ add_service: null, view_service: null, edit_service: null, delete_service: null });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://digitalshopee.online/api/service/get-service.php')
            .then(res => {
                console.log(res.data)
                setApiDatas(res.data)

            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }

    useEffect(() => {
        axios.get('https://digitalshopee.online/api/service/get-service.php')
            .then(res => {
                console.log(res.data)
                setApiDatas(res.data)
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []);

    const downloadExcel = () => {

        const transformedData = apiDatas.map(({ id, ...rest }) => rest);

        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        saveAs(blob, 'service-master.xlsx');
    };



    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Service Master");
        if (confirmDelete) {
            axios.post(`https://digitalshopee.online/api/service/delete-by-id-service.php?id=${id}`)
                .then(res => {
                    fetchData();
                })
                .catch(err => {
                    console.error('Error deleting data:', err);
                });
        }
    }

    useEffect(() => {
        axios.get(`https://digitalshopee.online/api/employee-permission/get-permission.php?id=${employeeId}`)
            .then(response => {
                setPermissions(response.data[0]);
                console.log(response.data[0]);
            })
            .catch(error => {
                console.error("Error fetching permissions:", error);
            });
    }, [employeeId]);

    const columns = [
        { field: 'displayOrder', headerName: 'Sl.No', width: 70 },
        { field: 'code', headerName: 'Service Code', width: 200 },
        { field: 'name', headerName: 'Service Name', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'expencse', headerName: 'Service Expencses', width: 200 },
        // { field: 'document', headerName: 'Required Documents', width: 200 },
        //   {   field: 'age', headerName: 'Age', type: 'number', width: 90,},
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 230,
            renderCell: (params) => (
                <>
                    {/* {permissions.edit_service === "yes" && (
            <Link to={`/edit-service-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
              <FaRegEdit  style={{fontSize:'15px', marginBottom:'4px'}}/>  View / Edit 
              </Link>
          )}
              
              &nbsp;
              &nbsp;
          {permissions.delete_service === "yes" && (
              <Link  className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
               <AiOutlineDelete style={{fontSize:'15px', marginBottom:'4px'}}/> Delete
              </Link>
          )} */}

                    {role === 'admin' ? (
                        <Link to={`/edit-service-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
                            <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} /> View / Edit
                        </Link>
                    ) : (
                        (permissions.view_service === "yes" || permissions.edit_service === "yes") && (
                            <Link to={`/edit-service-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
                                <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} /> View
                            </Link>
                        )
                    )}

                    &nbsp;
                    &nbsp;
                    {role === 'admin' ? (
                        <button className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
                            <AiOutlineDelete style={{ fontSize: '15px', marginBottom: '4px' }} /> Delete
                        </button>
                    ) : (
                        permissions.delete_service === "yes" && (
                            <button className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
                                <AiOutlineDelete style={{ fontSize: '15px', marginBottom: '4px' }} /> Delete
                            </button>
                        )
                    )}
                </>

            ),
        },

    ];

    const rows = apiDatas.length > 0 ?
        apiDatas.map((item, index) => ({
            id: item.id || index,
            displayOrder: index + 1,
            code: item.code,
            name: item.name,
            amount: item.amount,
            expencse: item.expense,
            document: item.documents,
        })) : [];




    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>

                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to='' className='t-theme-color'>Service Master</Link></p>

                    <div className='d-flex gap-2'>
                        <button type="button" className='download-btn' onClick={downloadExcel}><MdOutlineDownloading className='icon' /> Export to Excel</button>

                        {role === 'admin' ? (
                            <Link to={`/add-service-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Service Master</Link>
                        ) : (
                            permissions.add_service === "yes" && (
                                <Link to={`/add-service-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Service Master</Link>
                            )

                        )}
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

export default Servicemaster;




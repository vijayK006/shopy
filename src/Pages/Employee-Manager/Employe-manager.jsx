import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { MdOutlineDownloading } from 'react-icons/md';


const EmployeManager = () => {
  const [apiDatas, setApiDatas] = useState([]);
  const { employeeId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://digitalshopee.online/api/employee/get-employee.php')
      .then(res => {
        setApiDatas(res.data)

      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/employee/get-employee.php')
      .then(res => {
        console.log(res.data)
        setApiDatas(res.data)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Employee");
    if (confirmDelete) {
      axios.post(`https://digitalshopee.online/api/employee/delete-employee.php?id=${id}`)
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
    { field: 'name', headerName: 'Employee Name', width: 200 },
    { field: 'dob', headerName: 'DOB', width: 200 },
    { field: 'phone', headerName: 'Mobile No.', width: 150 },
    { field: 'post', headerName: 'Post', width: 200 },
    { field: 'salary', headerName: 'Salary', width: 200 },
    // { field: 'dob', headerName: 'Date of Birth', width: 200 },
    //   {   field: 'age', headerName: 'Age', type: 'number', width: 90,},
    {
      field: 'actions', // Adding a new field for actions
      headerName: 'Actions', // Header for actions column
      sortable: false,
      width: 230,
      renderCell: (params) => (
        <>
          <Link to={`/edit-employee/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
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

  const rows = apiDatas.length > 0 ?
    apiDatas.map((item, index) => ({
      id: item.id || index,
      displayOrder: index + 1,
      name: item.name,
      dob: item.dob,
      salary: item.salary,
      phone: item.phone,
      post: item.post,
    })) : [];

  const downloadExcel = () => {
    // Map apiDatas to rearrange the columns as needed (phone, name, dob, salary, post)
    const transformedData = apiDatas.map(({ name, dob, phone, salary, post }) => ({
      name,
      dob,
      phone,
      salary,
      post,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    saveAs(blob, 'Employee Manager.xlsx');
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <div className='main-content' id='mainbody'>

        <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
          <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to='' className='t-theme-color'>Employee Manager</Link></p>

          <div className='d-flex gap-2'>
            <button type="button" className='download-btn' onClick={downloadExcel}><MdOutlineDownloading className='icon' /> Export to Excel</button>

            <Link to={`/add-employee/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Employee</Link>

          </div>

        </div>


        <div style={{ height: '75vh', width: '100%' }} className="bg-white">
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

export default EmployeManager;




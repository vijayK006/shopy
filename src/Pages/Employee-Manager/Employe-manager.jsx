import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';



const EmployeManager = () => {
    const [apiDatas, setApiDatas] = useState([]);
 
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      axios.get('https://shopee-firm.000webhostapp.com/api/employee/get-employee.php')
        .then(res => {
          setApiDatas(res.data)

        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }

    useEffect(() => {
      axios.get('https://shopee-firm.000webhostapp.com/api/employee/get-employee.php')
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
          axios.post(`https://shopee-firm.000webhostapp.com/api/employee/delete-employee.php?id=${id}`)
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
          <Link to={`/edit-employee/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
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
      


  return (
    <>
       <Topbar/>
    <Sidebar/>
<div className='main-content' id='mainbody'>

<div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
<p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='' className='t-theme-color'>Employee Manager</Link></p>
<Link to='/add-employee' className='btn btn-bg-orange btn-sm b-radius-50'>Add Employee</Link>
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




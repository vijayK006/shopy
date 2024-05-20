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



const Clientmaster = () => {
  const role = localStorage.getItem('role');
  const [apiDatas, setApiDatas] = useState([]);
  const { employeeId } = useParams();
  const [permissions, setPermissions] = useState({ add_client: null, view_client: null, edit_client: null, delete_client: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://digitalshopee.online/api/client/get-client.php')
      .then(res => {
        console.log(res.data)
        setApiDatas(res.data)

      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/client/get-client.php')
      .then(res => {
        console.log(res.data)
        setApiDatas(res.data)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

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

    saveAs(blob, 'client-master.xlsx');
  };


  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Firm Master");
    if (confirmDelete) {
      axios.post(`https://digitalshopee.online/api/client/delete-by-id-client.php?id=${id}`)
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
    { field: 'clientname', headerName: 'Client Name', width: 200 },
    { field: 'dob', headerName: 'DOB', width: 150 },
    { field: 'phone', headerName: 'Mobile No.', width: 150 },
    { field: 'profession', headerName: 'Profession', width: 150 },
    { field: 'reference', headerName: 'Reference', width: 150 },


    {
      field: 'actions', // Adding a new field for actions
      headerName: 'Actions', // Header for actions column
      sortable: false,
      width: 230,
      renderCell: (params) => (
        <>

          { role === 'admin' ?(
            <Link to={`/edit-client-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
              <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} /> View / Edit
            </Link>
          ):(
            (permissions.view_client=== "yes" || permissions.edit_client=== "yes") && (
              <Link to={`/edit-client-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
              <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} /> View
            </Link>
          )
          )}

          &nbsp;
          &nbsp;
          { role === 'admin' ?(
            <button className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
              <AiOutlineDelete style={{ fontSize: '15px', marginBottom: '4px' }} /> Delete
            </button>
          ):(
            permissions.delete_client === "yes" && (
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
      clientname: item.name,
      profession: item.profession,
      phone: item.phone,
      dob: item.dob,
      reference: item.reference,
    })) : [];

  return (
    <>
      <Topbar />
      <Sidebar />
      <div className='main-content' id='mainbody'>

        <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
          <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to='' className='t-theme-color'>Client Master</Link></p>

          <div className='d-flex gap-2'>
            <button type="button" className='download-btn' onClick={downloadExcel}><MdOutlineDownloading className='icon'/> Export to Excel</button>

{ role === 'admin' ?(
  <Link to={`/add-client-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Client Master</Link>
):(
 permissions.add_client === "yes" && (
  <Link to={`/add-client-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Client Master</Link>
)

)}
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

export default Clientmaster;




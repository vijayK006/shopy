import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';



const Clientmaster = () => {
  const [apiDatas, setApiDatas] = useState([]);
  const { employeeId } = useParams();
  const [permissions, setPermissions] = useState({ add_client: null, edit_client: null, delete_client: null });

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
          {permissions.edit_client === "yes" && (
            <Link to={`/edit-client-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
              <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} />  View / Edit
            </Link>
          )}

          &nbsp;
          &nbsp;
          {permissions.delete_client === "yes" && (
            <Link className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
            <AiOutlineDelete style={{ fontSize: '15px', marginBottom: '4px' }} /> Delete
          </Link>
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

{permissions.add_client === "yes" && (
  <Link to={`/add-client-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Client Master</Link>
)}
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




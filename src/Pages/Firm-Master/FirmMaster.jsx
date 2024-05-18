import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';

const FirmMaster = () => {
  const [apiDatas, setApiDatas] = useState([]);
  const { employeeId } = useParams();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);


  const [permissions, setPermissions] = useState({ add_firm: null, edit_firm: null, delete_firm: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('https://digitalshopee.online/api/firm/get-firm.php')
      .then(res => {
        console.log(res.data)
        setApiDatas(res.data)

      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/firm/get-firm.php')
      .then(res => {
        console.log(res.data)
        setApiDatas(res.data)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

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

  // const handleDelete = (id) => {
  //   axios.post(`https://digitalshopee.online/api/firm/delete-by-id-firm.php?id=${id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       // After successful deletion, refetch the data to update the UI
  //       fetchData();
  //     })
  //     .catch(err => {
  //       console.error('Error deleting data:', err);
  //     });
  // }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Firm Master");
    if (confirmDelete) {
      axios.post(`https://digitalshopee.online/api/firm/delete-by-id-firm.php?id=${id}`)
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
    { field: 'firmname', headerName: 'Firm Name', width: 200 },
    { field: 'ownername', headerName: 'Owner Name', width: 200 },
    { field: 'mobileno', headerName: 'Mobile No.', width: 150 },
    { field: 'businesstype', headerName: 'Business Type', width: 200 },
    // { field: 'businesscategory', headerName: 'Business Category', width: 200 },
    //   {   field: 'age', headerName: 'Age', type: 'number', width: 90,},
    {
      field: 'actions', // Adding a new field for actions
      headerName: 'Actions', // Header for actions column
      sortable: false,
      width: 230,
      renderCell: (params) => (
        <>

          { /* <Link to={`/edit-firm-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
          <FaRegEdit  style={{fontSize:'15px', marginBottom:'4px'}}/>  View / Edit 
          </Link>
          &nbsp;
          &nbsp;
          <Link  className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
           <AiOutlineDelete style={{fontSize:'15px', marginBottom:'4px'}}/> Delete
          </Link>*/}

          {permissions.edit_firm === "yes" && (
            <Link to={`/edit-firm-master/${employeeId}/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
              <FaRegEdit style={{ fontSize: '15px', marginBottom: '4px' }} /> View / Edit
            </Link>
          )}
          &nbsp;
          &nbsp;
          {permissions.delete_firm === "yes" && (
            <button className='btn btn-outline-danger btn-sm' onClick={() => handleDelete(params.row.id)}>
              <AiOutlineDelete style={{ fontSize: '15px', marginBottom: '4px' }} /> Delete
            </button>
          )}
        </>

      ),
    },

  ];

  const rows = apiDatas.length > 0 ?
    apiDatas.map((item, index) => ({
      id: item.id || index,
      displayOrder: index + 1,
      firmname: item.firm_name,
      ownername: item.owner_name,
      mobileno: item.phone,
      businesstype: item.business_type,
      businesscategory: item.business_category,
    })) : [];



  return (
    <>
      <Topbar />
      <Sidebar />
      <div className='main-content' id='mainbody'>

        <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
          <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to='' className='t-theme-color'>Firm Master</Link></p>
          {/* {permissions.add_firm === "yes" && (
            <Link to={`/add-firm-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Firm Master</Link>
          )} */}

          {/* {role === "useradmin" ? (
  <Link to={`/add-firm-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Firm Master</Link>
):(
  <p>No Permision</p>
)} */}


          {role === "useradmin" ? (
            <Link to={`/add-firm-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Firm Master</Link>
          ) : (
            permissions.add_firm === "yes" && (
            <Link to={`/add-firm-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Firm Master</Link>
          )
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

export default FirmMaster;




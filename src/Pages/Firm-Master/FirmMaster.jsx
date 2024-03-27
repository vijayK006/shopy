import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';





const FirmMaster = () => {
    const [apiDatas, setApiDatas] = useState([]);

 
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      axios.get('https://shopee-firm.000webhostapp.com/api/firm/get-firm.php')
        .then(res => {
          console.log(res.data)
          setApiDatas(res.data)
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }

    useEffect(() => {
      axios.get('https://shopee-firm.000webhostapp.com/api/firm/get-firm.php')
        .then(res => {
          console.log(res.data)
          setApiDatas(res.data)
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    }, []);

    const handleDelete = (id) => {
      axios.post(`https://shopee-firm.000webhostapp.com/api/firm/delete-by-id-firm.php?id=${id}`)
        .then(res => {
          console.log(res.data);
          // After successful deletion, refetch the data to update the UI
          fetchData();
        })
        .catch(err => {
          console.error('Error deleting data:', err);
        });
    }

    const columns = [
      // { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firmname', headerName: 'Firm Name', width: 130 },
      { field: 'ownername', headerName: 'Owner Name', width: 150 },
      { field: 'mobileno', headerName: 'Mobile No.', width: 150 },
      { field: 'businesstype', headerName: 'Business Type', width: 200 },
      { field: 'businesscategory', headerName: 'Business Category', width: 200 },
    //   {   field: 'age', headerName: 'Age', type: 'number', width: 90,},
      {
        field: 'actions', // Adding a new field for actions
        headerName: 'Actions', // Header for actions column
        sortable: false,
        width: 300,
        renderCell: (params) => (
          <>
          <Link to={`/edit-firm-master/${params.row.id}`} className='btn btn-outline-primary btn-sm'>
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
      apiDatas.map((item) => ({
    id: item.id,
    firmname: item.firm_name,
    ownername: item.owner_name,
    mobileno: item.phone,
    businesstype: item.business_type,
    businesscategory: item.business_category,
  })) : [];
      


  return (
    <>
       <Topbar/>
    <Sidebar/>
<div className='main-content' id='mainbody'>

<div className='shadow p-3 mb-5 d-flex justify-content-between align-items-center'>
<p className='margin-0 font-w-500'><Link to='/'>Dashboard Home</Link> - <Link to='/firm-master'>Firm Master</Link> - <Link>View Firm Details</Link></p>
<Link to='/add-firm-master' className='btn btn-bg-orange'>Add Firm Master</Link>
</div>


    <div style={{ height: 400, width: '100%' }}>
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




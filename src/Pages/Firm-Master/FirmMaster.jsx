import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import axios from 'axios';

const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firmname', headerName: 'Firm Name', width: 130 },
  { field: 'ownername', headerName: 'Owner Name', width: 200 },
  { field: 'mobileno', headerName: 'Mobile No.', width: 200 },
  { field: 'businesstype', headerName: 'Business Type', width: 200 },
  { field: 'businesscategory', headerName: 'Business Category', width: 200 },
//   {   field: 'age', headerName: 'Age', type: 'number', width: 90,},
  {
    field: 'actions', // Adding a new field for actions
    headerName: 'Actions', // Header for actions column
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <Link to={`/view-firm-master/${params.row.id}`} className='btn btn-warning'>
        View / Edit
      </Link>
    ),
  },
];

// const handleButtonClick = (row) => {
//   // Implement your button click logic here
//   console.log('Button clicked for row:', row);
// };

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   // Add more rows as needed
// ];



const FirmMaster = () => {
    const [apiDatas, setApiDatas] = useState([]);
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

  
    
      // const rows = apiDatas.map((item) => ({
      //   id: item.id,
      //   firmname: item.firm_name,
      //   ownername: item.owner_name,
      //   mobileno: item.phone,
      //   businesstype: item.business_type,
      //   businesscategory: item.business_category,
      // }));

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
        checkboxSelection
      />
    </div>
</div>
    </>
    
  );
};

export default FirmMaster;

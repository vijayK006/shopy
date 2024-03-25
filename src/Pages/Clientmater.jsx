import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Topbar from '../layouts/Topbar';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'mobileno', headerName: 'Mobile No.', width: 230 },
  { field: 'dob', headerName: 'DOB', width: 230 },
  { field: 'category', headerName: 'Category', width: 300 },
//   {   field: 'age', headerName: 'Age', type: 'number', width: 90,},
  {
    field: 'actions', // Adding a new field for actions
    headerName: 'Actions', // Header for actions column
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <Link to={`/details/${params.row.id}`} className='btn btn-warning' >
        View
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



const Clientmaster = () => {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/clientmasterdata')
          .then(res => setApiData(res.data))
          .catch(err => console.log(err));
      }, []);
    
      const rows = apiData.map((item) => ({
        id: item.id,
        name: item.name,
        mobileno: item.mobileno,
        dob: item.dob,
        category: item.category,
      }));

  return (
    <>
       <Topbar/>
    <Sidebar/>


<div className='main-content' id='mainbody'>

<div className='shadow p-3 mb-5 d-flex justify-content-between align-items-center'>
<p className='margin-0'><Link to='/'>Dashboard Home</Link> - <Link to='/firm-master'>Client Master</Link> - <Link>View Client Details</Link></p>
<Link to='/add-firm-master' className='btn btn-primary'>Add Firm Master</Link>
</div>


    <div style={{ height:'65vh' , width: '100%' }}>
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

export default Clientmaster;

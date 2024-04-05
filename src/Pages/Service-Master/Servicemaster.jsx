import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';



const Servicemaster = () => {
    const [apiDatas, setApiDatas] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://shopee-firm.000webhostapp.com/api/service/get-service.php')
            .then(res => {
                console.log(res.data)
                setApiDatas(res.data)

            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }

    useEffect(() => {
        axios.get('https://shopee-firm.000webhostapp.com/api/service/get-service.php')
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
              axios.post(`https://shopee-firm.000webhostapp.com/api/service/delete-by-id-service.php?id=${id}`)
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
        { field: 'code', headerName: 'Service Code', width: 200 },
        { field: 'name', headerName: 'Service Name', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        // { field: 'expencse', headerName: 'Service Expencses', width: 200 },
        // { field: 'document', headerName: 'Required Documents', width: 200 },
        //   {   field: 'age', headerName: 'Age', type: 'number', width: 90,},
          {
            field: 'actions', 
            headerName: 'Actions', 
            sortable: false,
            width: 230,
            renderCell: (params) => (
              <>
              <Link to={`/edit-service-master/${params.row.id}`} className='btn btn-outline-warning btn-sm'>
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
                    <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='/service-master' className='t-theme-color'>Service Master</Link></p>
                    <Link to='/add-service-master' className='btn btn-bg-orange btn-sm b-radius-50'>Add Service Master</Link>
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

export default Servicemaster;




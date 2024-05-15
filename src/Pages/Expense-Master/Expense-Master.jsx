import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Expense_Master = () => {
  const [apiDatas, setApiDatas] = useState([]);

  useEffect(() => {
    axios.get('https://digitalshopee.online/api/expense/get-expense.php')
      .then(res => {
        console.log(res.data)
        setApiDatas(res.data)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Sidebar />

      <div className='main-content' id='mainbody'>
        <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
          <p className='margin-0 font-w-500'><Link to='/'>Dashboard</Link> / <Link to='' className='t-theme-color'>Expense Master</Link> </p>

          <Link to='/add-expenses-master' className='btn btn-bg-orange btn-sm b-radius-50'>Add Expense Master</Link>
        </div>

        <div className='container-fluid pt-5'>
          {/* <div className='row'>
            {apiDatas.map((item, index) => (
              <>
                <div className='col-md-3 py-2' key={index}>
                  <Link to={`/edit-expenses-master/${item.id}`}>
                    <div className='shadow py-3 bg-white border-r-5'>
                      <p className='text-center margin-0 t-theme-color'>{item.name}</p>
                    </div>
                  </Link>

                </div>
              </>
            ))}

          </div> */}

          <div className='row'>
            {apiDatas.length > 0 ? (
              apiDatas.map((item, index) => (
                <div className='col-md-3 py-2' key={index}>
                  <Link to={`/edit-expenses-master/${item.id}`}>
                    <div className='shadow py-3 bg-white border-r-5'>
                      <p className='text-center margin-0 t-theme-color'>{item.name}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Expense_Master;
import React, { useEffect, useState } from 'react'
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { MdOutlineDownloading } from 'react-icons/md';

const Expense_Master = () => {
  const [apiDatas, setApiDatas] = useState([]);
  const { employeeId } = useParams();

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

  const downloadExcel = () => {
    const transformedData = apiDatas.map(({ id, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, 'Expense-master.xlsx');
  };

  return (
    <>
      <Topbar />
      <Sidebar />

      <div className='main-content' id='mainbody'>
        <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
          <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to='' className='t-theme-color'>Expense Master</Link> </p>

          <div className='d-flex gap-2'>
          <button type="button" className='download-btn' onClick={downloadExcel}><MdOutlineDownloading className='icon'/> Export to Excel</button>

          <Link to={`/add-expenses-master/${employeeId}`} className='btn btn-bg-orange btn-sm b-radius-50'>Add Expense Master</Link>
          </div>
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
                  <Link to={`/edit-expenses-master/${employeeId}/${item.id}`}>
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
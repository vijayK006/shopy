import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';


const TargetStatus = () => {
    const [apiDatas, setApiDatas] = useState([]);
    const fetchData = () => {
      axios
        .get("https://digitalshopee.online/api/report/target-report.php")
        .then((res) => {
          const responseData = res.data || [];
          if (Array.isArray(responseData)) {
            setApiDatas(responseData);
            console.log(responseData)
          
  
          } else {
            console.error("Invalid data format:", responseData);
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    };
  
  
  
  
    useEffect(() => {
      fetchData();
    }, []);
  
  
  
    const columns = [
      { field: "displayOrder", headerName: "Sl.No", width: 70 },
      { field: "date", headerName: "Date", type: "Date", width: 150 },
      { field: "service_id", headerName: "Service Name", width: 200 },
      { field: "employee_id", headerName: "Employe Name", width: 200 },
      { field: "no_of_orders", headerName: "Order Qty.", width: 150 },
      { field: "total_amount", headerName: "Total Amount", width: 150 },
      { field: "target_type", headerName: "Target Type", width: 150 },
    ];
  
    const rows =
      apiDatas.length > 0
        ? apiDatas.map((item, index) => ({
          id: item.id || index,
          displayOrder: index + 1,
          // target_type: item.target_type,
          target_type: item.target_type === 'tin' ? 'In' : item.target_type === 'tout' ? 'Out' : 'Unknown',
          employee_id: item.employee_id,
          service_id: item.service_id,
          no_of_orders: item.no_of_orders,
          total_amount: item.total_amount,
          date: item.date,
        }))
        : [];
  
    const filterbtn = () => {
      const filtermenu = document.getElementById("filtermenu");
      filtermenu.classList.toggle("openfilter");
    };

  return (
    <div>
       <div style={{ height: '60vh', width: '100%' }} className="bg-white pt-3">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5} // Specify the page size
                    />


                </div>
    </div>
  )
}

export default TargetStatus

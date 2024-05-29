import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Topbar from "../../layouts/Topbar";
import Sidebar from "../../layouts/Sidebar";
import { FaFilter, FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { MdNoteAdd } from "react-icons/md";
import { BsArrowLeftRight } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";
import { BiReset } from "react-icons/bi";
import { TbFilterCog } from "react-icons/tb";

const TargetReport = () => {
  const [apiDatas, setApiDatas] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalAmountTin, setTotalAmountTin] = useState(0);
  const [totalOrdersTin, setTotalOrdersTin] = useState(0);
  const [totalAmountTout, setTotalAmountTout] = useState(0);
  const [totalOrdersTout, setTotalOrdersTout] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const fetchData = () => {
    axios
      .get("https://digitalshopee.online/api/report/target-report.php")
      .then((res) => {
        const responseData = res.data || [];
        if (Array.isArray(responseData)) {
          setApiDatas(responseData);
          console.log(responseData)
          calculateTotalAmountTin(responseData);
          calculateTotalOrdersTin(responseData);
          calculateTotalAmountTout(responseData);
          calculateTotalOrdersTout(responseData);

          // const resulttype = responseData.map(migratetype => migratetype.target_type);
          // if (resulttype.indexOf("tin") !== -1) {
          //   console.log('In');
          // } else if (resulttype.indexOf("tout") !== -1) {
          //   console.log('Out');
          // }

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

  const loadall = () => {
    fetchData();
    setStartDate("00-00-0000");
    setEndDate("00-00-0000");
    setTotalAmountTin(0);
    setTotalOrdersTin(0);
    setTotalAmountTout(0);
    setTotalOrdersTout(0);

    const refer = document.getElementById('refer');
    refer.style.display = "block"
  };

  const handleFilter = () => {
    let filteredData = apiDatas;

    // Filter by date range
    filteredData = filteredData.filter((item) => {
      const itemDate = new Date(item.from_date);
      const startDateObj = startDate ? new Date(startDate) : null;
      const endDateObj = endDate ? new Date(endDate) : null;

      if (startDateObj && endDateObj) {
        return itemDate >= startDateObj && itemDate <= endDateObj;
      } else if (startDateObj) {
        return itemDate >= startDateObj;
      } else if (endDateObj) {
        return itemDate <= endDateObj;
      }
      return true;
    });

    // Filter by selected service
    if (selectedService) {
      filteredData = filteredData.filter(
        (item) => item.service_id === selectedService
      );
    }

    if (selectedEmployee) {
      filteredData = filteredData.filter(item => item.employee_id === selectedEmployee);
    }

    // Calculate total amount for filtered data
    calculateTotalAmountTin(filteredData);
    calculateTotalOrdersTin(filteredData);
    calculateTotalAmountTout(filteredData);
    calculateTotalOrdersTout(filteredData);

    setApiDatas(filteredData);

    const refer = document.getElementById('refer');
    refer.style.display = "none"
  };

  const calculateTotalAmountTin = (data) => {
    const totaltin = data.reduce((acc, item) => {
      if (item.target_type === "tin") {
        return acc + parseFloat(item.total_amount);
      }
      return acc;
    }, 0);
    setTotalAmountTin(totaltin);
  };

  const calculateTotalOrdersTin = (data) => {
    const ordertin = data.reduce((acc, item) => {
      if (item.target_type === "tin") {
        return acc + parseFloat(item.no_of_orders);
      }
      return acc;
    }, 0);
    setTotalOrdersTin(ordertin);
  };

  const calculateTotalAmountTout = (data) => {
    const totaltout = data.reduce((acc, item) => {
      if (item.target_type === "tout") {
        return acc + parseFloat(item.total_amount);
      }
      return acc;
    }, 0);
    setTotalAmountTout(totaltout);
  };

  const calculateTotalOrdersTout = (data) => {
    const ordertout = data.reduce((acc, item) => {
      if (item.target_type === "tout") {
        return acc + parseFloat(item.no_of_orders);
      }
      return acc;
    }, 0);
    setTotalOrdersTout(ordertout);
  };

  // Extract unique service names
  const serviceNames = Array.from(
    new Set(apiDatas.map((item) => item.service_id))
  );

  const employeeNames = Array.from(new Set(apiDatas.map(item => item.employee_id)));


  const columns = [
    { field: "displayOrder", headerName: "Sl.No", width: 70 },
    { field: "from_date", headerName: "From Date", width: 150 },
    { field: "to_date", headerName: "To Date", width: 150 },
    { field: "service_id", headerName: "Service Name", width: 150 },
    { field: "employee_id", headerName: "Employe Name", width: 150 },
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
        from_date: item.from_date,
        to_date: item.to_date,
      }))
      : [];

  const filterbtn = () => {
    const filtermenu = document.getElementById("filtermenu");
    filtermenu.classList.toggle("openfilter");
  };
  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="main-content" id="mainbody">
        <div className="shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50 bread-parent">
          <p className="margin-0 font-w-500">
            <Link to="/">Dashboard</Link> /{" "}
            <Link to="/target-master" className="t-theme-color">
              Target Master Report
            </Link>
          </p>
          <div>
            {/* <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        
                        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                            <option value="">All Services</option>
                            {serviceNames.map(service => (  
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                        <button onClick={handleFilter}>Filter</button>
                        <button onClick={loadall}>reset</button>
                        */}
          </div>
          <div className="actions">
            {/* <Link
              to="/add-target-master"
              className="btn btn-bg-orange btn-sm b-radius-50 "
            >
              <MdNoteAdd style={{ fontSize: "18px", marginBottom: "2px" }} />{" "}
              Add Target Master
            </Link> */}
            &nbsp; &nbsp;
            <button
              type="button"
              className="btn btn-bg-orange btn-sm b-radius-50 "
              onClick={filterbtn}
            >
              <FaFilter style={{ marginBottom: "2px" }} /> Filter
            </button>
          </div>

          <div className="filter-card shadow p-2 b-radius-10" id="filtermenu">
            <div className="d-flex gap-3 align-items-center">
              <div className="form-head">
                <input
                  type="date"
                  className="filter-fields"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <span>
                {" "}
                <BsArrowLeftRight />{" "}
              </span>
              <div className="form-head">
                <input
                  type="date"
                  className="filter-fields"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-head">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="filter-fields"
              >
                <option value="">All Services</option>
                {serviceNames.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className='form-head'>
              <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} className='filter-fields'>
                <option value="">All Employees</option>
                {employeeNames.filter(Boolean).map(employee => (
                  <option key={employee} value={employee}>{employee}</option>
                ))}
              </select>
            </div>

            <div className="d-flex gap-2 justify-content-end pb-3">
              <button
                type="button"
                className="btn btn-bg-orange btn-sm letter-spacing-1"
                onClick={handleFilter}
                id="refer"
              >
                <TbFilterCog /> Check
              </button>

              <button
                type="button"
                className="btn btn-bg-orange btn-sm letter-spacing-1"
                onClick={loadall}
              >
                <BiReset /> Reset
              </button>
            </div>

            <p>
              Total Orders: {totalOrdersTin} | Total Amount: {totalAmountTin}{" "}
              <LuIndianRupee />
            </p>
            <p>
              Comp Orders: {totalOrdersTout} | Comp Amount: {totalAmountTout}{" "}
              <LuIndianRupee />
            </p>
            <p>
              Bal Orders: {totalOrdersTin - totalOrdersTout} | Bal Amount: {totalAmountTin - totalAmountTout} <LuIndianRupee />
            </p>
          </div>
        </div>

        <div style={{ height: "75vh", width: "100%" }} className="bg-white">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5} // Specify the page size
          />
        </div>
      </div>
    </>
  );
};

export default TargetReport;

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../layouts/Topbar';
import Sidebar from '../layouts/Sidebar';
import axios from 'axios';
import { BsArrowLeftRight } from 'react-icons/bs';
import { TbFilterCog } from 'react-icons/tb';
import { FaFilter } from 'react-icons/fa';
import { LuIndianRuper } from "react-icons/lu";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


const Sales_Details = () => {
    const [apiDatas, setApiDatas] = useState([]);
    const { employeeId } = useParams();
    const [totalAssignedAmount, setTotalAssignedAmount] = useState(0);
    const [totalAssigned, setTotalAssigned] = useState(0);
    const [totalBalanceAmount, setTotalBalanceAmount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalCompletedAmount, setTotalCompletedAmount] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();

        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Get the last day of the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Format dates to YYYY-MM-DD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Set the start date and end date
        setStartDate(formatDate(firstDayOfMonth));
        setEndDate(formatDate(lastDayOfMonth));
    }, []);

    const [valueData, setValueData] = useState({
        from_date: null,
        to_date: null
    });

    useEffect(() => {
        if (startDate && endDate) {
            setValueData({
                from_date: startDate,
                to_date: endDate
            });
        }
    }, [startDate, endDate]);

    useEffect(() => {
        if (valueData.from_date && valueData.to_date) {
            fetchData(valueData.from_date, valueData.to_date);
        }
    }, [valueData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedTargets = {
            from_date: valueData.from_date,
            to_date: valueData.to_date
        };

        axios.post('https://digitalshopee.online/api/other/target-table-api.php', formattedTargets, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log('Fetched sales details');
                fetchData(valueData.from_date, valueData.to_date); // Fetch data based on selected dates
            })
            .catch(err => console.log(err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValueData(prevValueData => ({
            ...prevValueData,
            [name]: value
        }));
    };

    const fetchData = (from_date = valueData.from_date, to_date = valueData.to_date) => {
        axios.post('https://digitalshopee.online/api/other/target-table-api.php', {
            from_date,
            to_date
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
                setApiDatas(res.data);
                calculateTotalBalanceAmount(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    };

    const handleThisMonth = () => {
        setValueData({
            from_date: startDate,
            to_date: endDate
        });
    };

    const handleReset = () => {
        setValueData({
            from_date: '0001-01-01',
            to_date: '5000-01-01'
        });
    }

    const calculateTotalBalanceAmount = (data) => {
        const totalBalAmount = data.reduce((acc, item) => acc + parseFloat(item.no_of_orders_balance_amount || 0), 0);
        const totalBal = data.reduce((acc, item) => acc + parseFloat(item.no_of_orders_balance || 0), 0);
        setTotalBalanceAmount(totalBalAmount);
        setTotalBalance(totalBal);

        const totalAssinAmount = data.reduce((acc, item) => acc + parseFloat(item.no_of_orders_assigned_amount || 0), 0);
        const totalAssin = data.reduce((acc, item) => acc + parseFloat(item.no_of_orders_assigned || 0), 0);
        setTotalAssignedAmount(totalAssinAmount);
        setTotalAssigned(totalAssin);

        const totalComptAmount = data.reduce((acc, item) => acc + parseFloat(item.no_of_orders_completed_amount || 0), 0);
        const totalCompt = data.reduce((acc, item) => acc + parseFloat(item.no_of_orders_completed || 0), 0);
        setTotalCompletedAmount(totalComptAmount);
        setTotalCompleted(totalCompt);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: 'displayOrder', headerName: 'Sl.No', width: 70 },
        { field: 'service', headerName: 'Service', width: 150 },
        { field: 'no_of_orders_assigned', headerName: 'Assigned', width: 150 },
        { field: 'no_of_orders_completed', headerName: 'Completed', width: 150 },
        { field: 'no_of_orders_balance', headerName: 'Balance', width: 150 },
        { field: 'no_of_orders_assigned_amount', headerName: 'Assigned Amount', width: 150 },
        { field: 'no_of_orders_completed_amount', headerName: 'Completed Amount', width: 150 },
        { field: 'no_of_orders_balance_amount', headerName: 'Balance Amount', width: 150 }
    ];

    const rows = apiDatas.length > 0 ? apiDatas.map((item, index) => ({
        id: item.id || index,
        displayOrder: index + 1,
        service: item.service,
        no_of_orders_assigned: item.no_of_orders_assigned,
        no_of_orders_completed: item.no_of_orders_completed,
        no_of_orders_balance: item.no_of_orders_balance,
        no_of_orders_assigned_amount: item.no_of_orders_assigned_amount,
        no_of_orders_completed_amount: item.no_of_orders_completed_amount,
        no_of_orders_balance_amount: item.no_of_orders_balance_amount,
    })) : [];

    const filterbtn = () => {
        const filtermenu = document.getElementById("filtermenu");
        filtermenu.classList.toggle("openfilter");

        setValueData({
            from_date: startDate,
            to_date: endDate
        });
    };

    return (
        <>

                <div className='px-3 py-2 mt-3 mb-3 d-flex justify-content-between align-items-center  b-radius-50 position-relative'>
                    <div className='d-flex gap-2'>
                        <button type='button' onClick={handleThisMonth} className="btn btn-bg-orange btn-sm b-radius-50 ">Target This Month</button>
                        <button type='button' onClick={handleReset} className="btn btn-bg-orange btn-sm b-radius-50 ">All Target</button>
                    </div>
                    <button
                        type="button"
                        className="btn btn-bg-orange btn-sm b-radius-50 "
                        onClick={filterbtn}
                    >
                        <FaFilter style={{ marginBottom: "2px" }} /> Filter
                    </button>

                    <div className="filter-card shadow p-2 b-radius-10" id="filtermenu">
                        <form className="d-flex gap-3 align-items-center" onSubmit={handleSubmit}>
                            <div className="form-head">
                                <input
                                    type="date"
                                    className="filter-fields"
                                    value={valueData.from_date} name='from_date' onChange={handleChange}
                                    style={{ border: "none" }}
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
                                    value={valueData.to_date} name='to_date' onChange={handleChange}
                                    style={{ border: "none" }}
                                />
                            </div>
                            <div className="d-flex gap-2 justify-content-end ">
                                {/* <button type="submit" className="btn btn-bg-orange btn-sm letter-spacing-1" id="refer">
                                    <TbFilterCog /> Check
                                </button> */}



                            </div>
                        </form>

                    </div>

                </div>

                <div className="row pb-4">

<div className="col-4 my-3">

<div className='shadow p-3 bg-white  b-radius-10'>
<p className='t-theme'>Target Assigned</p>
<h5 className='m-0 t-xxlg'>{totalAssigned}</h5>
</div>

</div>

<div className="col-4 my-3">

<div className='shadow p-3 bg-white  b-radius-10'>
<p className='t-theme'>Target Completed</p>
<h5 className='m-0 t-xxlg'>{totalCompleted}</h5>
</div>

</div>

<div className="col-4 my-3">

<div className='shadow p-3 bg-white  b-radius-10'>
<p className='t-theme'>Target Balance</p>
<h5 className='m-0 t-xxlg'>{totalBalance}</h5>
</div>

</div>

                    <div className="col-4 position-relative">
                        <div className="d-flex justify-content-center">
                            <h6 className="gaige-header t-gray">Assigned Amount</h6>
                            <Gauge value={totalAssignedAmount} startAngle={-110} endAngle={110} valueMax={totalAssignedAmount + 1000}
                                innerRadius="90%"
                                outerRadius="100%"
                                cornerRadius="50%"
                                sx={{
                                    width: '170px',
                                    height: '170px',
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 18,
                                        transform: 'translate(0px, -30px)',

                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                        fill: '#ff6423',
                                    },
                                }}
                                text={
                                    ({ value, valueMax }) => `${value}`
                                }
                            />
                        </div>

                    </div>

                    <div className="col-4 position-relative">
                        <div className="d-flex justify-content-center">
                            <h6 className="gaige-header t-gray">Completed Amount</h6>
                            <Gauge value={totalCompletedAmount} startAngle={-110} endAngle={110} valueMax={totalAssignedAmount}
                                innerRadius="90%"
                                outerRadius="100%"
                                cornerRadius="50%"
                                sx={{
                                    width: '170px',
                                    height: '170px',
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 19,
                                        transform: 'translate(0px, -30px)',
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                        fill: '#ff6423',

                                    },
                                }}
                                text={
                                    ({ value, valueMax }) => `${value}`
                                }
                            />
                        </div>

                    </div>

                    <div className="col-4 position-relative">
                        <div className="d-flex justify-content-center">
                            <h6 className="gaige-header t-gray"> Balance Amount</h6>
                            <Gauge value={totalBalanceAmount} startAngle={-110} endAngle={110} valueMax={totalAssignedAmount}
                                innerRadius="90%"
                                outerRadius="100%"
                                cornerRadius="50%"
                                sx={{
                                    width: '170px',
                                    height: '170px',
                                    [`& .${gaugeClasses.valueText}`]: {
                                        fontSize: 19,
                                        transform: 'translate(0px, -30px)',
                                    },
                                    [`& .${gaugeClasses.valueArc}`]: {
                                        fill: '#ff6423',

                                    },
                                }}
                                text={
                                    ({ value, valueMax }) => `${value}`
                                }
                            />
                        </div>

                    </div>




                </div>

                <div style={{ height: '75vh', width: '100%' }} className="bg-white position-relative">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                    />
                </div>
       
        </>
    );
};

export default Sales_Details;



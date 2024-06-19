// Bill.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { generatePDF } from '../../Components/pdfUtils'; // Import the PDF generation function
import axios from 'axios';
const Bill_pdf = () => {
    const { id, employeeId } = useParams();

const [valueData, setValueData] = useState([])
    useEffect(() => {
        // Fetch the bill data
        axios.get(`https://digitalshopee.online/api/bill/get-id-bill.php?id=${id}`)
            .then(response => {
                const firmData = response.data[0]; // Assuming response.data contains the firm data
                console.log(firmData)
                setValueData({
                    id: firmData.id,
                    client_id: firmData.client_id,
                    date: firmData.date,
                    receipt: firmData.receipt,
                    ack_no: firmData.ack_no,
                    remark_1: firmData.remark_1,
                    total: firmData.total,
                    items: firmData.items || [{ service_code: '', service_name: '', quantity: '', amount: '', remark: '' }]
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className='main-content' id='mainbody'>

                <div className='shadow px-3 py-2 mb-3 d-flex justify-content-between align-items-center bg-white b-radius-50'>
                    <p className='margin-0 font-w-500'>
                        <Link to={`/${employeeId}`}>Dashboard</Link> / 
                        <Link to='' className='t-theme-color'>Bill(BETA)</Link>
                    </p>
                    <div className=''>
                        <button 
                            type='button' 
                            className='btn btn-success' 
                            onClick={generatePDF} // Call the PDF generation function on click
                        >
                            Download Bill
                        </button>
                    </div>
                </div>

                {/* Bill content to be converted to PDF */}
                <div id='billContent' className='shadow bg-white b-radius-10 p-3'>
<h1 className='text-center' style={{color:"red"}}>Digital Shopee</h1>
<div className='d-flex justify-content-between'>
<p>Client Name: {valueData.client_id}</p>
<p className='t-theme'> Date : {valueData.date}</p>
</div>
                </div>

            </div>
        </>
    );
};

export default Bill_pdf;

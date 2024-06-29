// Bill.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { generatePDF } from '../../Components/pdfUtils'; // Import the PDF generation function
import axios from 'axios';
const Bill_pdf = () => {
    const { id, employeeId } = useParams();

    const [valueData, setValueData] = useState({
        id: '',
        client_id: '',
        date: '',
        receipt: '',
        ack_no: '',
        remark_1: '',
        total: '',
        items: [] // Ensure items is an array by default
    });


    useEffect(() => {
        // Fetch the bill data
        axios.get(`https://digitalshopee.online/api/bill/get-id-bill.php?id=${id}`)
            .then(response => {
                const firmData = response.data[0]; // Assuming response.data contains the firm data
                console.log(firmData)
                setValueData({
                    id: firmData.id,
                    client_name: firmData.client_name,
                    client_mobile: firmData.client_phone,
                    date: firmData.date,
                    receipt: firmData.receipt,
                    ack_no: firmData.ack_no,
                    remark_1: firmData.remark_1,
                    total: firmData.total,
                    // items: firmData.items || [{ service_code: '', service_name: '', quantity: '', amount: '', remark: '' }]
                    items: firmData.items || []
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
                    <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/bill-generation/${employeeId}`}>Bills</Link> / <Link className='t-theme-color'>Bill PFD</Link></p>
                        
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
                <div id='billContent' className='shadow bg-white p-3 border-t-orange pt-5 mb-5'>
                    <div className='d-flex justify-content-between align-items-center py-4'>
                        <h1 className='t-theme'>Digital Shopee</h1>

                        <p className='t-gray t-md m-0'>Acknowledge No.: <span className='t-black'>{valueData.ack_no}</span></p>
                    </div>

                    <div className='d-flex justify-content-between border-top border-bottom py-5 px-3 mb-3'>
                        <div className='client-info w-50'>
                            <h5><b>Bill to,</b></h5>
                            <p className='t-gray t-md m-0 pb-3'>Client Name: <span className='t-black '>{valueData.client_name}</span></p>

                            <p className='t-gray t-md m-0'>Mobile No: <span className='t-black '>{valueData.client_mobile}</span></p>
                        </div>

                        <div className='client-info'>
                            <p className='t-gray t-md m-0'>Date: <span className='t-black'>{valueData.date}</span></p>
                            <p className='t-gray t-md m-0 pt-2'>Receipt: <span className='t-black '>{valueData.receipt}</span></p>
                        </div>

                    </div>

                    <h3 className='text-center py-4'>Receipt</h3>
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th>Service Code</th>
                                <th>Service Name</th>
                                <th>Remark</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>

                            {valueData.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.service_code}</td>
                                    <td>{item.service_name}</td>
                                    <td>{item.remark}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.amount}</td>

                                </tr>
                            ))}

                            <tr>
                                <td><b>Total</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>{valueData.total}</b></td>
                            </tr>

                        </tbody>
                    </table>

<div className='d-flex justify-content-between'>
<p className='py-3'>Remark: {valueData.remark_1}</p>

</div>
                </div>

            </div>
        </>
    );
};

export default Bill_pdf;

// Bill.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Topbar from '../layouts/Topbar';
import Sidebar from '../layouts/Sidebar';
import { generatePDF } from '../Components/pdfUtils'; // Import the PDF generation function

const Bill = () => {
    const employeeId = 1; // This should be dynamically set based on your application logic

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
                <div id='billContent'>
                    <h2>Bill Details</h2>
                    <p>Customer Name: Testing</p>
                    <p>Mobile No: 111111111</p>
                    <p>Amount: 100/-</p>
                    {/* Add more details as needed */}
                </div>

            </div>
        </>
    );
};

export default Bill;

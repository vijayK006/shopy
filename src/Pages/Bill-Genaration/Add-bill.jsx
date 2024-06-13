import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../../layouts/Topbar';
import Sidebar from '../../layouts/Sidebar';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Add_bill = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const [getClientName, setGetClientName] = useState([]);
  useEffect(() => {
    axios.get('https://digitalshopee.online/api/client/get-client.php')
      .then(res => {
        // const migrateclientname = res.data.map(client => client.name)
        const migrateClientName = res.data.map(client => client.name).sort((a, b) => a.localeCompare(b));
        setGetClientName(migrateClientName)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const [getServiceName, setGetServiceName] = useState([]);
  useEffect(() => {
    axios.get('https://digitalshopee.online/api/service/get-service.php')
      .then(res => {
        // const migrateServicename = res.data.map(service => service.name).sort((a, b) => a.localeCompare(b))
        const migrateServicename = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setGetServiceName(migrateServicename)
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const [formData, setFormData] = useState({
    client_id: '',
    date: '',
    receipt: '',
    ack_no: '',
    remark_1: '',
    totalamount: '',
    items: [
      { service_code: '', service_name: '', quantity: '', amount: '', remark: '' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;

        // If the service name is changed, update the service code accordingly
        if (name === 'service_name') {
          const selectedService = getServiceName.find(service => service.name === value);
          if (selectedService) {
            items[index].service_code = selectedService.code;
          } else {
            items[index].service_code = '';
          }
        }

    setFormData({ ...formData, items });
    calculateTotalAmount();
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { service_code: '', service_name: '', quantity: '', amount: '', remark: '' }]
    });
  };

  const removeItem = (index) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://digitalshopee.online/api/bill/add-bill.php', formData)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const calculateTotalAmount2 = () => {
    let totalAmount = 0;
    formData.items.forEach(item => {
      totalAmount += parseFloat(item.amount) || 0;
    });
    return totalAmount;
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    formData.items.forEach(item => {
      totalAmount += parseFloat(item.amount) || 0;
    });
    setFormData({ ...formData, totalamount: totalAmount }); // Update totalamount in formData
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <div className='main-content' id='mainbody'>

        <div className='shadow px-3 py-2 mb-2 d-flex justify-content-between align-items-center bg-white b-radius-50'>
          <p className='margin-0 font-w-500'><Link to={`/${employeeId}`}>Dashboard</Link> / <Link to={`/bill-generation/${employeeId}`}>Bills</Link> / <Link className='t-theme-color'>Add Bill</Link></p>
        </div>

        <div className='container-fluid mb-5'>
          <form onSubmit={handleSubmit}>
            <div className='row shadow p-3 mt-2 bg-white b-radius-10'>
              <div className='row'>

                <div className='col-md-3 py-1'>
                  <label className='text-sm font-w-500 p-2'>Select Client</label>

                  <select className='form-control' value={formData.client_id} name='client_id' onChange={handleChange}>
                    <option value="">Select Service </option>
                    {getClientName.map((name, index) => (
                      <option key={index} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className='col-md-3 py-1'>
                  <label className='text-sm font-w-500 p-2'>Date</label>
                  <input type='date' className='form-control' value={formData.date} name='date' placeholder='' onChange={handleChange} />
                </div>

                <div className='col-md-3 py-1'>
                  <label className='text-sm font-w-500 p-2'>Receipt</label>
                  <input type='text' className='form-control' value={formData.receipt} name='receipt' placeholder='' onChange={handleChange} />
                </div>

                <div className='col-md-3 py-1'>
                  <label className='text-sm font-w-500 p-2'>Acknowledge Number</label>
                  <input type='text' className='form-control' value={formData.ack_no} name='ack_no' placeholder='' onChange={handleChange} />
                </div>

                <div className='col-md-3 py-1'>
                  <label className='text-sm font-w-500 p-2'>Remark</label>
                  <input type='text' className='form-control' value={formData.remark_1} name='remark_1' placeholder='' onChange={handleChange} />
                </div>

              </div>
            </div>

            <hr />


            <div>

              {formData.items.map((item, index) => (
                <div key={index} className='row  border-1px p-3 mt-2 bg-white b-radius-10'>

<div className='col-md-3 py-1'>
                    <label className='text-sm font-w-500 p-2'>Select Service</label>
                    <select className='form-control' value={item.service_name} name='service_name' onChange={(e) => handleItemChange(index, e)}>
                      <option value="">Select Service </option>
                      {getServiceName.map((service, index) => (
                        <option key={index} value={service.name}>{service.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className='col-md-3 py-1 '>
                    <label className='text-sm font-w-500 p-2'>Service Code</label>

                    <input type="text" name="service_code" placeholder="Service Code" className='form-control' value={item.service_code} onChange={(e) => handleItemChange(index, e)}
readOnly/>

                  </div>

                 

                  <div className='col-md-3 py-1'>
                    <label className='text-sm font-w-500 p-2'>Service Quantity</label>
                    <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} className='form-control' onChange={(e) => handleItemChange(index, e)}

                    />
                  </div>


                  <div className='col-md-3 py-1'>
                    <label className='text-sm font-w-500 p-2'>Service Amount</label>
                    <input type="number" name="amount" placeholder="Amount" value={item.amount} className='form-control' onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>

                  <div className='col-md-3 py-1'>
                    <label className='text-sm font-w-500 p-2'>Service Remark</label>
                    <input type="text" name="remark" placeholder="Remark" value={item.remark} className='form-control' onChange={(e) => handleItemChange(index, e)}
                    />
                  </div>

                  <div className='d-flex justify-content-between pt-4'>
                    <button type="button" onClick={() => removeItem(index)} className='btn btn-bg-orange'>Remove</button>

                  </div>
                </div>
              ))}
            </div>

            <div className='d-flex justify-content-between pt-4 gap-4'>
{/* <p>Total Amount: {calculateTotalAmount()}</p> */}
<input type='text' className='btn btn-bg-orange' value={formData.totalamount} name='totalamount' placeholder='Total Amount' onChange={handleChange} readOnly/>

<div className='d-flex gap-3'>
      <button type="button" onClick={addItem} className='btn btn-bg-orange mr-2'>Add Item</button>
              <button type="submit" className='btn btn-bg-orange' style={{ width: "200px" }}>Submit</button>
</div>
          
            </div>

          </form>
        </div>

      </div>

    </>

  );
};

export default Add_bill;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://shopee-firm.000webhostapp.com/api/firm/get-firm.php')
      .then(res => {
        console.log(res.data);
        // Check if res.data is an array before setting the state
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          // If res.data is not an array, handle the error or set a default value
          console.error('Data received is not an array:', res.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-3">
      <h2>Basic Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Email ID</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the data array to render table rows */}
          {data.map((userdata, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{userdata.firm_name}</td>
              <td>{userdata.owner_name}</td>
              <td>{userdata.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to='/' className='btn btn-primary'>Back to Home</Link>
    </div>
  );
};

export default Users;

import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../layouts/Topbar'
import Sidebar from '../layouts/Sidebar'

const Home = () => {
  const  [valuesData, setValuesData] = useState({
    id:'',
    username:'',
    useremail:'',
    usermobile:''
  })

  const handleSubmit = (e)=>{
e.preventDefault();
axios.post('http://localhost:8081/user', valuesData)
.then(res => console.log('Form Submitted Successfully'))
.catch(err => console.log(err))
  }
  return (
    <>


<Topbar/>
    <Sidebar/>

<div className='main-content' id='mainbody'>
<div className="container-fluid mt-3">
  <h2>Stacked form</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-3 mt-3">
      <label for="name">Id</label>
      <input type="number" className="form-control"  placeholder="Enter userid" 
        onChange={e=> setValuesData({...valuesData, id:e.target.value})}
      />
    </div>

    <div className="mb-3 mt-3">
      <label for="name">Name</label>
      <input type="text" className="form-control" placeholder="Enter name" 
        onChange={e=> setValuesData({...valuesData, username:e.target.value})}
      />
    </div>

    <div className="mb-3 mt-3">
      <label for="name">Email</label>
      <input type="email" className="form-control" placeholder="Enter email" 
        onChange={e=> setValuesData({...valuesData, useremail:e.target.value})}
      />

    </div>

    
    <div className="mb-3 mt-3">
      <label for="name">Mobile</label>
      <input type="number" className="form-control"  placeholder="Enter mobile" 
        onChange={e=> setValuesData({...valuesData, usermobile:e.target.value})}
      />

    </div>
  
   
   <div className='d-flex gap-4'>
   <input type="submit" className="btn btn-primary" value="Submit"/>
  <Link to='/User' className='btn btn-warning'>Go to Active User Page</Link>
   </div>
    
  </form>

</div>

        </div>


    </>
  )
}

export default Home

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Topbar from '../layouts/Topbar'
import Sidebar from '../layouts/Sidebar'

const Details = () => {
const {id} = useParams();
useEffect(()=>{
  axios.get(`http://localhost:8081/read/${id}`)
  .then(res=> console.log(res))
  .catch(err=> console.log(err))
}, [id])
  return (
    <>


<Topbar/>
    <Sidebar/>

<div className='main-content' id='mainbody'>
<h1>Form Details</h1>



        </div>


    </>
  )
}

export default Details

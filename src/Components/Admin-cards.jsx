import React from 'react'
import { Link } from 'react-router-dom'


const AddCreadentials = ({ cardtitle, icon: Icon, iconColor, borderRcolor, cardbg, circlebg, datacount, pageLink }) => {
    const Ioncolor = {
        color: iconColor
    }

    const admincardbordercolor = {
        borderRight: borderRcolor,
    }

    const admincardbg = {
        backgroundColor: cardbg
    }

    const circle1bg = {
        backgroundColor: circlebg
    }



    return (
        <>
            <div className='col-md-3 pt-md-1 pb-md-1 pt-2 pb-2'>
            <Link to={pageLink}>
                <div className='admin-card' style={{ admincardbordercolor }}>
                    <div className='details'>
                        <h5 className='head'>{cardtitle}</h5>
                        <h2 className='margin-0'>{datacount}</h2>
                    </div>
                    <Icon className='icons' style={Ioncolor} />
                    <div className='card-bg' style={admincardbg} />
                    <div className='circle1' style={circle1bg} />
                    <div className='circle2' style={circle1bg} />
                </div>
            </Link>
                


            </div>



        </>

    )
}

export default AddCreadentials;

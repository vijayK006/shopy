import React from 'react'


const AddCreadentials = ({ cardtitle, icon: Icon, iconColor, borderRcolor, cardbg, circlebg }) => {
    const Ioncolor = {
        color: iconColor
    }

    const admincardbordercolor = {
        borderRight: borderRcolor
    }

    const admincardbg = {
        backgroundColor: cardbg
    }

    const circle1bg = {
        backgroundColor: circlebg
    }

    const adminform = () => {
        document.getElementById('creadform').classList.add('openadminform')
    }

    return (
        <>
            <div className='col-md-3 pt-md-1 pb-md-1 pt-2 pb-2'>
                <div className='admin-card' style={{ admincardbordercolor }} onClick={adminform}>
                    <div className='details'>
                        <h5 className='head'>{cardtitle}</h5>
                        <h2 className='margin-0'>0</h2>
                    </div>
                    <Icon className='icons' style={Ioncolor} />
                    <div className='card-bg' style={admincardbg} />
                    <div className='circle1' style={circle1bg} />
                    <div className='circle2' style={circle1bg} />
                </div>


            </div>



        </>

    )
}

export default AddCreadentials;

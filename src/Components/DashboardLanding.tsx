import React, { useEffect, useState } from 'react'

export default function DashboardLanding() {

    const [fullName, setFullName] = useState('');

    useEffect(() => {
        let userInfo: any = localStorage.getItem('userInfo')
        let finalData = JSON.parse(userInfo)
        let fullName = finalData?.first_name + ' ' + finalData?.last_name
        setFullName(fullName)
    }, [])

    return (
        <div>
            {
                <div className='container'>
                    <h4 className='nametemplate' style={{ textAlign: 'center', marginTop: '220px' }}>Welcome {fullName}</h4>
                </div>
            }
        </div>
    )
}

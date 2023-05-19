import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import DashboardLanding from '@/Components/DashboardLanding';
import Footer from '@/Components/Footer';

// import Withauth from '../lib/front-end/withAuth';



const Dashboard = () => {
    const [addUserShowModal, setAddUserShowModal] = useState(false)
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        let userInfo:any = localStorage.getItem('userInfo')
        let finalData = JSON.parse(userInfo)
        let fullName = finalData?.first_name + ' ' + finalData?.last_name
        setFullName(fullName)
    }, [])

    const openAddModel = () => {
        setAddUserShowModal(!addUserShowModal)
    }

    return (
        <div>
            <Navbar openAddModel={openAddModel}/>
            <DashboardLanding/>
            <Footer/>
        </div>
    )
}


// export default Withauth(Dashboard);
export default Dashboard;

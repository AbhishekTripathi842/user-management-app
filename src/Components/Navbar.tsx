import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import * as IoIcons from 'react-icons/ai';
import Link from 'next/link'
import { useRouter } from 'next/router';

function Navbar(props: any) {

    const { push } = useRouter();

    const [sidebar, setSidebar] = useState(false);
    const [userId, setUserId] = useState()
    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        let userInfo: any = localStorage.getItem('userInfo')
        let finalData = JSON.parse(userInfo)
        let id = finalData?.id
        setUserId(id)
    }, [])

    const handleLogout = () => {
        loginApi(userId)
    }

    const loginApi = async (id: any) => {


        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "string"
            },
            body: id
        })
            .then(res => res.json())
            .then((data) => {
                localStorage.removeItem("userInfo");
                push('/');
            })
    }

    // let userName = userInfo.first_name + userInfo.last_name

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    {/* <Link href='#' className='menu-bars'> */}
                    <div style={{ color: 'white', fontSize: '20px', marginLeft: '40px' }}>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </div>
                    {/* </Link> */}

                    <div style={{ fontSize: '30px', marginRight: '40px' }}>


                        <div className="dropdown">
                            <IoIcons.AiOutlineUser />
                            <div className="dropdown-content">

                                <ul
                                >
                                    <li>
                                        <Link href='' onClick={handleLogout}>Logout</Link>
                                    </li>

                                </ul>


                            </div>
                        </div>

                    </div>

                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            {/* <Link href='#' className='menu-bars'> */}
                            <AiIcons.AiOutlineClose />
                            {/* </Link> */}
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link href={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;

import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';
import Loader from '@/Components/Loader';
import Link from 'next/link'
import { useRouter } from 'next/router';
// import Withauth from '../../lib/front-end/withAuth';
import Pagination from '@/common/pagination';

import Navbar from '../../Components/Navbar';
import Footer from '@/Components/Footer';
const Users = () => {

    const { push } = useRouter();

    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [addUserShowModal, setAddUserShowModal] = useState(false)

    const fetchData = () => {
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_FE_URL}/api/user`)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const openAddModel = () => {
        setAddUserShowModal(!addUserShowModal)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = users.slice(startIndex, endIndex);

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Navbar openAddModel={openAddModel} />
            {
                !isLoading ?
                    <div>
                        <div className='container'>

                            <div>
                                <div className="row mt-2" style={{ height: '10%' }}>
                                    <div className="col-sm-12 text-end" >
                                        <Link href='/users/add' className='add-btn px-4'><i className="bi bi-plus-lg"></i> Add User</Link>
                                        {/* <input type="text"  placeholder="Search..." className='add-btn px-5' style={{ marginLeft: '1%'}}/> */}
                                    </div>
                                </div>
                            </div>

                            {/* <div className="table-wrapper-scroll-y my-custom-scrollbar mt-5"> */}
                            <table className="table table-striped mt-2">
                                <thead>
                                    <tr>
                                        <th className='px-5'>#Id</th>
                                        <th className='px-5'>FirstName</th>
                                        <th className='px-5'>LastName</th>
                                        <th className='px-5'>Address</th>
                                        <th className='px-5'>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentItems.map((data: any, index) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <td className='px-5'>{data?.id}</td>
                                                    <td className='px-5' data-toggle="tooltip" data-placement="top" title='click here for detail'><Link href={`users/${data.id}`} style={{ color: 'black' }}>{data?.first_name}</Link></td>
                                                    <td className='px-5'>{data?.last_name}</td>
                                                    <td className='px-5' data-toggle="tooltip" data-placement="top" title={data?.address}>{data?.address}</td>
                                                    <td className='px-5'>{data?.email}</td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>
                            {/* </div> */}
                            <div className='pagination custompagination'>
                                <Pagination
                                    pageCount={users.length}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                    limit={itemsPerPage}

                                />
                            </div>
                        </div>
                    </div>
                    :
                    <Loader />
            }
            <Footer />
        </>
    )
}

// export default Withauth(Users);
export default Users;


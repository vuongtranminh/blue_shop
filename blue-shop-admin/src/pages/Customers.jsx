import React, { useEffect, useState } from 'react'

import Table from '../components/table/Table'

import Button from '../components/button/Button'
import Modal from '../components/modal/Modal'
import Input from '../components/input/Input'
import Toast from '../common/toastify'
import * as UserService from '../services/UserService'

const userTableHead = [
    '',
    'Tên khách hàng',
    'Ảnh đại diện',
    'Email',
    'Số điện thoại',
    // 'Hành động',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const Body = (props) => {

    const { item, index } = props

    // const handleEdit = () => {
    //     props.onEdit()
    // }

    // const handleDelete = () => {
    //     props.onDelete()
    // }

    return <tr key={index}>
        <td>{item.id}</td>
        <td>{item.displayName}</td>
        <td>
            <div className="table__image">
                <img src={item.avatar} />
            </div>
        </td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>
            <div className="d-flex jcb aic">
                {/* <div className="table__action"><i className='bx bx-edit-alt' onClick={handleEdit} ></i></div> */}
                {/* {item.roleId !== 3 && <div className="table__action"><i className='bx bx-trash' onClick={handleDelete} ></i></div>} */}
            </div>
        </td>
    </tr>
}

const PAGE = 1
const SIZE = 10

const Customers = () => {

    const [users, setUsers] = useState([])
    const [page, setPage] = useState(PAGE)
    const [totalPage, setTotalPage] = useState(0)
    const [userIdDelete, setUserIdDelete] = useState(null)
    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const loadData = (page, size) => {
        UserService.getAll(page, size)
            .then(res => {
                if(res?.data?.success) {
                    setUsers(res?.data?.data?.content)
                    setTotalPage(res?.data?.data?.meta.totalPage)
                }
            })
    }

    useEffect(() => {
        loadData(page, SIZE)
    }, [])

    const handleSelectPage = (page) => {
        setPage(page)
        loadData(page, SIZE)
    }

    return (
        <div>
            <h2 className="page-header">
                Khách hàng
            </h2>
            {/* <div className="d-flex jce">
                <Button label="Tạo" />
            </div> */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                headData={userTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                page={page}
                                totalPage={totalPage}
                                onSelectPage={(page) => handleSelectPage(page)}
                            >
                                {users.map((user, index) => 
                                    <Body 
                                        index={index}
                                        item={user}
                                        // onEdit={() => handleEdit(user)}
                                        // onDelete={() => handleDelete(user.id)}
                                    />
                                )}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers

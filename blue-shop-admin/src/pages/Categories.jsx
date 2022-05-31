import React, { useEffect, useState } from 'react'

import Table from '../components/table/Table'

import Button from '../components/button/Button'
import Modal from '../components/modal/Modal'
import Input from '../components/input/Input'
import Toast from '../common/toastify'
import * as CategoryService from "../services/CategoryService"
import * as FileService from "../services/FileService"

const categoryTableHead = [
    '',
    'Ảnh danh mục',
    'Tên danh mục',
    'Mô tả',
    'Hành động',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const Body = (props) => {

    const { item, index } = props

    const handleEdit = () => {
        props.onEdit()
    }

    const handleDelete = () => {
        props.onDelete()
    }

    return <tr key={index}>
        <td>{item.id}</td>
        <td>
            <div className="table__image">
                <img src={item.image} />
            </div>
        </td>
        <td>{item.categoryName}</td>
        <td>{item.description}</td>
        <td>
            <div className="d-flex jcb aic">
                <div className="table__action"><i className='bx bx-edit-alt' onClick={handleEdit} ></i></div>
                <div className="table__action"><i className='bx bx-trash' onClick={handleDelete} ></i></div>
            </div>
        </td>
    </tr>
}

const PAGE = 1
const SIZE = 10

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [page, setPage] = useState(PAGE)
    const [totalPage, setTotalPage] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [category, setCategory] = useState({
        categoryName: '',
        description: '',
        image: null,
    })

    const [isEdit, setIsEdit] = useState(false)

    const [previewImg, setPreviewImg] = useState(null)

    const [categoryIdDelete, setCategoryIdDelete] = useState(null)

    const loadData = (page, size) => {
        CategoryService.getAll(page, size)
            .then(res => {
                if(res?.data?.success) {
                    setCategories(res?.data?.data?.content)
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

    const handleAdd = () => {
        setIsOpen(true)
    }

    const handleClickSecondBtn = () => {
        setIsOpen(false)
        setPreviewImg(null)
        setCategory({
            categoryName: '',
            description: '',
            image: null,
        })
        setIsEdit(false)
    }

    const handleClickPrimaryBtn = () => {
        if(isEdit) {
            if(category.image !== previewImg) {
                FileService.uploadFile(category.image)
                .then(res => {
                    if(res?.data?.success) {
                        const categoryUpdate = {...category, image: res?.data?.data}
                        return CategoryService.update(category.id, categoryUpdate)
                    } else {
                        Toast.error('Cập nhật danh mục thất bại!')
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success('Cập nhật danh mục thành công!')
                        handleClickSecondBtn()
                        loadData(page, SIZE)
                    }
                })
                .catch(err => Toast.error('Cập nhật danh mục thất bại!'))
            } else {
                CategoryService.update(category.id, category)
                    .then(res => {
                        if(res?.data?.success) {
                            Toast.success('Cập nhật danh mục thành công!')
                            handleClickSecondBtn()
                            loadData(page, SIZE)
                        }
                    })
                    .catch(err => Toast.error('Cập nhật danh mục thất bại!'))
            }
        } else {
            FileService.uploadFile(category.image)
                .then(res => {
                    if(res?.data?.success) {
                        const newCategory = {...category, image: res?.data?.data}
                        return CategoryService.insert(newCategory)
                    } else {
                        Toast.error('Cập nhật danh mục thất bại!')
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        handleClickSecondBtn()
                        Toast.success('Thêm danh mục thành công!')
                        loadData(page, SIZE)
                    }
                })
                .catch(err => Toast.error('Thêm danh mục thất bại!'))  
        }
    }

    const handleChange = (name, value) => {
        if(name !== 'image') {
            setCategory({
                ...category,
                [name]: value,
            })
        } else {
            const file = value.files[0]

            if(!file) {
                Toast.error('Vui lòng upload file')
                return;
            }

            if(file.size > 5000000) {
                Toast.error('File phải nhỏ hơn 5MB')
                return;
            }

            const preview = URL.createObjectURL(file)

            setPreviewImg(preview)
            setCategory({
                ...category,
                [name]: file,
            })
        }
        
    }

    useEffect(() => {
        return () => {
            previewImg && URL.revokeObjectURL(previewImg)
        }
    }, [previewImg])

    const handleEdit = (category) => {
        setIsEdit(true)
        setIsOpen(true)
        setCategory(category)
        setPreviewImg(category.image)
    }

    const handleDelete = (id) => {
        setCategoryIdDelete(id)
        setIsOpenDelete(true)
    }

    const handleCancelDelete = () => {
        setIsOpenDelete(false)
        setCategoryIdDelete(null)
    }

    const handleAcceptDelete = () => {
        CategoryService.deleteById(categoryIdDelete)
            .then(res => {
                if(res?.data?.success) {
                    Toast.success('Xóa danh mục thành công!')
                    loadData(page, SIZE)
                    setCategoryIdDelete(null)
                    setIsOpenDelete(false)
                } else {
                    setCategoryIdDelete(null)
                    setIsOpenDelete(false)
                    Toast.error('Xóa danh mục thất bại!')
                }
            })
            .catch(err => {
                setCategoryIdDelete(null)
                setIsOpenDelete(false)
                Toast.error('Xóa danh mục thất bại!')
            })
    }

    return (
        <div>
            <h2 className="page-header">
                Danh mục
            </h2>
            <div className="d-flex jce">
                <Button label="Tạo" onClick={handleAdd} />
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                headData={categoryTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                page={page}
                                totalPage={totalPage}
                                onSelectPage={(page) => handleSelectPage(page)}
                            >
                                {categories.map((category, index) => 
                                    <Body 
                                        index={index}
                                        item={category}
                                        onEdit={() => handleEdit(category)}
                                        onDelete={() => handleDelete(category.id)}
                                    />
                                )}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal header={isEdit ? 'Sửa danh mục' : 'Thêm danh mục'} 
                open={isOpen} 
                onClickSecondBtn={handleClickSecondBtn}
                onClickPrimaryBtn={handleClickPrimaryBtn}
            >
                <div className="modal__input">
                    <Input label="Tên danh mục" 
                        value={category.categoryName} 
                        name="categoryName" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="modal__input">
                    <Input label="Mô tả" type="textarea" 
                        value={category.description} 
                        name="description" 
                        onChange={handleChange}
                    />
                </div>
                <div className="modal__input">
                    <Input label="Ảnh danh mục" type="file" 
                        value={previewImg} 
                        name="image" 
                        onChange={handleChange}
                    />
                </div>
            </Modal>

            <Modal header="Xóa danh mục" 
                open={isOpenDelete} 
                onClickSecondBtn={handleCancelDelete}
                onClickPrimaryBtn={handleAcceptDelete}
                labelPrimaryBtn="Đồng ý"
                width="40"
            >
                <div>Bạn có chắc chắn muốn xóa?</div>
            </Modal>
        </div>
    )
}

export default Categories

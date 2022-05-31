import React, { useEffect, useState } from 'react'

import Table from '../components/table/Table'

import Button from '../components/button/Button'
import Modal from '../components/modal/Modal'
import Input from '../components/input/Input'
import Toast from '../common/toastify'
import * as ProductService from "../services/ProductService"
import * as CategoryService from "../services/CategoryService"
import * as VariantService from "../services/VariantService"
import * as FileService from "../services/FileService"
import numberWithCommas from '../utils/numberWithCommas'
import { useHistory } from 'react-router-dom'

const productTableHead = [
    '',
    'Ảnh sản phẩm',
    'Tên sản phẩm',
    'Mô tả',
    'Giá',
    'Hành động',
]

const variantTableHead = [
    '',
    'Tên biến thể',
    'Màu sắc',
    'Kích cỡ',
    'Giá',
    'Số lượng',
    'Hành động',
]

const sizes = ['S', 'M', 'L', 'XL', 'XXL']

const colors = ['blue', 'orange', 'pink', 'white', 'black', 'red', 'green', 'yellow']

const renderHead = (item, index) => <th key={index}>{item}</th>

const Body = (props) => {

    const { item, index } = props

    const handleEdit = () => {
        props.onEdit()
    }

    const handleDelete = () => {
        props.onDelete()
    }

    const handleDisplayVariants = () => {
        props.onDisplayVariants()
    }

    const price = () => {
        if(item?.variants?.length === 0) {
            return 'Chưa có biến thể'
        }
        const listPrice = item?.variants.map(variant => variant.price)
        let minPrice = Math.min(...listPrice)
        let maxPrice = Math.max(...listPrice)
        if(listPrice.length > 0) {
            minPrice = Math.min(...listPrice)
            maxPrice = Math.max(...listPrice)
        }

        if(minPrice === maxPrice) {
            return numberWithCommas(Number(minPrice))
        } else {
            return `${minPrice && numberWithCommas(Number(minPrice))} - ${maxPrice && numberWithCommas(Number(maxPrice))}`
        }
    }

    return <tr key={index}>
        <td>{item.id}</td>
        <td>
            <div className="table__image">
                <img src={item.image01} />
            </div>
        </td>
        <td>{item.productName}</td>
        <td><div className="table__description">{item.description}</div></td>
        <td>{price()}</td>
        <td>
            <div className="d-flex jcb aic">
                <div className="table__link" onClick={handleDisplayVariants}>Xem biến thể</div>
                <div className="table__action"><i className='bx bx-edit-alt' onClick={handleEdit} ></i></div>
                <div className="table__action"><i className='bx bx-trash' onClick={handleDelete} ></i></div>
            </div>
        </td>
    </tr>
}

const BodyVariant = (props) => {

    const { item, index } = props

    const handleEdit = () => {
        props.onEdit()
    }

    const handleDelete = () => {
        props.onDelete()
    }

    return <tr key={index}>
        <td>{item.id}</td>
        <td>{item.variantName}</td>
        <td>{item.color}</td>
        <td>{item.size}</td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
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

const Products = () => {

    
    const history = useHistory()

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(PAGE)
    const [totalPage, setTotalPage] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        image01: null,
        image02: null,
        categoryId: null,
        variants: [],
    })

    const [isEdit, setIsEdit] = useState(false)

    const [previewImg01, setPreviewImg01] = useState(null)

    const [previewImg02, setPreviewImg02] = useState(null)

    const [productIdDelete, setProductIdDelete] = useState(null)

    const [categories, setCategories] = useState([])

    const [category, setCategory] = useState({})

    const [isShowDropdown, setIsShowDropdown] = useState(false)

    const [isOpenVariants, setIsOpenVariants] = useState(false)

    const [isOpenVariant, setIsOpenVariant] = useState(false)

    const [variant, setVariant] = useState({
        color: 'white',
        size: 'S',
        quantity: 0,
        price: 0,
    })

    const [isEditVariant, setIsEditVariant] = useState(false)
    const [isShowDropdownSize, setIsShowDropdownSize] = useState(false)
    const [isShowDropdownColor, setIsShowDropdownColor] = useState(false)

    const [isOpenDeleteVariant, setIsOpenDeleteVariant] = useState(false)
    const [variantIdDelete, setVariantIdDelete] = useState(null)

    const loadData = (page, size) => {
        ProductService.getAll(page, size)
            .then(res => {
                if(res?.data?.success) {
                    setProducts(res?.data?.data?.content)
                    setTotalPage(res?.data?.data?.meta.totalPage)
                }
            })
        CategoryService.getAll()
            .then(res => {
                if(res?.data?.success) {
                    const categories = res?.data?.data?.content
                    setCategories(categories)
                    if(categories.length > 0) {
                        setCategory(categories[0])
                    }
                }
            })
    }

    const getCategoryById = (id) => {
        return categories.find(category => category.id === id)
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
        setPreviewImg01(null)
        setPreviewImg02(null)
        setProduct({
            productName: '',
            description: '',
            image01: null,
            image02: null,
            categoryId: null,
            variants: [],
        })
        setIsEdit(false)
        setIsShowDropdown(false)
    }

    const handleClickPrimaryBtn = () => {
        const productTemp = {
            ...product,
            categoryId: category.id,
        }
        if(isEdit) {
            if(productTemp.image01 !== previewImg01 && productTemp.image02 !== previewImg02) {
                Promise.all([FileService.uploadFile(productTemp.image01), FileService.uploadFile(productTemp.image02)])
                    .then(([resImage01, resImage02]) => {
                        if(resImage01?.data?.success && resImage02?.data?.success) {
                            const productUpdate = {...productTemp, 
                                image01: resImage01.data.data, 
                                image02: resImage02.data.data,
                            }
                            return ProductService.update(productTemp.id, productUpdate)
                        } else {
                            Toast.error('Cập nhật sản phẩm thất bại!')
                        }
                    })
                    .then(res => {
                        if(res?.data?.success) {
                            Toast.success('Cập nhật sản phẩm thành công!')
                            handleClickSecondBtn()
                            loadData(page, SIZE)
                            setIsShowDropdown(false)
                        } else {
                            Toast.error('Cập nhật sản phẩm thất bại!')
                        }

                    })
                    // .catch(err => Toast.error('Cập nhật sản phẩm thất bại!'))
            }
            else if(productTemp.image01 !== previewImg01) {
                FileService.uploadFile(productTemp.image01)
                .then(res => {
                    if(res?.data?.success) {
                        const productUpdate = {...productTemp, image01: res?.data?.data}
                        return ProductService.update(productTemp.id, productUpdate)
                    } else {
                        Toast.error('Cập nhật sản phẩm thất bại!')
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success('Cập nhật sản phẩm thành công!')
                        handleClickSecondBtn()
                        loadData(page, SIZE)
                        setProduct({
                            productName: '',
                            description: '',
                            image01: null,
                            image02: null,
                            categoryId: null,
                            variants: [],
                        })
                        setIsShowDropdown(false)
                    }
                })
                .catch(err => Toast.error('Cập nhật sản phẩm thất bại!'))
            } else if(productTemp.image02 !== previewImg02) {
                FileService.uploadFile(productTemp.image02)
                .then(res => {
                    if(res?.data?.success) {
                        const productUpdate = {...productTemp, image02: res?.data?.data}
                        return ProductService.update(productTemp.id, productUpdate)
                    } else {
                        Toast.error('Cập nhật sản phẩm thất bại!')
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success('Cập nhật sản phẩm thành công!')
                        handleClickSecondBtn()
                        loadData(page, SIZE)
                        setProduct({
                            productName: '',
                            description: '',
                            image01: null,
                            image02: null,
                            categoryId: null,
                            variants: [],
                        })
                        setIsShowDropdown(false)
                    }
                })
                .catch(err => Toast.error('Cập nhật sản phẩm thất bại!'))
            } else {
                ProductService.update(productTemp.id, productTemp)
                    .then(res => {
                        if(res?.data?.success) {
                            Toast.success('Cập nhật sản phẩm thành công!')
                            handleClickSecondBtn()
                            loadData(page, SIZE)
                            setProduct({
                                productName: '',
                                description: '',
                                image01: null,
                                image02: null,
                                categoryId: null,
                                variants: [],
                            })
                            setIsShowDropdown(false)
                        }
                    })
                    .catch(err => Toast.error('Cập nhật sản phẩm thất bại!'))
            }
        } else {
            Promise.all([FileService.uploadFile(productTemp.image01), FileService.uploadFile(productTemp.image02)])
                .then(([resImage01, resImage02]) => {
                    if(resImage01?.data?.success && resImage02?.data?.success) {
                        const productUpdate = {...productTemp, 
                            image01: resImage01.data.data, 
                            image02: resImage02.data.data,
                        }
                        return ProductService.insert(productUpdate)
                    } else {
                        Toast.error('Thêm sản phẩm thất bại!')
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success('Thêm sản phẩm thành công!')
                        handleClickSecondBtn()
                        loadData(page, SIZE)
                        setProduct({
                            productName: '',
                            description: '',
                            image01: null,
                            image02: null,
                            categoryId: null,
                            variants: [],
                        })
                        setIsShowDropdown(false)
                    } else {
                        Toast.error('Thêm sản phẩm thất bại!')
                    }
                })
                .catch(err => Toast.error('Thêm sản phẩm thất bại!'))
        }
    }

    const handleChange = (name, value) => {
        if(name !== 'image01' && name !== 'image02') {
            setProduct({
                ...product,
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

            if(name === 'image01') {
                setPreviewImg01(preview)
            } else {
                setPreviewImg02(preview)
            }
            setProduct({
                ...product,
                [name]: file,
            })
        }
        
    }

    useEffect(() => {
        return () => {
            previewImg01 && URL.revokeObjectURL(previewImg01)
        }
    }, [previewImg01])

    useEffect(() => {
        return () => {
            previewImg02 && URL.revokeObjectURL(previewImg02)
        }
    }, [previewImg02])

    const handleEdit = (product) => {
        setIsEdit(true)
        setIsOpen(true)
        setProduct(product)
        setPreviewImg01(product.image01)
        setPreviewImg02(product.image02)
        setCategory(getCategoryById(product.categoryId))
    }

    const handleDelete = (id) => {
        setProductIdDelete(id)
        setIsOpenDelete(true)
    }

    const handleCancelDelete = () => {
        setIsOpenDelete(false)
        setProductIdDelete(null)
    }

    const handleAcceptDelete = () => {
        ProductService.deleteById(productIdDelete)
            .then(res => {
                if(res?.data?.success) {
                    Toast.success('Xóa sản phẩm thành công!')
                    loadData(page, SIZE)
                    setProductIdDelete(null)
                    setIsOpenDelete(false)
                } else {
                    setProductIdDelete(null)
                    setIsOpenDelete(false)
                    Toast.error('Xóa sản phẩm thất bại!')
                }
            })
            .catch(err => {
                setProductIdDelete(null)
                setIsOpenDelete(false)
                Toast.error('Xóa sản phẩm thất bại!')
            })
    }

    const handleGotoCategories = () => {
        history.push("/categories")
    }

    const handleChooseCategory = (category) => {
        setIsShowDropdown(false)
        setCategory(category)
    }

    const handleShowDropdown = () => {
        setIsShowDropdown(!isShowDropdown)
    }

    const handleDisplayVariant = (product) => {
        setIsOpenVariants(true)
        setProduct(product)
    }

    const handleShowDropdownSize = () => {
        setIsShowDropdownSize(!isShowDropdownSize)
        setIsShowDropdownColor(false)
    }

    const handleChooseSize = (size) => {
        setVariant({
            ...variant,
            size: size,
        })
        setIsShowDropdownSize(false)
    }

    const handleShowDropdownColor = () => {
        setIsShowDropdownColor(!isShowDropdownColor)
        setIsShowDropdownSize(false)
    }

    const handleChooseColor = (color) => {
        setVariant({
            ...variant,
            color: color,
        })
        setIsShowDropdownColor(false)
    }

    const handleChangeVariant = (name, value) => {
        setVariant({
            ...variant,
            [name]: value,
        })
    }

    const handleAddVariant = () => {
        setIsOpenVariant(true)
    }

    const handleEditVariant = (variant) => {
        setVariant(variant)
        setIsEditVariant(true)
        setIsOpenVariant(true)
    }

    const handleDeleteVariant = (id) => {
        setVariantIdDelete(id)
        setIsOpenDeleteVariant(true)
    }

    const handleClickSecondBtnVariant = () => {
        setIsOpenVariants(false)
        setProduct({
            productName: '',
            description: '',
            image01: null,
            image02: null,
            categoryId: null,
            variants: [],
        })
        setIsShowDropdownColor(false)
        setIsShowDropdownSize(false)
    }

    const handleSecondVariantBtn = () => {
        setIsEditVariant(false)
        setIsOpenVariant(false)
        setVariant({
            color: 'white',
            size: 'S',
            quantity: 0,
            price: 0,
        })
    }

    const handlePrimaryVariantBtn = () => {
        const variantTemp = {
            ...variant, 
            image: product.image01,
            variantName: `${product.productName} - ${variant.color} - ${variant.size}`,
            productId: product.id,
        }
        if(isEditVariant) {
            VariantService.update(variantTemp.id, variantTemp)
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success('Cập nhật biến thể thành công!')
                        loadData(page, SIZE)
                        loadProduct()
                        setVariant({
                            color: 'white',
                            size: 'S',
                            quantity: 0,
                            price: 0,
                        })
                        setIsOpenVariant(false)
                        setIsShowDropdownColor(false)
                        setIsShowDropdownSize(false)
                    } else {
                        Toast.error('Cập nhật biến thể thất bại!')
                    }
                })
                .catch(err => Toast.error('Cập nhật biến thể thất bại!'))
        } else {
            VariantService.insert(variantTemp)
                .then(res => {
                    if(res?.data?.success) {
                        Toast.success('Thêm biến thể thành công!')
                        loadData(page, SIZE)
                        loadProduct()
                        setVariant({
                            color: 'white',
                            size: 'S',
                            quantity: 0,
                            price: 0,
                        })
                        setIsOpenVariant(false)
                        setIsShowDropdownColor(false)
                        setIsShowDropdownSize(false)
                    } else {
                        Toast.error('Thêm biến thể thất bại!')
                    }
                })
                .catch(err => Toast.error('Thêm biến thể thất bại!'))
        }
    }

    const loadProduct = () => {
        ProductService.getById(product.id)
            .then(res => {
                if(res?.data?.success) {
                    setProduct(res.data.data)
                }
            })
    }

    const handleCancelDeleteVariant = () => {
        setIsOpenDeleteVariant(false)
        setVariantIdDelete(null)
    }

    const handleAcceptDeleteVariant = () => {
        VariantService.deleteById(variantIdDelete)
            .then(res => {
                if(res?.data?.success) {
                    Toast.success('Xóa biến thể thành công!')
                    loadData(page, SIZE)
                    loadProduct()
                    setIsOpenDeleteVariant(false)
                    setVariantIdDelete(null)
                } else {
                    setIsOpenDeleteVariant(false)
                    setVariantIdDelete(null)
                    Toast.error('Xóa biến thể thất bại!')
                }
            })
            .catch(err => {
                setIsOpenDeleteVariant(false)
                setVariantIdDelete(null)
                Toast.error('Xóa biến thể thất bại!')
            })
    }

    return (
        <div>
            <h2 className="page-header">
                Sản phẩm
            </h2>
            <div className="d-flex jce">
                <Button label="Tạo" onClick={handleAdd} />
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                headData={productTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                page={page}
                                totalPage={totalPage}
                                onSelectPage={(page) => handleSelectPage(page)}
                            >
                                {products.map((product, index) => 
                                    <Body 
                                        index={index}
                                        item={product}
                                        onEdit={() => handleEdit(product)}
                                        onDelete={() => handleDelete(product.id)}
                                        onDisplayVariants={() => handleDisplayVariant(product)}
                                    />
                                )}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal header={isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'} 
                open={isOpen} 
                onClickSecondBtn={handleClickSecondBtn}
                onClickPrimaryBtn={handleClickPrimaryBtn}
            >
                <div className="modal_input">
                    <label>Danh mục</label>
                    {categories.length > 0 ? 
                        <div className="dropdown-category">
                            <div className="dropdown-category__selected" onClick={handleShowDropdown}>{category.categoryName}</div>
                            <ul className={`dropdown-category__list ${isShowDropdown && 'active'}`}>
                                {categories.map((category, index) => 
                                    <li key={index} className="dropdown-category__item" onClick={() => handleChooseCategory(category)}>{category.categoryName}</li>
                                )}
                            </ul>
                        </div>
                        :
                        <div onClick={handleGotoCategories}>Đi đến tạo danh mục</div>
                    }
                </div>
                <div className="modal__input">
                    <Input label="Tên sản phẩm" 
                        value={product.productName} 
                        name="productName" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="modal__input">
                    <Input label="Mô tả" type="textarea" 
                        value={product.description} 
                        name="description" 
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex jcb">
                    <div className="modal__input mr-15">
                        <Input label="Ảnh sản phẩm (1)" type="file" 
                            value={previewImg01} 
                            name="image01" 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal__input ml-15">
                        <Input label="Ảnh sản phẩm (2)" type="file" 
                            value={previewImg02} 
                            name="image02" 
                            onChange={handleChange}
                        />
                    </div>     
                </div>
            </Modal>

            <Modal header="Biến thể" 
                open={isOpenVariants} 
                onClickSecondBtn={handleClickSecondBtnVariant}
            >
                <div className="d-flex jce">
                <Button label="Tạo" onClick={handleAddVariant} />
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <Table
                            headData={variantTableHead}
                            renderHead={(item, index) => renderHead(item, index)}
                        >
                            {product.variants.map((variant, index) => 
                                <BodyVariant 
                                    index={index}
                                    item={variant}
                                    onEdit={() => handleEditVariant(variant)}
                                    onDelete={() => handleDeleteVariant(variant.id)}
                                />
                            )}
                        </Table>
                        </div>
                    </div>
                </div>
            </div>
            </Modal>

            <Modal header="Xóa sản phẩm" 
                open={isOpenDelete} 
                onClickSecondBtn={handleCancelDelete}
                onClickPrimaryBtn={handleAcceptDelete}
                labelPrimaryBtn="Đồng ý"
                width="40"
            >
                <div>Bạn có chắc chắn muốn xóa?</div>
            </Modal>

            <Modal header={isEditVariant ? 'Sửa biến thể' : 'Thêm biến thể'} 
                open={isOpenVariant} 
                onClickSecondBtn={handleSecondVariantBtn}
                onClickPrimaryBtn={handlePrimaryVariantBtn}
            >
                <div>
                    <label>Màu sắc</label>
                    <div className="dropdown-category">
                        <div className="dropdown-category__selected" onClick={handleShowDropdownColor}>{variant.color}</div>
                        <ul className={`dropdown-category__list ${isShowDropdownColor && 'active'}`}>
                            {colors.map((color, index) => 
                                <li key={index} className="dropdown-category__item" onClick={() => handleChooseColor(color)}>{color}</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div>
                    <label>Kích cỡ</label>
                    <div className="dropdown-category">
                        <div className="dropdown-category__selected" onClick={handleShowDropdownSize}>{variant.size}</div>
                        <ul className={`dropdown-category__list ${isShowDropdownSize && 'active'}`}>
                            {sizes.map((size, index) => 
                                <li key={index} className="dropdown-category__item" onClick={() => handleChooseSize(size)}>{size}</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="modal__input">
                    <Input label="Số lượng"
                        value={variant.quantity} 
                        name="quantity" 
                        onChange={handleChangeVariant}
                    />
                </div>
                <div className="modal__input">
                    <Input label="Giá"
                        value={variant.price} 
                        name="price" 
                        onChange={handleChangeVariant}
                    />
                </div>
            </Modal>

            <Modal header="Xóa biến thể" 
                open={isOpenDeleteVariant} 
                onClickSecondBtn={handleCancelDeleteVariant}
                onClickPrimaryBtn={handleAcceptDeleteVariant}
                labelPrimaryBtn="Đồng ý"
                width="40"
            >
                <div>Bạn có chắc chắn muốn xóa?</div>
            </Modal>
        </div>
    )
}

export default Products

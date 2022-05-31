import React from 'react'
import { useDispatch } from 'react-redux'
import * as AddressService from '../../services/AddressService'
import { setCheckoutAddressId } from '../../redux/account/accountSlide'
import Toast from '../../common/toastify'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../Modal'
import Button from '../Button'

const DeleteAddressModal = (props) => {

    const { open, id, userId, checkoutAddressId } = props

    const dispatch = useDispatch()

    const handleAccept = () => {
        AddressService.deleteAddress(id, userId)
                .then(res => {
                    if(res?.data?.success) {
                        if(checkoutAddressId === id) {
                            dispatch(setCheckoutAddressId(null))
                        }
                        props.onOpen(false)
                        props.loadData()
                        Toast.success('Xóa địa chỉ thành công!')
                    } else {
                        props.onOpen(false)
                        Toast.error('Xóa địa chỉ thất bại!')
                    }
                })
                .catch(err => {
                    props.onOpen(false)
                    Toast.error('Xóa địa chỉ thất bại!')
                })
    }

    const handleCancel = () => {
        props.onOpen(false)
    }

    return (
        <Modal open={open} onOpenModal={handleCancel}>
            <ModalHeader>Xóa địa chỉ</ModalHeader>
            <ModalBody>
                Bạn có chắc muốn xóa địa chỉ ?
            </ModalBody>
            <ModalFooter>
                <div className="f jcc">
                    <div className="modal__button pr-20">
                        <Button size='block' className="btn--outline" onClick={handleCancel}>Hủy</Button>
                    </div>
                    <div className="modal__button pl-20">
                        <Button size='block' onClick={handleAccept}>Đồng ý</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteAddressModal
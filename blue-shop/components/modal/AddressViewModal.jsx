import AddressCard from '../account/AddressCard'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../Modal'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { setCheckoutAddressId } from '../../redux/account/accountSlide'

const AddressViewModal = (props) => {

    const dispatch = useDispatch()

    const handleCheckoutAddress = (id) => {
        dispatch(setCheckoutAddressId(id))
        props.onOpen(false)
        props.onUpdateCheckoutAddressId(id)
    }

    const { open, checkoutAddressId, listAddresses } = props

    const handleAddAddress = () => {
        props.onAddAddress()
    }

    const handleCancel = () => {
        props.onOpen(false)
    }

    return (
        <Modal open={open} onOpenModal={handleCancel}>
            <ModalHeader>Chọn địa chỉ</ModalHeader>
            <ModalBody>
                {listAddresses.map((address, index) =>
                    <AddressCard
                        key={index}
                        address={address}
                        onEdit={() => props.onEdit(address)}
                        onDelete={() => props.onDelete(address.id)}
                        onCheckoutAddress={() => handleCheckoutAddress(address.id)}
                        isCheckoutAddress={address.id == checkoutAddressId}
                    />
                )}
            </ModalBody>
            <ModalFooter>
                <div className="f jcc">
                    <div className="modal__button">
                        <Button size="block" onClick={handleAddAddress}>Thêm địa chỉ</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default AddressViewModal
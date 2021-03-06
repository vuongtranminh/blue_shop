import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import Layout, { Header, Body } from '../components/Layout'

import numberWithCommas from '../utils/numberWithCommas'
import AddressCard from '../components/account/AddressCard'
import Input from '../components/Input'
import AddressViewModal from '../components/modal/AddressViewModal'
import AddEditAddressModal from '../components/modal/AddEditAddressModal'
import { setCheckoutAddressId } from '../redux/account/accountSlide'
import DeleteAddressModal from '../components/modal/DeleteAddressModal'
import * as AddressService from '../services/AddressService'
import * as OrderService from '../services/OrderService'
import Toast from '../common/toastify'
import { StatusOrder } from '../common/StatusOrder'
import { removeCheckedAllItems } from '../redux/shopping-cart/cartSlide'
import { useRouter } from 'next/router'

const Checkout = () => {

  const router = useRouter()

  const checkoutAddressId = useSelector(state => state.account.checkoutAddressId)

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  const [cartItems, setCartItems] = useState(cart.cartItems)

  const [totalPrice, setTotalPrice] = useState(0)

  const [listAddresses, setListAddresses] = useState([])

  const [addressCheckout, setAddressCheckout] = useState({})

  const [addressEdit, setAddressEdit] = useState(null)

  const [isOpenAddEditAddressModal, setIsOpenAddEditAddressModal] = useState(false)
  const [isOpenAddressViewModal, setIsOpenAddressViewModal] = useState(false)
  const [isOpenDeleteAddressModal, setIsOpenDeleteAddressModal] = useState(false)

  const [addressDeleteId, setAddressDeleteId] = useState(null)

  const userId = useSelector(state => state.account.userId)

  const [note, setNote] = useState('')

  useEffect(() => {
    setCartItems(cart.cartItems)
    setTotalPrice(getTotalPrice(cart.cartItems))
  }, [cart.cartItems])

  const getTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total += item.price * item.quantity, 0)
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    AddressService.getAddresses(userId)
      .then(res => {
        if (res?.data?.success) {
          const listAddresses = res.data.data
          setListAddresses(listAddresses)
          setAddressCheckout(findCheckoutAddress(checkoutAddressId, listAddresses))
        }
      })
  }

  const findCheckoutAddress = (checkoutAddressId, listAddresses) => {
    if (listAddresses && listAddresses.length > 0) {
      return listAddresses.find(address => address.id == checkoutAddressId)
    }

    return null
  }

  const handleCheckoutAddress = (id) => {
    dispatch(setCheckoutAddressId(id))
  }

  const handleEditAddress = addressEdit => {
    setIsOpenAddEditAddressModal(true)
    setAddressEdit(addressEdit)
  }

  const handleOpenDeleteAddressModal = isOpen => {
    setIsOpenDeleteAddressModal(isOpen)
  }

  const handleOpenAddEditAddressModal = isOpen => {
    setIsOpenAddEditAddressModal(isOpen)
  }

  const handleOpenAddressViewModal = isOpen => {
    setIsOpenAddressViewModal(isOpen)
  }

  const handleAddAddress = () => {
    setAddressEdit(null)
    setIsOpenAddEditAddressModal(true)
  }

  const handleUpdateCheckoutAddressId = (id) => {
    setAddressCheckout(findCheckoutAddress(id, listAddresses))
  }

  const handleDeleteAddress = (id) => {
    setIsOpenDeleteAddressModal(true)
    setAddressDeleteId(id)
  }

  const handleChangeNote = (name, value) => {
    setNote(value)
  }

  const handleSubmitBuy = () => {
    validBuyData()

    const buyData = {
      totalPrice: totalPrice,
      buyerName: addressCheckout.name,
      address: addressCheckout.address,
      phone: addressCheckout.phone,
      city: addressCheckout.city,
      district: addressCheckout.district,
      commune: addressCheckout.commune,
      note: note,
      items: cartItems.map(item => {
        return {
          cartItemId: item.id,
          variantId: item.variantId,
          price: item.price,
          quantity: item.quantity,
        }
      }),
      status: StatusOrder.ACCEPTING,
    }

    OrderService.insert(buyData)
      .then(res => {
        if(res?.data?.success) {
          dispatch(removeCheckedAllItems())
          Toast.success('?????t h??ng th??nh c??ng!')
          router.push('/account/my-order')
        } else {
          Toast.error('?????t h??ng th???t b???i!')
        }
      })
      .catch(err => Toast.error('?????t h??ng th???t b???i!'))
  }

  const validBuyData = () => {
    if(!cartItems || cartItems.length === 0) {
      Toast.error('Vui l??ng ch???n c??c m???t h??ng mu???n mua!')
      return
    }
    if(!addressCheckout) {
      Toast.error('Vui l??ng ch???n ?????a ch??? giao h??ng!')
      return
    }
  }

  console.log(cartItems)

  return (
    <Helmet title="Thanh to??n">
      <Layout>
        <Header title="Thanh to??n" back={true} />

        <Body>
          <div className="checkout">
            <div className="checkout__box-info">
              <div className="cart__info">
                <div className="checkout__address">
                  <div className="checkout__address__title">?????a ch???</div>
                  {addressCheckout &&
                    <AddressCard
                      address={addressCheckout}
                      onEdit={() => handleEditAddress(addressCheckout)}
                      onDelete={() => handleDeleteAddress(addressCheckout.id)}
                      onDefaultAddress={() => handleCheckoutAddress(addressCheckout.id)}
                      isCheckoutAddress={true}
                    />}
                  <div className="checkout__address__link text-link" onClick={() => handleOpenAddressViewModal(true)}>Ch???n ?????a ch??? giao h??ng...</div>
                </div>
                <div className="checkout__note">
                  <div className="checkout__note__input">
                    <Input 
                      type='textarea' placeholder='Enter note' label='Ghi ch??'
                      value={note}
                      name='note'
                      onChange={handleChangeNote}
                    />
                  </div>
                </div>
                <div className="cart__info__txt">
                  <div className="cart__info__txt__price">
                    <span className="mr-10">Th??nh ti???n:</span> <span className="text-gradient">{numberWithCommas(Number(totalPrice))}</span>
                  </div>
                </div>
                <div className="cart__info__btn">
                  <Button size="block" className="mb-0" onClick={handleSubmitBuy}>
                    ?????t h??ng
                  </Button>
                </div>
              </div>
            </div>
            <div className="checkout__list">
              {
                cartItems.map((item, index) => (
                  <CartItem item={item} key={index} />
                ))
              }
            </div>
          </div>
        </Body>
      </Layout>

      <AddressViewModal
        open={isOpenAddressViewModal}
        onEdit={(addressEdit) => handleEditAddress(addressEdit)}
        onDelete={(addressDeleteId) => handleDeleteAddress(addressDeleteId)}
        checkoutAddressId={checkoutAddressId}
        onOpen={(isOpen) => handleOpenAddressViewModal(isOpen)}
        onAddAddress={handleAddAddress}
        listAddresses={listAddresses}
        onUpdateCheckoutAddressId={(id) => handleUpdateCheckoutAddressId(id)}
      />

      <AddEditAddressModal
        open={isOpenAddEditAddressModal} 
        addressEdit={addressEdit} 
        loadData={loadData}
        onOpen={(isOpen) => handleOpenAddEditAddressModal(isOpen)}
        userId={userId}
      />

      <DeleteAddressModal 
        open={isOpenDeleteAddressModal} 
        onOpen={(isOpen) => handleOpenDeleteAddressModal(isOpen)} 
        loadData={loadData}
        userId={userId}
        id={addressDeleteId}
      />
    </Helmet>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'header']),
  },
})

export default Checkout

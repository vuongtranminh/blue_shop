import React, { useEffect, useState } from 'react'
import { TypeInfo } from '../../common/TypeInfo'
import Button from '../Button'
import CheckBox from '../CheckBox'
import Input from '../Input'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../Modal'
import addressData from '../../assets/fake-data/address.json'
import { everyValueObjectIsEmpty, validPhone } from '../../utils/validateObject'
import * as AddressService from '../../services/AddressService'
import Grid from '../Grid'
import Toast from '../../common/toastify'

const AddEditAddressModal = (props) => {

    const { open, addressEdit, userId } = props

    const [address, setAddress] = useState({
        name: '',
        phone: '',
        city: '',
        district: '',
        commune: '',
        address: '',
        type: 0,
    })

    const [message, setMessage] = useState({
        name: '',
        phone: '',
        city: '',
        district: '',
        commune: '',
        address: '',
    })

    useEffect(() => {
        if(addressEdit) {
            setAddress(addressEdit)
            setMessage({
                name: '',
                phone: '',
                city: '',
                district: '',
                commune: '',
                address: '',
            })
        } else {
            resetState()
        }
    }, [addressEdit])

    const [cityData, setCityData] = useState([])
    const [districtData, setDistrictData] = useState([])
    const [communeData, setCommuneData] = useState([])

    const [city, setCity] = useState(null)
    const [district, setDistrict] = useState(null)

    const handleChooseCity = (city) => {
        setCity(city)
        setCityData([])

        setMessage({
            ...message,
            city: '',
        })

        let addressChoose = {}

        if (city.Name !== address.city) {
            addressChoose = {
                ...address,
                city: city.Name,
                district: '',
                commune: '',
            }
        } else {
            addressChoose = {
                ...address,
                city: city.Name,
            }
        }

        setAddress(addressChoose)
    }


    const handleChooseDistrict = (district) => {
        setDistrict(district)
        setDistrictData([])

        setMessage({
            ...message,
            district: '',
        })

        let addressChoose = {}

        if (district.Name !== address.district) {
            addressChoose = {
                ...address,
                district: district.Name,
                commune: '',
            }
        } else {
            addressChoose = {
                ...address,
                district: district.Name,
            }
        }

        setAddress(addressChoose)
    }

    const handleChooseCommune = (commune) => {
        setCommuneData([])
        setAddress({
            ...address,
            commune: commune.Name,
        })

        setMessage({
            ...message,
            commune: '',
        })
    }

    const handleChange = (name, value) => {
        setAddress({
            ...address,
            [name]: value,
        })

        if (name === 'city') {
            const cityData = addressData.filter(e => e.Name.includes(value))
            setCityData(cityData)
        }

        if (name === 'district') {
            if (city) {
                const districtData = city.Districts.filter(e => e.Name.includes(value))
                setDistrictData(districtData)
            } else {
                const city = addressData.find(e => e.Name === address.city)
                if(city) {
                    setCity(city)
                    const districtData = city.Districts.filter(e => e.Name.includes(value))
                    setDistrictData(districtData)
                }
            }
        }

        if (name === 'commune') {
            if (district) {
                const communeData = district.Wards.filter(e => e.Name.includes(value))
                setCommuneData(communeData)
            } else {
                const city = addressData.find(e => e.Name === address.city)
                if(city) {
                    setCity(city)
                    const district = city.Districts.find(e => e.Name === address.district)

                    if(district) {
                        setDistrict(district)
                        const communeData = district.Wards.filter(e => e.Name.includes(value))
                        setCommuneData(communeData)
                    }
                }
            }
        }
    }

    const handleBlur = (name, value) => {
        if (value.trim() === '') {
            setMessage({
                ...message,
                [name]: `${name} l?? b???t bu???c`
            })
            return
        }

        if (name === 'phone') {
            const result = validPhone(value)
            if (!result) {
                setMessage({
                    ...message,
                    phone: "Phone kh??ng h???p l???",
                })
                return
            }
        }

        setMessage({
            ...message,
            [name]: '',
        })
    }

    const handleFocus = (name) => {
        setMessage({
            ...message,
            [name]: '',
        })
    }

    const handleCheckedTypeAddress = type => {
        setAddress({
            ...address,
            type: type,
        })
    }

    const isPassValidate = () => {
        const addressValid = { ...address }
        delete addressValid.type
        if (everyValueObjectIsEmpty(addressValid)) {
            setMessage({
                name: 'T??n l?? b???t bu???c',
                phone: 'S??? ??i???n tho???i l?? b???t bu???c',
                city: 'T???nh/Th??nh Ph??? l?? b???t bu???c',
                district: 'Qu???n/Huy???n l?? b???t bu???c',
                commune: 'Ph?????ng/X?? l?? b???t bu???c',
                address: '?????a ch??? chi ti???t l?? b???t bu???c',
            })
            return false
        }
        return everyValueObjectIsEmpty(message)
    }

    const handleSubmit = () => {

        if (!isPassValidate()) return

        if (addressEdit) {
            AddressService.update(address.id, address, userId)
                .then(res => {
                    if (res?.data?.success) {
                        props.onOpen(false)
                        props.loadData()
                        Toast.success('C???p nh???t ?????a ch??? th??nh c??ng!')
                        resetState()
                    } else {
                        Toast.error('C???p nh???t ?????a ch??? th???t b???i!')
                    }
                })
                .catch(err => Toast.error('C???p nh???t ?????a ch??? th???t b???i!'))
        } else {
            AddressService.insert(address, userId)
                .then(res => {
                    if (res?.data?.success) {
                        props.onOpen(false)
                        props.loadData()
                        Toast.success('Th??m ?????a ch??? th??nh c??ng!')
                        resetState()
                    } else {
                        Toast.error('Th??m ?????a ch??? th???t b???i!')
                    }
                })
                .catch(err => Toast.error('Th??m ?????a ch??? th???t b???i!'))
        }
    }

    const resetState = () => {
        setAddress({
            name: '',
            phone: '',
            city: '',
            district: '',
            commune: '',
            address: '',
            type: 0,
        })
        setMessage({
            name: '',
            phone: '',
            city: '',
            district: '',
            commune: '',
            address: '',
        })
        setCityData([])
        setDistrictData([])
        setCommuneData([])
        setCity(null)
        setDistrict(null)
    }

    const handleCancel = () => {
        resetState()
        props.onOpen(false)
    }

    return (
        <Modal open={open} onOpenModal={handleCancel}>
            <ModalHeader>{addressEdit ? 'S???a ?????a ch???' : 'Th??m ?????a ch???'}</ModalHeader>
            <ModalBody>
                <div className="address-modal">
                    <div className="account__input">
                        <Input
                            placeholder='Enter Name' label='T??n ng?????i nh???n'
                            name='name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            value={address.name}
                            message={message.name}
                        />
                    </div>
                    <div className="account__input">
                        <Input
                            placeholder='Enter Phone' label='S??? ??i???n tho???i'
                            name="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            value={address.phone}
                            message={message.phone}
                        />
                    </div>
                    <div className="account__input">
                        <Grid col={1} mdCol={1} xlCol={3} gap={20}>
                            <div className="dropdown-search">
                                <Input
                                    placeholder='T???nh/Th??nh Ph???...' label='T???nh/Th??nh Ph???'
                                    name="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    value={address.city}
                                    message={message.city}
                                    autoComplete='off'
                                />
                                {<ul className={`dropdown-search__list ${cityData.length > 0 ? 'active' : ''}`}>
                                    {cityData.map((city, index) =>
                                        <li key={index} className="dropdown-search__item" onClick={() => handleChooseCity(city)}>{city.Name}</li>
                                    )}
                                </ul>}
                            </div>
                            <div className="dropdown-search">
                                <Input
                                    placeholder='Qu???n/Huy???n...' label='Qu???n/Huy???n'
                                    name="district"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    value={address.district}
                                    message={message.district}
                                    autoComplete='off'
                                />
                                {<ul className={`dropdown-search__list ${districtData.length > 0 ? 'active' : ''}`}>
                                    {districtData.map((district, index) =>
                                        <li key={index} className="dropdown-search__item" onClick={() => handleChooseDistrict(district)}>{district.Name}</li>
                                    )}
                                </ul>}
                            </div>
                            <div className="dropdown-search">
                                <Input
                                    placeholder='Ph?????ng/X??...' label='Ph?????ng/X??'
                                    name="commune"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    value={address.commune}
                                    message={message.commune}
                                    autoComplete='off'
                                />
                                {<ul className={`dropdown-search__list ${communeData.length > 0 ? 'active' : ''}`}>
                                    {communeData.map((commune, index) =>
                                        <li key={index} className="dropdown-search__item" onClick={() => handleChooseCommune(commune)}>{commune.Name}</li>
                                    )}
                                </ul>}
                            </div>
                        </Grid>
                    </div>
                    <div className="account__input">
                        <Input
                            placeholder='Enter Address' label='?????a ch??? chi ti???t'
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            value={address.address}
                            message={message.address}
                        />
                    </div>
                    <div className="f aic jce">
                        <div className="mr-20">
                            <CheckBox label="Nh??" onChange={() => handleCheckedTypeAddress(TypeInfo.HOME)} checked={address.type === TypeInfo.HOME} />
                        </div>
                        <div>
                            <CheckBox label="C?? quan" onChange={() => handleCheckedTypeAddress(TypeInfo.OFFICE)} checked={address.type === TypeInfo.OFFICE} />
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="f jcc">
                    <div className="modal__button pr-20">
                        <Button size='block' className="btn--outline" onClick={handleCancel}>H???y</Button>
                    </div>
                    <div className="modal__button pl-20">
                        <Button size='block' onClick={handleSubmit}>L??u</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default AddEditAddressModal
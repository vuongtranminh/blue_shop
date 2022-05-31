import React, { useState, useEffect, useRef } from 'react'
import Helmet from '../../components/Helmet'
import Layout, { Body } from '../../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Input from '../../components/Input'
import Button from '../../components/Button'
import BoxLayout, { BoxBody, BoxFooter, BoxHeader } from '../../components/account/BoxLayout'
import * as UserService from "../../services/UserService"
import * as FileService from "../../services/FileService"
import { useRouter } from 'next/dist/client/router'
import Toast from '../../common/toastify'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../redux/account/accountSlide'
import { GENDER } from '../../common/gender'
import DatePicker, { registerLocale } from "react-datepicker"
import vi from 'date-fns/locale/vi';
import moment from 'moment';
import { isDeepEqual } from '../../utils/isEquals'
import { everyValueObjectIsEmpty } from '../../utils/validateObject'

import "react-datepicker/dist/react-datepicker.css"

const Profile = () => {

    const userId = useSelector(state => state.account.userId)

    const dispatch = useDispatch()

    const router = useRouter()

    const [profile, setProfile] = useState({})
    const [initProfile, setInitProfile] = useState({})
    const [isUpdateProfile, setIsUpdateProfile] = useState(false)

    const [isShowDropdownGender, setIsShowDropdownGender] = useState(false)

    const [message, setMessage] = useState({
        displayName: '',
        phone: '',
    })

    const [mediaPreview, setMediaPreview] = useState({
        avatar: '',
        cover: '',
    })

    const [fakeNameInputStyle, setFakeNameInputStyle] = useState({})
    const [nameInputStyle, setNameInputStyle] = useState({})

    const fakeNameInputRef = useRef(null)
    const nameInputRef = useRef(null)

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        registerLocale ('vi', vi) 
    }, [])

    useEffect(() => {
        fakeNameInputRef.current.innerText = profile.displayName
        const nameInputStyle = window.getComputedStyle(nameInputRef.current)
        const fakeNameInputStyle = window.getComputedStyle(fakeNameInputRef.current)

        setFakeNameInputStyle({
            fontFamily: nameInputStyle.fontFamily,
            fontSize: nameInputStyle.fontSize,
            fontStyle: nameInputStyle.fontStyle,
            fontWeight: nameInputStyle.fontWeight,
            paddingLeft: nameInputStyle.paddingLeft,
            paddingRight: nameInputStyle.paddingRight,
        })

        setNameInputStyle({
            width: fakeNameInputStyle.width
        })
    }, [profile.displayName])

    const loadData = () => {
        UserService.getUserProfile(userId)
            .then(res => {
                if(res?.data?.success) {
                    const profile = res?.data?.data
                    dispatch(updateProfile(profile))
                    setProfile(profile)
                    setInitProfile(profile)
                    setMediaPreview({
                        avatar: profile.avatar,
                        cover: profile.cover,
                    })
                }
            })
    }

    const handleShowDropdownGender = () => {
        setIsShowDropdownGender(!isShowDropdownGender)
    }

    const isPassValidate = () => {
        return everyValueObjectIsEmpty(message)
    }

    const handleUpdateProfile = () => {
        if(!isPassValidate()) return

        if (mediaPreview.avatar !== profile.avatar && mediaPreview.cover !== profile.cover) {
            Promise.all([FileService.uploadFile(profile.avatar), FileService.uploadFile(profile.cover)])
                .then(([resAvatar, resCover]) => {
                    if(resAvatar?.data?.success && resCover?.data?.success) {
                        const profileUpdate = {
                            ...profile,
                            avatar: resAvatar?.data?.data,
                            cover: resCover?.data?.data,
                        }
    
                        return UserService.updateUserProfile(userId, profileUpdate)
                    } else {
                        Toast.error('Cập nhật thất bại!')
                        return
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        const profile = res?.data?.data
                        dispatch(updateProfile(profile))
                        setProfile(profile)
                        setInitProfile(profile)
                        setMediaPreview({
                            avatar: profile.avatar,
                            cover: profile.cover,
                        })
                        Toast.success('Cập nhật thành công!')
                        setIsUpdateProfile(false)
                    } else {
                        Toast.error('Cập nhật thất bại!')
                    }
                })
                .catch(err => {
                    Toast.error('Cập nhật thất bại!')
                })
        } else if (mediaPreview.avatar !== profile.avatar) {
            FileService.uploadFile(profile.avatar)
                .then(res => {
                    if(res?.data?.success) {
                        const profileUpdate = {...profile, avatar: res?.data?.data}
                        return UserService.updateUserProfile(userId, profileUpdate)
                    } else {
                        Toast.error('Cập nhật avatar thất bại!')
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        const profile = res?.data?.data
                        dispatch(updateProfile(profile))
                        setProfile(profile)
                        setInitProfile(profile)
                        setMediaPreview({
                            ...mediaPreview,
                            avatar: profile.avatar,
                            cover: profile.cover,
                        })
                        Toast.success('Cập nhật thành công!')
                        setIsUpdateProfile(false)
                    } else {
                        Toast.error('Cập nhật thất bại!')
                    }
                })
                .catch(err => {
                    Toast.error('Cập nhật thất bại!')
                })
        } else if (mediaPreview.cover !== profile.cover) {
            FileService.uploadFile(profile.cover)
                .then(res => {
                    if(res?.data?.success) {
                        const profileUpdate = {...profile, cover: res?.data?.data}
                        return UserService.updateUserProfile(userId, profileUpdate)
                    } else {
                        Toast.error('Cập nhật ảnh bìa thất bại!')
                    }
                })
                .then(res => {
                    if(res?.data?.success) {
                        const profile = res?.data?.data
                        dispatch(updateProfile(profile))
                        setProfile(profile)
                        setInitProfile(profile)
                        setMediaPreview({
                            ...mediaPreview,
                            avatar: profile.avatar,
                            cover: profile.cover,
                        })
                        Toast.success('Cập nhật thành công!')
                        setIsUpdateProfile(false)
                    } else {
                        Toast.error('Cập nhật thất bại!')
                    }
                })
                .catch(err => {
                    Toast.error('Cập nhật thất bại!')
                })
        } else {
            if(isDeepEqual(profile, initProfile)) {
                setIsUpdateProfile(false)
                return
            } else {
                UserService.updateUserProfile(userId, profile)
                    .then(res => {
                        if(res?.data?.success) {
                            const profile = res?.data?.data
                            dispatch(updateProfile(profile))
                            setProfile(profile)
                            setInitProfile(profile)
                            Toast.success('Cập nhật thành công!')
                            setIsUpdateProfile(false)
                        } else {
                            Toast.error('Cập nhật thất bại!')
                        }
                    })
                    .catch(err => {
                        Toast.error('Cập nhật thất bại!')
                    })
            }
        }

    }

    const handleCancelUpdateProfile = () => {
        setIsUpdateProfile(false)
        setProfile(initProfile)
        setMediaPreview({
            ...mediaPreview,
            avatar: initProfile.avatar,
            cover: initProfile.cover,
        })
    }

    const handleChangeGender = (gender) => {
        setProfile({
            ...profile,
            gender: gender,
        })
        setIsShowDropdownGender(false)
    }

    const handleChange = (name, value) => {
        setProfile({
            ...profile,
            [name]: value,
        })
    }

    const handleBlur = (name, value) => {
        if(value.trim() === '') {
            setMessage({
                ...message,
                [name]: `${name} là bắt buộc`
            })
            return
        }

        if(name === 'phone') {
            const result = /(84|0[3|5|7|8|9])+([0-9]{8})/.test(value)
            if(!result) {
                setMessage({
                    ...message,
                    phone: "Phone không hợp lệ",
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

    const setBirth = (date) => {
        if(date) {
            const birth = date.getTime()
            setProfile({
                ...profile,
                birth: birth,
            })
        }
        return
    }

    const handleChangeMedia = e => {
        const name = e.target.name
        const file = e.target.files[0]

        if(!file) {
            Toast.error('Vui lòng upload file')
            return;
        }

        if(file.size > 5000000) {
            Toast.error('File phải nhỏ hơn 5MB')
            return;
        }

        const preview = URL.createObjectURL(file)

        setMediaPreview({
            ...mediaPreview,
            [name]: preview,
        })

        setProfile({
            ...profile,
            [name]: file,
        })

    }

    useEffect(() => {
        return () => {
            mediaPreview.avatar && URL.revokeObjectURL(mediaPreview.avatar)
        }
    }, [mediaPreview.avatar])

    useEffect(() => {
        return () => {
            mediaPreview.cover && URL.revokeObjectURL(mediaPreview.cover)
        }
    }, [mediaPreview.cover])

    const renderGenderText = (gender) => {
        if(gender === null || gender === undefined) return 'Chọn giới tính'

        return gender === GENDER.MALE ? 'Nam' : 'Nữ'
    }

    const handleGoToUpdatePassword = () => {
        router.push('/account/update-password')
    }

    return (
        <Helmet title="Bản thân">
            <Layout>
                <Body>
                    <BoxLayout>
                        <BoxHeader>BẢN THÂN</BoxHeader>
                        <BoxBody className="box__body--radius box__body--box-shadow">
                            <div className="profile">
                                <div className="profile__media">
                                    <div className="profile__media__cover" style={{ background: `url("${mediaPreview.cover ? mediaPreview.cover : '/images/cover_default.jpg'}")` }}>
                                        {isUpdateProfile && 
                                            <div>
                                                <label htmlFor="cover" className="profile__media__cover__icon">
                                                    <img src="/svgs/camera.svg" />
                                                </label>
                                                <input type="file" name="cover" id="cover" onChange={handleChangeMedia} />
                                            </div>
                                        }
                                    </div>
                                    <div className="profile__media__avatar">
                                        <div className="profile__media__avatar__img" style={{ background: `url("${mediaPreview.avatar ? mediaPreview.avatar : '/images/avatar_default.jpg'}")` }}></div>
                                        {isUpdateProfile && 
                                            <div>
                                                <label htmlFor="avatar" className="profile__media__avatar__icon">
                                                    <img src="/svgs/camera.svg" />
                                                </label>
                                                <input type="file" name="avatar" id="avatar" onChange={handleChangeMedia} />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="profile__name">
                                    <div className="profile__name__input--hidden" ref={fakeNameInputRef} style={fakeNameInputStyle}></div>
                                    <div className={`profile__name__input ${isUpdateProfile ? 'active' : ''}`}>
                                        <input type="text"
                                            name="displayName" 
                                            value={profile.displayName} 
                                            ref={nameInputRef} 
                                            style={nameInputStyle} 
                                            disabled={!isUpdateProfile} 
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box__input">
                                <Input 
                                    className="input-group--flex" label='Email:' 
                                    name="email"
                                    value={profile.email}
                                    disabled={true}
                                />
                            </div>
                            <div className="box__input">
                                <Input 
                                    className="input-group--flex" placeholder='Enter Phone Number' label='Số điện thoại:'
                                    name="phone" 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    onFocus={handleFocus} 
                                    value={profile.phone} 
                                    message={message.phone}
                                    disabled={!isUpdateProfile}
                                />
                            </div>
                            <div className="f jcb aic w-full">
                                <div className="box__input box__input--half pr-20">
                                    <div className="input-group input-group--flex">
                                        <div className="input-group__wrapper">
                                            <div className="input-group__label">Giới tính:</div>
                                            {isUpdateProfile ? (
                                                <div className="dropdown profile__gender">
                                                    <div className="dropdown__selected  profile__gender__selected" onClick={handleShowDropdownGender}>
                                                        <div className="dropdown__selected__text">{renderGenderText(profile.gender)}</div>
                                                        <div className="dropdown__selected__icon">
                                                            <img src={`/svgs/${isShowDropdownGender ? 'up' : 'down'}-arrow.svg`} />
                                                        </div>
                                                    </div>
                                                    <ul className={`dropdown__list ${isShowDropdownGender && 'active'} profile__gender__list`}>
                                                        <li className="dropdown__item" onClick={() => handleChangeGender(null)}>Chọn giới tính</li>
                                                        <li className="dropdown__item" onClick={() => handleChangeGender(GENDER.MALE)}>Nam</li>
                                                        <li className="dropdown__item" onClick={() => handleChangeGender(GENDER.FEMALE)}>Nữ</li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="profile__gender__text">{renderGenderText(profile.gender)}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="box__input box__input--half pl-20">
                                    <div className="input-group input-group--flex">
                                        <div className="input-group__wrapper">
                                            <div className="input-group__label">Ngày sinh:</div>
                                            {isUpdateProfile ? (
                                                <DatePicker 
                                                    className="react-datepicker__input" 
                                                    placeholderText="dd/mm/yyyy" 
                                                    selected={new Date(profile.birth)} 
                                                    onChange={(date) => setBirth(date)} 
                                                    locale="vi" 
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            ) : (
                                                <div className="profile__birth__text">{profile.birth ? moment(new Date(profile.birth)).format('DD/MM/YYYY') : 'dd/mm/yyyy'}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="box__button">
                                <Button size='block' className="btn--outline" onClick={handleGoToUpdatePassword}>Đổi mật khẩu</Button>
                            </div> */}
                        </BoxBody>
                        <BoxFooter>
                            {isUpdateProfile ? (
                                <div className="f jcc">
                                    <div className="box__button pr-20">
                                        <Button size="block" className="btn--outline" onClick={handleCancelUpdateProfile}>Hủy</Button>
                                    </div>
                                    <div className="box__button pl-20">
                                        <Button size="block" onClick={handleUpdateProfile}>Lưu</Button>
                                    </div>
                                </div>
                                ) : (
                                    <div className="f jcc">
                                    <div className="box__button">
                                        <Button size="block" onClick={() => setIsUpdateProfile(true)}>Cập nhật thông tin</Button>
                                    </div>
                                </div>
                                )
                            }
                        </BoxFooter>
                    </BoxLayout>
                </Body>
            </Layout>
        </Helmet>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'header']),
    },
})

export default Profile
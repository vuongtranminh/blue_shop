import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next'
import Avatar from './Avatar';
import Button from './Button';
import { logout } from '../redux/account/accountSlide'
import Input from './Input';
import * as ProductService from '../services/ProductService'
import SearchItem from './SearchItem';

const mainNav = [
    {
        display: "nav_home",
        path: "/"
    },
    {
        display: "nav_products",
        path: "/catalog"
    },
]

const Header = () => {

    const { t } = useTranslation()

    const [user, setUser] = useState(true);

    const dispatch = useDispatch()

    // only show nav when logged in
    if (!user) return null;

    const router = useRouter()

    const activeNav = mainNav.findIndex(item => item.path === router.pathname)

    const state = useSelector(state => state)

    const { cartTotalItems } = state.cart
    const {token, avatar } = state.account

    const [isShowMenuLeft, setIsShowMenuLeft] = useState(false)

    const [headerShrink, setHeaderShrink] = useState(false)

    const [isShowDropdown, setIsShowDropdown] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                setHeaderShrink(true);
            } else {
                setHeaderShrink(false);
            }
        })
        return () => {
            window.removeEventListener("scroll", null)
        };
    }, []);

    const goToLogin = () => {
        router.push('/account/login')
    }

    const goToRegister = () => {
        router.push('/account/register')
    }

    const handleShowDropdown = () => {
        setIsShowDropdown(!isShowDropdown)
    }

    const goToProfile = () => {
        setIsShowDropdown(false)
        router.push('/account/profile')
    }

    const handleLogout = () => {
        dispatch(logout())
        setIsShowDropdown(false)
        router.push('/account/login')
    }

    const goToMyOrder = () => {
        setIsShowDropdown(false)
        router.push('/account/my-order')
    }

    const [searchText, setSearchText] = useState('')
    const [products, setProducts] = useState([])
    const debounceDropDown = useRef(null)

    const handleChange = (name, value) => {
        setSearchText(value)
        if (value === "") {
            if(debounceDropDown.current) {
                clearTimeout(debounceDropDown.current)
            }
            setProducts([])
        } else {
            if(debounceDropDown.current) {
                clearTimeout(debounceDropDown.current)
            }

            debounceDropDown.current = setTimeout(() => filterProduct(value), 1000)
        }
    }

    const filterProduct = (searchText) => {
        console.log(searchText)
        console.log("call")
        ProductService.searchProduct(searchText)
            .then(res => {
                if(res?.data?.success) {
                    setProducts(res?.data?.data)
                }
            })
    }

    const handleGoToProduct = () => {
        setProducts([])
    }

    return (
        <div className={`header ${headerShrink && "shrink"}`}>
            <div className="container">
                <div className="header__logo">
                    <img src="/images/logo.png" alt="" />
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={() => setIsShowMenuLeft(true)}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className={`header__menu__left ${isShowMenuLeft && 'active'}`}>
                        <div className="header__menu__left__close" onClick={() => setIsShowMenuLeft(false)}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={() => setIsShowMenuLeft(false)}
                                >
                                    <Link href={item.path}>
                                        <span className="c-pointer">{t(`header:${item.display}`)}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <div className="dropdown-search">
                                <Input
                                    className="input-group--radius"
                                    placeholder='Tìm kiếm...'
                                    name="searchText"
                                    onChange={handleChange}
                                    value={searchText}
                                />
                                {<ul className={`dropdown-search__list ${products.length > 0 ? 'active' : ''}`} style={{ right: '0' }}>
                                    {products.map((product, index) =>
                                        <li key={index} className="dropdown-search__item">
                                            <SearchItem item={product} onGoToProduct={handleGoToProduct} />
                                        </li>
                                    )}
                                </ul>}
                            </div>
                        </div>
                        {token ? 
                        <div className="header__menu__item header__menu__right__item">
                            <div className="dropdown dropdown--avatar">
                                <div className="dropdown__selected" onClick={handleShowDropdown}>
                                    <Avatar avatar={avatar} />
                                </div>
                                <ul className={`dropdown__list ${isShowDropdown && 'active'}`}>
                                    <li className="dropdown__item" onClick={goToProfile}>Xem thông tin</li>
                                    <li className="dropdown__item" onClick={goToMyOrder}>Xem đơn hàng</li>
                                    <li className="dropdown__item" onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        </div>
                        :
                        <>
                            <div className="header__menu__item header__menu__right__item">
                                <Button className="btn--outline" onClick={goToLogin}>Đăng nhập</Button>
                            </div>
                            <div className="header__menu__item header__menu__right__item">
                                <Button onClick={goToRegister}>Đăng ký</Button>
                            </div>
                        </>}
                        <div className="header__menu__item header__menu__right__item">
                            <Link href="/cart">
                                <i className="bx bx-shopping-bag c-pointer"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

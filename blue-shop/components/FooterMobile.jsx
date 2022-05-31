import React from 'react';
import Grid from '../components/Grid'
import { useRouter } from 'next/router'

const footerNav = [
    {
        display: "Trang chủ",
        icon: "bx bxs-home",
        path: "/"
    },
    {
        display: "Sản phẩm",
        icon: "bx bxs-category",
        path: "/catalog"
    },
    {
        display: "Phụ kiện",
        icon: "bx bxs-spa",
        path: "/accessories"
    },
    {
        display: "Giỏ hàng",
        icon: "bx bxs-shopping-bag",
        path: "/cart"
    },
    {
        display: "Bản thân",
        icon: "bx bxs-user",
        path: "/profile"
    }
]

const FooterMobile = () => {
    
    const router = useRouter();

    const activeNav = footerNav.findIndex(item => item.path === router.pathname)

    const goToPage = (path) => {
        router.push(path)
    }

    return (
        <div className="footer-mobile">
            <Grid col={5} mdCol={5} xlCol={5} gap={0}>
                {
                    footerNav.map((item, index) => (
                        <div key={index} className="footer-mobile__item" onClick={() => goToPage(item.path)}>
                            <div className="footer-mobile__item__icon">
                                <i className={`${item.icon} ${index === activeNav ? 'text-gradient' : ''}`}></i>
                            </div>
                            <span className={index === activeNav ? 'text-gradient' : ''}>{item.display}</span>
                        </div>
                    ))
                }
            </Grid>
        </div>
    );
};

export default FooterMobile;

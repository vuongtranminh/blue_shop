import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import 'react-tabs/style/react-tabs.css';
import TabsCustom from '../components/TabsCustom';
import Helmet from '../components/Helmet';
import Button from '../components/Button';

const Account = () => {

    const [isRegister, setIsRegister] = useState(false);

    return (
        <Helmet title="Login">
            <div className="box box--center">
                <div className="box__children">
                    <div className="account">
                        <div className="account__title text-gradient">
                            {isRegister ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}
                        </div>

                        <div className="account__body mt-20">
                            <TabsCustom isRegister={isRegister}></TabsCustom>
                        </div>

                        <div className="account__social">
                            <div className="account__social__title mb-20"><span className="text-gradient">OR</span></div>

                            <div className="account__social__item">
                                <Button size="sm" className="mb-20">
                                    <span><i className='bx bxl-facebook-circle'></i></span>
                                    Tiếp tục với Facebook
                                </Button>
                                <Button size="sm">
                                    <span><i className="bx bxl-google"></i></span>
                                    Tiếp tục với Google
                                </Button>
                            </div>
                        </div>

                        {isRegister ? (
                            <div className="account__footer">
                                Bạn đã có tài khoản? <span className="text-link" onClick={() => setIsRegister(false)}>Đăng nhập</span>
                            </div>
                        ) : (
                            <div className="account__footer">
                                Bạn chưa có tài khoản? <span className="text-link" onClick={() => setIsRegister(true)}>Đăng ký</span>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'header']),
    },
})

export default Account;


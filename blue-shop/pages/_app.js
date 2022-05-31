import '../assets/boxicons-2.0.7/css/boxicons.min.css';
import '../styles/globals.scss';
import "react-toastify/dist/ReactToastify.css";
import Header from '../components/Header.jsx';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Footer from '../components/Footer.jsx';
import ProductViewModal from '../components/ProductViewModal.jsx';
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from 'next-i18next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check 
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in 
    const user = true
    setUser(user);
    const publicPaths = ['/account/login', '/account/signup', '/account/recover-password'];
    const path = url.split('?')[0];
    if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/account/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <Provider store={store}>
      <Header />
      {authorized && <Component {...pageProps} />}
      <Footer />
      {/* <FooterMobile /> */}
      <ProductViewModal />
      <ToastContainer />
    </Provider>
  )
}

export default appWithTranslation(MyApp)
